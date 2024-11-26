import { useState } from "react";

function usePasswordVisibility() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const inputType = isVisible ? "text" : "password";

  return { inputType, toggleVisibility };
}

export default usePasswordVisibility;
