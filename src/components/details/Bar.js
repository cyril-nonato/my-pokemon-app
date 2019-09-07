import React from 'react';

const Bar = ({num}) => {

  let name = null

  switch(true) {
    case ++num < 60:
      name = 'Details__bar--low';
      break;
    case ++num > 60 && ++num < 140:
      name = 'Details__bar--medium';
      break;
    default:
      name = 'Details__bar--high';
      break;
  }

  const style = {
    'width': `${++num * .1}rem`
  }

  return ( 
    <span className={name} style={style}></span>
   );
}
 
export default Bar;