import { NextFunction, Response } from "express";
import { plainToClass } from "class-transformer";
import { validate as classValidate } from "class-validator";
import { ValidationError } from "../errors/validation";
import { TypedRequest } from "./typed-request";

function validateFn<T extends object>(type: (new() => T))
  : (req: TypedRequest<T, any>, res: Response, next: NextFunction) => Promise<void>
function validateFn<T extends object>(type: (new() => T), origin: 'body')
  : (req: TypedRequest<T, any>, res: Response, next: NextFunction) => Promise<void>
function validateFn<T extends object>(type: (new() => T), origin: 'query')
  : (req: TypedRequest<any, T>, res: Response, next: NextFunction) => Promise<void>
function validateFn<T extends object>(type: (new() => T), origin: 'body' | 'query' = 'body') {
  return async (req: TypedRequest<any, any>, res: Response, next: NextFunction) => {
    const data = plainToClass(type, req[origin]);
    const errors = await classValidate(data);

    if(errors.length) {
      next(new ValidationError(errors));
    } else {
      req[origin] = data;
      next();
    }
  }
}

export const validate = validateFn;