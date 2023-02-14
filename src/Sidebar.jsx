import React, { useEffect, useState } from 'react'

import './Sidebar.css'

import {Avatar,IconButton ,Button} from '@material-ui/core'
// import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcons  from '@material-ui/icons/MoreVert'
import  SearchOutlined from '@material-ui/icons/SearchOutlined'
// import LogoutIcon from '@material-ui/icons/Logout';

import SidebarChat from './SidebarChat'

import { db } from './firebase/firebase-connect'


const Sidebar = ({setUser,user}) => {

const [rooms,setRooms]=useState([])

useEffect(()=>{
  const unsubscribe = db.collection ('rooms').onSnapshot((snapshot)=> 
   setRooms(
    snapshot.docs.map((doc)=>({
         id:doc.id,
         data:doc.data(),
    }))
   )
    )
    return ()=> unsubscribe()
},[])
console.log(rooms);
const sum=()=>{
   console.log("ok"); 
}

  return (
    <div className='sidebar'>
        <div className="sidebar_header">
            <Avatar 
            src={user.photoURL}
            />
            <div className="sidebar_headerRight">

                {/* <IconButton><DonutLargeIcon/></IconButton> */}
                <IconButton><ChatIcon/></IconButton>
                <IconButton><MoreVertIcons /></IconButton>
                <Button onClick={() => {sessionStorage.setItem('user',''); setUser('')}}><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z"/></g></svg></Button>

            </div>
        </div>
        <div className='sidebar_search'>
            <div className="sidebar_searchContainer">
              <SearchOutlined/>
              <input placeholder='Search the chat' type="text" />
            </div>
        </div>
        <div className="sidebar_chat">
            <SidebarChat addNewChat/>
            {
                rooms.map(room=>(
                    <SidebarChat
                     key={room.id}
                     id={room.id}
                     name={room.data.name}
                     photo={room.data.roomPhoto}
                    />
                ))
            }
        </div>

    </div>
  )
}

export default Sidebar
