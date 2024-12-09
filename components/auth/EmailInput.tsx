import { UseFormRegisterReturn } from "react-hook-form";

interface EmailInputInterface {
  register: UseFormRegisterReturn;
  errorMessage?: string;
}

function EmailInput({ register, errorMessage }: EmailInputInterface) {
  return (
    <div className='input-area email'>
      <label htmlFor='input_email'>이메일</label>
      <input
        type='email'
        id='input_email'
        placeholder='이메일을 입력해 주세요'
        {...register}
      />
      {errorMessage && <span className='msg-error'>{errorMessage}</span>}
    </div>
  );
}

export default EmailInput;
