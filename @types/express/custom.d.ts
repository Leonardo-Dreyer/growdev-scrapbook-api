declare namespace Express {
    interface Request {
      id: number;
      user: User;
    };
};