import { company } from '../config/company';

const SEQ_PREFIX = 'windal_quote_seq';

export function getNextQuoteNumber() {
  const year = new Date().getFullYear();
  const prefix = company.defaults.quotePrefix;
  const key = `${SEQ_PREFIX}_${year}`;
  const current = parseInt(localStorage.getItem(key) || '0', 10);
  const next = current + 1;
  localStorage.setItem(key, String(next));
  return `${prefix}-${year}-${String(next).padStart(3, '0')}`;
}
