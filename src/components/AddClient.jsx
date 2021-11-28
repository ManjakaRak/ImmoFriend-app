import { useEffect } from "react";
import { Banier } from "./Banier";
import { Footer } from './Footer';
// import '../css/PropertyContactForm.css';
import { PropertyContactForm } from "./PropertyContactForm";

export function AddClient({ handleSetTitle }) {
  useEffect(() => {
    handleSetTitle('Ajout de bien')
  });
  return <>
    <Banier currentPage="add-property" />
    <div className="row p-5 m-0">
      <div className="col-sm form-container m-5">
        <PropertyContactForm context='add-property' />
      </div>
      <div className="m-5 col info text-center">
        <h1 className="text-warning">Bienvenue dans la section d'ajoute de propriétée</h1>
        <p>
          Cette section vous permettra de d'ajouter un bien, qui sera en suite exposé dans par notre site pour qu'elle soit mise sur le <em>marché</em>.
        </p>
        <h2 className="text-warning">Comment procéder?</h2>
        <p>
          La procedure est simple. Pour enregistrer une propriétée vous devez d'abord <b>completer</b> le formulaire puis entrera dans la 2<sup>eme</sup> étape.
        </p>
      </div>
    </div>
    <Footer />
  </>
}