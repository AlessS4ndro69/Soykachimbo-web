
import pdfplumber
from PIL import Image
import sys
import os
from tqdm import tqdm

from firebase_admin import auth

import firebase_admin
from firebase_admin import firestore
from firebase_admin import credentials, storage



# Application Default credentials are automatically created.
cred = credentials.Certificate('./service-account-file.json')

app = firebase_admin.initialize_app(cred, {"storageBucket": "repository-exercises.appspot.com"})
db = firestore.client()

#ruta_archivo_local = "Banco.pdf"

# Nombre del archivo en Firebase Storage (puedes cambiarlo si lo deseas)
#nombre_archivo_firebase = "practices/Banco.pdf"
array_images = []
dict_objecs_images = {}

# Sube el archivo PDF a Firebase Storage
def upload_pdf(ruta_archivo_local, archivo):
    nombre_archivo_firebase = "bookpdf/"+archivo
    try:
        bucket = storage.bucket()
        
        blob = bucket.blob(nombre_archivo_firebase)
        
        blob.upload_from_filename(ruta_archivo_local, timeout = 60.0 * 5)
        blob.make_public()
        uri = blob.public_url
        print(f"Archivo PDF '{nombre_archivo_firebase}' subido con éxito a Firebase Storage.")
        #print("url :", uri)
    except Exception as e:
        print("Error al subir el archivo PDF:", str(e))

    return uri

def pdf_to_png(ruta_archivo_local, carpeta_actual, archivo):
    desired_dpi = 600
    
    try:
        # Abre el archivo PDF con pdfplumber
        with pdfplumber.open(ruta_archivo_local) as pdf:
            # Recorre todas las páginas del PDF
            progress_bar = tqdm(total=len(pdf.pages), desc="Procesando")
            for pagina in pdf.pages:                
                try:
                    
                    imagen = pagina.to_image(resolution=desired_dpi)
                    
                    #print(type(imagen))
                    # Ruta de la carpeta donde deseas guardar la imagen
                    destiny_path = os.path.join(carpeta_actual,"filesPng")

                    if not os.path.exists(destiny_path):
                        # Si no existe, crea la carpeta
                        os.makedirs(destiny_path)
                    
                    d = archivo[:-4] +"Pg." +str(pagina.page_number) + ".png"
                    path =os.path.join( destiny_path,d)
                    #print("save pag. ", path)
                    imagen.save(path)
                    array_images.append(path)
                    
                except Exception as e:
                    print(f"Error en {pagina.page_number}: {str(e)}")
                progress_bar.update(1)
    except FileNotFoundError:
        print(f"Error: El archivo PDF '{ruta_archivo_local}' no se encontró.")    
    progress_bar.close()

def upload_png():
    array_uri = []
    progress_bar = tqdm(total=len(array_images), desc="Procesando")
    for path in array_images:
        try:
            bucket = storage.bucket()
            blob = bucket.blob("bookpng/"+path)
            blob.upload_from_filename(path)
            blob.make_public()
            uri = blob.public_url
            #print(f"Archivo png '{path}' subido con éxito a Firebase Storage.")
            #print("url :", uri)
            array_uri.append(uri)
            
        except Exception as e:
            print("Error al subir el archivo png:", str(e))
        progress_bar.update(1)
    progress_bar.close()
    return array_uri
    

def update_firestore(uri_pdf, array_uri_images, carpeta_actual):
    global dict_objecs_images

    # Datos para el nuevo registro (por ejemplo, un objeto Python)
    #number_semana = os.path.basename(carpeta_actual)
    ruta_padre = os.path.dirname(carpeta_actual)
    nombre_padre = os.path.basename(ruta_padre)
    #print(f"guardando con el curso:  '{nombre_padre}' y el dict de images '{dict_objecs_images}'")

    
    nuevo_registro = {
        'codeCourse': int(codeCourse),
        'curso' : nombre_padre,
        'uri_pdf': uri_pdf,
        'images': dict_objecs_images,
    }

    # Agrega el nuevo registro a la colección "usuarios"
    nuevo_registro_ref = db.collection("books").add(nuevo_registro)

    # Obtiene el ID del nuevo documento
    print("ID del nuevo registro:", nuevo_registro_ref)
    dict_objecs_images = {}

def main():
    for carpeta_actual, subcarpetas, archivos in os.walk(directory):
        array_uri_images = []
        uri_pdf = ""
        for archivo in archivos:
            # Imprimir la ruta completa del archivo (nombre completo incluyendo la ruta)
            path_file = os.path.join(carpeta_actual, archivo)
            #print(carpeta_actual)
            
            #print(ruta_completa)
            
            
            nombre_archivo = archivo
            print("[1/4]subiendo archivo a storage: ",path_file)
            uri_pdf = upload_pdf(path_file, archivo)
            print("[2/4]iniciando conversion a png: ")
            pdf_to_png(path_file, carpeta_actual, archivo) 
            print("[3/4]subiendo pngs a storage...")
            array_uri_images = upload_png()
            global array_images
            array_images = []
            
        global dict_objecs_images
        number_semana = os.path.basename(carpeta_actual)
        dict_objecs_images = array_uri_images

    
    if dict_objecs_images:
        print("[4/4]subiendo registro a firestore...")
        update_firestore(uri_pdf, array_uri_images, carpeta_actual)





### IMPORTANTE PARA EJECUTAR  LA CARPETA RAIZ DEBE TENER EL NOMBRE DEL CURSO 
   

if __name__ == "__main__":
    directory = sys.argv[1]
    codeCourse = sys.argv[2]
    main()
    firebase_admin.delete_app(firebase_admin.get_app())