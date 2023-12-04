import { SocialLogin } from 'components/shared/SocialLogin/SocialLogin';
import router from 'next/router';
import { useState } from 'react';

export const Login = () => {


  const [formDetails , setFormDetails]  = useState({
    email:"",
    password:""
  })

  // handle on change
  const handleOnChange = (e) => {
    setFormDetails((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

    // Handle Form Submission
    const handleOnSubmit =async (e) => {

      e.preventDefault();
  
  
      const response = await fetch("http://localhost:4000/api/v1/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        // the body will send like this to backend
        body: JSON.stringify(formDetails),
      });
  
      const formattedResponse = await response.json();
      console.log('forde' , formattedResponse);
     
      if(!formattedResponse.success){
      alert(formattedResponse.message);
      } else{
        console.log(formattedResponse);
        alert(formattedResponse.message);
       
        router.push('/');

      }

    }

  return (
    <>
      {/* <!-- BEGIN LOGIN --> */}
      <div className='login'>
        <div className='wrapper'>
          <div
            className='login-form js-img'
            style={{ backgroundImage: `url('/assets/img/login-form__bg.png')` }}
          >
            <form onSubmit={handleOnSubmit}>
              <h3>log in with</h3>
              <SocialLogin />

              <div className='box-field'>
                <input
                required 
                onChange={handleOnChange}
                name='email'
                value={formDetails.email}

                  type='text'
                  className='form-control'
                  placeholder='Enter your email or nickname'
                />
              </div>
              <div className='box-field'>
                <input
                 required 
                 onChange={handleOnChange}
                 name='password'
                 value={formDetails.password}
                  type='password'
                  className='form-control'
                  placeholder='Enter your password'
                />
              </div>
              <label className='checkbox-box checkbox-box__sm'>
                <input type='checkbox' />
                <span className='checkmark'></span>
                Remember me
              </label>
              <button className='btn' type='submit'>
                log in
              </button>
              <div className='login-form__bottom'>
                <span>
                  No account?{' '}
                  <a onClick={() => router.push('/registration')}>
                    Register now
                  </a>
                </span>
                <a href='#'>Lost your password?</a>
              </div>
            </form>
          </div>
        </div>
        <img
          className='promo-video__decor js-img'
          src='/assets/img/promo-video__decor.jpg'
          alt=''
        />
      </div>
      {/* <!-- LOGIN EOF   --> */}
    </>
  );
};
