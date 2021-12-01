import {Banier} from "../Banier";
import {useEffect} from "react";
import {Footer} from "../Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

export const ThanksNewProperty = () => {
  useEffect(() => {
    document.title = "Remericiement";
  });
  return <>
    <Banier currentPage={"Remerciement"} />
    <div className="container p-5 m-5">
      <h3 className="text-center text-center text-success">
        Votre bien a été enrigistrer, mercie pour votre confiance
        <FontAwesomeIcon className={"text-success"} icon={faCheck} />
      </h3>
    </div>
    <Footer />
  </>
}
