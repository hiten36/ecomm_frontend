"use client"
import { createContext, useEffect, useState } from 'react';
import '../styles/styles.scss';
import { Head } from 'next/document';


export const CartContext = createContext();

const MyApp = ({ Component, pageProps }) => {

  const [cart, setCart] = useState([]);

  const [token , setToken] = useState(null);

  const [userDetails , setUserDetails] = useState(null);

  const [wishlist , setWishlist] = useState([]);


const fetchAllCartItem = async()=>{

   let token = localStorage.getItem("ecomm_userToken");

   console.log("this funtion call");
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

    console.log("cartResponse" ,formattedResponse);

   if(formattedResponse?.success){
              
setCart(formattedResponse?.cartItems);
    }
  } catch (error) {
    console.log(error);
  }
}

const fetchAllWishlistItem = async()=>{
 let token = localStorage.getItem("ecomm_userToken");
  try {
    const response = await fetch(
      "http://localhost:4000/api/v1/fetchAllWishlistItem",
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,

        },
      }
    );

    const formattedResponse = await response.json();              
setWishlist(formattedResponse?.wishlistItem);
  
  } catch (error) {
    console.log(error);
  }
}


useEffect(()=>{
  if(localStorage.getItem("ecomm_userToken")){
  setToken(localStorage.getItem("ecomm_userToken"));
 }

 if(localStorage.getItem("ecomm_user")){
  setUserDetails(localStorage.getItem("ecomm_user"));
 }
 fetchAllCartItem();
 fetchAllWishlistItem();
},[])


  return (
    <>
    {/* <Head> */}
    {/* Add the Razorpay SDK script here */}
    {/* <script src="https://checkout.razorpay.com/v1/checkout.js"></script> */}
  {/* </Head> */}
    <CartContext.Provider value={{ cart, setCart , token , userDetails , setToken , setUserDetails , wishlist , fetchAllCartItem , fetchAllWishlistItem }}>
      <Component {...pageProps} />
    </CartContext.Provider>
   
    </>
  );
};

export default MyApp;
