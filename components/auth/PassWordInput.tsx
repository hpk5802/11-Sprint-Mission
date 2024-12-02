import usePasswordVisibility from "@/hooks/usePassWordVisivility";
import validateField from "@/hooks/validateFied";
import { AuthFormAction, AuthInputState } from "@/types/authForm";
import { ChangeEvent, Dispatch, FocusEvent } from "react";
import useInputHandler from "../../hooks/useInputHandler";
import clsx from "clsx";

interface PasswordInputInterface {
  state: AuthInputState;
  handleValue: Dispatch<AuthFormAction>;
}

function PassWordInput({ state, handleValue }: PasswordInputInterface) {
  const { value, isValid, errorMessage, hasFocused } = state;
  const { handleChange, handleBlur } = useInputHandler({
    field: "password",
    handleValue,
  });
  const { inputType, toggleVisibility } = usePasswordVisibility();

  return (
    <div className='input-area password'>
      <label htmlFor='input_password'>비밀번호</label>
      <input
        type={inputType}
        id='input_password'
        className={clsx("pw", !hasFocused && "not-focused")}
        value={value}
        placeholder='비밀번호를 입력해주세요'
        onChange={handleChange}
        onBlur={handleBlur}
        data-valid={isValid}
        required
      />
      <span className='msg-error'>{errorMessage}</span>
      <button
        type='button'
        className='btn-toggle'
        title='비밀번호 노출 토글'
        onClick={toggleVisibility}
      >
        <span className='sr-only'>비밀번호 노출 토글</span>
      </button>
    </div>
  );
}

export default PassWordInput;
