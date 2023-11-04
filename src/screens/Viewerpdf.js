
import React, { useEffect, useState } from "react";

import  db  from "../config/firebase";
import { doc, getDocs, collection, query, where } from "firebase/firestore";
import Loader from "../components/LoaderComponent";
import Modal from "react-modal";
import CarrouselStatements from "./CarrouselStatements";
import { useParams} from "react-router-dom";
import { Link } from "react-router-dom";



const screenHeight = 800;
const screenWidth = 800;

const handleLinkPress = (url) => {
    console.log("presiono link");
    window.location.href = url
  };

const Viewerpdf = ()=> {
    const [imgs, setimgs ] = useState([]);
    const [pdf, setPdf] = useState("");
    const [isFinish, setFinish] = useState(false);
    const [presentimg, setPresentimg] = useState(0);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});

    const params = useParams();

    
    const courseCode = parseInt(params.id);
    const courseTitle = params.course;
    
    Modal.setAppElement('#root');

    const ErrorModal = ({ isOpen, message, onRequestClose }) => {
    return (
        <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Error Modal"
        >
        <h2>Error</h2>
        <p>{message}</p>
        <button onClick={onRequestClose}>Cerrar</button>
        </Modal>
    );
    };

    const pagination = (direction) => {
        if(direction === "left"){
            if(presentimg > 0){   // si la anterior existe
                setPresentimg(presentimg-1);
                setLoading(true);
            }
        }
        if(direction === "right"){
            if(presentimg + 1 < imgs.length){  /// si la siguiente existe
                setPresentimg(presentimg+1);
                setLoading(true);
            }
        }
        
    };

    const render = ({item}) => {
        return (
            
                    <img style={{ width: 340, height: 510}}
                    source={{uri: item}}/>
                    
            
        );
    };


   useEffect(()=> {
        const fetch_firebase = async() => {
            const q = query(collection(db, "books"), where("codeCourse", "==", courseCode));
            console.log("iniciando fetching book");
            const querySnapshot = await getDocs(q);
            console.log("fetching book finalizado");  
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                setData(doc.data());
                setimgs(doc.data().images);
                setPdf(doc.data().uri_pdf);
                console.log(imgs);
                setFinish(true);
            });
            
        };
        fetch_firebase()
    },[]);    

    return (
        
        <div style= {{display:"flex",flexDirection:"column", backgroundColor: 'white', width: '100%',height: '200vh', alignContent:"center"}}>
            
            
            
                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
                    <Link to={`/`}>
                    <img
                        src="https://cdn-icons-png.flaticon.com/128/889/889590.png"
                        style={{ fontSize: '10px', color: 'blue', width:"30px", height:"30px", margin:"30px"}}
                        alt="return button"
                        onLoad={()=> console.log("button load")}
                        
                    >
                    </img>
                    </Link>
                    <h5 style = {{  fontSize: '1.5rem', color: 'blue',fontWeight: 'bold'}}>{courseTitle} {courseCode}</h5>
                
                </div>
                {/*isFinish && <FlatList
                    data={imgs}
                    keyExtractor = {(item) => item}
                    renderItem={render}
                />*/}
                    
                <div style = {{width: "100%",display: 'flex', flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                    
                    <div>
                        <img
                            src="https://cdn-icons-png.flaticon.com/128/10238/10238871.png"
                            style={{ fontSize: '30px', color: 'blue',transform: "rotate(180deg)",maxWidth: "100%" }} // Estilos en línea para tamaño y color
                            onClick={() => {
                            // Lógica cuando se presiona la flecha izquierda
                            console.log('Flecha izquierda presionada');
                            pagination('left');
                            }}
                        ></img>
                    </div>
                    <div >
                        

                        {isFinish && <img 
                            style={{ width: "100%",maxWidth: "100%"}}
                            src={imgs[presentimg]}
                            alt="Pagina pdf"

                            onLoad={()=> setLoading(false)}
                        />}
                        {loading && <Loader />}
                    
                    </div>
                    <div>
                            <img
                                src="https://cdn-icons-png.flaticon.com/128/10238/10238871.png"
                                style={{ fontSize: '30px', color: 'blue' ,maxWidth: "100%"}} // Estilos en línea para tamaño y color
                                onClick={() => {
                                // Lógica cuando se presiona la flecha izquierda
                                console.log('Flecha derecha presionada');
                                pagination('right');
                                }}
                            ></img>
                    </div>
                        
                    
                
                </div>

                <div style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
                
                <h5 style = {{  fontSize: '1.5rem', color: 'blue',fontWeight: 'bold',}}>Pagina: {presentimg+1}</h5>
                </div>
                <div style={{display:"flex", justifyContent:"center",marginBottom:"30px"}}>
                <button
                    onClick={() => { handleLinkPress(pdf) }}
                    style={{
                        width: "20%",
                        
                        borderRadius: 10, // Borde redondeado
                        padding: 1, // Espacio interno
                        alignItems: 'center', // Centrar contenido horizontalmente
                        borderColor: 'blue',
                        
                    }}
                    >
                    <h5 style={{fontWeight:'bold'}}>Descargar PDF</h5>
                    
                </button>            
                </div>

        </div>
    );

    
};

export default Viewerpdf;