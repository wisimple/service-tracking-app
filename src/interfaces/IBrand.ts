import { ICategory } from "./ICategory";

export interface IBrand {
  _id: string;
  userId?: string;
  name: string;
  catId: ICategory;
}

export interface IBrandData {
  _id: string;
  name: string;
  catId: string;
}
