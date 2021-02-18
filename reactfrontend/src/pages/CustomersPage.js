import React from 'react';
import { Redirect } from 'react-router-dom';
import {fetchCustomers} from '../api/QuiltshopAPI';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';

const CustomersPage = (props) => {
  const [customers, setCustomers] = React.useState([]);

  React.useEffect(
    ()=> {
      (async()=>{
        console.log("useEffect")
        const response = await fetchCustomers();
        console.log(await response)
        setCustomers(await response["customers"]);
      })();
    }, []
  );

  const makeTableRow = (customer_data) => {
    return(
    <TableRow>
      <TableCell>{customer_data["last_name"]}</TableCell>
      <TableCell>{customer_data["first_name"]}</TableCell>
      <TableCell>{customer_data["address1"]}</TableCell>
      <TableCell>{customer_data["address2"]}</TableCell>
      <TableCell>{customer_data["address3"]}</TableCell>
      <TableCell>{customer_data["city"]}</TableCell>
      <TableCell>{customer_data["state"]}</TableCell>
      <TableCell>{customer_data["zipcode"]}</TableCell>
      <TableCell>{customer_data["zipcode_ext"]}</TableCell>
      <TableCell>{customer_data["phone"]}</TableCell>
      <TableCell>{customer_data["email"]}</TableCell>
    </TableRow>
    );
  };

  return (
    <div>
      <h1>Customers</h1>
      {!props.isLoggedIn ? <Redirect to="/" /> : null}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Last Name</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Address 1</TableCell>
              <TableCell>Address 2</TableCell>
              <TableCell>Address 3</TableCell>
              <TableCell>City</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Zipcode</TableCell>
              <TableCell>Zipcode Ext.</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.length ? customers.map(makeTableRow) : null}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CustomersPage;
