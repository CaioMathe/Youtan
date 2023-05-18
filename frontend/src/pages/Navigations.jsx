import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState, useEffect} from 'react';


export function Navigation() {
   const [isAuth, setIsAuth] = useState(false);
   useEffect(() => {
     if (localStorage.getItem('access_token') !== null) {
        setIsAuth(true); 
      }
    }, [isAuth]);
     return ( 
      <div>
        <Navbar style={{backgroundColor: '#74c15d'}} variant="dark" className='nav'>
          <Navbar.Brand href="/" className='p-2'><h1>ACME</h1></Navbar.Brand>            
          <Nav className="me-auto sticky-top"> 
          {isAuth ? <Nav.Link href="/">Dashboard</Nav.Link> : null}
          {isAuth ? <Nav.Link href="/cliente">Cliente</Nav.Link> : null }

          </Nav>
          <Nav>
          {isAuth ? <Nav.Link href="/logout">Sair</Nav.Link> :  
                    <Nav.Link href="/login">Login</Nav.Link>}
          </Nav>
          <Nav>
          {isAuth ? null : <Nav.Link href="/singup">Cadastrar</Nav.Link>}
          </Nav>
        </Navbar>
       </div>
     );
}