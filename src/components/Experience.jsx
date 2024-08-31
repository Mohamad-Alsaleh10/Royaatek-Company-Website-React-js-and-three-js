import React, { useEffect, useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
// import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import axios from "axios";
import { useLanguage } from "../MultiLanguge/LanguageProvider";
import translations from "../MultiLanguge/translations";

const ExperienceCard = ({ experience ,  language }) => {

  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      icon={
        <div className='flex justify-center items-center w-full h-full' style={{ background: "rgb(255, 255, 255)", borderRadius: "50%" }}>
          <img
            src={`https://www.royaatek.com/storage/${experience.image}`}
            alt={experience.title_en}
            className='w-[60%] h-[60%] object-contain'
          />
        </div>
      }
    >
      <div dir={language === "ar" ? "rtl" : "ltr"}>
        <h3 className='text-white text-[24px] font-bold' >{language === "ar" ? experience.title_ar : experience.title_en}</h3>

      </div>

      <ul className='mt-5 list-disc ml-5 space-y-2' dir={language === "ar" ? "rtl" : "ltr"}>
      {language === "ar" ? experience.description_ar : experience.description_en}

      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const { language } = useLanguage(); // Assuming this hook gives you the current language preference ("ar" or "en")

  const [experience, setExperience] = useState(null); // State to store fetched data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.royaatek.com/api/services');
        setExperience(response.data.data); // Assuming you only need the first item
      } catch (error) {
        console.error("Failed to fetch experience data:", error);
      }
    };

    fetchData();
  }, [experience]);

  if (!experience) {
    return <div>Loading...</div>; // Or any loading indicator
  }
  return (
    <div className="services">
      <div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`} id="services">
           {translations[language].OurServices}
        </p> 
        <h2 className={`${styles.sectionHeadText} text-center`}>
           {translations[language].WeFocused}
        </h2>
      </div>
      

      <div className='mt-20 flex flex-col'>
        <VerticalTimeline>
          {experience.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
              language={language}

            />
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default SectionWrapper(Experience, "work");
