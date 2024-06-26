import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Link } from 'react-router-dom';

function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#333', color: '#fff', boxShadow: 'none' }}>
      <Toolbar>
      <Typography  marginLeft={1} letterSpacing={1} variant="h5" fontFamily="Roboto" component="div" sx={{ flexGrow: 1 }}>
          Matemáticas Discretas
        </Typography>
        <div>
          <IconButton
            size="large"
            edge="end"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
            sx={{ '&:hover': { backgroundColor: 'white' } }}
          >
            <MenuOpenIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem component={Link} to="/" onClick={handleClose}>Conjuntos</MenuItem>
            <MenuItem component={Link} to="/Universo" onClick={handleClose}>Universo</MenuItem>
            <MenuItem component={Link} to="/Combinaciones" onClick={handleClose}>Combinaciones y permutaciones</MenuItem>
            <MenuItem component={Link} to="/Relaciones" onClick={handleClose}>Relaciones</MenuItem>
            <MenuItem component={Link} to="/Aritmetica" onClick={handleClose}>Aritmetica Modular</MenuItem>
            <MenuItem component={Link} to="/Grafos" onClick={handleClose}>Grafos</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
