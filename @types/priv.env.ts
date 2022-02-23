declare global {
  namespace NodeJS {
    interface ProcessEnv {
      POSTGRES_CONNECTION_STRING: string;
      MONGODB_CONNECTION_STRING: string;
      REDIS_CONNECTION_STRING: string;
    }
  }
}

export {};
