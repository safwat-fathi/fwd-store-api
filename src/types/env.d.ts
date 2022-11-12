declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      POSTGRES_HOST: string;
      POSTGRES_DB: string;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      BCRYPT_PASSWORD: string;
      SALT_ROUNDS: string;
      JWT_SECRET: string;
    }
  }
}

export {};
