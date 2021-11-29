import {useEffect, useState} from "react";
import {Banier} from "./Banier";
import {Footer} from './Footer';
import '../css/CheckKey.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

export function FetchSecretId(props) {
  const [secretKey, setSecretKey] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setSecretKey({
      ...secretKey,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios ({
        url: 'http://localhost:5000/property/verify-secret-key',
        data: secretKey,
        method: 'POST'
      });
      if (response.data.verified) {
        // use a new token from server and pass it on next page
        window.sessionStorage.setItem('Authorization', response.data.token);
        /**
         * send USER DATA on sessionStorage and get it on adding property page
         * we use JSON.strigify coz sessionStorage store string not obj */
        window.sessionStorage.setItem('Client-Data', JSON.stringify(response.data.clientData));
        // redirect to add-property and verify the token above on load
        navigate(`/add-property/${response.data.token}`);
      } else {
        setError('Erreur: la clé ne correspond pas')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getTokenFromUrl = (pathname) => {
    // take the token from url
    const array = pathname.split('/');
    return array[array.length-1];
  }
  const checkIfUserHaveAccess = () => {
    // check if token is valid on page loading
    const token = window.sessionStorage.getItem('Authorization');
    token !== getTokenFromUrl(window.location.pathname) ? navigate("*") : null
  }

  useEffect(() => {
    checkIfUserHaveAccess();
    props.handleSetTitle('Ajout de bien');
  }, []);
  return <>
    <Banier currentPage="add-property" />
    <div className="row p-5 m-0">
      <div className="col p-5">
        <form className="check-key-form" onSubmit={handleSubmit}>
          <div>
            <h4 className="text-center text-secondary">Clé secrète</h4>
            <input style={{backgroudColor: 'red'}} placeholder="********"className="mb-4" onChange={handleChange} required style={{ fontSize: '30px', textAlign: 'center' }} name="secretKey" id="secretKey" />
            {error !== '' ? <small style={{display: 'block'}} className="mb-4 text-center text-danger">{ error }</small> : null}
          </div>
          <button type="submit" className="btn btn-success">Verifier</button>
        </form>
      </div>
      <div className="col info p-5">
        <div className="text-center">
          <h1 className="text-warning">Etape 2</h1>
          <p className="text-secondary">
            Vous allez recevoir un identifiant via votre addresse mail. Pour continuer vous devez entrer l'identifiant qui vous a été envoyer.
          </p>
        </div>
      </div>
    </div>
    <Footer />
  </>
}
