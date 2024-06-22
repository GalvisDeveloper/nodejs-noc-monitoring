import { envs } from '../../../src/config/plugins/envs.plugin';


describe('envs.plugins', () => {

    test('should return a object with the environment variables', () => {
        expect(envs).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL_ID: 'correo@gmail.com',
            MAILER_SECRET_KEY: 'asdqfgsdxcvx',
            PROD: false,
            MONGO_URL: 'mongodb://galvisdev:123456@localhost:27018/',
            MONGO_DB_NAME: 'NOC-test',
            MONGO_USER: 'galvisdev',
            MONGO_PASS: '123456',
        })
    });

    test('should return error if not found env', async () => {

        jest.resetModules();
        process.env.PORT = 'ABC';

        try {
            await import('../../../src/config/plugins/envs.plugin')
            expect(true).toBe(false);
        } catch (error) {
            expect(`${error}`).toContain('should be a valid integer');
            // console.log(error)
        }
    });

});