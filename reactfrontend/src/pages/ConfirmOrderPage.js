import React from 'react';
import { Button, FormControl, makeStyles, TextField } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import {validateAddress, addCustomer} from '../api/QuiltshopAPI';
import OrderConfirmed from '../components/OrderConfirmed/OrderConfirmed';

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
      width: '75ch',
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
)

const ConfirmOrderPage = (props) => {
  // Page control variables
  const [cancelRedirect,   setCancelRedirect] = React.useState(false);
  const [confirmRedirect, setConfirmRedirect] = React.useState(false);

  // Form data variables
  const [firstName, setFirstName] = React.useState("");
  const [lastName,   setLastName] = React.useState("");
  const [address1,   setAddress1] = React.useState("");
  const [address2,   setAddress2] = React.useState("");
  const [address3,   setAddress3] = React.useState("");
  const [city,           setCity] = React.useState("");
  const [state,         setState] = React.useState("");
  const [zipcode,     setZipcode] = React.useState("");
  const [email,         setEmail] = React.useState("");
  const [phone,         setPhone] = React.useState("");

  // Validated Address data variables
  const [validatedAddress, setValidatedAddress] = React.useState({});

  // Styling
  const classes = useStyles();

  const handleCheckout = () => {
    // Verify form data
    // Send customer data and cart data to server
    // Clear localStorage
    const addressInfo = {
      "street_address": [address1, address2, address3],
      "city": city,
      "state": state,
      "zipcode": zipcode
    }
    // Asychronously get data and set it
    const getData = async ()=> {
      setValidatedAddress(await validateAddress(addressInfo))
    };
    getData()
    setConfirmRedirect(true);
  };


  const renderFormOrConfirmation = () => {
    if (confirmRedirect) {
      return (
        <OrderConfirmed validatedAddress={validatedAddress} firstName={firstName} lastName={lastName} phone={phone} email={email} />
      );
    }
    else {
      return (
        <>
        <h2>Confirm Request</h2>
        <form className={classes.root}>
          <div>
            <FormControl>
              <TextField id="firstname" label="First Name" color="secondary" variant="outlined" className={classes.textFieldHalf} onChange={(e)=>setFirstName(e.target.value)} />
            </FormControl>
            <FormControl>
              <TextField id="lastname" label="Last Name" color="secondary" variant="outlined" className={classes.textFieldHalf} onChange={(e)=>setLastName(e.target.value)} />
            </FormControl>
          </div>

          <div>
            <FormControl>
              <TextField id="address1" label="Address 1" color="secondary" variant="outlined" className={classes.textFieldFull} onChange={(e)=>setAddress1(e.target.value)} />
            </FormControl>
            <FormControl>
              <TextField id="address2" label="Address 2" color="secondary" variant="outlined" className={classes.textFieldFull} onChange={(e)=>setAddress2(e.target.value)} />
            </FormControl>
            <FormControl>
              <TextField id="address3" label="Address 3" color="secondary" variant="outlined" className={classes.textFieldFull} onChange={(e)=>setAddress3(e.target.value)} />
            </FormControl>
          </div>

          <div>
            <FormControl>
              <TextField id="city" label="City" color="secondary" variant="outlined" className={classes.textFieldQuarter} onChange={(e)=>setCity(e.target.value)} />
            </FormControl>
            <FormControl>
              <TextField id="state" label="State" color="secondary" variant="outlined" className={classes.textFieldQuarter} onChange={(e)=>setState(e.target.value)} />
            </FormControl>
            <FormControl>
              <TextField id="zipcode" label="Zipcode" color="secondary" variant="outlined" className={classes.textFieldQuarter} onChange={(e)=>setZipcode(e.target.value)} />
            </FormControl>
          </div>

          <div>
            <FormControl>
              <TextField id="phone" label="Phone Number" color="secondary" variant="outlined" className={classes.textFieldHalf} onChange={(e)=>setPhone(e.target.value)} />
            </FormControl>
            <FormControl>
              <TextField id="email" label="Email" color="secondary" variant="outlined" className={classes.textFieldHalf} onChange={(e)=>setEmail(e.target.value)} />
            </FormControl>
          </div>

          <div>
            <Button
              color="primary"
              variant="contained"
              size="large"
              className={classes.buttons}
              style={{marginLeft: 5}}
              onClick={handleCheckout}
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
        {cancelRedirect  ? <Redirect to="/" /> : null}
        </>
      );
    }
  };

  return renderFormOrConfirmation();
}

export default ConfirmOrderPage;
