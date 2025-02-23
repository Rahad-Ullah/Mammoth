import { TUser } from "./user";

export type TFacility = {
  id: number;
  facility_name: string;
  contact_name: string;
  email: string;
  phone: string;
  address: string;
  suite: string;
  notify_email_1: string;
  notify_email_2: string;
  fax: string;
  account_type: string;
  status: string;
  representative: TUser;
  doctors: TUser[];
};
