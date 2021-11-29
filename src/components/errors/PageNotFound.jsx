import {Banier} from "../Banier";
import {Container} from "react-bootstrap";
import {Footer} from "../Footer";
import {NavbarApp} from "../NavBarApp";

export function PageNotFound() {
  return <>
    <NavbarApp currentPage={""} isPropertyDetail={true}/>
    <Container className={"bg-dark"} style={{minHeight:"88.7vh", minWidth:"100vw", display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <h1 className="p-4 display-4 text-white-50 text-center">Error 404: Page Not Found</h1>
    </Container>
  </>
}
