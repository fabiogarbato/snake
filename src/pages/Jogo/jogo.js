import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col  } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './jogo.css';

const DOT_SIZE = 10;
const SPEED = 16;

function Jogo() {
    const containerRef = useRef(null);
    const [direction, setDirection] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [foodPosition, setFoodPosition] = useState(generateRandomPosition());
    const middleX = Math.floor((window.innerWidth / 2) / DOT_SIZE) * DOT_SIZE - (DOT_SIZE * 2);
const middleY = Math.floor((window.innerHeight / 2) / DOT_SIZE) * DOT_SIZE;

const [snake, setSnake] = useState([
    { x: middleX, y: middleY },
    { x: middleX - DOT_SIZE, y: middleY }, 
    { x: middleX - (DOT_SIZE * 2), y: middleY } 
]);

    const [score, setScore] = useState(0);

    function moveSnake() {
        if (!containerRef.current) return;

        const CONTAINER_WIDTH = containerRef.current.clientWidth;
        const CONTAINER_HEIGHT = containerRef.current.clientHeight;
        const newSnake = [...snake];
        const head = { ...newSnake[0] };

        switch (direction) {
            case 'up':
                head.y = Math.max(0, head.y - SPEED);
                break;
            case 'down':
                head.y = Math.min(CONTAINER_HEIGHT - DOT_SIZE, head.y + SPEED);
                break;
            case 'left':
                head.x = Math.max(0, head.x - SPEED);
                break;
            case 'right':
                head.x = Math.min(CONTAINER_WIDTH - DOT_SIZE, head.x + SPEED);
                break;
            default:
                return;
        }

        newSnake.unshift(head);
        newSnake.pop();

        if (head.x === 0 || head.y === 0 || head.x === CONTAINER_WIDTH - DOT_SIZE || head.y === CONTAINER_HEIGHT - DOT_SIZE || snakeCollidesWithItself(head, newSnake)) {
            setGameOver(true);
            return;
        }

        if (isColliding(head, foodPosition)) {
            let newTail = { ...snake[snake.length - 1] }; 
    
            if (snake.length > 1) {
                const lastSegment = snake[snake.length - 1];
                const secondToLastSegment = snake[snake.length - 2];
    
                if (lastSegment.y === secondToLastSegment.y) {
                    if (lastSegment.x > secondToLastSegment.x) {
                        newTail.x += DOT_SIZE;
                    } else {
                        newTail.x -= DOT_SIZE;
                    }
                } 

                else if (lastSegment.x === secondToLastSegment.x) {
                    if (lastSegment.y > secondToLastSegment.y) {
                        newTail.y += DOT_SIZE;
                    } else {
                        newTail.y -= DOT_SIZE;
                    }
                }
            }
    
            newSnake.push(newTail);
            setFoodPosition(generateRandomPosition());

            setScore(score + 1);
        }
    
        setSnake(newSnake);
    }

    function handleKeyDown(event) {
        switch (event.key) {
            case 'ArrowUp':
                if (direction !== 'down') setDirection('up');
                break;
            case 'ArrowDown':
                if (direction !== 'up') setDirection('down');
                break;
            case 'ArrowLeft':
                if (direction !== 'right') setDirection('left');
                break;
            case 'ArrowRight':
                if (direction !== 'left') setDirection('right');
                break;
            default:
                break;
        }
    }

    function generateRandomPosition() {
        const CONTAINER_WIDTH = containerRef.current ? containerRef.current.clientWidth : window.innerWidth;
        const CONTAINER_HEIGHT = containerRef.current ? containerRef.current.clientHeight : window.innerHeight;
        const x = Math.floor(Math.random() * (CONTAINER_WIDTH - DOT_SIZE) / DOT_SIZE) * DOT_SIZE;
        const y = Math.floor(Math.random() * (CONTAINER_HEIGHT - DOT_SIZE) / DOT_SIZE) * DOT_SIZE;
        return { x, y };
    }

    function isColliding(a, b) {
        return (
            a.x < b.x + DOT_SIZE &&
            a.x + DOT_SIZE > b.x &&
            a.y < b.y + DOT_SIZE &&
            a.y + DOT_SIZE > b.y
        );
    }

    function snakeCollidesWithItself(head, snakeArray) {
        for (let i = 1; i < snakeArray.length; i++) {
            if (isColliding(head, snakeArray[i])) return true;
        }
        return false;
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        const interval = setInterval(moveSnake, 50);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            clearInterval(interval);
        };
    }, [snake, direction]);
    
    return (
        <div ref={containerRef} style={{ height: '100vh', backgroundColor: 'black' }} className="d-flex justify-content-center align-items-center">
            <Container fluid className="position-absolute top-0 start-0 p-3">
                <Row>
                    <Col style={{ color: 'red', fontFamily: 'Korataki, sans-serif' }}>
                        PONTUAÇÃO: {score}
                    </Col>
                </Row>
            </Container>
            {gameOver ? (
                <Container style={{ width: '550px', height: '550px', backgroundColor: '#333' }} className="d-flex justify-content-center align-items-center">
                    <Row className="d-flex justify-content-center align-items-center flex-column" style={{ width: '100%' }}>
                        <Col className="d-flex justify-content-center align-items-center" style={{ color: 'red', fontSize: '35px', fontFamily: 'Korataki, sans-serif' }}>
                            Game Over
                        </Col>
                        <Col className="d-flex justify-content-center align-items-center flex-column">
                            <Link to="/jogo" className="btn btn-primary btn-lg btn-red mb-2" onClick={() => window.location.reload()}>Reiniciar</Link>
                            <Link to="/" className="btn btn-primary btn-lg btn-red">Menu</Link>
                        </Col>
                    </Row>
                </Container>
            ) : (
                <>
                    {snake.map((segment, index) => (
                        <div key={index} style={{
                            width: '10px',
                            height: '10px',
                            backgroundColor: 'red',
                            position: 'absolute',
                            top: `${segment.y}px`,
                            left: `${segment.x}px`,
                        }} />
                    ))}
                    <div style={{
                        width: '10px',
                        height: '10px',
                        backgroundColor: 'green', 
                        position: 'absolute',
                        top: `${foodPosition.y}px`,
                        left: `${foodPosition.x}px`,
                    }} />
                </>
            )}
        </div>
    );    
}

export default Jogo;
