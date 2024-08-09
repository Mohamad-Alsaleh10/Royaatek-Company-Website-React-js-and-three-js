import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios"; // Make sure to install axios if you haven't already: npm install axios

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { useLanguage } from "../MultiLanguge/LanguageProvider";
import translations from "../MultiLanguge/translations";

const FeedbackCard = ({
  index,
  testimonial,
  name,
  job, // Changed from 'designation' to 'job' to match the API response
  image,
}) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
    className='bg-black-200 p-10 rounded-3xl xs:w-[320px] w-full'
  >
    <p className='text-white font-black text-[48px]'>"</p>

    <div className='mt-1'>
      <p className='text-white tracking-wider text-[18px]'>{testimonial}</p>

      <div className='mt-7 flex justify-between items-center gap-1'>
        <div className='flex-1 flex flex-col'>
          <p className='text-white font-medium text-[16px]'>
            <span className='blue-text-gradient'>@</span> {name}
          </p>
          <p className='mt-1 text-secondary text-[12px]'>
            {job} 
          </p>
        </div>

        <img
          src={`https://www.royaatek.com/storage/${image}`} // Prepend the storage URL to the image path
          alt={`feedback_by-${name}`}
          className='w-10 h-10 rounded-full object-cover'
        />
      </div>
    </div>
  </motion.div>
);

const Feedbacks = () => {
  const { language } = useLanguage();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("https://www.royaatek.com/api/reviews");
        setReviews(response.data.data); // Assuming the reviews are directly under 'data' in the response
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    fetchReviews();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className={`mt-12 bg-black-100 rounded-[20px]`}>
      <div
        className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px]`}
      >
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>{translations[language].Whatotherssay}</p>
          <h2 className={styles.sectionHeadText}>{translations[language].Testimonials}</h2>
        </motion.div>
      </div>
      <div className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-7`}>
        {reviews.map((review, index) => (
          // Adjusted props to match the API response fields
          <FeedbackCard
            key={review.id}
            index={index}
            testimonial={review.review}
            name={review.name}
            job={review.job} // Changed from 'designation' to 'job'
            image={review.image}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");