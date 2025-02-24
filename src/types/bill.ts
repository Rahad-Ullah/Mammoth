import { TPatient } from "./patient";

export type TBill = {
  id: number;
  report_no: string;
  ordering_provider: string;
  ordering_physician: string;
  bill_date: string;
  bill_amount: number;
  patient: TPatient;
};
