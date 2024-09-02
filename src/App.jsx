import { BrowserRouter } from "react-router-dom";

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";
import Footer from "./components/Footer";
import { useLanguage } from "./MultiLanguge/LanguageProvider";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";

const App = () => {
  const { language } = useLanguage();
  useEffect(() => {
       if(language === "ar"){
        document.body.style.direction="rtl";
       }
       else{
        document.body.style.direction="ltr";
       }
    }, [language])


    useEffect(() => {
      const fontFamily = language === 'ar' ? '"Al-Jazeera-Arabic-Bold", sans-serif' : '"Poppins", sans-serif';
      document.body.style.fontFamily = fontFamily;
    }, [language]);

  return (
    <BrowserRouter>
     <div className="fixed-item">
      <a href="https://wa.link/ct0i74">
        <FaWhatsapp/>
      </a>
     </div>
      <div className='relative z-0 bg-primary '  >
        <div className=' bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <Hero />
        </div>
        <About/>
        <Experience />
        <Tech />
        <Works />
        <Feedbacks />
        <div className='relative z-0'>
          <Contact />
          <StarsCanvas />
        </div>
      </div>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
