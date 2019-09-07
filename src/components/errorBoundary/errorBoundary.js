import React, { useState, useEffect } from 'react';
import Axios from '../../axios-instance';

const ErrorBoundary = (props) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    Axios.interceptors.request.use(req => {
      setError(false);
      return req;
    });
    Axios.interceptors.response.use(res => res, error => setError(error))
  }, []);

  return !error ? props.children : (
    <div className="Error">
      <p className="Error__text">{error.message}</p>
    </div>
  );
}
 
export default ErrorBoundary;