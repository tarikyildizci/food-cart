import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { CartContext } from '../context/CartContext';

import { GetRestaurantByName } from '../components-functions/APIFunctions';

import { useSnackbar } from 'notistack';

import RestaurantJumbotron from '../components-functions/RestaurantJumbotron';
import Navbar from '../components-functions/Navbar';
import { ProductCard, MobileProductCard } from '../componentLibrary';

import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const Restaurant = () => {
  const { setItems } = useContext(CartContext);

  const location = useLocation();

  const [restaurant, setRestaurant] = useState();

  const { enqueueSnackbar } = useSnackbar();

  const GetRestaurant = async () => {
    //gets rid of the '/' on the pathname and then calls api
    const name = location.pathname.replace('/', '');
    const result = await GetRestaurantByName(name);

    if (result.status === 200) {
      setRestaurant(result.data);
    } else {
      alert('There was an error.');
    }
  };

  const AddToCart = (item, variant) => {
    setItems((prevItems) => [...prevItems, item]);
    //spawns a snackbar every time an item is added
    enqueueSnackbar(`1x ${item.name} added to cart!`, { variant });
  };

  useEffect(() => {
    GetRestaurant();
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Toolbar />
        <Grid container spacing={2}>
          {restaurant ? (
            <>
              <Grid item xs={12} align="center">
                <Hidden smUp>
                  <RestaurantJumbotron
                    name={restaurant.name}
                    slogan={restaurant.description}
                    mobile
                  />
                </Hidden>
                <Hidden xsDown>
                  <RestaurantJumbotron
                    name={restaurant.name}
                    slogan={restaurant.description}
                  />
                </Hidden>
              </Grid>
              <Grid item xs={12}>
                <Toolbar />
              </Grid>
              <Hidden smDown>
                {restaurant.items.map((item, i) => (
                  <Grid item xs={4} align="center">
                    <ProductCard
                      key={i}
                      header={item.name + '- $' + item.price}
                      image={item.photoURL}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          AddToCart(item, 'success');
                        }}
                      >
                        Add to Cart
                      </Button>
                    </ProductCard>
                  </Grid>
                ))}
              </Hidden>
              <Hidden mdUp>
                {restaurant.items.map((item, i) => (
                  <Grid item xs={6} align="center">
                    <MobileProductCard
                      key={i}
                      header={item.name + '- $' + item.price}
                      image={item.photoURL}
                    >
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={() => {
                          AddToCart(item, 'success');
                        }}
                      >
                        Add to Cart
                      </Button>
                    </MobileProductCard>
                  </Grid>
                ))}
              </Hidden>
            </>
          ) : (
            'Loading'
          )}
        </Grid>
      </Container>
    </>
  );
};

export default Restaurant;
