import React, { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { where, getDocs, getFirestore, collection, doc, getDoc, query, onSnapshot, updateDoc, addDoc } from "firebase/firestore";
import Dropdown from '../components/Dropdown';
import Loader from '../components/LoaderComponent';
import db from '../config/firebase'
import {storage} from '../config/firebase'

const _alternatives = {
    A: "", 
    B: "",
    C: "",
    D: "",
    E: ""
};

const UploadDataSoykachimbo = () => {
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [answer, setAnswer] = useState('');
    const [topic, setTopic] = useState('');
    const [course, setCourse] = useState('');
    const [courseCode, setCourseCode] = useState(0);
    const [correctAlternative, setCorrectAlternative] = useState('');
    const [wImage1, setwImage1] = useState(300);
    const [hImage1, sethImage1] = useState(150);
    const [wImage2, setwImage2] = useState(300);
    const [hImage2, sethImage2] = useState(150);
    const [nameImage1, setNameImage1] = useState("");
    const [nameImage2, setNameImage2] = useState("");
    const [url1, setUrl1] = useState("");
    const [url2, setUrl2] = useState("");
    const [blob1, setblob1] = useState(null);
    const [blob2, setblob2] = useState(null);
    const [alternatives, setAlternatives] = useState(_alternatives);
    const [loading, setLoading] = useState(false);
  
    const addAlternative = () => {
        setAlternatives([...alternatives]);
    }
    const handleSelectCourse = (event) => {
        // Encuentra el elemento 'option' seleccionado
        const selectedOption = event.target.options[event.target.selectedIndex];

        // Accede al contenido del elemento 'option' (item.title)
        const selectedTitle = selectedOption.text;

        
        console.log("Título seleccionado:", selectedTitle);
        setCourse(selectedTitle);
        setCourseCode(event.target.value);
        


      };

    const uploadFirestore = async() => {
      setLoading(true);
        const docRef = await addDoc(collection(db,"questions_evaluation"),{
            question: url1,
            answer: answer,
            alternatives: alternatives,
            solution: url2,
            topic: topic,
            course: course, 
            codeCourse: courseCode,
            correctAlternative: correctAlternative,
            views: 0,
        
        });
        console.log("question guardado con id: ", docRef.id);
        
        setImage1(null);
          setImage2(null);
          setAlternatives(_alternatives);
          setCorrectAlternative('');
          setAnswer('');
          setLoading(false);
        setUrl1("");
        setUrl2("");
      }; 

    const handleUploadFirebase = async() => {
            setLoading(true);
            //const response = await fetch(captureImage);
            //const blob = await response.blob();
            //console.log("imageFile: ",imageFile);
            const imageFile = image1;
            const path = "kachimbo/" + nameImage1;
            const storageRef = ref(storage,path);
            const metadata = {
              contentType: 'image/jpeg',
            }; 
            let up = uploadBytes(storageRef, blob1, metadata).then((snapshot) => {
                        console.log('Uploaded a blob or file!', snapshot);
                        //setSave(true);
                        //setUploading(false);
                      })
            try {
              await up;
              //setFinish(true);
              //setUploading(false);
      
              //// -------- agregamos el path del statement ---------
              
              getDownloadURL(ref(storage, path)).then((url) => {
                setUrl1(url);
                
                //imagesUrlApi.push(urlApi);
                //setUrlImagesApi([...imagesUrlApi]);
                console.log("url", url);
                
              }).catch((error) => {
                // Handle any errors
                console.log(error);
              });  
            }catch(e){
              console.log(e);
            }
          //await handleUploadFirebase2();
          //await uploadFirestore();
          setLoading(false);

    }
    const handleUploadFirebase2 = async() => {
        //const response = await fetch(captureImage);
        //const blob = await response.blob();
        //console.log("imageFile: ",imageFile);
        setLoading(true);
        const imageFile = image2;
        const path = "kachimbo/" + nameImage2;
        const storageRef = ref(storage,path);
        const metadata = {
          contentType: 'image/jpeg',
        }; 

        if(image2){
            let up = uploadBytes(storageRef, blob2, metadata).then((snapshot) => {
              console.log('Uploaded a blob or file!', snapshot);
              //setSave(true);
              //setUploading(false);
            })
        try {
          await up;
          //setFinish(true);
          //setUploading(false);

          //// -------- agregamos el path del statement ---------
          
          getDownloadURL(ref(storage, path)).then((url) => {
            setUrl2(url);
            
            //imagesUrlApi.push(urlApi);
            //setUrlImagesApi([...imagesUrlApi]);
            console.log("url", url);
            
          }).catch((error) => {
            // Handle any errors
            console.log(error);
          });  
        }catch(e){
          console.log(e);
        }
              }
        setLoading(false);
        
        
      
}

    const handleImageUpload = (event, setImage) => {
      const file = event.target.files[0];
      const reader = new FileReader();
  
      reader.onload = (e) => {
        setImage(e.target.result);
      };
  
      if (file) {
        reader.readAsDataURL(file);
      }
    };
  
    const handleDragOver = (e) => {
      e.preventDefault();
    };
  
    const handleDrop = (e, setImage, sethImage, setwImage, setNameImage, setblob) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      console.log("file imagaes is: ",file);
      setNameImage(file.name);
      setblob(file);
  
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        const image = new Image();
  
        reader.onload = (e) => {
            image.src = e.target.result;
            image.onload = () => {
                setImage(image);
                const width = image.width;
                const height = image.height;
                console.log(`Ancho: ${width}, Alto: ${height}`);
                sethImage(height);
                setwImage(width);
            };
          
        };
  
        reader.readAsDataURL(file);
      }
    };
  
    return (
      <div>
        <div style={{padding:'10px', margin:'30px'}}>
        <Dropdown handleSelectChange={handleSelectCourse} option={course}/>
        <input type="text" placeholder="Topic" value={topic} onChange={(e) => setTopic(e.target.value)} />
        </div>
          
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center' }}>

            <div
            style={{ width: wImage1, aspectRatio: wImage1/hImage1, border: '1px solid black', margin: '10px' }}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, setImage1, sethImage1, setwImage1, setNameImage1, setblob1)}
            >
            {image1 && <img src={image1.src} alt="Image 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setImage1)} />
            </div>
            <div
            
            style={{ width: wImage2, aspectRatio: wImage2/hImage2, border: '1px solid black', margin: '10px' }}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, setImage2, sethImage2, setwImage2, setNameImage2, setblob2)}
            >
            {/*image2 && <img src={image2.src} alt="Image 2" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: ' center bottom' }} />*/}
            {image2 && <img src={image2.src} alt="Image 2" style={{ width: '100%', height: '100%', objectFit: 'cover'}} />}
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setImage2)} />
            </div>
        </div>

        <div style={{padding:'10px', margin:'30px'}}>
          
      
          <label htmlFor="alternatives">Ingresa alternativas:</label>
          <div id="alternatives"  style={{display: "flex", flexDirection: "row"}}>
            <input style={{width: "65px"}} type="text" placeholder="A" value= {alternatives.A} onChange={(e) => setAlternatives({...alternatives, A: e.target.value})} />
            <input style={{width: "65px"}} type="text" placeholder="B" value= {alternatives.B} onChange={(e) => setAlternatives({...alternatives, B: e.target.value})} />
            <input style={{width: "65px"}} type="text" placeholder="C" value= {alternatives.C} onChange={(e) => setAlternatives({...alternatives, C: e.target.value})} />
            <input style={{width: "65px"}} type="text" placeholder="D" value= {alternatives.D} onChange={(e) => setAlternatives({...alternatives, D: e.target.value})} />
            <input style={{width: "65px"}} type="text" placeholder="E" value= {alternatives.E} onChange={(e) => setAlternatives({...alternatives, E: e.target.value})} />
          </div>    
          <input type="text" placeholder="Answer" value={answer} onChange={(e) => setAnswer(e.target.value)} />
          <label htmlFor="dropdown">Selecciona la alternativa correcta:</label>
            <select id="dropdown" value={correctAlternative} onChange={(e) => setCorrectAlternative(e.target.value)}>
                <option value="">Elige una opción</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>

            </select>
            <p>Seleccionaste: {correctAlternative}</p>
        </div>
        <Loader loading={loading}/>
        <button
        style={{
            backgroundColor: '#3B82F6',
            color: 'white',
            fontSize: '16px',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        }}
        onClick={handleUploadFirebase}
        >
        url 1
        </button>
        <button
        style={{
            backgroundColor: '#3B82F6',
            color: 'white',
            fontSize: '16px',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        }}
        onClick={handleUploadFirebase2}
        >
        url 2
        </button>
        <button
        style={{
            backgroundColor: '#3B82F6',
            color: 'white',
            fontSize: '16px',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        }}
        onClick={uploadFirestore}
        >
        Enviar datos
        </button>

        
      </div>
    );
};

export default UploadDataSoykachimbo;

//style={{ width: wImage2, aspectRatio: "1" , border: '1px solid black', margin: '10px',overflow: 'hidden' }}