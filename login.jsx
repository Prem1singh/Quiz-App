import React, { useContext, useEffect, useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import Header from './Header';
import { context1 } from './context/Main';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { SnackbarProvider, useSnackbar } from 'notistack';

import { useNavigate } from 'react-router-dom';
  const LoginPage = () => {
  const navigator=useNavigate();
  const {logIn}=useContext(context1)
  const [show,setShow]=useState(false)
  const [invalid,setInvalid]=useState(false)
  const { enqueueSnackbar } = useSnackbar();


  const handleClickVariant = (variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar('This is a success message!', { variant });
  };


  const handleLogin = (e) => {
    e.preventDefault();
    const email=e.target.email.value;
    const pass=e.target.password.value;
    const auth = getAuth();
    signInWithEmailAndPassword(auth,email,pass)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    logIn(user)

    localStorage.setItem("user",JSON.stringify(user))
    navigator('/')
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setInvalid(true)
    
  });
    
  };

  return (
    <>
    
    <div className='flex'>
    <div className='w-[50vw] h-[92.5vh] bg-[url(public/loginImg.png)] bg-cover flex items-center justify-center'>
    <img src="public/logintext.svg" alt="" className='w-[40%]' />
    </div>
    <div className='p-10'>
      <div>
        <img src="public/logo.svg" alt="" className='w-[150px]'/>
      </div>
      <div className='mt-[100px] ms-[150px]'>
      <div variant="h4" className='text-[#1935CA] mb-[10px]'>
       <p className='font-bold text-[20px]'>Login to your Account</p>
       <p>with your registered Email Address</p>
      </div>
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          name='email'
          fullWidth
          
          required
        />
        <div className='w-[400px] relative'>
        <TextField
          label="Password"
          type={`${show?"text":"password"}`}
          variant="outlined"
          margin="normal"
          name='password'
          fullWidth
          required
        />
        <p className=' absolute top-[30px] right-[30px] cursor-pointer active:scale-95' style={{userSelect:'none'}} onClick={()=>{setShow(!show)}}>show</p></div>
        <div className='text-[13px] text-[#696F79] mt-[10px] mb-[20px] flex items-center gap-4'><input type="checkbox" name="" id="" /><p>Remember my password</p></div>
        <button
          type="submit"
          className='bg-[#1935CA] text-[white] w-full p-4 rounded-xl hover:bg-[#0f32f7] mt-[10px]'
          
        >
          Login
        </button>
      </form>
      {invalid? <p className='text-[red] mt-3'>Invalid Credential ! Please Enter valid details</p>:''}
    </div></div></div>
    </>
  );
}

export default LoginPage;
