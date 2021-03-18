export interface IUserProduct {
  _id: string;
  brandId: string;
  name: string;
  sPrice?: number;
  pPrice?: number;
  status: number;
  imgFile?: string;
  imgFiles?: string[];
  desc?: string;
  stock: number;
}
