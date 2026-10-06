const BENGALI_NUMERALS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBengaliNumber(num) {
  if (num === null || num === undefined) return '';
  return String(num).replace(/[0-9]/g, digit => BENGALI_NUMERALS[Number(digit)]);
}

export function formatDateBn(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const day = toBengaliNumber(date.getDate());
  const year = toBengaliNumber(date.getFullYear());
  
  const bnMonths = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];
  const month = bnMonths[date.getMonth()];
  return `${day} ${month}, ${year}`;
}

export function formatTimeBn(timeString) {
  if (!timeString) return '';
  return timeString.replace(/[0-9]/g, digit => BENGALI_NUMERALS[Number(digit)]);
}
