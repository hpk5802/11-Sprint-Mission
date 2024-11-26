import usePasswordVisibility from "@/hooks/usePassWordVisivility";
import validateField from "@/hooks/validateFied";
import { AuthFormAction, AuthInputState } from "@/types/authForm";
import { ChangeEvent, Dispatch, FocusEvent } from "react";
import useInputHandler from "../../hooks/useInputHandler";
import clsx from "clsx";

interface PasswordInputInterface {
  state: AuthInputState;
  password: string;
  handleValue: Dispatch<AuthFormAction>;
}

function PassWordInputConfirm({
  state,
  password,
  handleValue,
}: PasswordInputInterface) {
  const { value, isValid, errorMessage, hasFocused } = state;
  const { handleChange, handleBlur } = useInputHandler({
    field: "passwordConfirm",
    handleValue,
    data: { password },
  });
  const { inputType, toggleVisibility } = usePasswordVisibility();

  return (
    <div className='input-area password'>
      <label htmlFor='input_password_confirm'>비밀번호 확인</label>
      <input
        type={inputType}
        id='input_password_confirm'
        className={clsx("pw", !hasFocused && "not-focused")}
        placeholder='비밀번호를 다시 한 번 입력해주세요'
        value={value}
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

export default PassWordInputConfirm;
