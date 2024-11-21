import usePasswordVisibility from "@/hooks/usePassWordVisivility";
import validateField from "@/hooks/validateFied";
import { AuthFormAction, AuthInputState } from "@/types/authForm";
import { ChangeEvent, Dispatch, FocusEvent } from "react";

interface PasswordInputInterface {
  state: AuthInputState;
  handleValue: Dispatch<AuthFormAction>;
}

function PassWordInput({ state, handleValue }: PasswordInputInterface) {
  const { value, isValid, errorMessage } = state;
  const { inputType, toggleVisibility } = usePasswordVisibility();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleValue({
      type: "SET_VALUE",
      payload: { filed: "password", value: e.target.value },
    });
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { isValid, errorMessage } = validateField("password", e.target.value);
    handleValue({
      type: "SET_VALIDITY",
      payload: { field: "password", isValid, errorMessage },
    });
  };
  return (
    <div className='input-area password'>
      <label htmlFor='input_password'>비밀번호</label>
      <input
        type={inputType}
        id='input_password'
        className='pw'
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
