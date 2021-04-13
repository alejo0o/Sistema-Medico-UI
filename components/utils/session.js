import { withIronSession } from 'next-iron-session';

export default function withSession(handler) {
  return withIronSession(handler, {
    password: process.env.WITH_IRON_PASSWORD,
    cookieName: process.env.COOKIE_NAME,
    cookieOptions: {
      maxAge: process.env.COOKIE_EXPIRE_TIME,
      //secure: process.env.NODE_ENV === 'production' ? true : false,
    },
  });
}
