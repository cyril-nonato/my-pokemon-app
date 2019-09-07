import React, {} from 'react';

const Backdrop = ({show, click}) => {
  return  show ? <div className="Backdrop" onClick={click}></div> : null;
}
 
export default Backdrop;