import React, { useState, useEffect } from 'react'

const AsyncComponent = (importComponent) => {

  const [ component, setComponent ] = useState({component: null});

  useEffect(() => {
    importComponent()
      .then(cmp => {
        setComponent({component: cmp.default});
      })
  }, [importComponent])

  return (props) => {

    const C = component;
    return C ? <C {...props} /> : null;
  }
}
 
export default AsyncComponent;