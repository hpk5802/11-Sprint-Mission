interface AuthInputState {
  value: string;
  isValid: boolean;
  errorMessage: string;
}

interface AuthFormState {
  email: AuthInputState;
  password: AuthInputState;
  passwordConfirm?: AuthInputState;
  nickname?: AuthInputState;
}

type AuthFormAction =
  | {
      type: "SET_VALUE";
      payload: { filed: keyof AuthFormState; value: string };
    }
  | {
      type: "SET_VALIDITY";
      payload: {
        field: keyof AuthFormState;
        isValid: boolean;
        errorMessage: string;
      };
    };

export { AuthInputState, AuthFormState, AuthFormAction };
