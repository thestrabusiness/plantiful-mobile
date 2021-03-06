interface PhotoUrl {
  preview: string;
  original: string;
}

interface CheckIn {
  created_at: number;
  fertilized: boolean;
  id: number;
  notes: string;
  photo_urls: PhotoUrl[];
  plant_id: number;
  watered: boolean;
}

interface Plant {
  avatar: string;
  check_frequency_scalar: number;
  check_frequency_unit: string;
  check_ins: CheckIn[];
  garden_id: number;
  id: number;
  last_watered_at: number;
  name: string;
  next_check_date: string;
  overdue_for_check_in: boolean;
}

interface Garden {
  id: number;
  name: string;
  owner_id: number;
  plants: Plant[];
}

interface User {
  id: number;
  default_garden_id: number;
  first_name: string;
  last_name: string;
  email: string;
  remember_token: string;
  mobile_api_token: string;
  owned_gardens: Garden[];
  shared_gardens: Garden[];
}

export { PhotoUrl, Plant, User, CheckIn, Garden };
