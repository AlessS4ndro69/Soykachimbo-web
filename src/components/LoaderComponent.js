import React, { useState } from "react";
import  HashLoader  from "react-spinners/HashLoader";
import Modal from "react-modal";

const Loader = (props) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const closeModal = () => {
        setModalIsOpen(false);
      };    
      return (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
            zIndex: 9999, // Para superponer sobre otros elementos
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'blue',
            }}
          >
            <HashLoader color={'blue'} loading={true} size={100} />
            <p>Cargando...</p>
          </div>
        </div>
      );
};

export default Loader;