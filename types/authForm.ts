interface AuthInputState {
  value: string;
  isValid: boolean;
  errorMessage: string;
  hasFocused: boolean;
}

interface AuthFormState {
  email: AuthInputState;
  password: AuthInputState;
  passwordConfirm?: AuthInputState;
  nickname?: AuthInputState;
  isFormValid: boolean;
}

// AuthFormState에서 isFormValid 타입을 제거 -> reducer에서 destructuring 사용하기 위해
type FiledType = keyof Omit<AuthFormState, "isFormValid">;

type AuthFormAction =
  | {
      type: "SET_VALUE";
      payload: { filed: FiledType; value: string };
    }
  | {
      type: "SET_VALIDITY";
      payload: {
        field: FiledType;
        isValid: boolean;
        errorMessage: string;
      };
    };

export { AuthInputState, AuthFormState, AuthFormAction, FiledType };
