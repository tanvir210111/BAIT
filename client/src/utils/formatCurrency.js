import { toBengaliNumber } from './formatDate';

export function formatCurrencyBn(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '৳০';
  }
  const formattedEnglish = Number(amount).toLocaleString('en-IN');
  return `৳${toBengaliNumber(formattedEnglish)}`;
}

export default formatCurrencyBn;
