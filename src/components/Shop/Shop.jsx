import { Products } from 'components/Product/Products/Products';
import { PagingList } from 'components/shared/PagingList/PagingList';
import { usePagination } from 'components/utils/Pagination/Pagination';
import productData from 'data/product/product';
import Slider from 'rc-slider';
import { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';
import { AsideItem } from '../shared/AsideItem/AsideItem';

// React Range
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const options = [
  { value: 'highToMin', label: 'From expensive to cheap' },
  { value: 'minToHigh', label: 'From cheap to expensive' },
];

export const Shop = () => {
  const allProducts = [...productData];

  const [productOrder, setProductOrder] = useState(
    allProducts.sort((a, b) => (a.price < b.price ? 1 : -1))
  );

  const [products, setProducts] = useState([]);


  const [topThree , setTopThree] = useState([]);

  const [filter, setFilter] = useState({ isNew: false, isSale: true });

  useEffect(() => {
    setProducts(productOrder);
  }, [productOrder]);

  useEffect(() => {
    if (filter.isNew && filter.isSale) {
      const newPro = productOrder.filter(
        (pd) => pd.isNew === true && pd.isSale === true
      );
      setProducts(newPro);
    } else if (filter.isNew && !filter.isSale) {
      const newPro = productOrder.filter((pd) => pd.isNew === true);
      setProducts(newPro);
    } else if (filter.isSale && !filter.isNew) {
      const newPro = productOrder.filter((pd) => pd.isSale === true);
      setProducts(newPro);
    } else {
      setProducts([...productOrder]);
    }
  }, [filter, productOrder]);

  const paginate = usePagination(products, 9);

  const handleSort = (value) => {
    if (value === 'highToMin') {
      const newOrder = allProducts.sort((a, b) => (a.price < b.price ? 1 : -1));
      setProductOrder(newOrder);
    }
    if (value === 'minToHigh') {
      const newOrder = allProducts.sort((a, b) => (a.price > b.price ? 1 : -1));
      setProductOrder(newOrder);
    }
  };


  const [filterList , setFilterList] = useState([]);

  const [filterItem, setFilterItem] = useState(null);



  const fetchCategory = async()=>{
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/showAllCategory",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      );

      const formattedResponse = await response.json();

      if(formattedResponse.success){
        setFilterList(formattedResponse.data);
        setFilterItem(formattedResponse.data[0]._id);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchProducts = async () => {

    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/categoryPageDetails/${filterItem}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      );

      const formattedResponse = await response.json();
      console.log("category" , formattedResponse);

      if(formattedResponse.success){
        setProducts(formattedResponse?.data?.selectedCategory?.products);

      }

      console.log("actedetail" , formattedResponse);


    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllProducts = async () => {
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

      const reversedProducts = formattedResponse.allProducts.reverse();

      const topThreePro =  reversedProducts.slice(0,3);

      setTopThree(topThreePro);
    } catch (error) {
      console.log(error);
    }
  };


 useEffect(()=>{
 fetchProducts();
 },[filterItem])

  useEffect(()=>{
  fetchCategory();
  fetchAllProducts();
  },[])

  return (
    <div>
      {/* <!-- BEGIN SHOP --> */}
      <div className='shop'>
        <div className='wrapper'>
          <div className='shop-content'>
            {/* <!-- Shop Aside --> */}
            <div className='shop-aside'>
              <div className='box-field box-field__search'>
                <input
                  type='search'
                  className='form-control'
                  placeholder='Search'
                />
                <i className='icon-search'></i>
              </div>
              <div className='shop-aside__item'>
                <span className='shop-aside__item-title'>Categories</span>
                <ul>
                  {
                    filterList?.map((item ,index)=>(
                      <li onClick={()=>setFilterItem(item._id)} key={index}>
                      <a href='#'>
                      {item.title}
                      </a>
                    </li>
                    ))
                  }
               
                </ul>
              </div>

              <div className='shop-aside__item'>
                <span className='shop-aside__item-title'>Price</span>
                <div className='range-slider'>
                  <Range
                    min={0}
                    max={20}
                    defaultValue={[0, 20]}
                    tipFormatter={(value) => `${value}$`}
                    allowCross={false}
                    tipProps={{
                      placement: 'bottom',
                      prefixCls: 'rc-slider-tooltip',
                    }}
                  />
                </div>
              </div>

              <div className='shop-aside__item'>
                <span className='shop-aside__item-title'>You have viewed</span>
                {topThree.map((data) => (
                  <AsideItem key={data.id} aside={data} />
                ))}
              </div>

              <div className='shop-aside__item'>
                <span className='shop-aside__item-title'>Top 3 for today</span>
                {topThree.map((data) => (
                  <AsideItem key={data.id} aside={data} />
                ))}
              </div>
            </div>

            {/* <!-- Shop Main --> */}
            <div className='shop-main'>
              <div className='shop-main__filter'>
                <div className='shop-main__checkboxes'>
                  <label className='checkbox-box'>
                    <input
                      checked={filter.isSale}
                      onChange={() =>
                        setFilter({ ...filter, isSale: !filter.isSale })
                      }
                      type='checkbox'
                    />
                    <span className='checkmark'></span>
                    SALE
                  </label>
                  <label className='checkbox-box'>
                    <input
                      checked={filter.isNew}
                      onChange={() =>
                        setFilter({ ...filter, isNew: !filter.isNew })
                      }
                      type='checkbox'
                    />
                    <span className='checkmark'></span>
                    NEW
                  </label>
                </div>
                <div className='shop-main__select'>
                  <Dropdown
                    options={options}
                    className='react-dropdown'
                    onChange={(option) => handleSort(option.value)}
                    value={options[0]}
                  />
                </div>
              </div>
              <div className='shop-main__items'>
                <Products products={paginate?.currentData()} />
              </div>

              {/* <!-- PAGINATE LIST --> */}
              <PagingList paginate={paginate} />
            </div>
          </div>
        </div>
        <img
          className='promo-video__decor js-img'
          src='/assets/img/promo-video__decor.jpg'
          alt=''
        />
        <img
          className='shop-decor js-img'
          src='/assets/img/shop-decor.jpg'
          alt=''
        />
      </div>
      {/* <!-- SHOP EOF   --> */}
    </div>
  );
};
