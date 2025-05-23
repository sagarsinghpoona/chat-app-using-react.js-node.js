import React, { useState } from 'react'
import io from "socket.io-client"
import Chat from "./Components/Chat"
const socket = io.connect("https://poonachat.vercel.app/")
import music from './mixkit-tile-game-reveal-960.wav'

const App = () => {
  const[username,setUsername] =useState("")
  const[room,setRoom] = useState("")
  const[showChat,setshowChat] = useState(false)
  const notification = new Audio(music)
  
  const joinCHat=()=>{
    if(username !==""&& room!==""){
      socket.emit("joinRoom",room);
      setshowChat(true)
      notification.play()


    }
  }

  return (
    <>
   
      {
        !showChat && (
        <div className="joinRoom">
        <h1>Join chat</h1>
      <input type='text' placeholder='Enter your Name'
      onChange={(e)=>setUsername(e.target.value)}
      />
      <input type='text' placeholder='Enter your Room Id'
      onChange={(e)=>setRoom(e.target.value)}/>
      <button onClick={joinCHat}>Join</button>
      

      
    </div>
  )
      }
      { 
        showChat && (
          < Chat socket={socket} username={username} room={room}/>

        )
      }
      
    
      
    </>
  )
}

export default App
