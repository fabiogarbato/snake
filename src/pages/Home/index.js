import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col  } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './home.css';

function Home() {

  return (
    <div style={{ height: '100vh', backgroundColor: 'black', display: 'flex', flexDirection: 'column' }}>
      <Container style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Row className="text-center justify-content-md-center flex-column">
            <Col className="mb-4">
                <h1 style={{ color: 'red', fontFamily: 'Korataki, sans-serif' }}>SNAKE GAME</h1>
            </Col>
            <Col md="auto" className="mb-2">
              <Link to="/jogo" className="btn btn-primary btn-lg btn-red">Jogar</Link>
            </Col>
        </Row>
      </Container>
      <div style={{ backgroundColor: '#333', padding: '20px 0', color: '#fff' }}>
        <Container>
            <Row>
                <Col className="text-center">
                    <p>© 2023 Fábio Garbato. Todos os direitos reservados.</p>
                    <p>Contato profissional: fabiogarbato3006@gmail.com</p>
                </Col>
            </Row>
        </Container>
      </div>
    </div>
  );
}

export default Home;
