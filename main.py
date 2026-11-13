from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
import hashlib

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AlumnoRequest(BaseModel):
    dni: str
    tramite: str
    score_biometrico: float

@app.post("/api/verificar-alumno")
def verificar_alumno(data: AlumnoRequest):
    if not data.dni:
        return {"exito": False, "mensaje": "Debe ingresar un número de DNI válido."}
    
    nombre_simulado = "Juan Carlos Pérez" if data.dni == "42189302" else f"Estudiante Registrado (DNI: {data.dni})"
    hash_str = hashlib.sha256(f"{data.dni}-{data.tramite}".encode()).hexdigest()[:10].upper()
    
    return {
        "exito": True,
        "tramite_id": random.randint(1000, 9999),
        "hash_comprobante": f"IES1-{hash_str}",
        "alumno": {
            "nombre_completo": nombre_simulado,
            "carrera": "TS en Ciencia de Datos e Inteligencia Artificial",
            "sede": "Abra Pampa / La Quiaca"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)