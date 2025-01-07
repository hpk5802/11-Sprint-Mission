import { UseFormRegisterReturn } from "react-hook-form";

interface PasswordInputInterface {
  register: UseFormRegisterReturn;
  errorMessage?: string;
}

function NickNameInput({ register, errorMessage }: PasswordInputInterface) {
  return (
    <div className='input-area nickname'>
      <label htmlFor='input_name'>닉네임</label>
      <input
        type='text'
        id='input_name'
        placeholder='닉네임을 입력해 주세요'
        {...register}
      />
      {errorMessage && <span className='msg-error'>{errorMessage}</span>}
    </div>
  );
}

export default NickNameInput;
