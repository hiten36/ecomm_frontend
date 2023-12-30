"use client"
import { createContext, useEffect, useState } from 'react';
import '../styles/styles.scss';


export const CartContext = createContext();
const MyApp = ({ Component, pageProps }) => {


  const [cart, setCart] = useState([]);

  const [token , setToken] = useState(null);

  const [userDetails , setUserDetails] = useState(null);

console.log("userDetails" , userDetails);

useEffect(()=>{
 if(localStorage.getItem("ecomm_userToken")){
  setToken(localStorage.getItem("ecomm_userToken"));
 }

 if(localStorage.getItem("ecomm_user")){
  setUserDetails(localStorage.getItem("ecomm_user"));
 }
},[])

const fetchAllCartItem = async()=>{
  try {
    const response = await fetch(
      "http://localhost:4000/api/v1/fetchAllCartItems",
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,

        },
      }
    );

    const formattedResponse = await response.json();

   if(formattedResponse?.success){
              
setCart(formattedResponse?.cartItems);



    }
  } catch (error) {
    console.log(error);
  }
}

useEffect(()=>{
   setTimeout(fetchAllCartItem, 1000)
},[token , cart])
  
 

  return (
    

    <CartContext.Provider value={{ cart, setCart , token , userDetails }}>
      <Component {...pageProps} />
    </CartContext.Provider>
   
  );
};

export default MyApp;
