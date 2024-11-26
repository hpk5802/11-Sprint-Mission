import validateField from "@/hooks/validateFied";
import { AuthFormAction, FiledType } from "@/types/authForm";
import { ChangeEvent, Dispatch, FocusEvent, useCallback } from "react";

interface UseInputProps {
  field: FiledType;
  handleValue: Dispatch<AuthFormAction>;
  data?: Record<string, string>;
}

function useInputHandler({ field, handleValue, data }: UseInputProps) {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      handleValue({
        type: "SET_VALUE",
        payload: { filed: field, value: e.target.value },
      });
    },
    [handleValue, field]
  );

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      const { isValid, errorMessage } = validateField(
        field,
        e.target.value,
        data
      );
      handleValue({
        type: "SET_VALIDITY",
        payload: { field: field, isValid, errorMessage },
      });
    },
    [handleValue, field, data]
  );
  return { handleChange, handleBlur };
}

export default useInputHandler;
