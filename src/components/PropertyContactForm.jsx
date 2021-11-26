import { useEffect, useState } from 'react';
import '../css/PropertyContactForm.css';
const animeLabel = function(elements) {
  elements.forEach(element => {
    element.addEventListener('focusin', () => {
      element.previousElementSibling.classList.remove('label');
      element.previousElementSibling.classList.add('top-label');
    });
    element.addEventListener('focusout', () => {
      if (element.value === '') {
        element.previousElementSibling.classList.remove('top-label');
        element.previousElementSibling.classList.add('label');
      }
    });
  });
}

export function PropertyContactForm() {
  const [values, setvalues] = useState({});
  const [hasError, sethaserror] = useState(false);
  const [errors, seterrors] = useState({});


  const handleValue = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    
    // handle the changes to the values obj
    handleError(event, name, value);

    setvalues({
      ...values,
      [name]: value
    });
    // VALIDATE HERE

  }

  const handleError = (event, name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        if (value.length < 4) {
          error = 'Le nom doit contenir au moin 4 lettres';
          event.target.setAttribute('style', 'border-color: red');
          event.target.previousElementSibling.setAttribute('style', 'color: red')
        } else {
          error = '';
          event.target.previousElementSibling.setAttribute('style', 'color: grey')
          event.target.setAttribute('style', 'border-color: silver')
        }
        break;
      default:
        break;
    }
    seterrors({
      ...errors,
      [name]: error
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(errors).every(e => e === '') && Object.values(values).length === 2) {
      console.log(values)
    } else {
      sethaserror(true);
    }
  }
  useEffect(() => {
    const fields = document.querySelectorAll('input');
    const textarea = document.querySelectorAll('textarea');
    animeLabel(fields);
    animeLabel(textarea);
  }, []);
  return <>
    <form onSubmit={handleSubmit}>
      <div className="field-container">
        <label className="label" htmlFor="name">* Votre nom</label>
        <input onChange={handleValue} name="name" id="name" type="text" />
        {errors.name !== '' ? <small className="text-danger">{errors.name}</small> : null}
        {errors.name === undefined && hasError ? <small className="text-danger">Le nom ne doit pas être vide</small> : null}
      </div>
      <div className="field-container">
        <label className="label" htmlFor="email">* Votre email</label>
        <input onChange={handleValue} name="email" id="email" type="email" />
        {errors.email === undefined && hasError ? <small className="text-danger">Vous devez spécifié une addresse mail</small> : null}
      </div>
      <div className="field-container">
        <label className="label" htmlFor="phone-number">* tel</label>
        <input name="phone_number" id="phone-number" type="text" />
        {errors.email === undefined && hasError ? <small className="text-danger">Un numero de est obligatoir</small> : null}
      </div>
      <div className="field-container">
        <label htmlFor="message" className="label">* Message</label>
        <textarea name="message" id="phone-number"></textarea>
      </div>
      <button type="submit" className="btn btn-info">Envoyer</button>
    </form>
  </>
}