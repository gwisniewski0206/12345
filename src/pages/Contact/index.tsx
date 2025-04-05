import { lazy } from "react";
import IntroContent from "../../content/IntroContent.json";
import MiddleBlockContent from "../../content/MiddleBlockContent.json";
import AboutContent from "../../content/AboutContent.json";
import MissionContent from "../../content/MissionContent.json";
import ProductContent from "../../content/ProductContent.json";
import ContactContent from "../../content/ContactContent.json";
import "./index.css"

const Contact = lazy(() => import("../../components/ContactForm"));
const MiddleBlock = lazy(() => import("../../components/MiddleBlock"));
const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));
const ContentBlock = lazy(() => import("../../components/ContentBlock"));
const PartnerSlider = lazy(() => import("../../components/PartnerSlider"))
const AppSlider = lazy(()=> import("../../components/AppSlider"))

const Home = () => {
  return (
    <Container className="page-content">
      <ScrollToTop />
     
      <Container className="page-content">
      <MiddleBlock
        title={MiddleBlockContent.title}
        content={MiddleBlockContent.text}
        button={MiddleBlockContent.button}
      />
    </Container>
   
      <Container className="page-content">
      
      <Contact
        title={ContactContent.title}
        content={ContactContent.text}
        id="contact"
      />
      </Container>
    </Container>
  );
};

export default Home;
