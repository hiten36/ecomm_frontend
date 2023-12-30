import Dropdown from 'react-dropdown';
import { CartContext } from 'pages/_app';
import { useContext, useEffect, useRef, useState } from 'react';


const countries = [
  { label: 'Country 1', value: '1' },
  { label: 'Country 2', value: '2' },
];
export const CheckoutStep1 = ({ onNext }) => {

  const { userDetails } = useContext(CartContext);

  const [formData , setFormData] = useState({
    firstName:"", 
    lastName:"",
    phoneNumber:"",
    email:""
  })


  const changeHandler =  (e)=>{
    setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }))
 }

 useEffect(()=>{

  const checkUser = localStorage.getItem("ecomm_user");

  if(checkUser){
    var storedUserObject = JSON.parse(checkUser);


     const {firstName , lastName , email , phoneNumber} = storedUserObject; 

    setFormData((prev) => ({
      ...prev, 
    firstName: firstName,
    lastName: lastName , 
    email: email , 
    phoneNumber:phoneNumber
    }));
  }
 },[userDetails])





  return (
    <>
      {/* <!-- BEING CHECKOUT STEP ONE -->  */}
      <div className='checkout-form'>
        <form onClick={(e) => e.preventDefault()}>
          <div className='checkout-form__item'>
            <h4>Info about you</h4>
            <div className='box-field'>
              <input
                type='text'
                className='form-control'
                placeholder='Enter your name' 
                value={formData.firstName}
                name='firstName'
                onChange={changeHandler}

              />
            </div>
            <div className='box-field'>
              <input
                type='text'
                className='form-control'
                placeholder='Enter your last name'
                value={formData.lastName} 
                name='lastName'
                onChange={changeHandler}

              />
            </div>
            <div className='box-field__row'>
              <div className='box-field'>
                <input
                  type='tel'
                  className='form-control'
                  placeholder='Enter your phone'
                  value={formData.phoneNumber}
                  name='phoneNumber'
                  onChange={changeHandler}

                />
              </div>
              <div className='box-field'>
                <input
                  type='email'
                  className='form-control'
                  placeholder='Enter your mail'
                  value={formData.email}
                  name='email'
                  onChange={changeHandler}

                />
              </div>
            </div>
          </div>
          <div className='checkout-form__item'>
            <h4>Delivery Info</h4>

            <Dropdown
              options={countries}
              className='react-dropdown'
              onChange={(option) => console.log(option.value)}
              placeholder='Select a country'
            />
            <div className='box-field__row'>
              <div className='box-field'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter the city'
                />
              </div>
              <div className='box-field'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter the address'
                />
              </div>
            </div>
            <div className='box-field__row'>
              <div className='box-field'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Delivery day'
                />
              </div>
              <div className='box-field'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Delivery time'
                />
              </div>
            </div>
          </div>
          <div className='checkout-form__item'>
            <h4>Note</h4>
            <div className='box-field box-field__textarea'>
              <textarea
                className='form-control'
                placeholder='Order note'
              ></textarea>
            </div>
            <label className='checkbox-box checkbox-box__sm'>
              <input type='checkbox' />
              <span className='checkmark'></span>
              Create an account
            </label>
          </div>
          <div className='checkout-buttons'>
            {/* <button className='btn btn-grey btn-icon'>
              {' '}
              <i className='icon-arrow'></i> back
            </button> */}
            <button onClick={onNext} className='btn btn-icon btn-next'>
              next <i className='icon-arrow'></i>
            </button>
          </div>
        </form>
      </div>
      {/* <!-- CHECKOUT STEP ONE EOF -->  */}
    </>
  );
};
