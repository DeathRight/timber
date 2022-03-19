declare global {
  namespace NodeJS {
    interface ProcessEnv {
      POSTGRES_CONNECTION_STRING: string;
      MONGODB_CONNECTION_STRING: string;
      REDIS_URL: string;
      REDIS_USERNAME: string;
      REDIS_PASSWORD: string;
      PROD: boolean;
    }
  }
}

export {};
