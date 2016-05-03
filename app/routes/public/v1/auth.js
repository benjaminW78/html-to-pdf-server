/*globals module, require */

const md5 = require('md5'),
    jwt = require('jsonwebtoken'),
    dbCo = require('../../../db/dbConnection.js'),
    moment = require('moment-timezone');

/**
 * Function Ctrl for provide a generator called after by koa
 * @param config from app
 * @returns {{do: auth}}
 */
function authCtrl(config) {
    'use strict';

    function auth(req, res) {
        let fsn,
            fsp,
            query;

        if (req.params['email_address']) {
            fsn = req.params['email_address'];
        }
        if (req.params['password']) {
            fsp = req.params['password'];
        }

        query = 'SELECT admin_email_address, admin_firstname,admin_lastname,admin_password,admin_blocked FROM companeo_v6.sec.admin_users where admin_email_address=\'' + fsn + '\' AND admin_password=\'' + fsp + '\';';

        console.log('Auth query : ', query);

        function authCallback(data) {
            let result;

            if (1 === data.rowCount) {
                const newData = {
                        iatUnix: moment().tz('Europe/Paris').unix(),
                        iat: moment().tz('Europe/Paris').format('YYYY-MM-DD HH:mm:ss.SSSZ').substring(0, 26)
                    },
                    payLoad = {
                        email: fsn,
                        firstName: data.rows[0]['admin_firstname'],
                        lastName: data.rows[0]['admin_lastname'],
                        iat: newData.iatUnix
                    },
                    options = {
                        algorithm: config.jwt.algorithms,
                        noTimestamp: false,
                        expiresIn: '13h',
                        subject: 'api authorization',
                        issuer: config.jwt.issuer
                    },
                    jwtKey = require('../../../db/wtfKeyJwt');

                try {
                    result = {
                        jwt: jwt.sign(payLoad, jwtKey, options)
                    };
                } catch (error) {
                    console.log('user ' + fsn + ' bad credentials. JWT Error during creation', error);
                    result = {
                        error: 'user ' + fsn + ' bad credentials. JWT Error during creation.'
                    };
                }
            } else {
                console.info('user ' + fsn + ' not found.');
                result = {
                    error: 'user ' + fsn + ' bad credentials.'
                };
                console.log('Auth query result : ', result);
            }

            return result;
        }

         dbCo(query,authCallback,config);
            //.then(authCallback)
            //.then(function (data) {
            //    if ('object' === typeof data && data.jwt) {
            //        console.info('JWT successfully created for ' + fsn);
            //        res.body = {
            //            token: data.jwt,
            //            notExpand: true
            //        };
            //        //method  for unit testesting purpose only.
            //        console.info({auth: data.jwt});
            //    } else {
            //        res.body = data;
            //        res.status = 403;
            //    }
            //});
    }

    /**
     *  This function check if password is valid.
     *
     * @param plain
     *
     * @return string
     */
    function isPasswordValid(plain, encrypted) {
        const encryptedTmp = encrypted.split(':'),
            salt = (encryptedTmp[1] ? encryptedTmp[1] : ''),
            password = md5(salt + plain) + ':' + salt;
        return (password === encrypted);
    }

    return {
        do: auth
    };
}

module.exports = authCtrl;