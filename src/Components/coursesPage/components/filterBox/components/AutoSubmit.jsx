import { useEffect, useRef } from "react";
import { useFormikContext } from "formik";
import { useDebounce } from "use-debounce";

const AutoSubmit = ({ delay = 500 }) => {
  const { values, submitForm } = useFormikContext();
  const [debouncedValues] = useDebounce(values, delay);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    submitForm();
  }, [debouncedValues, submitForm]);

  return null;
};

export default AutoSubmit;