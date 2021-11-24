declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_HOST: string;
      DB_DATABASE: string;
      PORT?: string;
      JWT_SECRET: string;
      JWT_EXPIRES_IN: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
