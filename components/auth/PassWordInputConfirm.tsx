import usePasswordVisibility from "@/hooks/usePassWordVisivility";
import validateField from "@/hooks/validateFied";
import { AuthFormAction, AuthInputState } from "@/types/authForm";
import { ChangeEvent, Dispatch, FocusEvent } from "react";

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
  const { value, isValid, errorMessage } = state;
  const { inputType, toggleVisibility } = usePasswordVisibility();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleValue({
      type: "SET_VALUE",
      payload: { filed: "passwordConfirm", value: e.target.value },
    });
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { isValid, errorMessage } = validateField(
      "passwordConfirm",
      e.target.value,
      { password: password, confirmPassword: e.target.value }
    );
    handleValue({
      type: "SET_VALIDITY",
      payload: { field: "passwordConfirm", isValid, errorMessage },
    });
  };
  return (
    <div className='input-area password'>
      <label htmlFor='input_password_confirm'>비밀번호 확인</label>
      <input
        type={inputType}
        id='input_password_confirm'
        className='pw'
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
