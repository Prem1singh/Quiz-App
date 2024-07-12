import { AppBar, Toolbar, Typography, Container } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { context1 } from './context/Main'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
export default function Header() {
  const { user, delUser,settime ,currAns,setcurrAns,setcurrent} = useContext(context1)
  const navigator = useNavigate()
  return (
    <div position="static" className='bg-[#1935CA] text-[white]'>
      <Toolbar>
        <Typography variant="h6">
          <img src="public/headlogo.png" alt="" className='w-[80px]' />
        </Typography>


        <div className='ms-auto flex items-center'>
          <div onClick={()=>{
            settime(60)
            for (const key in currAns) {
              localStorage.setItem(key,null)
            }
            setcurrAns({})
            setcurrent(0)
            localStorage.setItem('timer',60)
            navigator('/')
          }} className=' cursor-pointer'>Home</div>
          {
            (user != null) ?
              <span >
                <span className='flex items-center gap-4'>
                {user.email == 'admin@gmail.com' ? <Link className='mx-5' to={'/create'}> Create </Link> : <Link to={'/play'} className='mx-5'> Play </Link>}
                <button onClick={() => {
                  delUser();
                  localStorage.removeItem('user')
                  navigator('/login')
                }}>logOut</button>
                <div className='flex items-center gap-3 ms-10'>
                <Avatar className='text-white cursor-pointer' >{user.displayName[0]}</Avatar>
                  <div className='text-[gold] cursor-pointer'>{user.displayName}</div>
                  
                  </div>
                </span>
              </span>
              : <span>
                <Link to={'/login'} className='mx-5'>Login</Link>

                <Link to={'/signup'} >Sign Up</Link> </span>

          }

        </div>
      </Toolbar>
    </div>
  )
}
