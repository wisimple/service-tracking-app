import { Customer } from "store/customer/types";

export const getCustomerAvatarSrc = (c: Customer) => {
  return "/images/avatar/" + (c.type === "company" ? "company.png" : c.gender ? "male.png" : "female.png");
};
