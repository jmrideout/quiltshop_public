import React from 'react';
import { Card, CardMedia, CardContent, makeStyles, Box } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
  root: {
    position: "relative",
    minWidth: 300,
    maxWidth: 304,
    marginRight: 30,
    marginLeft: 30,
    marginTop: 5,
    marginBottom: 5
  },
  content: {
    margin: 0,
  },
  img: {
    maxHeight: 50
  },
  gridcontainer: {
    display: "grid",
    gridTemplateColumns: "70% 30%",
  },
  price: {
    textAlign: 'right'
  },
  closeicon: {
    position: 'absolute',
    top: 2,
    right: 2,
    boxShadow: "1px 1px 0px #111",
    backgroundColor: "lightgrey",
    borderRadius: 4
  }
});


const Product = (props) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardMedia component='img' image={props.image_url} className={classes.img}/>
      <CloseIcon className={classes.closeicon} onClick={()=>{console.log(props.index); props.onItemCloseClick(props.index);}}/>
      <CardContent className={classes.content}>
        <Box className={classes.gridcontainer}>
          <Box>
            <p>{`${props.name}`}</p>
          </Box>
          <Box className={classes.price}>
            <p>{`$${(props.price_in_cents/100).toFixed(2)}`}</p>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Product;