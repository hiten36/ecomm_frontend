"use client"
import { ProductsCarousel } from 'components/Product/Products/ProductsCarousel';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { PublicLayout } from 'layout/PublicLayout';

const breadcrumbsData = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Categories',
    path: '/categories',
  },
];


const CategoryProduct = () => {

    const router = useRouter();
    const { id } = router.query;

    const [products , setProducts] = useState(null);

    const fetchProductById = async()=>{
        try{

            const response = await fetch(
                `http://localhost:4000/api/v1/getProductsByCategoryId/${id}`,
                {
                  method: "GET",
                  headers: {
                    "content-type": "application/json",
                  },
                }
              );
        
              const formattedResponse = await response.json();

              if(formattedResponse?.success){
                setProducts(formattedResponse?.products);
              }

        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchProductById();
    },[id])


    return (
        <>
        <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle='Category Product'>
        <section className='trending'>
        <div className='trending-content'>
       
          <div className='tab-wrap trending-tabs'>
          
            <div className='products-items'>
              <ProductsCarousel products={products} />
            </div>
          </div>
        </div>
      </section>
        </PublicLayout>
        </>
    )
  };
  
  export default CategoryProduct;