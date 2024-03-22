import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import './article.css';

type Article = {
  id: number;
  title: string;
  summary: string;
  fullText: string;
};

const Article = () => {
  const { id } = useParams();
  const [details, setDetails] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const fetchArticleDetails = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://ps-dev-1-partnergateway.patientsky.dev/assignment/articles/${id}`
      );
      const article = await response.json();
      setDetails(article);
    } catch (error) {
      console.error('Error fetching article details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticleDetails();
  }, [id]);

  return (
    <div className="article-page">
      {isLoading && <Loading />}
      <button className="go-back-button" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <div className="article-container">
        {details && (
          <div className="article-details">
            <h1 className="article-title">{details.title}</h1>
            <p className="article-summary">{details.summary}</p>
            <p className="article-full-text">{details.fullText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Article;
