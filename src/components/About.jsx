import React, { useEffect , useState } from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { useLanguage } from "../MultiLanguge/LanguageProvider";
import axios from "axios";
import translations from "../MultiLanguge/translations";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className='xs:w-[250px] w-full'>
    <div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <img
          src={`https://www.royaatek.com/storage/${icon}`}
          alt='web-development'
          className='w-16 h-16 object-contain'
        />

        <h3 className='text-white text-[20px] font-bold text-center'>
          {title}
        </h3>
      </div>
    </div>
  </Tilt>
);

const About = () => {
  const { language } = useLanguage(); // Use the useLanguage hook
  const [data, setData] = useState(null); // State to hold the fetched data
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [categories, setCategories] = useState([]); // State to hold the fetched categories

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://www.royaatek.com/api/about`);
        const aboutData = response.data.data[0]; // Assuming you only need the first item
         console.log(aboutData);
        const title = language === "ar" ? aboutData.title_ar : aboutData.title_en;
        const description = language === "ar" ? aboutData.description_ar : aboutData.description_en;

        // Update the state with the localized data
        setData({ title, description, image: aboutData.image, location: language === "ar" ? aboutData.location_ar : aboutData.location_en });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [language]); // Re-fetch data if the language changes
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://www.royaatek.com/api/categories`);
        const categoriesData = response.data.data; // Fetching all categories
        // Transform the data to match the expected props for ServiceCard
        const transformedCategories = categoriesData.map(category => ({
          title: language === "ar" ? category.name_ar : category.name_en,
          icon: category.image, // Assuming the image URL can be used as an icon
          // Add other necessary properties here
        }));
        setCategories(transformedCategories);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [language]); // 
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
  <div variants={textVariant()}>
        <p className={styles.sectionSubText}> {translations[language].AboutUS}</p>
        <h2 className={styles.sectionHeadText}>{data.title}</h2>
      </div>

      <p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
{data.description}      </p>

<div className='mt-20 flex flex-wrap gap-10'>
        {categories.map((category, index) => (
          <ServiceCard key={category.title} index={index} {...category} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");