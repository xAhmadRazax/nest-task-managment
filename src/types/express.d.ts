/* eslint-disable @typescript-eslint/no-namespace */

declare global {
  namespace Express {
    interface Request {
      // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
      user?: User | null;
    }
  }
}

export {};
