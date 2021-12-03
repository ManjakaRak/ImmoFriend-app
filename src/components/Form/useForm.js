import {useState} from 'react';

export function useForm() {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({});

  const handleError = (event, name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        if (value.length < 2) {
          error = 'Le nom doit contenir au moin 4 lettres';
          event.target.setAttribute('style', 'border-color: red');
          event.target.previousElementSibling.setAttribute('style', 'color: red');
        } else {
          error = '';
          event.target.previousElementSibling.setAttribute('style', 'color: grey');
          event.target.setAttribute('style', 'border-color: silver');
        }
        break;
      case 'tel':
        if (value === '') {
          error = 'Vous avez laissé le numero vide';
          event.target.setAttribute('style', 'border-color: red');
          event.target.previousElementSibling.setAttribute('style', 'color: red');
        } else {
          error = '';
          event.target.previousElementSibling.setAttribute('style', 'color: grey');
          event.target.setAttribute('style', 'border-color: silver');
        }
        break;
      default:
        break;
    }
    setErrors({
      ...errors,
      [name]: error
    });
  }

  /**
   *
   * @param {event} event
   */
  const handleValue = (event) => {
    let value = event.target.value;
    const name = event.target.name;

    // handle the changes to the values obj
    handleError(event, name, value);

    // handle change
    setValues({
      ...values,
      [name]: value
    });
  }
  return [
    values, errors, handleValue
  ];
}


