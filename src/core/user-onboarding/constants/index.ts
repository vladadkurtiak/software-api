import { CookieSerializeOptions } from '@fastify/cookie';

const defaultCookieJwtOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  path: '/',
} satisfies CookieSerializeOptions;

export const cookies = {
  jwt: {
    token: {
      ...defaultCookieJwtOptions,
      maxAge: +process.env.TOKEN_EXPIRES_IN * 1000,
      key: 'token',
    },
    userOnboarding: {
      ...defaultCookieJwtOptions,
      maxAge: +process.env.USER_ONBOARDING_TOKEN_EXPIRES_IN * 1000,
      key: 'token',
    },
  },
};
