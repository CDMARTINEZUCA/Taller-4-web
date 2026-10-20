import React, { useEffect, useState } from 'react';
import "./App.css"
import { Container, Card, CardBody, CardTitle, CardText, Row, Col, Spinner, Alert } from 'reactstrap';

function App() {
  const [healthData, setHealthData] = useState(null);
  const [infoData, setInfoData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Petición a api/health 
    fetch('http://localhost:5000/api/health')
      .then(res => res.json())
      .then(data => setHealthData(data))
      .catch(err => console.error("Error en health:", err));

    // Petición a api/info 
    fetch('http://localhost:5000/api/info')
      .then(res => res.json())
      .then(data => {
        setInfoData(data.integrantes || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error en info:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Container className="my-5">
      {}
      <header className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary">Taller IV</h1>
        <hr />
      </header>

      {}
      <section className="mb-5 p-4 border rounded shadow-sm bg-light">
        <div className="health-container">
          <h4 className="text-success border-bottom pb-2">Estado del Servidor (api/health)</h4>
          {healthData ? (
            <p className="fs-5 mt-3">
              Respuesta del API: <span className="badge bg-success">{healthData.message}</span>
            </p>
          ) : (
            <p className="text-muted">Conectando con el endpoint de salud...</p>
          )}
        </div>
      </section>

      {}
      <section className="mb-5">
        <h4 className="mb-4 text-secondary">Información de Integrantes (api/info)</h4>
        
        {loading ? (
          <div className="text-center">
            <Spinner color="primary" /> <p>Cargando integrantes...</p>
          </div>
        ) : infoData.length > 0 ? (
          <Row>
            {infoData.map((integrante, index) => (
              <Col md="6" lg="4" key={index} className="mb-4">
                {}
                <Card color="dark" inverse className="h-100 shadow">
                  <CardBody>
                    <CardTitle tag="h5" className="text-info fw-bold mb-3">
                      {integrante.nombre}
                    </CardTitle>
                    <CardText><strong>Carnet:</strong> {integrante.carnet}</CardText>
                    <CardText><strong>Ciudad:</strong> {integrante.ciudad}</CardText>
                    <CardText><strong>Carrera:</strong> {integrante.carrera}</CardText>
                    <CardText><strong>Proyectos Realizados:</strong> {integrante.proyectos}</CardText>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Alert color="warning">No se encontró información de los integrantes.</Alert>
        )}
      </section>
    </Container>
  );
}

export default App;
