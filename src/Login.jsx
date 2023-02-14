import { Button } from '@material-ui/core'
import React from 'react'

import {auth ,provider} from './firebase/firebase-connect'

import './Login.css'

const Login = ({setuser}) => {
 const signIn=()=>{
         auth.signInWithPopup(provider)
         .then(res => {sessionStorage.setItem('user',res.user);
         setuser(res.user)
        })
        //  .catch((err) => alert(err.message))
    }
  return (
    <div className='login'>
     <div className='login_container'>
        <img
        src='https://tse4.mm.bing.net/th?id=OIP._CULbFZnBUlYx0NJMO1K3QHaFQ&pid=Api&P=0'
        />
        <div className="login_text">
            <h2>Sign in to Whatsapp</h2>
        </div>
  
    
     <Button className='button_1' type='submit'
     onClick={signIn}
     
     >
        <img className='imag_googl' src='https://static.typingclub.com/m/website/authen/google.svg'></img>
        <p>Sign withe google</p> </Button>
        </div> 
    </div>
  )
}

export default Login
