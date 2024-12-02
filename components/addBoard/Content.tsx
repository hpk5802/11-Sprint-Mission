import { FormInputInterface } from "@/types/addBoard";
import { PropsWithChildren, ReactNode } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface ContentProps {
  name: keyof FormInputInterface;
  register: UseFormRegister<FieldValues>;
  required: boolean;
  children: ReactNode;
}

function Content({
  name,
  register,
  required,
  children,
}: PropsWithChildren<ContentProps>) {
  return (
    <div className='form-input-wrap'>
      <label>{children}</label>
      <textarea
        {...register(name, { required })}
        placeholder='내용을 입력해주세요.'
      />
    </div>
  );
}

export default Content;
