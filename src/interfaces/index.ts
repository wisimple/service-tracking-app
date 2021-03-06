interface IMongoDefaults {
  _id: string;
  cAt: string;
  uAt?: string;
}

export interface IProductCategory {
  _id: string;
  name: string;
  showOnServices?: boolean;
}

export interface IBrand {
  _id: string;
  name: string;
  catId: IProductCategory;
}

export interface IProduct {
  _id: string;
  name: string;
  brandId: IBrand;
  imgFile?: string;
}

export interface ICustomer extends IMongoDefaults {
  name: string;
  idNumber?: string;
  type: "company" | "person";
  gender?: boolean;
  contact?: {
    phone?: string;
    address?: string;
  };
  desc?: string;
}

export interface IFaultType {
  _id: string;
  name: string;
  dAt?: string;
}

export interface ITechicalService extends IMongoDefaults {
  customerId: ICustomer;
  demand?: string;
  desc?: string;
  device?: {
    productId?: IProduct;
    serialNumber?: string;
    imageFileNames?: string[];
    passOrPattern?: string;
    customName?: string;
  };
  faultTypeId?: IFaultType[];
  status: number;
  totalCost?: number;
  paidAmount?: number;
  warrantyDays?: number;
  trackingId?: number;
  statusUAt?: string;
}

export interface ITechnicalServiceSummary {
  _id: number;
  count: number;
}

export interface IUser extends IMongoDefaults {
  name: string;
  email: string;
  companyName?: string;
  phoneNumber?: string;
  city?: string;
  address?: string;
}

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

export interface IBasket {
  products: IBasketProduct[];
  basketAmount: number;
  paidAmount: number;
}

export interface IBasketProduct {
  _id: string;
  name: string;
  productId: string;
  count: number;
  price: number;
  totalPrice: number;
}
