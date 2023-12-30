import Link from 'next/link';

export const Card = ({ cart, onChangeQuantity }) => {
  const {
    title,
    thumbnail,
    _id,
    price,
    quantity,
  } = cart;

  return (
    <>
      <div className='cart-table__row'>
        <div className='cart-table__col'>
          <Link href={`/product/${_id}`}>
            <a className='cart-table__img'>
              <img src={thumbnail} className='js-img' alt='' />
            </a>
          </Link>
          <div className='cart-table__info'>
            <Link href={`/product/${_id}`}>
              <a className='title5'>{title}</a>
            </Link>
        
            <span className='cart-table__info-num'>SKU: {_id}</span>
          </div>
        </div>
        <div className='cart-table__col'>
          
            <span className='cart-table__price'>${price}</span>
        
        </div>
        <div className='cart-table__col'>
          <div className='cart-table__quantity'>
            <div className='counter-box'>
              <span
                onClick={() => onChangeQuantity('decrement', quantity)}
                className='counter-link counter-link__prev'
              >
                <i className='icon-arrow'></i>
              </span>
              <input
                type='text'
                className='counter-input'
                disabled
                value={quantity}
              />
              <span
                onClick={() => onChangeQuantity('increment', quantity)}
                className='counter-link counter-link__next'
              >
                <i className='icon-arrow'></i>
              </span>
            </div>
          </div>
        </div>
        <div className='cart-table__col'>
          <span className='cart-table__total'>
            {/* ${(price * quantity).toFixed(2)} */}
            ${price}
          </span>
        </div>
      </div>
    </>
  );
};
