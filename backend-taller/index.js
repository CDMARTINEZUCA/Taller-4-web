import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


app.get('/api/health', (req, res) => {
    res.json({ 
        status: "success", 
        message: "El API está funcionando correctamente" 
    });
});

app.get('/api/info', (req, res) => {
    res.json({
        status: "success",
        integrantes: [
            { 
                carnet: "00032225", 
                nombre: "Daniel", 
                ciudad: "San Salvador", 
                carrera: "Ingeniería Informática", 
                proyectos: 5
            },

            {carnet: "00034725",
                nombre: "Ariel",
                ciudad: "San Salvador",
                carrera: "Ingeniería Informática", 
                proyectos: 2
            }
        ]
    });
});

app.listen(PORT, () => {
    console.log(`Servidor de Express corriendo en http://localhost:${PORT}`);
});