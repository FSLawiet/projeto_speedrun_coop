import { Express, Request, NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  //   get the token from the authorization header
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    token = req.headers.authorization.split(" ")[1];

    //check if the token matches the supposed origin
    const decodedToken = jwt.verify(token, process.env.SESSION_SECRET);
    // retrieve the user details of the logged in user
    const user = await decodedToken;
    // pass the user down to the endpoints here
    req.user = user;
    // pass down functionality to the endpoint
    next();
  } else {
    res.status(401).json({ error: new Error("Invalid request!").message });
  }
};
