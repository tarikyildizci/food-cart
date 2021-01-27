import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext({ items: [] });

const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  return (
    <CartContext.Provider value={{ items, setItems }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
