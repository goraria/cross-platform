export interface User {
  id: string;
  username: string;
  email: string;
  phone_number: string,
  password_hash: string,
  full_name: string,
  first_name: string,
  last_name: string,
  profile_picture_url: string,
  cover_picture_url: string,
  bio: string,
  location: string,
  is_active: boolean,
  is_verified: boolean,
  last_login_at: Date,
  created_at: Date,
  updated_at: Date
}