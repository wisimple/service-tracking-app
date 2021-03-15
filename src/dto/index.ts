export interface CustomerDto {
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

export interface FaultTypeDto {
  name: string;
}

export interface TechnicalServiceDto {
  customerId?: string;
  demand?: string;
  desc?: string;
  device?: {
    categoryId?: string;
    brandId?: string;
    productId?: string;
    serialNumber?: string;
    imageFileNames?: string[];
    customName?: string;
  };
  faultTypeId?: string;
  status?: number;
  totalCost?: number;
  paidAmount?: number;
  trackingId?: number;
}

export interface UserSigninDto {
  email: string;
  password: string;
}

export interface QueryTechnicalServiceDto {
  trackingId?: string;
  customerId?: string;
  status?: number;
  startDate?: string;
  endDate?: string;
}

export interface UserProductDto {
  brandId: string;
  name: string;
  sPrice?: number;
  pPrice?: number;
  status: number;
  imgFile?: string;
  imgFiles?: [string];
  desc?: string;
  stock: number;
}

export interface CategoryDto {
  name: string;
  showOnServices?: boolean;
}
