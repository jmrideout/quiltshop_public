import React from 'react';
import { fetchProductByID, setProductReserved } from '../api/QuiltshopAPI';
import { Box, Card, CardMedia, makeStyles, Button, Snackbar, SnackbarContent } from '@material-ui/core';

const useStyles = makeStyles({
  gridcontainer: {
    display: "grid",
    gridTemplateColumns: "300px auto",
    padding: 24
  },
  title: {
    gridColumn: "1 / span 2",
    paddingBottom: 20
  },
  griditem: {
    margin: 0,
  },
  detailcontainer: {
    paddingLeft: 10,
    paddingRight: 10,
    display: "grid",
    gridTemplateRows: "auto 100px"
  },
  detailitem: {
    padding: 10
  }
});


const ProductDetailPage = (props) => {
  const classes = useStyles();
  const [product, setProduct] = React.useState({});
  const [snackbarIsOpen, setSnackbarIsOpen] = React.useState(false);

  React.useEffect(
    () => {
      (
        async () => {
          console.log(props)
          const product = await fetchProductByID(props.match.params.product_id);
          setProduct(await product);
        }
      )()
    }, [props]
  );


  const addToCart = (productObject) => {
    // Cannot add product if it hasn't loaded
    if (!productObject)
      return;

    let cart = localStorage.getItem("QuiltCart");

    if (cart === null)
      cart = JSON.stringify([productObject]);
    else {
      // Read cart, append item
      cart = JSON.parse(cart);
      cart.push(productObject);
      cart = JSON.stringify(cart);
    }
    // Set localStorage QuiltCart
    localStorage.setItem("QuiltCart", cart);
    setProductReserved(productObject, true)
      .then(resp=>console.log(resp));

    // Alert
    setSnackbarIsOpen(true);
  };

  return (
    <Card className={classes.gridcontainer}>
      <Box className={classes.title}><h2>{product.name ? product.name : "Loading"}</h2></Box>
      <CardMedia className={classes.griditem} component="img" alt={product.name} image={product.image_url} />
      <Box className={classes.detailcontainer}>
        <p className={classes.detailitem}>{product.description}</p>
        <p className={classes.detailitem}>
        {product.price_in_cents ? `$${(product.price_in_cents/100).toFixed(2)}` : null}
        &nbsp;
        <Button variant="contained" color="primary" onClick={()=>addToCart(product)}>Add to cart</Button>
        </p>
        <Snackbar open={snackbarIsOpen} autoHideDuration={5000} onClose={()=>setSnackbarIsOpen(false)}>
          <SnackbarContent
            message={'Added to cart.'}
          />
        </Snackbar>
      </Box>
    </Card>
  );
};

export default ProductDetailPage;
