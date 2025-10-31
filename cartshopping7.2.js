import React from 'react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      const item = state.find(i => i.name === action.payload.name);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      return state.filter(i => i.name !== action.payload);
    }
  }
});

const { addItem, removeItem } = cartSlice.actions;
const store = configureStore({ reducer: { cart: cartSlice.reducer } });

const products = [
  { name: 'Laptop', price: 1200 },
  { name: 'Mouse', price: 25 },
  { name: 'Keyboard', price: 45 }
];

function ProductList() {
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Products</h2>
      {products.map(p => (
        <div key={p.name}>
          <p>{p.name} - ${p.price}</p>
          <button onClick={() => dispatch(addItem(p))}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

function Cart() {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.map(item => (
        <div key={item.name}>
          <p>{item.name} (${item.price}) [{item.quantity}]</p>
          <button onClick={() => dispatch(removeItem(item.name))}>Remove</button>
        </div>
      ))}
    </div>
  );
}

function CartApp() {
  return (
    <Provider store={store}>
      <div style={{ fontFamily: 'Arial', padding: '20px' }}>
        <h1>My Shop</h1>
        <ProductList />
        <Cart />
      </div>
    </Provider>
  );
}

export default CartApp;
