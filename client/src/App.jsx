import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cine from "./pages/Cine";
import Ticket from "./pages/Ticket";
import React from "react";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                
                <Route path='/' element={<Navigate to='/cine' />} />
                <Route path='/cine' element={<Cine/>} />
                <Route path="/ticket" element={<Ticket/>}/>
            
            </Routes>
        </BrowserRouter>
    );
}

export default App;
