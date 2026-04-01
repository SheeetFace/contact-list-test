export interface User {
  id: number;
  name: string;
  email: string;
  address: string;
}

export interface ApiUser extends Omit<User, 'address'> {
  address: {
    city: string;
  };
}
