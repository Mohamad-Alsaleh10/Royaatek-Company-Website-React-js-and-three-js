import { motion } from "framer-motion";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import translations from "../MultiLanguge/translations";
import { useLanguage } from "../MultiLanguge/LanguageProvider";
import logo from '../assets/logo1.png';
const Hero = () => {
  const { language } = useLanguage();

  return (
    <section className={`relative w-full h-screen mx-auto`} id="home">
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#f6892a]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            {translations[language].Welcometo} <span className='text-[#f6892a]'>RoyaaTek</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
          {translations[language].Elevate}
          </p>
        </div>

      </div>
      <img src={logo} alt="" className="hero-logo"/>

      {/* <ComputersCanvas /> */}


      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
