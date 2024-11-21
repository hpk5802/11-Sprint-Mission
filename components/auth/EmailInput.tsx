import validateField from "@/hooks/validateFied";
import { AuthFormAction, AuthInputState } from "@/types/authForm";
import { ChangeEvent, Dispatch, FocusEvent } from "react";
import useInputHandler from "../../hooks/useInputHandler";

interface EmailInputInterface {
  state: AuthInputState;
  handleValue: Dispatch<AuthFormAction>;
}

function EmailInput({ state, handleValue }: EmailInputInterface) {
  const { value, isValid, errorMessage, hasFocused } = state;
  const { handleChange, handleBlur } = useInputHandler({
    field: "email",
    handleValue,
  });
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
