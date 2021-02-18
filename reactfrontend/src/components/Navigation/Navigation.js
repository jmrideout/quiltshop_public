import Box from '@material-ui/core/Box';
import React from 'react';
import NavigationConfig from '../../config/navigation.json';
import Button from '@material-ui/core/Button';
import CartDrawer from '../CartDrawer/CartDrawer';
import { Link } from 'react-router-dom';

/**
 * Reads config/navigation.json.
 * Displays navigation items in menu.
 * Includes functionality of side drawer
 * @param {object} props 
 */
const Navigation = (props) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [drawerContents, setDrawerContents] = React.useState([]);

  const createNavItem = (navItem) => {
    return (
      <Link key={navItem["title"]} to={navItem["path"]}>
        <Button variant="contained" style={{margin: 4}}>
          <Box component="span" m="3">
            {navItem["title"]}
          </Box>
        </Button>
      </Link>
    );
  }

  const handleCartClick = () => {
    // Read localStorage["QuiltCart"]
    let cart = localStorage.getItem("QuiltCart");

    if (cart === null)
      cart = [];
    else
      cart = JSON.parse(cart);

    // Fill Drawer
    setDrawerContents(cart);

    // Open drawer
    setIsDrawerOpen(true);
  }

  // localStorage array index gets deleted
  const deleteDrawerItem = (lsArrayIndex) => {
    // Remove from local storage
    // Then set drawer contents
    let array = localStorage.getItem("QuiltCart");
    if (array !== null) {
      array = JSON.parse(array);
      array.splice(lsArrayIndex, 1);
      setDrawerContents(array);
      array = JSON.stringify(array);
      localStorage.setItem("QuiltCart", array);
    }
  }

  const handleDrawerClose= (event) => {
    console.log("click event:")
    console.log(event.target)
    setIsDrawerOpen(false);
  }

  const handleReserveClick = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Box style={{position:"relative"}}>
      {NavigationConfig['navigation'].map(createNavItem)}
      <Box component="span" m='3'>
        <Button variant="contained" color="primary" onClick={handleCartClick} style={{position: "absolute", right:10}}>
          Cart
        </Button>
        { // Get Orders Button
          props.isLoggedIn ? 
          <Link to="/orders">
            <Button
              variant="contained"
              color="secondary"
              style={{margin: 4, marginLeft: 40}}
            >
              Get Orders
            </Button>
          </Link>
          : null
        }
        { // LOGOUT Button
          props.isLoggedIn ? 
          <Button
            variant="contained"
            color="secondary"
            style={{margin: 4}}
            onClick={
              ()=>{
                localStorage.removeItem("token");
                props.setIsLoggedIn(false);
                props.setUser(null);
              }
            }
          >
            Logout
          </Button>
          : null
        }
      </Box>
      <CartDrawer handleReserveClick={handleReserveClick} handleDrawerClose={handleDrawerClose} isOpen={isDrawerOpen} contents={drawerContents} deleteDrawerItem={deleteDrawerItem} id="CartDrawer"/>
    </Box>
  );
}


export default Navigation;
