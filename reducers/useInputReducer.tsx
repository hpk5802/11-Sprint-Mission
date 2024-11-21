import { AuthFormAction, AuthFormState } from "@/types/authForm";

const useInputReducer = (
  state: AuthFormState,
  action: AuthFormAction
): AuthFormState => {
  switch (action.type) {
    case "SET_VALUE":
      return {
        ...state,
        [action.payload.filed]: {
          ...state[action.payload.filed],
          value: action.payload.value,
        },
      };
    /**
     * Blur 이벤트 발생 시 호출하는 액션
     * filed에 해당하는 Input의 입력을 validation하고 isValid와, errorMessage를 갱신
     * 추가로 전체 state의 isValid를 확인해 isFormValid를 갱신
     */
    case "SET_VALIDITY":
      // Input의 입력을 validation한 후 업데이트 된 state
      const result: AuthFormState = {
        ...state,
        [action.payload.field]: {
          ...state[action.payload.field],
          isValid: action.payload.isValid,
          errorMessage: action.payload.errorMessage,
        },
      };
      // 업데이트 된 state의 모든 필드의 isValid를 확인 후 true면 isFormValid를 true로 갱신
      const isFormValid = Object.entries(result)
        .filter(([key]) => key !== "isFormValid")
        .every(([_, k]) => k.isValid === true);
      return {
        ...result,
        isFormValid: isFormValid,
      };
    // 처리할 수 없는 액션인 경우
    default:
      throw new Error("처리할 수 없는 액션입니다.");
  }
};

export default useInputReducer;
