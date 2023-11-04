from tqdm import tqdm
import time

# Número total de iteraciones o pasos
total_steps = 50

# Crear una barra de progreso con tqdm
progress_bar = tqdm(total=total_steps, desc="Procesando")

for i in range(total_steps):
    # Simula una operación que toma tiempo
    time.sleep(0.1)
    progress_bar.update(1)

progress_bar.close()

print("Proceso completado")
