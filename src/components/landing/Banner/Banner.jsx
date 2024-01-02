"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const Banner = () => {

  const [userData , setUserData] = useState([]);

  useEffect(()=>{
       const checkUser = localStorage.getItem("ecomm_user");
       if(checkUser){
         var storedUserObject = JSON.parse(checkUser);

         setUserData(storedUserObject);

       }
       else{
         alert("user not login ");
       }
  },[])

  return (
    <>
      {/* <!-- BEGIN MAIN BLOCK --> */}
      <div className='main-block load-bg'>
        <div className='wrapper'>
          <div className='main-block__content'>
            <span className='saint-text'>Professional</span>
            <p>Welcome <span>{userData?.firstName} {userData?.lastName}</span></p>        
                <h1 className='main-text'>Beauty &amp; Care</h1>
            <p>
              Nourish your skin with toxin-free cosmetic products. With the
              offers that you can’t refuse.
            </p>

            <Link href='/shop'>
              <a className='btn'>Shop now</a>
            </Link>
          </div>
        </div>
        <img
          className='main-block__decor'
          src='/assets/img/main-block-decor.png'
          alt=''
        />
      </div>
      {/* <!-- MAIN BLOCK EOF --> */}
    </>
  );
};
