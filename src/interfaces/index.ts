interface IMongoDefaults {
  _id: string;
  cAt: string;
  uAt?: string;
}

export interface IProductCategory {
  _id: string;
  name: string;
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
    categoryId?: string;
    brandId?: IBrand;
    productId?: IProduct;
    serialNumber?: string;
    imageFileNames?: string[];
    passOrPattern?: string;
  };
  faultTypeId?: IFaultType;
  status: number;
  totalCost?: number;
  paidAmount?: number;
  warrantyDays?: number;
}

export interface TechnicalServiceSummary {
  _id: number;
  count: number;
}
