import React, { useCallback } from 'react';
import { regexEmail } from '../utils/regexp'

export default function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const input = event.target;
    const value = input.value;
    const name = input.name;
    setValues({ ...values, [name]: value });
    if (input.name === 'email') {
      const test = regexEmail.test((value))
      console.log(test)
      if (!test) {
        setErrors({ ...errors, [name]: 'Ошибка при вводе данных' });
        setIsValid(false);
      } else {
        setErrors({ ...errors, [name]: input.validationMessage });
        setIsValid(input.closest('form').checkValidity());
      }

    } else {
      setErrors({ ...errors, [name]: input.validationMessage });
      setIsValid(input.closest('form').checkValidity());
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );
  return { values, handleChange, resetForm, errors, isValid };
}
