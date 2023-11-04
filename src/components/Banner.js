import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const pdf = "https://storage.googleapis.com/repository-exercises.appspot.com/bookpdf/Geometr%C3%ADa%20-%20El%20postulante.pdf";
function Banner() {
  const [positionX, setPositionX] = useState(window.innerWidth);

  // Actualiza la posición X del banner
  useEffect(() => {
    const updatePosition = () => {
      if (positionX <= -200) {
        setPositionX(window.innerWidth-400);
      } else {
        setPositionX(positionX - 2); // Ajusta la velocidad del movimiento
      }
    };

    const interval = setInterval(updatePosition, 100);

    return () => {
      clearInterval(interval);
    };
  }, [positionX]);

  const bannerStyle = {
    width: '600px',
    height: '50px',
    backgroundColor: 'transparent',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    
    left: '0',
    transform: `translateX(${positionX}px)`,
    fontSize: '18px',
  };

  return (
    
    <div style={bannerStyle}>
        
        <span style={{
            color: 'white',
            fontSize: '30px',
            letterSpacing: '4px',
            wordWrap: 'break-word',
            fontFamily: 'Courier',  
            fontWeight: 'bold'
        }}
        >
            Bienvenido a Soykachimbo 
        </span>
        
    </div>
    
  );
}

export default Banner;
