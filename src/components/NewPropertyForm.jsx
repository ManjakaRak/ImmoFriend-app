import { useEffect, useState } from "react";
import '../css/NewPropertyForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export function NewPropertyForm({ clientData }) {

  // animation label
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


  const [values, setvalues] = useState({});
  const [hasError, sethaserror] = useState(false);
  const [errors, seterrors] = useState({});

  /**
   * 
   * @param {event} event 
   */
  const handleValue = (event) => {
    let value = event.target.value;
    const name = event.target.name;

    // remove fakepath
    // name === 'image' ? value = event.target.files[0] : null
    // handle the changes to the values obj
    handleError(event, name, value);

    // handle change
    setvalues({
      ...values,
      [name]: value
    });
  }
  const handleImage = (event) => {
    let name = event.target.name;
    let value = event.target.files[0];

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
          error = 'Le nom est trop court'
        }
        break;
      case 'price':
        parseInt(value) < 1000 || value === ''  ? error = 'Le prix est beaucoup trop bas' : null;
        break;
      case 'surface':
        parseInt(value) < 10 || parseInt(value) > 500 || value === '' ? error = 'La surface doit être comprise entre 10 et 500' : null;
        break;
      case 'room':
        values.floor !== undefined && parseInt(value) || value === '' < parseInt(values.floor) ?
          error = 'Le nombre de chambre doit etre superieur ou egal à celle du d\'etage' : null
          parseInt(value) === 0 ? error = 'Le nombre doit etre superieur a 0' : null;
        break;
      case 'floor':
        values.room !== undefined && parseInt(value) > parseInt(values.room) ?
          error = 'Le nombre de chambre doit etre superieur ou egal à celle du d\'etage' : null;
        parseInt(value) === 0 ? error = 'Le nombre doit etre superieur a 0' : null;
        break;
      case 'constructionDate':
        let fdate = new Date(value);
        let now = new Date();
        fdate > now ? error = 'Verifiez la date de construction': null
        break;
      case 'image':
        value === null ? error = "Ajoutez une photo" : null
        break;
      default:
        break;
    }
    seterrors({
      ...errors,
      [name]: error
    });
  }

  // SEND DATA
  /**
   * 
   * @param {event} e 
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(clientData)
    // check if error is empty and values arn't empty
    if (Object.values(errors).every(e => e === '') && Object.values(values).length === 8) {

      // image and file only can be send in formData NOT in object
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('price', values.price);
      formData.append('surface', values.surface);
      formData.append('room', values.room);
      formData.append('floor', values.floor);
      formData.append('localisation', values.localisation);
      formData.append('constructionDate', values.constructionDate);
      formData.append('image', values.image);
      formData.append('client', JSON.stringify(clientData));
      
      try {
        const response = await axios({
          url: 'http://localhost:5000/property/add-property',
          headers: {
            'Content-Type': 'application/json'
          },
          data: formData,
          method: 'POST'
        });
        // console.log(response)
      } catch (error) {
        console.log(error)
      }
      // console.log(formData);
    } else {
      // dont submit
      sethaserror(true);
      console.log('smth wrong');
    }
  }

  useEffect(() => {
    const fields = document.querySelectorAll('input');
    const textarea = document.querySelectorAll('textarea');
    animeLabel(fields);
    animeLabel(textarea);
  });
  return <div className="my-form">
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="row">
        <div className="col-md field-container">
          <label className="label" htmlFor="name">* Nom du bien</label>
          <input onChange={handleValue} name="name" id="name" type="text" />
          {errors.name !== '' ? <small className="text-danger">{ errors.name }</small> : null}
          {hasError && errors.name === undefined ? <small className="text-danger">Ce champ est vide</small> : null}
        </div>
        <div className="col-md field-container">
          <label className="label" htmlFor="email">* Votre prix fixe</label>
          <input onChange={handleValue} name="price" id="price" type="number" />
          {errors.price !== '' && hasError ? <small className="text-danger">{errors.price}</small> : null}
          {hasError && errors.price === undefined ? <small className="text-danger">Veuillez mettre votre prix</small> : null}
        </div>

      </div>
      <div className="row">
        <div className="col-md field-container">
          <label className="label" htmlFor="surface">* Surface</label>
          <input onChange={handleValue} name="surface" id="surface" type="number" />
          {errors.surface !== '' && hasError ? <small className="text-danger">{errors.surface}</small> : null}
          {hasError && errors.surface === undefined ? <small className="text-danger">La surface du terrain est obligatoire</small> : null}
        </div>

        <div className="col-lg field-container">
          <label className="label" htmlFor="room">* Chambre</label>
          <input onChange={handleValue} type="number" name="room" id="room" />
          {errors.room !== '' && hasError ? <small className="text-danger">{errors.room}</small> : null}
          {hasError && errors.room === undefined ? <small className="text-danger">Vous devez specifié le nombre de chambre</small> : null}
        </div>

        <div className="col-lg field-container">
          <label className="label" htmlFor="floor">* Etage</label>
          <input onChange={handleValue} type="number" name="floor" id="floor" />
          {errors.floor !== '' && hasError ? <small className="text-danger">{errors.floor}</small> : null}
          {hasError && errors.floor === undefined ? <small className="text-danger">Le prix ne doit pas etre vide</small> : null}
        </div>
      </div>

      <div className="row">
        <div className="col-md field-container">
          <label className="label" htmlFor="localisation">* Localisation</label>
          <input onChange={handleValue} name="localisation" id="localisation" type="text" />
          {hasError && errors.localisation === undefined ? <small className="text-danger">Emplacement?</small> : null}
        </div>

        <div className="col-md field-container">
          <label style={{opacity: 0}} className="label">* Date de Construction</label>
          <input style={{color: 'gray'}} onChange={handleValue} type="date" name="constructionDate" id="construction-date" />
          {errors.constructionDate !== '' && hasError ? <small className="text-danger">{errors.constructionDate}</small> : null}
          {hasError && errors.constructionDate === undefined ? <small className="text-danger">Veuillez mentionner la date de construction</small> : null}
        </div>
      </div>

      <div>
        <div className="field-container">
          <div className="image-container">
            <label style={{ opacity: 0 }} className="label" htmlFor=""></label>
            <input accept=".png, .jpeg, .jpg" onChange={handleImage} type="file" name="image" id="image" />

            <button id="image-clone" className="btn btn-success">Image <FontAwesomeIcon icon={faImage} /></button>
          </div>
        </div>
        {hasError && errors.image === undefined ? <small className="text-danger">Vous de devez choisir au moin une image</small> : null}
        {values.image !== undefined ? <small>{values.image.name}</small> : null}
      </div>
      <div className="text-center submit-btn">
        <button style={{maxWidth: '250px', borderRadius:'20px'}} type="submit" className="btn btn-info">Enregister le bien</button>
      </div>
    </form>
  </div>
}