import { IBrand } from "./IBrand";

export interface IProduct {
  _id: string;
  name: string;
  brandId: IBrand;
  imgFile?: string;
}
