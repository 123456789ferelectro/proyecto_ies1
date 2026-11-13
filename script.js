async function verificarAlumno(dni, tramite, scoreBiometrico) {
    // 1. Validar si el DNI está vacío
    if (!dni || dni.trim() === "") {
        return { 
            exito: false, 
            mensaje: "Debe ingresar un número de DNI válido." 
        };
    }
    
    // 2. Definir el nombre simulado (igual que en tu Python)
    let nombreSimulado = (dni === "42189302") 
        ? "Juan Carlos Pérez" 
        : `Estudiante Registrado (DNI: ${dni})`;
    
    // 3. Generar el hash SHA-256 equivalente a hashlib.sha256().hexdigest()[:10].upper()
    const textoAHashear = `${dni}-${tramite}`;
    const msgBuffer = new TextEncoder().encode(textoAHashear);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 10).toUpperCase();
    
    // 4. Generar un ID de trámite aleatorio (entre 1000 y 9999)
    const tramiteId = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    
    // 5. Retornar la misma estructura JSON que devolvía tu FastAPI
    return {
        exito: true,
        tramite_id: tramiteId,
        hash_comprobante: `IES1-${hashHex}`,
        alumno: {
            nombre_completo: nombreSimulado,
            carrera: "TS en Ciencia de Datos e Inteligencia Artificial",
            sede: "Abra Pampa / La Quiaca"
        }
    };
}