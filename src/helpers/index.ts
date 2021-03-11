import { technicServiceStatusTypes } from "constants/index";
import { ICustomer } from "interfaces";

export const getCustomerAvatarSrc = (c: ICustomer) => {
  return "/images/avatar/" + (c.type === "company" ? "company.png" : c.gender ? "male.png" : "female.png");
};

export const getDeviceImageUrl = (fileName: string): string => {
  return "https://fdn2.gsmarena.com/vv/bigpic/" + fileName;
};

export const getTechnicalServiceStatusType = (
  status: number
): { value: number; text: string; color: string } => {
  return (
    technicServiceStatusTypes.find((type) => type.value === status) || {
      value: 0,
      text: "none",
      color: "grey",
    }
  );
};

export const isPatternLockString = (input: string) => {
  const splitted = input.split(",");

  for (let i = 0; i < splitted.length; i++) {
    const parsed = parseInt(splitted[i]);
    if (isNaN(parsed) || parsed > 9) return false;
  }

  return true;
};
