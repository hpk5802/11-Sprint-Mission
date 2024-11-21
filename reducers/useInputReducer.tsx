import { AuthFormAction, AuthFormState } from "@/types/authForm";

const useInputReducer = (state: AuthFormState, action: AuthFormAction) => {
  switch (action.type) {
    case "SET_VALUE":
      return {
        ...state,
        [action.payload.filed]: {
          ...state[action.payload.filed],
          value: action.payload.value,
        },
      };
    case "SET_VALIDITY":
      return {
        ...state,
        [action.payload.field]: {
          ...state[action.payload.field],
          isValid: action.payload.isValid,
          errorMessage: action.payload.errorMessage,
        },
      };
    default:
      throw new Error("처리할 수 없는 액션입니다.");
  }
};

export default useInputReducer;
