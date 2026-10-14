import { useEffect, useRef } from "react";
import { useFormikContext } from "formik";

const AutoSubmit = ({ delay = 500 }) => {
  const { values, submitForm } = useFormikContext();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
      submitForm();
    }, delay);

    return () => clearTimeout(timer);
  }, [values, delay, submitForm]);

  return null;
};

export default AutoSubmit;