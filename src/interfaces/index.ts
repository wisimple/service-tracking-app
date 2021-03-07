interface IMongoDefaults {
  _id: string;
  cAt: string;
  uAt?: string;
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

export interface IProductCategory {
  _id: string;
  name: string;
}

export interface IBrand {
  _id: string;
  catId: string;
  name: string;
}

export interface IProduct {
  _id: string;
  brandId: string;
  name: string;
}

export interface ITechicalService extends IMongoDefaults {
  customerId: ICustomer;
  demand?: string;
  desc?: string;
  device?: {
    categoryId?: string | IProductCategory;
    brandId?: string | IBrand;
    productId?: string | IProduct;
    serialNumber?: string;
    imageFileNames?: string[];
  };
  faultTypeId?: IFaultType;
  status: number;
  totalCost?: number;
  paidAmount?: number;
}
