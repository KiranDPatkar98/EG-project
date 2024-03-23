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

const ArticleComponent = () => {
  const { id } = useParams();
  const [details, setDetails] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage,setErrorMessage]=useState<string>('')
  const navigate = useNavigate();

  const fetchArticleDetails = async () => {
    setErrorMessage('')
    try {
      const response = await fetch(
        `https://ps-dev-1-partnergateway.patientsky.dev/assignment/articles/${id}`
      );
      const data = await response.json();
      if(data.code===500){
        setErrorMessage(data?.message)
        setDetails(null)
      }else{
      setDetails(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error?.message)
      }
      setErrorMessage('Something went wrong ')
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticleDetails();
  }, [id]);

  if(isLoading){
    return <Loading />
  }

  return (
    <div className="article-page">
      
      <button className="go-back-button" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <div className="article-container">
        {errorMessage && <h1> {errorMessage}</h1>}
        {!errorMessage && details && (
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

export default ArticleComponent;
