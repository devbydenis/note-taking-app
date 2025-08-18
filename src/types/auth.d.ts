export interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

export interface LoginForm {
  username: string;
  password: string;
}

export interface TokenPayload {
  id: number;
  username: string;
}
