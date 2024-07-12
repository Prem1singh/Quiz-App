import { useContext, useEffect, useState } from 'react';
import React from 'react';
import { TextField, Container, Typography } from '@mui/material';

import { context1 } from './context/Main';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, set, onValue } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const SignupPage = () => {
  const navigator = useNavigate()
  const [data, setdata] = useState(null)
  const [passSame, setPassSame] = useState(true)
  const [exist, setExists] = useState(false)
  const [passShort, setPassShort] = useState(false);
  const [success, setsuccess] = useState(false)
  const [show,setShow]=useState(false)
  const [showConfirm,setShowConfirm]=useState(false)
  
  const handleSignup = (e) => {
    e.preventDefault();
    const displayName = e.target.name.value;
    const email = e.target.email.value;
    const pass = e.target.password.value
    const confirmPass = e.target.confirmPassword.value

    if (pass == confirmPass) {
      if (pass.length <= 6) {
        setPassShort(true)
      } else {
        setPassShort(false)
        setdata({ "email": email, "pass": pass, "displayName": displayName })
        e.target.reset()
      }

      setPassSame(true)
    } else {
      setPassSame(false)
      setPassShort(false)
    }
  };
  useEffect(
    () => {
      if (data != null) {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, data.email, data.pass)
          .then((userCredential) => {
            const user = userCredential.user;
            setExists(false)
            setExists(false)
            setPassSame(true)
            setPassShort(false)
            updateProfile(user, { displayName: data.displayName })
              .then(() => {

                setsuccess(true)

              })
              .catch((error) => {
                setExists(false)
                setPassSame(true)
                setPassShort(false)
                setsuccess(false)
              });

          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setExists(true)
          });
      }
    }, [data]
  )




  return (

    <div className='flex'>
      <div className='w-[50vw] h-[92.5vh] bg-[url(public/loginImg.png)] bg-cover flex items-center justify-center'>
        <img src="public/logintext.svg" alt="" className='w-[40%]' />
      </div>
      <div className='p-10 w-[50vw]'>
        <div>
          <img src="public/logo.svg" alt="" className='w-[150px]' />
        </div>
        <div className='mt-[100px] ms-[150px]'>
          <div variant="h4" className='text-[#1935CA] mb-[10px]'>
            <p className='font-bold text-[20px]'>Create New Account</p>
            <p>with your registered Email Address</p>
          </div>
          <form onSubmit={handleSignup} className='w-[400px]'>
            <TextField
              label="Name"
              type="text"
              name='name'
              variant="outlined"
              margin="normal"
              fullWidth
              required
            />
            <TextField
              label="Email"
              type="email"
              name='email'
              variant="outlined"
              margin="normal"
              fullWidth
              required
            />
            <div className='w-[400px] relative'>
            <TextField
              label="Password"
              type={`${show?'text':'password'}`}
              variant="outlined"
              name='password'
              margin="normal"
              fullWidth
              required
            />
            <p className=' absolute top-[30px] right-[30px] cursor-pointer active:scale-95' style={{userSelect:'none'}} onClick={()=>{setShow(!show)}}>show</p>
            </div>
            <div className='w-[400px] relative'>
            <TextField
              label="Confirm Password"
              type={`${showConfirm?'text':'password'}`}
              variant="outlined"
              name='confirmPassword'
              margin="normal"
              fullWidth
              required
            />
             <p className=' absolute top-[30px] right-[30px] cursor-pointer active:scale-95' style={{userSelect:'none'}} onClick={()=>{setShowConfirm(!showConfirm)}}>show</p></div>
             <button
          type="submit"
          className='bg-[#1935CA] text-[white] w-full p-4 rounded-xl hover:bg-[#0f32f7] mt-[10px]'
          
        >
              Sign Up
            </button>
            <div>
      
    </div>
          </form>
          {passSame ? '' : <p className='text-[red] mt-3'>Password should be same</p>}
          {exist ? <p className='text-[red] mt-3'>Your Account is already exists</p> : ''}
          {passShort ? <p className='text-[red] mt-3'>Password should be atlist 6 characters</p> : ''}
          {success ? <p className='text-[#07cf07] mt-3'>Your Account is Create Successfully !</p> : ''}
        
        </div>
      </div>
    </div>
      );
}

      export default SignupPage;
