import { FormInputInterface } from "@/types/addBoard";
import { PropsWithChildren, ReactNode } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface TitleInputProps {
  name: keyof FormInputInterface;
  register: UseFormRegister<FieldValues>;
  required: boolean;
  children: ReactNode;
}

function TitleInput({
  name,
  register,
  required,
  children,
}: PropsWithChildren<TitleInputProps>) {
  return (
    <div className='form-input-wrap'>
      <label>{children}</label>
      <input
        {...register(name, { required })}
        placeholder='제목을 입력해주세요.'
      />
    </div>
  );
}

export default TitleInput;
