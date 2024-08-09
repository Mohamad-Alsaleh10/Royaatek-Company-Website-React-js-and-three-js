import React, { useEffect, useState } from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import axios from "axios";
import { useLanguage } from "../MultiLanguge/LanguageProvider";

const ProjectCard = ({ project }) => {
  const { language } = useLanguage();
  const [title , setTitle] = useState('');
useEffect(() => {
console.log(project);

if(language == 'en'){
  setTitle(project.title_en);
}
else{
  setTitle(project.title_ar);
 
}
console.log(title);

}, [language , title])
  return (
    <motion.div >
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full'
      >
        <div className='relative w-full h-[230px]'>
          <img
            src={`https://www.royaatek.com/storage/${project.image}`}
            alt='project_image'
            className='w-full h-full object-cover rounded-2xl'
          />


        </div>

        <div className='mt-5'>
        <h3 className='text-white font-bold text-[24px]'>{language && language === "en" ? project.title_en : project.title_ar}</h3>
        <p className='mt-2 text-secondary text-[14px]'>{language && language === "ar" ? project.subtitle_ar : project.subtitle_en}</p>
        </div>


      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const { language } = useLanguage();
  const [projects2, setProjects2] = useState(null);
  useEffect(() => {

    const fetchData = async () => {

      try {
        const response = await axios.get("https://www.royaatek.com/api/products");
        setProjects2(response.data.data);
        console.log(projects2);
      } catch (error) {
        console.error("Failed to projects about data:", error);

      }
    }
    fetchData();
  }, [language]);

  if(!projects2){
    return <div>loading ..</div>
  }
  return (
    <>
      <div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `} id="projects">{language === 'en' ? "Our Projects " : " مشاريعنا"}
        </p>
        <h2 className={`${styles.sectionHeadText}`}>

        {language === 'en' ? "Visit Our Latest Projects And Our Innovative Works " : " قم بالإطلاع على اخر مشاريعنا"}
        </h2>
      </div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >


          {language ==='en' ? "Following projects showcases my skills and experience through real-world examples of my work. Each project is briefly described with links to code repositories and live demos in it. It reflects my ability to solve complex problems, work with different technologies, and manage projects effectively. " : " تُظهِر المشاريع التالية مهاراتي وخبرتي من خلال أمثلة واقعية من عملي. يتم وصف كل مشروع بإيجاز مع روابط لمستودعات التعليمات البرمجية والعروض التوضيحية الحية فيه. ويعكس ذلك قدرتي على حل المشكلات المعقدة والعمل باستخدام تقنيات مختلفة وإدارة المشاريع بفعالية."}
        </motion.p>
      </div>

      <div className='mt-20 flex flex-wrap gap-7'>
        {projects2.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} project={project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");
