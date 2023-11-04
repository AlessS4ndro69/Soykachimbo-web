
import React, { useEffect, useState } from "react";

import  db  from "../config/firebase";
import { doc, getDocs, collection, query, where } from "firebase/firestore";
import Loader from "../components/LoaderComponent";
import Modal from "react-modal";



const screenHeight = 800;
const screenWidth = 800;

const handleLinkPress = (url) => {
    console.log("presiono link");
    window.location.href = url
  };

const CarrouselStatements = ()=> {
    const [imgs, setimgs ] = useState([]);
    const [pdf, setPdf] = useState("");
    const [isFinish, setFinish] = useState(false);
    const [presentimg, setPresentimg] = useState(0);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    

    
    const courseCode = 16;
    const courseTitle = "Aritmetica";
    
    const CarrouselItem = ({id, width})=> {
      return(
        <div style={{margin: "10px"}}>
            <img
            style={{
            width: "100%",
            maxWidth: "100%",
            borderRadius: "5%",
            borderColor: "green",
            borderWidth: "2px",
            borderStyle: "solid",
            }}
            src={imgs[id]}
            alt="Pagina pdf"
            onLoad={() => setLoading(false)}
        />
      </div>
      
        
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
            if(presentimg + 3 < imgs.length){  /// si existe 3 adelante
                setPresentimg(presentimg+1);
                setLoading(true);
            }
        }
        
    };


   useEffect(()=> {
        const fetch_firebase = async() => {
            const q = query(collection(db, "practices_for_tiktok"), where("codeCourse", "==", courseCode));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                setData(doc.data());
                setimgs(doc.data().images.semana1);
                setPdf(doc.data().uri_pdf);
                console.log(imgs);
                setFinish(true);
            });
            
        };
        fetch_firebase()
    },[]);    

    return (
        <div style= {{display:"flex",flexDirection:"column", backgroundColor: 'white', width: '100%',height: '200vh', alignContent:"center"}}>
                <div style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
                <h5 style = {{  fontSize: '1.5rem', color: 'blue',fontWeight: 'bold',}}>{courseTitle} {courseCode}</h5>
                
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
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <div style={{ margin: "0 10px" }}>
                            {isFinish && <CarrouselItem id={presentimg} />}
                        </div>
                        <div style={{ margin: "0 20px", transform: "scale(1.2)" }}>
                            {isFinish && <CarrouselItem id={presentimg+1} />}
                        </div>
                        <div style={{ margin: "0 10px" }}>
                            {isFinish && <CarrouselItem id={presentimg+2} />}
                        </div>
                        <Loader loading={loading} />
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

                
                

        </div>
    );

    
};

export default CarrouselStatements;