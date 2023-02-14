import React, { useState,useEffect } from 'react'

import {Avatar,IconButton} from '@material-ui/core'
import  AddCircleIcon from '@material-ui/icons/AddCircle'

import { db } from './firebase/firebase-connect'

import {Link} from 'react-router-dom'




import './SidebarChat.css'

const SidebarChat = ({id,name,photo,addNewChat}) => {

const [messages,setMessages]=useState('')

useEffect(()=>{
    if(id){
        db.collection('rooms')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp','desc')
        .onSnapshot((snapshot)=>
         setMessages (snapshot.docs.map((doc)=>doc.data())))
           
        
    }
},[id])

const creatChat=()=>{
   const roomName = prompt('Please enter room name')
   const roomPhoto =prompt('Add photo URL')
   if (roomName&&roomPhoto){
        db.collection('rooms').add({
            name:roomName,
            roomPhoto
        })
   }
}

  return !addNewChat?(
    <Link to={`/rooms/${id}`}>
    <div className="sideChat">
        <Avatar src={photo}/>
        <div className="sideChat_info">
            <h3>{name}</h3>
          <p>{messages[0]?.message} <span>
            {
             new Date(
                messages[0]?.timestamp?.toDate())
                .toUTCString()
            }
            </span></p>
        </div>
    </div>
    </Link>
  ) :(
    <div className='sideChat'
    onClick={creatChat}
    >
      <h4>Add new chat</h4>
      <div className='sideChat_add'>
        <AddCircleIcon/>
        </div>
      
    </div>
  )
}
export default SidebarChat
