import dotenv from 'dotenv';

dotenv.config();

export const {
  RPC_URL,
  PRIVATE_KEY,
  CONTRACT_ADDRESS,
  PORT
} = process.env;

if (!RPC_URL || !PRIVATE_KEY || !CONTRACT_ADDRESS) {
  throw new Error('Please provide RPC_URL, PRIVATE_KEY, CONTRACT_ADDRESS in .env');
}
