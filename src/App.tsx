import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import './App.css';
import store from './redux/store';
import { Provider } from 'react-redux';
import Layout from './Layout';
import ArticlesComponent from './components/Articles/Articles';
import ArticleComponent from './components/Article/Article';


function AppRouter() {
  return (
    <Layout>
      <Routes>
        <Route path="/articles" element={<ArticlesComponent  />} />
        <Route path="/article/:id" element={<ArticleComponent />} />
        <Route path="/" element={<Navigate replace to="/articles" />} />
        <Route path="*" element={<Navigate replace to="/articles" />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
         <AppRouter /> 
        </Router>
      </Provider>
    </div>
  );
}

export default App;
