import { FormControl, TextField, makeStyles, Button, Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';
import React from 'react';
import {newProduct} from '../api/QuiltshopAPI';
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

const NewProductPage = (props) => {
  // Styling
  const classes = useStyles();

  // Form data variables
  const [quiltName, setQuiltName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [image_url, setImage_url] = React.useState("");
  const [isReserved, setIsReserved] = React.useState(false);
  const [price_in_cents, setPrice_in_cents] = React.useState("");
  const [new_id, setNew_id] = React.useState("");

  // Button onClick redirect states
  const [confirmRedirect, setConfirmRedirect] = React.useState(false);
  const [cancelRedirect, setCancelRedirect]   = React.useState(false);

  // Send request to server
  // Redirect to detail page
  /* fields = ['name', 'description', 'image_url', 'price_in_cents', 'is_reserved']*/
  const handleConfirmClick = async () => {
    const productDetail = {
      "name": quiltName,
      "description": description,
      "image_url": image_url,
      "price_in_cents": price_in_cents,
      "is_reserved": isReserved
    }
    const response = await newProduct(productDetail);
    console.log(await response);
    if (response["id"])
    setNew_id(response["id"]);
  };

  React.useEffect(
    ()=> {
      console.log("new_id useEffect")
      if (new_id !== "")
        setConfirmRedirect(true);
    }, [new_id]
  );

  return (
    <div>
      {!props.isLoggedIn ? <Redirect to="/" /> : null}
      <h1>Add a New Product</h1>
      <form className={classes.root}>
        <FormControl>
          <FormGroup row>
            <TextField
              id="name"
              label="Quilt Name"
              color="secondary"
              variant="outlined"
              className={classes.textFieldHalf}
              value={quiltName}
              onChange={(e)=>setQuiltName(e.target.value)}
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
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
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
              value={image_url}
              onChange={(e)=>setImage_url(e.target.value)}
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
              value={price_in_cents}
              onChange={(e)=>setPrice_in_cents(e.target.value)}
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
        ? <Redirect to={`/products/${new_id}`} />
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


export default NewProductPage;

