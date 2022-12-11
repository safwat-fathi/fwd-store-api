declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENV: string;
      PORT: string;
      POSTGRES_DB: string;
      POSTGRES_DB_TEST: string;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      BCRYPT_PASSWORD: string;
      SALT_ROUNDS: string;
      JWT_SECRET: string;
    }
  }
}

export {};
