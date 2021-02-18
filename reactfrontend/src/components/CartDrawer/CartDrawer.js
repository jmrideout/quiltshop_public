import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { Box, Card, CardContent, makeStyles, Button } from '@material-ui/core';
import CartDrawerItem from '../CartDrawerItem/CartDrawerItem';
import { Redirect } from 'react-router-dom';

/*CartDrawer is located inside Navigation.*/

const useStyles = makeStyles({
  root: {
    minWidth: 300,
    maxWidth: 304,
    marginRight: 30,
    marginLeft: 30,
    marginTop: 20,
    marginBottom: 20
  },
  cartTitle: {
    display: 'grid',
    gridTemplateColumns: "50% 50%",
    fontFamily: "Great Vibes",
    fontSize: 42
  },
  cartBottom: {
    gridColumnStart: 1,
    gridColumnEnd: 3,
    fontFamily: "Great Vibes",
    fontSize: 24
  }
});

const CartDrawer = (props) => {
  const [redirect, setRedirect] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  const classes = useStyles();

  React.useEffect(
    ()=>{
      let subTotal = 0;
      for (const item of props.contents)
        subTotal += item.price_in_cents;
      setTotal(subTotal/100);
    }, [props]
  );

  // Converts array to tagged items to display in cart
  const fillCart = () => {
    if (props.contents.length) {
      console.log(`props.contents:`);
      console.log(`${props.contents}`);
      return props.contents.map(
        (item, i) => <CartDrawerItem key={i} onItemCloseClick={props.deleteDrawerItem} index={i} {...item} />
      );
    }
  }

  // Cart
  return (
    <div id='test'>
    <Drawer anchor="right" open={props.isOpen} onClick={props.handleDrawerClose}>
      <Card className={classes.root}>
        <CardContent className={classes.cartTitle} style={{textAlign: 'center'}}>
          <Box>
              Cart
          </Box>
          <Box>
            <Button
              variant="contained"
              color="secondary"
              onClick={()=>{props.handleReserveClick(); setRedirect(true)}}
            >
              Reserve
            </Button>
          </Box>
        </CardContent>
      </Card>

      {fillCart()}

      <Card className={classes.root}>
        <CardContent className={classes.cartTitle} style={{textAlign: 'center'}}>
          <Box>
              Total:
          </Box>
          <Box>
            ${total.toFixed(2)}
          </Box>
          <hr style={{margin:15, gridColumnStart: 1, gridColumnEnd: 3,}}/>
          <Box className={classes.cartBottom}>
            Note: Total is an estimate. Actual costs may vary.
          </Box>
        </CardContent>
      </Card>
      {redirect ? <Redirect to='/confirm' /> : null }
    </Drawer>
    </div>
  );
}


export default CartDrawer;
