import React, { useState, useEffect } from 'react';
import Axios from '../axios-instance';

const WithErrorHandler = (props) => {
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
      <div className="Error__card">
        <p className="Error_text">{error.message}</p>
      </div>
    </div>
  );
}
 
export default WithErrorHandler;