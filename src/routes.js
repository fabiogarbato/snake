import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Erro from './pages/Erro/erro'
import Jogo from './pages/Jogo/jogo'
import Options from './pages/Options/options'

function RoutesApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Home/>}/>
                <Route path='*' element={ <Erro/>}/>
                <Route path='/jogo' element={ <Jogo/>}/>
                <Route path='/options' element={ <Options/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;