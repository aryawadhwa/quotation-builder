import { company } from '../config/company.js';

export const UPI_VPA = company.upi.vpa;
export const UPI_PAYEE_NAME = company.upi.payeeName;

export function buildUpiPaymentUri({
  vpa = UPI_VPA,
  name = UPI_PAYEE_NAME,
  currency = 'INR',
} = {}) {
  const params = new URLSearchParams({ pa: vpa, pn: name, cu: currency });
  return `upi://pay?${params.toString()}`;
}
