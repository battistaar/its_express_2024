import { Request } from "express";
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

export interface TypedRequest<T = unknown, Q = ParsedQs, P = ParamsDictionary> extends Request<P, any, T, Q> {}

// class TestGeneric<T> {
//   protected data: T;

//   constructor(initialData: T) {
//     this.data = initialData;
//   }

//   setData(value: T) {
//     this.data = value;
//   }

//   getData() {
//     return this.data;
//   } 
// }

// const t = new TestGeneric('ciao');
// t.getData()