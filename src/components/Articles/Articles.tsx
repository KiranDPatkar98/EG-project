import React, { useEffect, useState } from 'react';
import './articles.css';
import Loading from '../Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { receivedArticles } from '../../redux/articleSlice';
import { ReduxType } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type Articles = {
  id: number;
  title: string;
  summary: string;
};

const ArticlesComponent  = () => {
  const { articles } = useSelector((a: ReduxType) => a.articles);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage,setErrorMessage]=useState<string>('')
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchArticles = async () => {
    setErrorMessage('')
    try {
      const response = await axios.get('https://ps-dev-1-partnergateway.patientsky.dev/assignment/articles');
        dispatch(receivedArticles(response?.data)); 
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
    fetchArticles();
  },[]);


  return (
    <div className="articles-container">
      {isLoading && <Loading />}
      {errorMessage && articles.length ===0 &&  <h1>{errorMessage}</h1>}
      <div className="articles">
        {articles.length > 0 &&
          articles?.map((val: Articles) => (
            <div
              className="article"
              key={val.id}
              onClick={() => navigate(`/article/${val.id}`)}
            >
              <div className="title">{val.title}</div>
              <div className="summary">{val.summary}</div>
              <div className="overlay"> 
              <div className="overlay-text">Click for more</div> 
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ArticlesComponent ;
