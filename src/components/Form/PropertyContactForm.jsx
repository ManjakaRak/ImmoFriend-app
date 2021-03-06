import {useEffect, useState} from 'react';
import '../../css/PropertyContactForm.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useForm} from "./useForm";
import {Alert} from "react-bootstrap";

export function PropertyContactForm({ context, property }) {
  const [values, setvalues] = useState({});
  const [errors, seterrors] = useState({});
  const [hasError, sethaserror] = useState(false);
  const navigate = useNavigate();
  const [showNotif, setShowNotif] = useState(true);

  /**
   * animate label on form
   * @param elements
   */
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

  /**
   *
   * @param {event} event
   */
  const handleValue = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    // handle the changes to the values obj
    handleError(event, name, value);

    // handle change
    setvalues({
      ...values,
      [name]: value
    });

  }

  /**
   *
   * @param {event} event for set style of element in error case
   * @param {string} name element name
   * @param {string} value element value
   */
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
          error = 'Vous avez laiss?? le numero vide';
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
    seterrors({
      ...errors,
      [name]: error
    });
  }

  /**
   *
   * @param {event} e
   */
  const handleSubmit = async e => {
    await e.preventDefault();
    // check if error is empty and values arn't empty
    if (!Object.keys(values).some(v => v === 'message')) {
      // if message is not defined or empty -> set ''
      values.message = '';
    }
    if (Object.values(errors).every(e => e === '') && Object.values(values).length === 4) {
      // the message field is not required
      // check the context
      switch (context) {
        // ADD-PROPERTY FROM CLIENT
        case 'add-property':
          try {
            const response = await axios({
              url: 'http://localhost:5000/property/add-client',
              data: values,
              method: 'POST'
            });
            if (response.data.dataIsValid) {
              await window.sessionStorage.setItem('Authorization', response.data.token);
              // if client data is valid => redirect
              await navigate(`/add-check-id/${response.data.token}`);
            }
          } catch (error) {
            /**
             * add an error from server
             */
            await seterrors({
              ...errors,
              ['fromServer']: error.response.data.msg
            });
          }
          break;

        // ADD-CONTACT FROM COSTUMER
        case 'contact':
          values.property = await property;
          // make a request
          try {
            const response = await axios({
              url: 'http://localhost:5000/contact',
              headers: {
                'Content-Type': 'application/json'
              },
              method: 'post',
              data: values
            });
            response.data.emailIsSend ? navigate('/thanks-new-customer') : null;
          } catch (e) {
            seterrors({
              ...errors,
              ['server']: e.response.data.errorMsg
            })
            // errors.server = e.response.data.errorMsg;
          }
          break;

        default:
          break;
      }
    } else {
      sethaserror(true);
    }
  }

  const closeNotification = () => {
    setShowNotif(false);
    console.log(showNotif)
  }

  useEffect(() => {
    const fields = document.querySelectorAll('input');
    const textarea = document.querySelectorAll('textarea');
    animeLabel(fields);
    animeLabel(textarea);
  }, []);
  return <div className="my-form">
    <form onSubmit={handleSubmit}>
      <div className="field-container">
        <label className="label" htmlFor="name">* Votre nom</label>
        <input onChange={handleValue} name="name" id="name" type="text" />
        {errors.name !== '' ? <small className="text-danger">{errors.name}</small> : null}
        {errors.name === undefined && hasError ? <small className="text-danger">Le nom ne doit pas ??tre vide</small> : null}
      </div>
      <div className="field-container">
        <label className="label" htmlFor="email">* Votre email</label>
        <input onChange={handleValue} name="email" id="email" type="email" />
        {errors.email === undefined && hasError ? <small className="text-danger">Vous devez sp??cifi?? une addresse mail</small> : null}
      </div>
      <div className="field-container">
        <label className="label" htmlFor="phone-number">* tel</label>
        <input onChange={handleValue} name="tel" id="phone-number" type="text" />
        {errors.tel !== '' ? <small className="text-danger">{errors.tel}</small> : null}
        {errors.tel === undefined && hasError ? <small className="text-danger">Un numero de est obligatoir</small> : null}

      </div>
      <div className="field-container">
        <label htmlFor="message" className="label">* Message</label>
        <textarea onChange={handleValue} name="message" id="message"></textarea>
      </div>
      {
        errors.fromServer &&
          <Alert show={showNotif} variant={'danger'}>
            <button onClick={closeNotification} className={"close"} type={"button"} data-dismiss={"alert"} aria-label={"Close"} >
              <span aria-hidden={"true"}>&times;</span>
            </button>
            L'email est introuvable
          </Alert>
      }
      <button type="submit" className="btn btn-info">Envoyer</button>
    </form>
  </div>
}
