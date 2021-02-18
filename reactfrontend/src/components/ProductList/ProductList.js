import { makeStyles, Box } from '@material-ui/core';
import React from 'react';
import {fetchProducts, deleteProduct} from '../../api/QuiltshopAPI';
import Product from '../Product/Product';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  gridcontainer: {
    display: "grid",
    gridTemplateColumns: "33% 34% 33%",
  }
})

const ProductList = (props) => {
  const classes = useStyles();
  const [products, setProducts] = React.useState([]);

  React.useEffect(
    () => {
      (async () => {
        const request = await fetchProducts();
        setProducts(request["products"]);
      })();
    }, []
  );

  const removeProduct = (id, index) => {
    deleteProduct(id);
    let updatedProducts = [...products];
    updatedProducts.splice(index, 1)
    setProducts(updatedProducts);
  }

  const createProduct = (productObject, index) => {
    return (
      <Link key={productObject.id} to={`products/${productObject.id}`}>
        <Product {...productObject} index={index} removeProduct={removeProduct} user={props.user} isLoggedIn={props.isLoggedIn} exists="true" />
      </Link>
    );
  }

  return(
    <Box>
      <Box className={classes.gridcontainer}>
          {products.length ? products.map((p,i)=>createProduct(p,i)) : null}
          {
            props.isLoggedIn
            ? <Link to="products/new">
                <Product
                  name="Add a Product"
                  description=""
                  price_in_cents={0}
                  image_url=""
                  exists="false"
                />
              </Link>
            : null
          }
      </Box>
    </Box>
  );
};


export default ProductList;

