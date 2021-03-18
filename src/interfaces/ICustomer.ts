export interface ICustomer {
  _id: string;
  name: string;
  idNumber?: string;
  type: "company" | "person";
  gender?: boolean;
  contact?: {
    phone?: string;
    address?: string;
  };
  desc?: string;
  cAt: string;
  uAt?: string;
}
