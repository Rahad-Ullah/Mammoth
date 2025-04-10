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

export interface IFacility {
  _id: string;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  suite: string;
  notificationEmail1: string;
  notificationEmail2: string;
  fax: string;
  facilityId: string;
  accountType: string;
  representative: {
    _id: string;
    email: string;
    name: string;
  };
  status: string;
  doctors: {
    _id: string;
    email: string;
    name: string;
  }[];
  disorders: {
    name: string;
    isHidden: boolean;
    disorders: {
      name: string;
      isHidden: boolean;
      _id: string;
    }[];
    _id: string;
  }[];
  reasons: {
    name: string;
    isHidden: boolean;
    _id: string;
  }[];
  clinical_symptoms: {
    title: string;
    isHidden: boolean;
    disorders: {
      name: string;
      isHidden: boolean;
      sides: string[];
      _id: string;
    }[];
    _id: string;
  }[];
}
