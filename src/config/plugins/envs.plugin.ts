import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
    PORT: env.get('PORT').default('3000').asPortNumber(),
    MAILER_EMAIL_ID: env.get('MAILER_EMAIL_ID').required().asEmailString(),
    MAILER_SECRET_KEY: env.get('MAILER_SECRET_KEY').required().asString(),
}