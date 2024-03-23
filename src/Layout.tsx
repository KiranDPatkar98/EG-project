import React from 'react';
import { useLocation } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

type Props = {
    children: React.ReactNode;
};

const Layout = (props: Props) => {
    const { children } = props;
    const location = useLocation();
    return (
        <div className="layout">
            <ErrorBoundary key={location.pathname}>
                <Header />
              <div className='content'>{children}</div>
              <Footer />
            </ErrorBoundary>
        </div>
    );
};

export default Layout;
