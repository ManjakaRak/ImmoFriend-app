import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Banier } from "./Banier";
import { Footer } from './Footer';
import { NewPropertyForm } from "./NewPropertyForm";

export function AddPropertyForClient({ handleSetTitle }) {
  const [client, setClient] = useState({});
  const navigate = useNavigate();


  const getTokenFromUrl = (pathname) => {
    // take the token from url
    const array = pathname.split('/');
    return array[array.length-1];
  }


  const checkIfUserHaveAccess = () => {
    // check if token is valid on page loading
    const token = window.localStorage.getItem('Authorization');
    token !== getTokenFromUrl(window.location.pathname) ? navigate("*") : null
  }

  const fetchClientData = () => {
    const clientFromLocalStorage = window.localStorage.getItem('Client-Data');
    return JSON.parse(clientFromLocalStorage);
  }
  useEffect(() => {
    checkIfUserHaveAccess();
    setClient(fetchClientData());
    handleSetTitle('Ajout de bien');

    return () => {
      setClient({});
    };
  }, []);
  return <>
    <Banier currentPage="add-property" />
    <div className="info mt-5 text-center">
      <h1 className="text-success">Tout s'est bien passé!</h1>
      <p>
        Maintenant il ne vous reste plus qu'à spécifié les details à propos de votre propriété puis l'enregistrer.
      </p>
    </div>
    <div className="container-sm">
      <div className="form-container m-5">
        <NewPropertyForm clientData={client} />
      </div>
    </div>
    <Footer />
  </>
}