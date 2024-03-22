import React, { useEffect, useState } from 'react';
import './articles.css';
import Loading from '../Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { receivedArticles } from '../../redux/articleSlice';
import { ReduxType } from '../../redux/store';

type Articles = {
  id: number;
  title: string;
  summary: string;
};

const Articles = () => {
  const { articles } = useSelector((a: ReduxType) => a.articles);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        'https://ps-dev-1-partnergateway.patientsky.dev/assignment/articles'
      );
      const articles = await res.json();
      dispatch(receivedArticles(articles));
      //   setArticles(articles);
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
          articles?.map((val: Articles) => (
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
