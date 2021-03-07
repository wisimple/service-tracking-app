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
  customerId: string;
  demand?: string;
  desc?: string;
  device?: {
    categoryId?: string;
    brandId?: string;
    productId?: string;
    serialNumber?: string;
    imageFileNames?: string[];
  };
  faultTypeId?: string;
  status: number;
  totalCost?: number;
  paidAmount?: number;
}
