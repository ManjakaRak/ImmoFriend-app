import { useEffect } from "react";
import { Banier } from "./Banier";
import { Footer } from './Footer';
import { NewPropertyForm } from "./NewPropertyForm";

export function AddPropertyForClient({ handleSetTitle }) {
  useEffect(() => {
    handleSetTitle('Ajout de bien');
  });
  return <>
    <Banier currentPage="add-property" />
    <div className="info mt-5 text-center">
      <h1 className="text-success">La première étape s'est bien passé!</h1>
      <p>
        Maintenant il ne vous reste plus qu'à spécifié les details à propos de votre propriété.
      </p>
    </div>
    <div className="container-sm">
      <div className="form-container m-5">
        <NewPropertyForm />
      </div>
    </div>
    <Footer />
  </>
}