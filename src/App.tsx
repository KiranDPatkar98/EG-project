import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import './App.css';
import Articles from './components/Articles/Articles';
import store from './redux/store';
import { Provider } from 'react-redux';
import Article from './components/Article/Article';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/articles" element={<Articles />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/" element={<Navigate replace to="/articles" />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
