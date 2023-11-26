import { createStackNavigator } from '@react-navigation/stack';
import GroceryHome from './screens/grocery-home.js';
import ProductDetails from './screens/product-details.js';
import ShoppingCart2 from './screens/shopping-cart.js';
import React, { useState, useEffect} from 'react';
export const CartContext = React.createContext();

const Stack = createStackNavigator();

const AppNavigator = () => {

    const [favs, setFavs] = useState([]);
    const [cart, setCart] = useState([]);

    const updateFavs = (productId) => {
      if (favs.includes(productId)) {
        const updatedFavs = favs.filter((id) => id !== productId);
        setFavs(updatedFavs);
      }
      else {
        const updatedFavs = [...favs, productId];
        setFavs(updatedFavs);
      }
    }

    useEffect(() => {
    }, [favs]);

    const addToCart = (product) => {
        let updatedCart;
        if (!cart.some((item) => item.id === product.id)) {
          updatedCart = [...cart, { ...product, quantity: 1 }];
          setCart(updatedCart);
        } else {
          updatedCart = [...cart, { ...product, quantity: 1 }];
        }
      
      };
    
    useEffect(() => {
      }, [cart]);

    const removeFromCart = (productId) => {
      const updatedCart = cart.filter((item) => item.id !== productId);
      setCart(updatedCart);
    };
  
    const updateCartItemQuantity = (productId, newQuantity) => {
      const updatedCart = cart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      setCart(updatedCart);
      if (newQuantity==0) {
        removeFromCart(productId);
      }
    };


  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartItemQuantity, updateFavs, favs }}>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={GroceryHome} options={{headerShown: false}}/>
      <Stack.Screen name="ProductDetails" component={ProductDetails} options={{headerShown: false}}/>
      <Stack.Screen name="Cart" component={ShoppingCart2} options={{headerShown: false}} />
    </Stack.Navigator>
    </CartContext.Provider>
  );
};

export default AppNavigator;