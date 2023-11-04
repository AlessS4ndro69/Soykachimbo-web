import React,{useEffect, useState} from 'react';
import  db  from "../config/firebase";
import { doc, getDoc, collection, query, where } from "firebase/firestore";
import { Link } from 'react-router-dom';
import Banner from '../components/Banner';


const Home = () => {

    const [isHighlighted, setIsHighlighted] = useState(false);
    const [idSelect, setIdSelect] = useState(0);
    const [assets, setAssets] = useState({});

    const handleMouseOver = (id) => {
        console.log("seleccionando el id ",id);
        setIdSelect(id);
      setIsHighlighted(true);
    };
  
    const handleMouseLeave = () => {
        setIdSelect(0);
      setIsHighlighted(false);
    };


    const MyBox = ({text, uri, id}) => {
        const boxStyle = {
            display:"flex",
            justifyContent: 'space-between',
            margin:20,
            borderRadius:"50%",
            
            border: '1px solid #ccc',
            transition: 'background-color 0.3s',
            cursor: 'pointer',
        };
        if (assets && assets.books) {
            const enabled = assets?.books.find((element) => element == id)? true: false;
            console.log("enabled: ",enabled);    
            if(enabled){
                return(
                    <div 
                        style = {boxStyle}
                        onMouseOver={()=>handleMouseOver(id)}
                        onMouseLeave={handleMouseLeave}
                        onClick={()=>console.log("presooinando...")}
                        
                        >  
                    <Link to={`/viewerpdf/${id}/${text}`}>
                            
                    <div style={{ width: 200, height: 200, background: enabled && idSelect == id ? 'yellow' :'white', borderRadius: 21, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ width: '40%', height: '40%', background: '#FF8125', borderRadius: "50%", margin: 10, marginBottom:35 }}>
                            <img
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            src={uri}
                            alt="imagen"
                            >
                            </img>
                        </div>
                        <div style={{ width: '100%', height: '20%', color: '#1B76FF', fontSize: 20, fontFamily: 'Courier',  fontWeight: 'bold', letterSpacing: 2.10, wordWrap: 'break-word',textAlign:"center", paddingBottom:10,  }}>{text}</div>
                    </div> 
                    </Link>
                    </div>
                );
            }
        }
            
        
        
        
        
        
    };

    useEffect(()=>{
        const get_assets = async() => {
            const docRef = doc(db, "assets", "assets_web");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setAssets(docSnap.data());
                //const e = docSnap.data().books.find((element) => element === 14);
                //console.log(`find: ${e}`);
            } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
            }
            
        };
        get_assets();
    },[]);

    return (
        <div style={{ width: '100%', height: '200vh',  background: '#1B76FF', margin: 0, paddingTop: 20, position: 'relative',display: 'flex',flexDirection: 'column'}}>
            <div style={{backgroundColor:"black"}}>
                <Banner/>        
            </div>
            
            <div style={{ width: '50%', height: '50%', borderRadius: '50%', overflow: 'hidden', position: 'relative', marginTop:"70px"}}>
                <img
                style={{ width: '100%', aspectRatio:1, objectFit: 'cover' }}
                src="https://img.freepik.com/foto-gratis/sonriente-joven-mujer-segura-ordenador-portatil-mirando-camara-aislada-sobre-fondo-blanco_231208-9497.jpg?w=360&t=st=1698966375~exp=1698966975~hmac=0a33ca937f702cd57a6ee794be628d9b1060633874bcd90ec102cd3f12d88512"
                alt="Smiling woman with a laptop"
                />
            </div>
            <div style={{ width: '90%', height: '50%', position: 'absolute', top: "40px", left: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', zIndex: 1 }}>
                <div style={{ width: '80%', height: '22%', background: '#1B76FF', borderRadius: '9px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <span style={{
                        color: 'white',
                        fontSize: '30px',
                        
                        letterSpacing: '4.06px',
                        
                        fontFamily: 'Courier',  
                        fontWeight: 'bold'
                    }}>
                        Lecciones &amp; Prácticas
                    </span>
                </div>
            </div>
            
            {assets && <div style={{ width: '70%', height: '50%', position: 'absolute', top: "30%", left: "20%", display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row',flexWrap: 'wrap', zIndex: 1 }}>
                
                    
                {<MyBox id="14" text="Aritmética" uri="https://cdn-icons-png.flaticon.com/128/5950/5950074.png?track=ais"/>}    
                {<MyBox id="16" text="Geometría" uri="https://cdn-icons-png.flaticon.com/128/9666/9666644.png?track=ais"/>}
                <MyBox id="12" text="Geometría Analítica" uri="https://cdn-icons-png.flaticon.com/128/5945/5945083.png"/>
                <MyBox id="11" text="Trigonometría" uri="https://cdn-icons-png.flaticon.com/128/5363/5363325.png"/>
                {<MyBox id="10" text="Raz. Matemático" uri="https://cdn-icons-png.flaticon.com/128/7119/7119411.png?track=ais"/>}
                <MyBox id="17" text="Psicotécnico" uri="https://cdn-icons-png.flaticon.com/128/11289/11289148.png"/>
                {<MyBox id="13" text="Algebra" uri="https://cdn-icons-png.flaticon.com/128/5332/5332746.png?track=ais"/>}
                {<MyBox id="200" text="Física" uri="https://cdn-icons-png.flaticon.com/128/1453/1453040.png?track=ais"/>}
                {<MyBox id="203" text="Química" uri="https://cdn-icons-png.flaticon.com/128/995/995446.png"/>}
                <MyBox id="101" text="Biología" uri="https://cdn-icons-png.flaticon.com/128/902/902493.png"/>
                <MyBox id="100" text="Anatomía" uri="https://cdn-icons-png.flaticon.com/128/4178/4178727.png"/>
                <MyBox id="103" text="Cívica" uri="https://cdn-icons-png.flaticon.com/128/10219/10219926.png"/>
                <MyBox id="104" text="Economía" uri="https://cdn-icons-png.flaticon.com/128/3310/3310648.png"/>
                <MyBox id="105" text="Filosofía" uri="https://cdn-icons-png.flaticon.com/128/6981/6981198.png"/>
                <MyBox id="106" text="Geografía" uri="https://cdn-icons-png.flaticon.com/128/2387/2387542.png"/>
                <MyBox id="107" text="Historia" uri="https://cdn-icons-png.flaticon.com/128/5660/5660272.png"/>
                <MyBox id="110" text="Lenguaje" uri="https://cdn-icons-png.flaticon.com/128/10315/10315274.png"/>
                <MyBox id="111" text="Literatura" uri="https://cdn-icons-png.flaticon.com/128/2534/2534076.png"/>
                <MyBox id="112" text="Psicología" uri="https://cdn-icons-png.flaticon.com/128/4305/4305261.png"/>
                <MyBox id="114" text="Raz. Verbal" uri="https://cdn-icons-png.flaticon.com/128/4944/4944492.png"/>
                <MyBox id="600" text="Práctica tiktok" uri="https://cdn-icons-png.flaticon.com/128/3116/3116491.png"/>            
            </div>}
            
        </div>
    );

    
};





export default Home;
