import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import './article.css';
import axios from 'axios';

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
      const response = await axios.get(
        `https://ps-dev-1-partnergateway.patientsky.dev/assignment/articles/${id}`
      );
        setDetails(response?.data)
    } catch (error ) {
      if (axios.isAxiosError(error)){
        setErrorMessage(error.response?.data.message)
      }else{
        setErrorMessage('Something went wrong ')
      }
      
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
      
      <button className="go-back-button" onClick={() => navigate('/articles')}>
        Go Back
      </button>
      <div className="article-container">
        {errorMessage && !details && <h1> {errorMessage}</h1>}
        { details && (
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
