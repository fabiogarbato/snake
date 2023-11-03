import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form   } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './options.css';
import { ThemeContext } from '../Theme/theme';
import React, { useContext, useState, useEffect } from 'react';
import Select from 'react-select';

const options = [
    { value: 'facil', label: 'Facil' },
    { value: 'medio', label: 'Medio' },
    { value: 'dificil', label: 'Dificil' },
  ];

function Options() {
  const { theme, toggleTheme } = useContext(ThemeContext); 
  const [selectedValue, setSelectedValue] = useState();

  useEffect(() => {
    const savedValue = localStorage.getItem('selectedOption');
    if (savedValue) {
        setSelectedValue(JSON.parse(savedValue));
    }
}, []); 

const handleChange = (option) => {
    setSelectedValue(option);
    localStorage.setItem('selectedOption', JSON.stringify(option));
};

  return (
        <div style={{ height: '100vh', backgroundColor: theme === 'dark' ? 'black' : 'white' }} className="d-flex justify-content-center align-items-center">
            <Container fluid className="position-absolute top-0 start-0 p-3">
                <Row>
                    <Col className="d-flex align-items-center justify-content-end">
                        <Link to="/jogo" className="btn btn-primary btn-lg btn-red">
                            Voltar
                        </Link>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} md={6}>
                        <h2 className="text-center mb-4" style={{ color: theme === 'dark' ? 'red' : 'red', fontFamily: 'Korataki, sans-serif' }}>Opções</h2>
                        <Form>
                            <Form.Group controlId="difficultySelect">
                                <Form.Label style={{ color: 'red', fontFamily: 'Korataki, sans-serif' }}>Dificuldade</Form.Label>
                                <Select
                                    value={selectedValue}
                                    onChange={handleChange}
                                    options={options}
                                    styles={{
                                        control: (provided) => {
                                            let backgroundColor;

                                            if (selectedValue && selectedValue.value === 'facil') {
                                                backgroundColor = '#98FB98';
                                            } else if (selectedValue && selectedValue.value === 'medio') {
                                                backgroundColor = 'orange';
                                            } else if (selectedValue && selectedValue.value === 'dificil') {
                                                backgroundColor = '#FFCCCC';
                                            } else {
                                                backgroundColor = '#808080'; 
                                            }

                                            return {
                                                ...provided,
                                                backgroundColor
                                            };
                                        },
                                        singleValue: (provided, state) => {
                                            let color;
                                            if (state.data.value === 'facil') {
                                                color = '#006400';
                                            } else if (state.data.value === 'medio') {
                                                color = '#FF4500';
                                            } else if (state.data.value === 'dificil') {
                                                color = 'Red';
                                            } else {
                                                color = 'inherit';  
                                            }
                                            return {
                                                ...provided,
                                                color
                                            };
                                        },
                                        option: (provided, state) => ({
                                            ...provided,
                                            backgroundColor: state.isHovered ? 'black' :
                                            state.isSelected ? (
                                                state.data.value === 'facil' ? '#98FB98' :
                                                state.data.value === 'medio' ? 'orange' :
                                                state.data.value === 'dificil' ? '#FFCCCC' : null
                                            ) : null,
                                            color: state.isSelected ? (
                                                state.data.value === 'facil' ? '#006400' :
                                                state.data.value === 'medio' ? '#FF4500' :
                                                state.data.value === 'dificil' ? 'Red' : null
                                            ) : null
                                        }),
                                        menu: (provided) => ({
                                            ...provided,
                                            backgroundColor: theme === 'dark' ? '#808080' : '#c7c6c6'  
                                        }),
                                    }}
                                />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
      ); 
}

export default Options;

