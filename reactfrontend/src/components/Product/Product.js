import React from 'react';
import { Card, CardMedia, CardContent, makeStyles, Tooltip } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import {Redirect} from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    maxWidth: 304,
    margin: 5,
    position: "relative"
  },
  content: {
    padding: 24
  },
  img: {
    maxHeight: 100,
    minHeight: 100
  },
  closeicon: {
    position: 'absolute',
    top: 2,
    right: 2,
    boxShadow: "1px 1px 0px #111",
    backgroundColor: "lightgrey",
    borderRadius: 4
  },
  editicon: {
    position: 'absolute',
    top: 32,
    right: 2,
    boxShadow: "1px 1px 0px #111",
    backgroundColor: "lightgrey",
    borderRadius: 4
  },
});

const Product = (props) => {
  const classes = useStyles();
  //const [editId, setEditId] = React.useState(null);
  const [editRedirect, setEditRedirect] = React.useState(false);
  
  const handleCloseClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(`Removing Product at index ${props.index}`);
    props.removeProduct(props.id, props.index);
  }

  const handleEditClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(`Editing Product with ID:${props.id}`);
    //setEditId(props.id);
    setEditRedirect(true);
  }

  return (
    <Card className={classes.root}>
      <CardMedia component='img' image={props.image_url} className={classes.img}/>
      <CardContent>
        <p>{`${props.name} ${props.is_reserved ? " RESERVED": ''}`}</p>
      </CardContent>
      {
        props.isLoggedIn && props.exists?
          <>
            <Tooltip title="Delete" aria-label="delete" placement="right-start">
              <CloseIcon className={classes.closeicon} onClick={handleCloseClick}/>
            </Tooltip>
            <Tooltip title="Edit" aria-label="edit" placement="right-start">
              <EditIcon className={classes.editicon} onClick={handleEditClick}/>
            </Tooltip>
          </>
            : null
      }
      {editRedirect ? <Redirect to={`/products/${props.id}/edit`} />: null}
    </Card>
  );
};

export default Product;
