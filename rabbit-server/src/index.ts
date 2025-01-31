import Application from './application';
import * as dotenv from 'dotenv';

dotenv.config();

export const PRODUCTION = process.env.NODE_ENV === 'production';
export let application: Application;

async function main() {
  console.log('NODE_DEV :', process.env.NODE_DEV);
  console.log('DEPLOY_TARGET :', process.env.DEPLOY_TARGET);
  console.log('POSTGRES_DB :', process.env.POSTGRES_DB);
  console.log('JWT_KEY :', process.env.JWT_KEY);
  console.log('S3_REGION :', process.env.S3_REGION);
  console.log('SHAREDASSET_CONTRACT :', process.env.SHAREDASSET_CONTRACT);
  console.log('LAZY_MINT_ADAPTER :', process.env.LAZY_MINT_ADAPTER);
  console.log('NATIVE_TOKEN :', process.env.NATIVE_TOKEN);
  application = new Application();
  await application.connect();
  await application.init();
}

main();
