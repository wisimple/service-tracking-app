export interface CustomerDto {
  name: string;
  idNumber?: string;
  contact?: {
    phone?: string;
    address?: string;
  };
  desc?: string;
}
