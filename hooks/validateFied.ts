interface ValidationResult {
  isValid: boolean;
  errorMessage: string;
}

/**
 * Mapped Types
 * https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
 */
interface fieldNameProp {
  [key: string]: string;
}

const fieldName: fieldNameProp = {
  email: "이메일",
  password: "비밀번호",
  passwordConfirm: "비밀번호",
  nickname: "닉네임",
};

const errorMessages = {
  email: "잘못된 이메일 형식입니다.",
  nickName: "닉네임은 2글자 이상 입력해 주세요.",
  password: {
    length: "비밀번호를 8자리 이상 입력해 주세요.",
    cantFind: "비밀번호를 확인할 수 없습니다.",
    diff: "비밀번호가 일치하지 않습니다.",
  },
  noExist: "검사할 수 없는 필드입니다.",
};

/**
 * Input의 입력 유효성을 검사하는 함수
 * @param field : 유효성 검사를 진행할 Input 필드
 * @param value : Input 입력(e.target.value)
 * @param formState : passwordConfirm을 password와 비교하기 위해 참조용으로 사용하는 옵셔널한 값
 * @returns {isValid, errorMessage}
 * - isValid : 유효성 검사 결과
 * - errorMessage : 유효성 검사에 실패했을 때 리턴할 에러 메시지
 */
function validateField(
  field: string,
  value: string,
  formState?: Record<string, string>
): ValidationResult {
  const trimmedValue = value.trim();

  // 입력이 공백인지 검사
  if (trimmedValue === "") {
    return {
      isValid: false,
      errorMessage: `${fieldName[field]}을(를) 입력해 주세요.`,
    };
  }

  const rules: Record<string, (val: string) => ValidationResult> = {
    /**
     * 이메일이 [최소 한글자 이상의 영문 대소문자, 숫자]@[최소 한글자 이상의 영문 대소문자, 숫자].[최소 2글자 이상의 영문 대소문자]의 정규 표현식에 적합한지 검사
     * @param val : 이메일 입력
     */
    email: (val) => {
      const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(val)
        ? { isValid: true, errorMessage: "" }
        : { isValid: false, errorMessage: errorMessages.email };
    },
    /**
     * 닉네임이 2글자 이상인지 검사
     * @param val : 닉네임 입력
     */
    nickname: (val) => {
      return val.length > 1
        ? { isValid: true, errorMessage: "" }
        : {
            isValid: false,
            errorMessage: errorMessages.nickName,
          };
    },
    /**
     * 비밀번호가 8글자 이상인지 검사
     * @param val : 비밀번호 입력
     */
    password: (val) => {
      return val.length >= 8
        ? { isValid: true, errorMessage: "" }
        : {
            isValid: false,
            errorMessage: errorMessages.password.length,
          };
    },
    /**
     * 비밀번호 확인 입력 검사
     * 비밀번호 필드의 입력과 비교 검사
     * @param val
     * @returns
     */
    passwordConfirm: (val) => {
      if (!formState)
        return {
          isValid: false,
          errorMessage: errorMessages.password.cantFind,
        };
      if (val.length < 8)
        return {
          isValid: false,
          errorMessage: errorMessages.password.length,
        };
      return val === formState.password
        ? { isValid: true, errorMessage: "" }
        : { isValid: false, errorMessage: errorMessages.password.diff };
    },
    default: () => {
      throw new Error(errorMessages.noExist);
    },
  };

  // 입력으로 받은 field에 대한 유효성 검사 실행
  // 정의 되지 않은 field인 경우 error 리턴
  const validate = rules[field] || rules["default"];
  return validate(trimmedValue);
}

export default validateField;
