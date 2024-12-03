interface LoginInterface {
  email: string;
  password: string;
}

interface SignupInterface {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
}

export type { LoginInterface, SignupInterface };
