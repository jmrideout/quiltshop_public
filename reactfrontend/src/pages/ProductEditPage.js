import { FormControl, TextField, makeStyles, Button, Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';
import React from 'react';
import {fetchProductByID, editProduct} from '../api/QuiltshopAPI';
import {Redirect} from 'react-router-dom';

const useStyles = makeStyles(
  {
    root: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    textFieldHalf: {
      marginLeft: 5,
      marginRight: 5,
      width: '50ch',
      margin: 8
    },
    textFieldFull: {
      marginLeft: 5,
      marginRight: 5,
      width: '100ch',
      margin: 8
    },
    textFieldQuarter: {
      marginLeft: 5,
      marginRight: 5,
      width: '25ch',
      margin: 8
    },
    buttons: {
      margin: 10
    }
  }
);

const ProductEditPage = (props) => {
  // Styling
  const classes = useStyles();

  // Form data variables
  const [quiltName, setQuiltName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [image_url, setImage_url] = React.useState("");
  const [isReserved, setIsReserved] = React.useState(false);
  const [price_in_cents, setPrice_in_cents] = React.useState(0);
  const [product, setProduct] = React.useState({});

  // Button onClick redirect states
  const [confirmRedirect, setConfirmRedirect] = React.useState(false);
  const [cancelRedirect, setCancelRedirect]   = React.useState(false);

  React.useEffect(
    () => {
      (
        async () => {
          const fetchedProduct = await fetchProductByID(props.match.params.product_id);
          setProduct(fetchedProduct);
        }
      )()
    }, [props]
  );
  // Update dependencies on fetched product
  React.useEffect(
    ()=> {
      setQuiltName(product.name);
      setDescription(product.description);
      setImage_url(product.image_url);
      setPrice_in_cents(product.price_in_cents);
      setIsReserved(product.is_reserved);
    }, [product]
  );

  // Send request to server
  // Redirect to detail page
  const handleConfirmClick = () => {
    const productDetail = {
      "id": product.id,
      "name": quiltName,
      "description": description,
      "image_url": image_url,
      "price_in_cents": price_in_cents,
      "is_reserved": isReserved
    }
    const response = editProduct(productDetail);
    console.log(response);
    setConfirmRedirect(true);
  };

  return (
    <div>
      <h1>Edit {product.name}</h1>
      <form className={classes.root}>
        <FormControl>
          <FormGroup row>
            <TextField
              id="name"
              label="Quilt Name"
              color="secondary"
              variant="outlined"
              className={classes.textFieldHalf}
              placeholder={product.name}
              value={quiltName}
              onChange={(e)=>setQuiltName(e.target.value)}
              InputLabelProps={{shrink:true}}
            />
          </FormGroup>
        </FormControl>

        <FormControl>
          <FormGroup row>
            <TextField
              id="description"
              label="Quilt Description"
              color="secondary"
              variant="outlined"
              className={classes.textFieldFull}
              size="medium"
              placeholder={product.description}
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              InputLabelProps={{shrink:true}}
            />
            </FormGroup>
        </FormControl>

        <FormControl>
          <FormGroup row>
            <TextField
              id="image_url"
              label="Quilt Image URL"
              color="secondary"
              variant="outlined"
              className={classes.textFieldFull}
              size="medium"
              placeholder={product.image_url}
              value={image_url}
              onChange={(e)=>setImage_url(e.target.value)}
              InputLabelProps={{shrink:true}}
            />
            </FormGroup>
        </FormControl>

        <FormControl>
          <FormGroup row>
            <TextField
              id="price"
              label="Quilt Price in Cents"
              color="secondary"
              variant="outlined"
              type="number"
              className={classes.textFieldQuarter}
              size="medium"
              placeholder={product.price_in_cents}
              value={price_in_cents}
              onChange={(e)=>setPrice_in_cents(e.target.value)}
              InputLabelProps={{shrink:true}}
            />
            </FormGroup>
        </FormControl>
          <FormGroup>
          <FormControlLabel
            style={{margin: 15}}
            control={
              <Checkbox
                name="isReserved"
                checked={isReserved}
                onChange={(e)=>setIsReserved(e.target.checked)}
              />
            }
            label="Reserved for a Customer?"
          />
        </FormGroup>

        <div>
          <Button
            color="primary"
            variant="contained"
            size="large"
            className={classes.buttons}
            style={{marginLeft: 5}}
            onClick={handleConfirmClick}
          >Confirm
          </Button>
          <Button
            color="secondary"
            variant="contained"
            size="large"
            className={classes.buttons}
            onClick={()=>setCancelRedirect(true)}
          >Cancel
          </Button>
        </div>
      </form>
      {
        confirmRedirect
        ? <Redirect to={`/products/${product.id}`} />
        : null
      }
      {
        cancelRedirect
        ? <Redirect to="/products" />
        : null
      }
      
    </div>
  );
}


export default ProductEditPage;


/*
import React from 'react';
import { Redirect } from 'react-router-dom';


const ConfirmOrderPage = (props) => {
  // Page control variables
  const [cancelRedirect,   setCancelRedirect] = React.useState(false);
  const [confirmRedirect, setConfirmRedirect] = React.useState(false);


  {cancelRedirect  ? <Redirect to="/" /> : null}
*/