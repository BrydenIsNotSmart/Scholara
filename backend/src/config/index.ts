import dotenv from "dotenv";
dotenv.config();

function getEnv(key: string, required = true): string {
  const value = process.env[key];
  if (!value && required) {
    throw new Error(`❌ Missing required environment variable: ${key}`);
  }
  return value ?? "";
}

//- SERVER -//
export const PORT = (() => {
  const val = getEnv("PORT");
  const num = parseInt(val, 10);
  if (isNaN(num)) {
    throw new Error(`❌ Invalid PORT: "${val}" must be a number`);
  }
  return num;
})();
export const JWT_SECRET = getEnv("JWT_SECRET") || "dev_secret";
export const HASHING_SALT_ROUNDS = getEnv("HASHING_SALT_ROUNDS") || "10";

//- DATABASE -//
export const DB_HOST = getEnv("DB_HOST");
export const DB_PORT = getEnv("DB_PORT");
export const DB_USER = getEnv("DB_USER");
export const DB_PASSWORD = getEnv("DB_PASSWORD");
export const DB_NAME = getEnv("DB_NAME");

//-SNOWFLAKES-//
export const SNOWFLAKE_USER_SHARD = 1;

//- SCHOOL INFO -//
export const SchoolName = getEnv("SCHOOL_NAME");
