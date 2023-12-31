import { api } from '@/config/api';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Sign in user',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'johndoe@example.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter your password',
        },
      },
      authorize: async (credentials) => {
        const res = await api('/auth', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const { access_token } = await res.json();

        const resGetUser = await api('/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
          },
        });

        const { user } = await resGetUser.json();

        if (resGetUser.ok && res.ok && access_token) {
          return {
            ...user,
            name: `${user.first_name} ${user.last_name}`,
            accessToken: access_token,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      session.user.id = token.id as string;
      session.user.username = token.username as string;
      session.accessToken = token.accessToken as string;

      return session;
    },
    jwt: ({ token, user, trigger, session }) => {
      if (trigger === 'update') {
        return { ...token, ...session.user };
      }

      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
        token.username = user.username;
      }

      return token;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 23 * 60 * 60,
  },
  pages: {
    signIn: '/signin',
    signOut: '/',
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
