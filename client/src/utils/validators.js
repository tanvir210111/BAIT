export function isValidEmail(email) {
  if (!email) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).trim().toLowerCase());
}

export function isValidBDPhone(phone) {
  if (!phone) return false;
  const cleaned = String(phone).replace(/[\s-]/g, '');
  // Matches +8801XXXXXXXXX or 01XXXXXXXXX
  const re = /^(?:\+?88)?01[3-9]\d{8}$/;
  return re.test(cleaned);
}

export function validatePassword(password) {
  if (!password || password.length < 6) {
    return 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।';
  }
  return null;
}
