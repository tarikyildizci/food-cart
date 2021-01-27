import axios from 'axios';

export const GetAllRestaurants = async () => {
  try {
    const response = await axios.get(
      'https://food-cart-api.herokuapp.com/restaurants'
    );
    return response;
  } catch (error) {
    return error;
  }
};
export const GetRestaurantByName = async (name) => {
  try {
    const response = await axios.get(
      'https://food-cart-api.herokuapp.com/restaurants/' + name
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const UserLogin = async (email, password) => {
  try {
    const response = await axios.post(
      'https://food-cart-api.herokuapp.com/users/login',
      {
        email: email,
        password: password,
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const CreateUser = async (email, password, surname, address, name) => {
  try {
    const response = await axios.post(
      'https://food-cart-api.herokuapp.com/users',
      {
        email: email,
        password: password,
        surname: surname,
        address: address,
        name: name,
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
