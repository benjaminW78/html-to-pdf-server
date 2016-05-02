/*globals require, jest, describe, it, expect, __app, process, beforeEach, afterEach */

'use strict';

const pathAndName = 'config';

jest.autoMockOff();

describe(pathAndName, function () {
    describe('normal case', function () {
        let testedThing;

        beforeEach(function () {
            testedThing = require(__app + pathAndName).current;
        });

        describe('#appVersion', function () {
            it('must be defined', function () {
                expect(typeof testedThing.appVersion).toBe('string');
                expect(testedThing.appVersion.length).toBeGreaterThan(4);
            });
        });

        describe('#activeDebug', function () {
            it('must be defined', function () {
                expect(typeof testedThing.activeDebug).toBe('boolean');
            });
        });

        describe('#activeDebugSql', function () {
            it('must be defined', function () {
                expect(typeof testedThing.activeDebugSql).toBe('boolean');
            });
        });

        describe('#dbData', function () {
            it('must be defined', function () {
                console.log(testedThing.dbData)
                expect(typeof testedThing.dbData.db_superuser).toBe('string');
                expect(typeof testedThing.dbData.db_superpassword).toBe('string');
                expect(typeof testedThing.dbData.db_host).toBe('string');
                expect(typeof testedThing.dbData.db_name).toBe('string');
                expect(typeof testedThing.dbData.databaseUrl).toBe('string');
            });

            it('will define databaseURL with all parts inside it', function () {
                expect(testedThing.dbData.databaseUrl.indexOf(testedThing.dbData.db_superuser)).toBeGreaterThan(-1);
                expect(testedThing.dbData.databaseUrl.indexOf(testedThing.dbData.db_superpassword)).toBeGreaterThan(-1);
                expect(testedThing.dbData.databaseUrl.indexOf(testedThing.dbData.db_host)).toBeGreaterThan(-1);
                expect(testedThing.dbData.databaseUrl.indexOf(testedThing.dbData.db_name)).toBeGreaterThan(-1);
            });
        });

        describe('#dbAuth', function () {
            it('must be defined', function () {
                expect(typeof testedThing.dbAuth.db_superuser).toBe('string');
                expect(typeof testedThing.dbAuth.db_superpassword).toBe('string');
                expect(typeof testedThing.dbAuth.db_host).toBe('string');
                expect(typeof testedThing.dbAuth.db_name).toBe('string');
                expect(typeof testedThing.dbAuth.databaseUrl).toBe('string');
            });

            it('will define databaseURL with all parts inside it', function () {
                expect(testedThing.dbAuth.databaseUrl.indexOf(testedThing.dbAuth.db_superuser)).toBeGreaterThan(-1);
                expect(testedThing.dbAuth.databaseUrl.indexOf(testedThing.dbAuth.db_superpassword)).toBeGreaterThan(-1);
                expect(testedThing.dbAuth.databaseUrl.indexOf(testedThing.dbAuth.db_host)).toBeGreaterThan(-1);
                expect(testedThing.dbAuth.databaseUrl.indexOf(testedThing.dbAuth.db_name)).toBeGreaterThan(-1);
            });
        });

        describe('#http', function () {
            it('must have', function () {
                expect(typeof testedThing.http.domain).toBe('string');
                expect(typeof testedThing.http.protocol).toBe('string');
                expect(typeof testedThing.http.port).toBe('string');
            });
        });

        describe('#jwt', function () {
            it('must be defined', function () {
                expect(typeof testedThing.jwt.algorithms).toBe('string');
                expect(testedThing.jwt.algorithms.indexOf(testedThing.jwt.algorithms)).toBeGreaterThan(-1);
                expect(typeof testedThing.jwt.issuer).toBe('string');
                expect(testedThing.jwt.issuer.indexOf(testedThing.jwt.issuer)).toBeGreaterThan(-1);
            });
        });
    });
    describe('with no environnement', function () {
        let testedThing;
        beforeEach(function () {
            delete process.env.NODE_ENV;
            testedThing = require(__app + pathAndName).current;
        });

        describe('#NODE_ENV', function () {
            it('must be ', function () {
                expect(typeof process.env.NODE_ENV).toBe('string');
                expect(process.env.NODE_ENV).toEqual("development");
            });
        });

        describe('#appVersion', function () {
            it('must be defined', function () {
                expect(typeof testedThing.appVersion).toBe('string');
                expect(testedThing.appVersion.length).toBeGreaterThan(4);
            });
        });

        describe('#activeDebug', function () {
            it('must be defined', function () {
                expect(typeof testedThing.activeDebug).toBe('boolean');
            });
        });

        describe('#activeDebugSql', function () {
            it('must be defined', function () {
                expect(typeof testedThing.activeDebugSql).toBe('boolean');
            });
        });

    });

    describe('with empty environnement', function () {
        let testedThing;

        beforeEach(function () {
            process.env.NODE_ENV = 'testEmpty';
            testedThing = require(__app + pathAndName).current;
        });

        afterEach(function () {
            delete process.env.NODE_ENV;
        });

        describe('#appVersion', function () {
            it('must be defined', function () {
                expect(typeof testedThing.appVersion).toBe('string');
                expect(testedThing.appVersion.length).toBeGreaterThan(4);
            });
        });

        describe('#activeDebug', function () {
            it('must be defined', function () {
                expect(typeof testedThing.activeDebug).toBe('boolean');
            });
        });

        describe('#activeDebugSql', function () {
            it('must be defined', function () {
                expect(typeof testedThing.activeDebugSql).toBe('boolean');
            });
        });

        describe('#dbData', function () {
            it('must be undefined', function () {
                expect(testedThing.dbData).not.toBeDefined();
            });
        });

        describe('#dbAuth', function () {
            it('must be undefined', function () {
                expect(testedThing.dbAuth).not.toBeDefined();
            });
        });

        describe('#http', function () {
            it('must have', function () {
                expect(testedThing.http.domain).not.toBeDefined();
                expect(testedThing.http.protocol).not.toBeDefined();
                expect(testedThing.http.port).not.toBeDefined();
            });
        });

        describe('#jwt', function () {
            it('must be defined', function () {
                expect(testedThing.jwt).not.toBeDefined();
            });
        });
    });

    describe('with database_url already provided environnement', function () {
        let testedThing;

        beforeEach(function () {
            process.env.NODE_ENV = 'testDbURL';
            testedThing = require(__app + pathAndName).current;
        });

        afterEach(function () {
            delete process.env.NODE_ENV;
        });

        describe('#dbData', function () {
            it('must not be modified', function () {
                expect(testedThing.dbData.db_superuser).not.toBeDefined();
                expect(testedThing.dbData.db_superpassword).not.toBeDefined();
                expect(testedThing.dbData.db_host).not.toBeDefined();
                expect(testedThing.dbData.db_name).not.toBeDefined();
                expect(testedThing.dbData.databaseUrl).toBe('totoro');
            });
        });

        describe('#dbAuth', function () {
            it('must not be modified', function () {
                expect(testedThing.dbAuth.db_superuser).not.toBeDefined();
                expect(testedThing.dbAuth.db_superpassword).not.toBeDefined();
                expect(testedThing.dbAuth.db_host).not.toBeDefined();
                expect(testedThing.dbAuth.db_name).not.toBeDefined();
                expect(testedThing.dbAuth.databaseUrl).toBe('taratata');
            });
        });
    });
});