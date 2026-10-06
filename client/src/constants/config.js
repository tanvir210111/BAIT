export const APP_CONFIG = {
  BRAND_NAME: 'BAIT',
  BRAND_NAME_BN: 'বাংলার আলো আইটি',
  TAGLINE: 'IT Training & Technology Academy',
  SLOGAN_BN: 'আলোকিত হোক প্রতিটি প্রান্তর',
  
  HOTLINE: '01711006214',
  EMAIL: 'supportbait@gmail.com',
  OFFICE_HOURS: 'শনি - বৃহঃ দুপুর ১২টা - রাত ৮টা',
  ADDRESS: '৩১/১ শরীফ কমপ্লেক্স, দৈনিক বাংলার আলো নিউজ পত্রিকা অফিস, ৬ষ্ঠ তলা, পুরানা পল্টন, ঢাকা।',
  
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '',
  
  STORAGE_KEYS: {
    AUTH_TOKEN: 'bait_admin_token',
    AUTH_USER: 'bait_admin_user'
  }
};

export default APP_CONFIG;
