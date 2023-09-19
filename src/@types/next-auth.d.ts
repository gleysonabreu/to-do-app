import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  export interface User {
    username: string;
    accessToken: string;
  };

  export interface Session {
    accessToken: string;
    user: {
      id: string;
      username: string;
    } & DefaultSession['user'];
  }
}