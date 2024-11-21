import validateField from "@/hooks/validateFied";
import { AuthFormAction, AuthInputState } from "@/types/authForm";
import { ChangeEvent, Dispatch, FocusEvent } from "react";

interface EmailInputInterface {
  state: AuthInputState;
  handleValue: Dispatch<AuthFormAction>;
}

function EmailInput({ state, handleValue }: EmailInputInterface) {
  const { value, isValid, errorMessage, hasFocused } = state;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleValue({
      type: "SET_VALUE",
      payload: { filed: "email", value: e.target.value },
    });
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { isValid, errorMessage } = validateField("email", e.target.value);
    handleValue({
      type: "SET_VALIDITY",
      payload: { field: "email", isValid, errorMessage },
    });
  };

  return (
    <div className='input-area email'>
      <label htmlFor='input_email'>이메일</label>
      <input
        type='email'
        id='input_email'
        className={hasFocused ? "" : "not-focused"}
        placeholder='이메일을 입력해 주세요'
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        data-valid={isValid}
        required
      />
      <span className='msg-error'>{errorMessage}</span>
    </div>
  );
}

export default EmailInput;
