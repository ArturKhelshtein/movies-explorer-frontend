import React, { useCallback } from 'react';

export default function useForm(inputValues = {}) {
  const [values, setValues] = React.useState(inputValues);

  const handleChange = useCallback(
    (event) => {
      const { value, name } = event.target;
      setValues({ ...values, [name]: value });
    },
    [values]
  );
  return { values, handleChange, setValues };
}
