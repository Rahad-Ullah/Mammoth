import { TUser } from "./user";

export type TFacility = {
  id: number;
  facility_name: string;
  contact_name: string;
  address: string;
  suite: string;
  email: string;
  phone: string;
  notify_email_1: string;
  notify_email_2: string;
  fax: string;
  account_type: string;
  status: string;
  representative: TUser;
  doctors: TUser[];
};
