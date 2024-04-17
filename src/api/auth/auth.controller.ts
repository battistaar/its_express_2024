import { NextFunction, Response } from "express";
import { TypedRequest } from "../../utils/typed-request";
import userService from "../user/user.service";
import { AddUserDTO } from "./auth.dto";
import { omit, pick } from "lodash";
import { UserExistsError } from "../../errors/user-exists";
import passport from "passport";
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../../utils/auth/jwt/jwt-strategy";

export const login = async (req: TypedRequest, res: Response, next: NextFunction) => {
  try {
    const authMiddleware = passport.authenticate('local', (err, user, info) => {
      if (err) {
        next(err);
        return;
      }

      if (!user) {
        res.status(401);
        res.json({
          error: 'LoginError',
          message: info.message
        });
        return;
      }

      const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7 days'});

      res.status(200);
      res.json({
        user,
        token
      });
    });

    authMiddleware(req, res, next);
  } catch (e) {
    next(e);
  }
}

export const add = async (req: TypedRequest<AddUserDTO>, res: Response, next: NextFunction) => {
  try {
    const userData = omit(req.body, 'username', 'password');
    const credentials = pick(req.body, 'username', 'password');
    
    const newUser = await userService.add(userData, credentials);
    
    res.json(newUser);
  } catch(e) {
    if(e instanceof UserExistsError) {
      res.status(400);
      res.send(e.message);
    } else {
      next(e);
    }
  }
}