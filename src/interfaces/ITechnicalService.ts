import { ICustomer } from "./ICustomer";
import { IProduct } from "./IProduct";
import { IFaultType } from "./IFaultType";

export interface ITechicalService {
  _id: string;
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
  cAt: string;
  uAt?: string;
}
export interface ITechnicalServiceSummary {
  _id: number;
  count: number;
}
