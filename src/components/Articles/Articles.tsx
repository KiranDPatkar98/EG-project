import React, { useEffect, useState } from 'react';
import './articles.css';
import Loading from '../Loading/Loading';

type Articles = {
  id: number;
  title: string;
  summary: string;
};

const Articles = () => {
  const [articles, setArticles] = useState<Articles[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        'https://ps-dev-1-partnergateway.patientsky.dev/assignment/articles'
      );
      const articles = await res.json();
      setArticles(articles);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="articles-container">
      {isLoading && <Loading />}
      <div className="articles">
        {articles.length > 0 &&
          articles?.map((val) => (
            <div className="article" key={val.id}>
              <div className="title">{val.title}</div>
              <div className="summary">{val.summary}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Articles;
