import { AppBar, Toolbar, Typography, Container, Box, Button } from "@mui/material";
import { Link, Routes, Route, Outlet } from "react-router-dom";
import Home from "./Home.jsx";
import About from "./about.jsx";
import NotFound from "./notfound.jsx";
import { AuthContext } from "./AuthProvider.jsx";
import { useContext, useState } from "react";

function Layout() {
  const { isLogged, login, logout } = useContext(AuthContext);
  const [isDark, setIsDark] = useState(false);

  // Background and text color based on dark mode
  document.body.style.background = isDark ? "#121212" : "#f9f9f9";
  document.body.style.color = isDark ? "#fff" : "#000";

  // Reusable link style
  const navLinkStyle = {
    color: "white",
    textDecoration: "none",
    marginRight: "18px",
    fontWeight: 500,
    fontSize: "1rem",
    position: "relative",
  };

  const linkHoverEffect = `
    a:hover::after {
      width: 100%;
    }
    a::after {
      content: "";
      position: absolute;
      width: 0%;
      height: 2px;
      bottom: -3px;
      left: 0;
      background-color: white;
      transition: width 0.3s ease;
    }
  `;

  return (
    <>
      <style>{linkHoverEffect}</style>
      <AppBar
        position="fixed"
        elevation={3}
        sx={{
          background: isDark ? "#1f1f1f" : "rgb(3,45,66)",
          transition: "background 0.3s ease",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Capstone
            </Typography>

            <Button
              onClick={() => setIsDark(!isDark)}
              variant="outlined"
              sx={{
                borderColor: "white",
                color: "white",
                borderRadius: "30px",
                textTransform: "none",
                fontSize: "0.9rem",
                paddingX: 2.5,
                "&:hover": {
                  borderColor: "white",
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              {isDark ? "Light 🌄 Mode" : "Dark 🌚 Mode"}
            </Button>
          </Box>

          {/* Right side - Navigation */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isLogged ? (
              <>
                <Link style={navLinkStyle} to="/">
                  Home
                </Link>
                <Link style={navLinkStyle} to="/about">
                  About
                </Link>
                {/* <Link style={navLinkStyle} to="/does-not-exist">
                  404 Test
                </Link> */}
                <Link style={navLinkStyle} onClick={logout}>
                  Logout
                </Link>
              </>
            ) : null}
            {!isLogged && (
              <Link style={navLinkStyle} onClick={login}>
                Login
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 12 }}>
        <Outlet />
      </Container>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
