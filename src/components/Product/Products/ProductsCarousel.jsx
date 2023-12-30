"use client"
import {
  SlickArrowPrev,
  SlickArrowNext,
} from 'components/utils/SlickArrows/SlickArrows';
import { CartContext } from 'pages/_app';
import { useContext } from 'react';
import Slider from 'react-slick';
import { SingleProduct } from './SingleProduct/SingleProduct';

export const ProductsCarousel = ({ products }) => {

  const { cart  , token} = useContext(CartContext);

  

  const handleAddToCart = async(id) => {

    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/addToCart/${id}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,

          },
        }
      );

      const formattedResponse = await response.json();

       console.log("afteraddtocart" , formattedResponse);

       if(formattedResponse.success){
        alert("successfuly added to cart");
       }
       else {
        alert(formattedResponse.message)
       }

    } catch (error) {
      console.log(error);
    }

  };


  const settings = {
    dots: false,
    infinite: false,
    arrows: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <SlickArrowPrev />,
    nextArrow: <SlickArrowNext />,
    lazyLoad: 'progressive',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };


  return (
    <>
      <Slider {...settings}>
        {products?.map((product) => (
          <SingleProduct
          
            addedInCart={Boolean(cart?.find((pd) => pd._id === product._id))}
            key={product._id}
            product={product}
            onAddToWish={(id) => console.log(id)}
            onAddToCart={handleAddToCart}
          />
        ))}
      </Slider>
    </>
  );
};
