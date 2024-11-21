interface ValidationResult {
  isValid: boolean;
  errorMessage: string;
}

interface fieldNameProp {
  [key: string]: string;
}

const fieldName: fieldNameProp = {
  email: "이메일",
  password: "비밀번호",
  passwordConfirm: "비밀번호",
  nickname: "닉네임",
};

function validateField(
  field: string,
  value: string,
  formState?: Record<string, string>
): ValidationResult {
  const trimmedValue = value.trim();

  if (trimmedValue === "") {
    return {
      isValid: false,
      errorMessage: `${fieldName[field]}을(를) 입력해 주세요.`,
    };
  }

  const rules: Record<string, (val: string) => ValidationResult> = {
    email: (val) => {
      const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(val)
        ? { isValid: true, errorMessage: "" }
        : { isValid: false, errorMessage: "잘못된 이메일 형식입니다." };
    },
    nickname: (val) => {
      return val.length > 1
        ? { isValid: true, errorMessage: "" }
        : {
            isValid: false,
            errorMessage: "닉네임은 2글자 이상 입력해 주세요.",
          };
    },
    password: (val) => {
      return val.length >= 8
        ? { isValid: true, errorMessage: "" }
        : {
            isValid: false,
            errorMessage: "비밀번호를 8자리 이상 입력해 주세요.",
          };
    },
    passwordConfirm: (val) => {
      if (!formState)
        return {
          isValid: false,
          errorMessage: "비밀번호를 확인할 수 없습니다.",
        };
      return val === formState.password
        ? { isValid: true, errorMessage: "" }
        : { isValid: false, errorMessage: "비밀번호가 일치하지 않습니다." };
    },
    default: () => {
      return { isValid: true, errorMessage: "" };
    },
  };

  const validate = rules[field] || rules["default"];
  return validate(trimmedValue);
}

export default validateField;
