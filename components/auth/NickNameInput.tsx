import validateField from "@/hooks/validateFied";
import { AuthFormAction, AuthInputState } from "@/types/authForm";
import { ChangeEvent, Dispatch, FocusEvent } from "react";

interface PasswordInputInterface {
  state: AuthInputState;
  handleValue: Dispatch<AuthFormAction>;
}

function NickNameInput({ state, handleValue }: PasswordInputInterface) {
  const { value, isValid, errorMessage, hasFocused } = state;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleValue({
      type: "SET_VALUE",
      payload: { filed: "nickname", value: e.target.value },
    });
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { isValid, errorMessage } = validateField("nickname", e.target.value);
    handleValue({
      type: "SET_VALIDITY",
      payload: { field: "nickname", isValid, errorMessage },
    });
  };
  return (
    <div className='input-area nickname'>
      <label htmlFor='input_name'>닉네임</label>
      <input
        type='text'
        id='input_name'
        className={hasFocused ? "" : "not-focused"}
        placeholder='닉네임을 입력해 주세요'
        value={value}
        data-valid={isValid}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />
      <span className='msg-error'>{errorMessage}</span>
    </div>
  );
}

export default NickNameInput;
