import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { Navbar as CustomNavbar } from '../componentLibrary';
import { UserContext } from '../context/UserContext';

const Navbar = ({ withSearch, options, value, setValue }) => {
  const { setUser } = useContext(UserContext);

  const Logout = () => {
    setUser(null);
  };
  return (
    <CustomNavbar
      value={value}
      setValue={setValue}
      withSearch={withSearch}
      options={options}
      LogoComponent={
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="h4">Food</Typography>
        </Link>
      }
      RightComponent={
        <>
          <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
            <IconButton>
              <ShoppingCartIcon />
            </IconButton>
          </Link>
          <Button
            onClick={Logout}
            size="small"
            variant="contained"
            color="primary"
          >
            Logout
          </Button>
        </>
      }
    ></CustomNavbar>
  );
};

export default Navbar;
