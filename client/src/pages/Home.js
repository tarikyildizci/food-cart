import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//Material UI imports
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import hamburger from '../assets/hamburger.jpg';
//Custom component imports
import {
  HeroCard,
  ProductCard,
  MobileProductCard,
  JumbotronHeader,
} from '../componentLibrary';

import { GetAllRestaurants } from '../components-functions/APIFunctions';
import Navbar from '../components-functions/Navbar';
import Carousel from 'react-material-ui-carousel';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [carouselItems, setCarouselItems] = useState({});
  const [value, setValue] = useState(null); //navbar's search value

  const heroCardProps = {
    headerTextOne: "Today's",
    headerTextTwo: 'Deal',
    itemName: 'Classic Burger',
    buttonText: 'Order Now',
    image: hamburger,
  };

  const Slicer = (array) => {
    //slices the array to be able to work with responsive screen sizes.
    //The sliced array goes to carousel

    let sliced = { middle: [], large: [] };
    const chunkLarge = 3;
    const chunkMiddle = 2;
    let slicedIndex = 0;

    //For big screens
    for (let i = 0; i < array.length; i += chunkLarge) {
      sliced.large[slicedIndex] = array.slice(i, i + chunkLarge);
      slicedIndex++;
    }

    //For mid-sized screens
    slicedIndex = 0;
    for (let i = 0; i < array.length; i += chunkMiddle) {
      sliced.middle[slicedIndex] = array.slice(i, i + chunkMiddle);
      slicedIndex++;
    }
    setCarouselItems(sliced);
  };

  const GetRestaurants = async () => {
    const response = await GetAllRestaurants();
    return response.data;
  };

  useEffect(() => {
    GetRestaurants().then((restaurants) => {
      Slicer(restaurants);
      setRestaurants(restaurants);
    });
  }, []);
  return (
    <>
      <Navbar
        withSearch
        options={restaurants.map((item) => item.name) || []}
        value={value}
        setValue={setValue}
      />
      <Container maxWidth="lg">
        <Toolbar />
        <Grid container>
          <Grid item xs={12} align="center">
            <Link to="/burgerqueen" style={{ textDecoration: 'none' }}>
              <HeroCard
                headerTextOne={heroCardProps.headerTextOne}
                headerTextTwo={heroCardProps.headerTextTwo}
                itemName={heroCardProps.itemName}
                buttonText={heroCardProps.buttonText}
                image={heroCardProps.image}
              />
            </Link>
          </Grid>
          {/* Carousel */}
          <Grid item xs={12}>
            <JumbotronHeader text="Restaurants" />
          </Grid>

          <Hidden mdDown>
            <Grid item xs={12} align="center">
              <CustomCarousel array={carouselItems.large} xs={4} />
            </Grid>
          </Hidden>
          <Hidden only={['xs', 'lg', 'xl']}>
            <Grid item xs={12} align="center">
              <CustomCarousel array={carouselItems.middle} xs={6} />
            </Grid>
          </Hidden>
          <Hidden smUp>
            <Grid item xs={12} align="center">
              <CustomCarousel array={carouselItems.middle} xs={6} mobile />
            </Grid>
          </Hidden>
        </Grid>
      </Container>
    </>
  );
};

export default Home;

const CustomCarousel = ({ array, xs, mobile }) => {
  return (
    <Carousel animation="slide" navButtonsAlwaysVisible interval={3000}>
      {array &&
        array.map((card, i) => (
          <Grid container key={i}>
            {card[0] ? (
              card.map((c, i) => (
                <Grid item xs={xs} key={i}>
                  <Link
                    to={'/' + c.name.replace(/ /g, '').toLowerCase()}
                    style={{ textDecoration: 'none' }}
                  >
                    {mobile ? (
                      <MobileProductCard
                        key={c.id}
                        header={c.name}
                        image={c.items[0].photoURL}
                      />
                    ) : (
                      <ProductCard
                        key={c.id}
                        header={c.name}
                        image={c.items[0].photoURL}
                      />
                    )}
                  </Link>
                </Grid>
              ))
            ) : (
              <Grid item xs={xs} key={i}>
                <ProductCard
                  key={card.id}
                  header={card.name}
                  image={card.items[0].photoURL}
                />
              </Grid>
            )}
          </Grid>
        ))}
    </Carousel>
  );
};
