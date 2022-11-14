namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    DB_USER: string;
    DB_PWD: string;
    DB_HOST: string;
    DB_PORT: number;
    DB_DATABASE: string;
    DB_URL: string;
    SESSION_SECRET: string;
  }
}
export {};
