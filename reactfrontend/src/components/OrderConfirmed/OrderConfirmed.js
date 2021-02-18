import React from 'react';
import {addCustomer} from '../../api/QuiltshopAPI';

const OrderConfirmed = (props) => {
  // Send data to server
  React.useEffect(
    () => {
      if (props.validatedAddress["street_address"] !== undefined) {
        (async()=>{
          const response = await addCustomer({
            first_name: props.firstName,
            last_name: props.lastName,
            address1: props.validatedAddress["street_address"],
            address2: "",
            address3: "",
            city: props.validatedAddress["city"],
            state: props.validatedAddress["state"],
            zipcode: props.validatedAddress["zipcode"],
            zipcode_ext: props.validatedAddress["zipcode_ext"],
            phone: props.phone,
            email: props.email
          });
          console.log(await response);
        })();
      }
    }, [props.validatedAddress, props.firstName, props.lastName, props.phone, props.email]
  );

  const formatLocalStorage = (item) => {
    return (
      <div>
        <p>
          {item.name} - ${Math.ceil(item.price_in_cents/100).toFixed(2)}
        </p>
        {item.name === "Custom Quilt" ? <p>&nbsp;&nbsp;&nbsp;&nbsp;{item.details.size} size - {item.details.binding} stitched, with {item.details.intricacy} intricacy</p> : null}
      </div>
    );
  }

  return (
    <div>
      <h2>Your request has been sent.</h2>
      <p>Thank you for visiting Stiches Quilt Shop!</p>
      <p>Name: {props.firstName} {props.lastName}</p>
      <p>Address:</p>
      <p>{props.validatedAddress["street_address"] ? props.validatedAddress["street_address"] : null}</p>
      <p>{props.validatedAddress ? props.validatedAddress["city"] : null},&nbsp;
      {props.validatedAddress ? props.validatedAddress["state"] : null}&nbsp;
      {props.validatedAddress ? props.validatedAddress["zipcode"] : null}</p>
      <p>Phone: {props.phone}</p>
      <p>Email: {props.email}</p>
      <hr style={{margin:20}} />
      <p>Requested Items:</p>
      {JSON.parse(localStorage.getItem("QuiltCart")).map(formatLocalStorage)}
    </div>
  );
}

export default OrderConfirmed;
