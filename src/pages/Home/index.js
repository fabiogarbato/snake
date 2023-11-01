import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col  } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './home.css';
import { ThemeContext } from '../Theme/theme';
import React, { useContext } from 'react';

function Home() {
  const { theme, toggleTheme } = useContext(ThemeContext); 

  const mainStyle = {
    height: '100vh',
    backgroundColor: theme === 'dark' ? 'black' : 'white', 
    display: 'flex',
    flexDirection: 'column',
    color: theme === 'dark' ? 'white' : 'black', 
  };

  return (
    <div style={mainStyle}> 
      <Container style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Row className="text-center justify-content-md-center flex-column">
            <Col className="mb-4">
                <h1 style={{ color: theme === 'dark' ? 'red' : 'red', fontFamily: 'Korataki, sans-serif' }}>SNAKE GAME</h1> 
            </Col>
            <Col md="auto" className="mb-2">
              <Link to="/jogo" className="btn btn-primary btn-lg btn-red">Jogar</Link>
            </Col>
            <Col>
              <button onClick={toggleTheme} className="btn btn-secondary">
                Alternar para tema {theme === 'dark' ? 'claro' : 'escuro'}
              </button>
            </Col>
        </Row>
      </Container>
      <div style={{ backgroundColor: theme === 'dark' ? '#333' : '#ddd', padding: '20px 0', color: theme === 'dark' ? 'white' : 'black' }}>
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

