import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material'
import { Link, Routes, Route, Outlet } from 'react-router-dom'
import Home from './Home.jsx';
import About from './about.jsx';
import NotFound from './notfound.jsx';
import { AuthContext } from './AuthProvider.jsx';
import { useContext, useState, useEffect } from 'react';





function Layout() {
  const { isLogged, login, logout } = useContext(AuthContext);
  const [isDark, setIsDark] = useState(false);

  
  document.body.style.background = isDark ? '#121212' : '#fff';
  document.body.style.color = isDark ? '#fff' : '#000';

  return (
    <>
      <AppBar sx={{ background: isDark ? '#1f1f1f' : '#1976d2' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Typography>Company name</Typography>
            <button
              onClick={() => setIsDark(!isDark)}
              style={{
                background: 'transparent',
                border: '1px solid white',
                padding: '8px',
                color: 'white',
                cursor: 'pointer',
                borderRadius: '20px'
              }}
            >
              {isDark ? 'Light🌄Mode' : 'Dark🌚Mode'}
            </button>
          </div>

          {isLogged ? (<>
            <Link style={{ color: 'white', textDecoration: 'none', marginRight: '10px' }} to="/">Home</Link>
            <Link style={{ color: 'white', textDecoration: 'none', marginRight: '10px' }} to="/about">About</Link>
            <Link style={{ color: 'white', textDecoration: 'none', marginRight: '10px' }} to="/does-not-exist">404 Test</Link>
            <Link style={{ color: 'white', textDecoration: 'none', marginRight: '10px' }} onClick={logout}>Logout</Link>
          </>) : ''}

          <Link style={{ color: 'white', textDecoration: 'none' }} onClick={login}>Login</Link>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 10 }}>
        <Outlet />
      </Container>
    </>
  )
}

function App() {

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App