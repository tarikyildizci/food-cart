import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
//Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import illustration from '../assets/undraw.svg';

import Navbar from '../components-functions/Navbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  table: {
    minWidth: 0,
  },
  image: {
    width: 50,
  },
  noItemText: {
    marginBottom: '2rem',
  },
});

const Cart = () => {
  const [total, setTotal] = useState(0); //total price
  const [dialogOpen, setDialogOpen] = useState(false); //checkout dialog's state

  const { items, setItems } = useContext(CartContext); //selected items are stored in context

  const classes = useStyles();

  const DeleteItem = (index) => {
    const array = [...items];
    array.splice(index, 1);
    setItems(array);
  };

  const Checkout = () => {
    setItems([]);
    setDialogOpen(true);
  };

  const CloseDialog = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    //Everytime items changes total price is getting recalculated
    let newTotal = 0;
    items.forEach((item) => {
      newTotal += parseInt(item.price);
    });
    setTotal(newTotal);
  }, [items]);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Toolbar />
        <Grid container>
          <Grid item xs={12}>
            {items && items[0] ? (
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center"></TableCell>
                      <TableCell align="left">Item</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="center">Remove Item</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.map((item, i) => (
                      <TableRow key={i}>
                        <TableCell align="right" component="th" scope="row">
                          <img className={classes.image} src={item.photoURL} />
                        </TableCell>
                        <TableCell align="left">{item.name}</TableCell>
                        <TableCell align="right">${item.price}</TableCell>
                        <TableCell align="center">
                          <IconButton
                            onClick={() => {
                              DeleteItem(i);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell align="right">
                        Total Price = ${total}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={Checkout}
                        >
                          Checkout
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <>
                <Grid item xs={12}>
                  <Toolbar />
                </Grid>
                <Grid item xs={12} align="center">
                  <Typography
                    className={classes.noItemText}
                    color="textSecondary"
                  >
                    There are no items in your cart.
                  </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                  <img src={illustration} alt="" />
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
      <Dialog open={dialogOpen} onClose={CloseDialog}>
        <DialogTitle>{'Thank You!'}</DialogTitle>
        <DialogContent>
          <DialogContentText>Your orders are on the way!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={CloseDialog} color="primary" autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Cart;
