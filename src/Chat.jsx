import React, { useEffect, useState } from 'react'

import { Avatar, IconButton } from '@material-ui/core'
import MoreVertIcons from '@material-ui/icons/MoreVert'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import AttachFile from '@material-ui/icons/AttachFile'
import MicIcon from '@material-ui/icons/Mic'
import { Dialog,Typography,Modal,Box,Button } from '@mui/material'

import { serverTimestamp } from 'firebase/firestore'

import './Chat.css'
import { useParams } from 'react-router-dom'
import { db } from './firebase/firebase-connect'

const Chat = ({ user }) => {

    const { roomId } = useParams()

    const [Chat, setChat] = useState('')
    const [roomData, setRoomData] = useState('')
    const [message, setMessages] = useState([])

    const [newone, setNewone] = useState(false)

    const sendMessage = (e) => {
        e.preventDefault();

        db.collection('rooms')
            .doc(roomId)
            .collection('messages')
            .add({
                message: Chat,
                name: user.displayName,
                timestamp: serverTimestamp(),
            })
        setChat('')
    }

    useEffect(() => {
        if (roomId) {
            db.collection('rooms')
                .doc(roomId)
                .onSnapshot((snapshot) => setRoomData(snapshot.data()))

            db.collection('rooms')
                .doc(roomId)
                .collection('messages')
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) =>
                    setMessages(snapshot.docs.map((doc) =>
                        doc.data()))
                )
        }
    }, [roomId])

    const toggle = () => {
        newone ? setNewone(false) : setNewone(true)
    }




    return (
        <div className='chat'>
            <div className="chat_header">
                <Avatar src={roomData.roomPhoto} />
                <div onClick={toggle} className="chat_heareInfo">
                    <h3>{roomData.name}</h3>
                    <p>{' '}
                        last seen{' '}
                        {new Date(
                            message[[0]]?.timestamp?.toDate())
                            .toUTCString()
                        }
                           
                    </p>
                    <div>
                    {/* <Button onClick={toggle}>Open modal</Button> */}
                   {/* { newone? <Modal
                        open={newone}
                        onClose={toggle}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Text in a modal
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.hghjfjtddyudjydjytdjtdytddytdyttewt4xgfkruyt
                            </Typography>
                        </Box>
                    </Modal>:""} */}
                </div>
                </div>

                
                <div className="chat_headerRight">
                    <IconButton> <SearchOutlined /></IconButton>
                    <IconButton> <AttachFile /></IconButton>
                    <IconButton><MoreVertIcons /></IconButton>
                </div>
               
            </div>
            <div className="chat_boddy">
                {
                    message.map((chat) => (
                        <p
                            key={chat.timestamp}
                            className={`chat_message ${chat.name === user.displayName && 'chat_recever'

                                }`}

                        >

                            <span className='chat_name'>{chat.name}</span>
                            {chat.message}
                            <span className='chat_timestamp'>{
                                new Date(
                                    message[0]?.timestamp?.toDate())
                                    .toUTCString()
                            }</span>
                        </p>
                    ))
                }
            </div>
            <div className="chat_footer">
                <IconButton> <InsertEmoticonIcon /></IconButton>

                <form>
                    <input type='text'
                        value={Chat}
                        placeholder='Type a message'
                        onChange={
                            (e) => setChat(e.target.value)
                        }
                    />

                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>

                <IconButton>  <MicIcon /></IconButton>
            </div>


        </div>
    )
}

export default Chat
