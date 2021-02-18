import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Header from '../components/Header/Header';
import Navigation from '../components/Navigation/Navigation';
import ProductList from '../components/ProductList/ProductList';
import ProductDetailPage from '../pages/ProductDetailPage';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import CustomQuiltPage from './CustomQuiltPage';
import ConfirmOrderPage from './ConfirmOrderPage';
import LoginPage from './LoginPage';
import ProductEditPage from './ProductEditPage';
import {getLoggedInUser} from '../api/UserAPI';
import NewProductPage from './NewProductPage';
import OrdersPage from './CustomersPage';


const HomePage = (props) => {
  const [user, setUser] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const getUser = async () => {
    if (localStorage.getItem('token') === null) return;
    let response = await getLoggedInUser();
    console.log(await response)
    let data = await response.json();
    console.log(data)
    if (data.username) {
      setIsLoggedIn(true);
      setUser(data.username);
    }
  }

  useEffect(()=>{
    getUser();
    console.log(`useEffect`);
  });

  return(
    <Box>
      <Header />
      <BrowserRouter>
        <Navigation user={user} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
        <hr style={{margin: 20}} />
        <Switch>
          <Route exact path="/products/new/">
            <NewProductPage isLoggedIn={isLoggedIn} />
          </Route>

          <Route exact path="/products/">
            <ProductList
              user={user}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              setUser={setUser}
            />
          </Route>

          <Route exact path="/products/:product_id/" component={ProductDetailPage} />

          <Route exact path="/custom/">
            <CustomQuiltPage />
          </Route>

          <Route exact path="/confirm/">
            <ConfirmOrderPage />
          </Route>

          <Route exact path="/login">
            <LoginPage
              setUser={setUser}
              setIsLoggedIn={setIsLoggedIn}
            />
          </Route>

          <Route exact path="/products/:product_id/edit" component={ProductEditPage} />

          <Route exact path="/orders">
            <OrdersPage isLoggedIn={isLoggedIn} />
          </Route>

          <Route path="/">
            <Redirect to="/products" />
          </Route>

        </Switch>
      </BrowserRouter>
    </Box>
  );
};


export default HomePage;
