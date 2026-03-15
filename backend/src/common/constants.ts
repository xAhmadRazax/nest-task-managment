export const COOKIE_OPTIONS = {
  httpOnly: true,
  // sameSite: ,
  secure: false,
};

if (process.env.NODE_ENV === 'production') {
  COOKIE_OPTIONS.secure = true;
}
