import React from 'react';
import { useParams } from 'react-router-dom';

const SinglePage = () => {
  const aboutData = [
    {
      slug: 'about-app',
      title: 'About the App',
      description:
        'Project for English class',
    },
    {
      slug: 'about-author',
      title: 'About the Author',
      description:
        'From Anwar, Valera, Misha and Dasha',
    },
  ];

  const { slug } = useParams();
  const aboutContent = aboutData.find((item) => item.slug === slug);
  const { title, description } = aboutContent;
  return (
    <div className="main__content">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};
export default SinglePage;
