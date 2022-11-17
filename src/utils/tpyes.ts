export interface IAccounts {
  assets: string;
  broker_id: string;
  created_at: string;
  id: number;
  is_active: boolean;
  name: string;
  number: string;
  payments: string;
  status: number;
  updated_at: string;
  user_id: number;
  uuid: string;
}

export interface IUsers {
  address: string;
  age: number;
  birth_date: string;
  created_at: string;
  detail_address: string;
  email: string;
  gender_origin: number;
  id: number;
  last_login: string;
  name: string;
  phone_number: string;
  photo: string;
  updated_at: string;
  uuid: string;
}

export interface ISettings {
  allow_invest_push: boolean;
  allow_marketing_push: boolean;
  created_at: string;
  id: number;
  is_active: boolean;
  is_staff: boolean;
  updated_at: string;
  uuid: string;
}
