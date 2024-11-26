import Content from "@/components/addBoard/Content";
import ImgFileInput from "@/components/addBoard/ImgFileInput";
import TitleInput from "@/components/addBoard/TitleInput";
import Header from "@/components/common/Header";
import PrimaryButton from "@/components/common/PrimaryButton";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { postArticle } from "../api/articleApi";
import { useRouter } from "next/router";

const DEFAULT_VALUE = {
  title: "",
  description: "",
  image: null,
};

function AddBoard() {
  const router = useRouter();
  const { register, handleSubmit, watch, setValue, getValues } =
    useForm<FieldValues>({
      mode: "onChange",
      defaultValues: DEFAULT_VALUE,
    });
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { title, content, image } = data;
    const path = image || null;

    const resId = await postArticle({ title, content, image: path });
    router.push(`/boards/${resId}`);
  };
  return (
    <>
      <Header isLogin />
      <div className='form-wrap'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='title-wrap'>
            <h2>게시글 쓰기</h2>
            <PrimaryButton type='submit' name='btn-add'>
              등록
            </PrimaryButton>
          </div>
          <TitleInput name='title' register={register} required>
            *제목
          </TitleInput>
          <Content name='content' register={register} required>
            *내용
          </Content>
          <ImgFileInput
            name='image'
            register={register}
            watch={watch}
            setValue={setValue}
          >
            이미지
          </ImgFileInput>
        </form>
      </div>
    </>
  );
}

export default AddBoard;
