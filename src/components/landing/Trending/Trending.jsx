import { ProductsCarousel } from 'components/Product/Products/ProductsCarousel';
import { SectionTitle } from 'components/shared/SectionTitle/SectionTitle';
import { useEffect, useState } from 'react';
import productData from 'data/product/product';

export const Trending = () => {
  const trendingProducts = [...productData];
  const [products, setProducts] = useState([]);
  const [filterItem, setFilterItem] = useState('makeup');
  

  useEffect(() => {
    const newItems = trendingProducts.filter((pd) =>
      pd.filterItems.includes(filterItem)
    );
    setProducts(newItems);

    fetchProducts();
  }, [filterItem]);

  const filterList = [
    {
      name: 'Make Up',
      value: 'makeup',
    },
    {
      name: 'SPA',
      value: 'spa',
    },
    {
      name: 'Perfume',
      value: 'perfume',
    },
    {
      name: 'Nails',
      value: 'nail',
    },
    {
      name: 'Skin care',
      value: 'skin',
    },
    {
      name: 'Hair care',
      value: 'hair',
    },
  ];

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/fetchAllProducts",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      );

      const formattedResponse = await response.json();
      console.log("formatted", formattedResponse);
      setProducts(formattedResponse.allProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  return (
    <>
      {/* <!-- BEGIN TRENDING --> */}
      <section className='trending'>
        <div className='trending-content'>
          <SectionTitle
            subTitle='Cosmetics'
            title='Trending products'
            body='Nourish your skin with toxin-free cosmetic products. With the offers that you can’t refuse.'
          />
          <div className='tab-wrap trending-tabs'>
            <ul className='nav-tab-list tabs'>
              {filterList.map((item ,index) => (
                <li
                  // key={item.value}
key={index}
                  onClick={() => setFilterItem(item.value)}
                  className={item.value === filterItem ? 'active' : ''}
                >
                  {item.name}
                </li>
              ))}
            </ul>
            <div className='products-items'>
              <ProductsCarousel products={products} />
            </div>
          </div>
        </div>
      </section>
      {/* <!-- TRENDING EOF   --> */}
    </>
  );
};
