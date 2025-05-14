import React, { useState , useEffect , useRef} from 'react';

import tune from '../assets/sagar.mp3'




const Chat = ({socket,username,room}) => {
 
  const[currentmessage,setCurrentmessage] = useState("");
  const[messageList,setMessageList] = useState([]);
  const notification = new Audio(tune);

 



  const sendMessage= async ()=>{
     
    if(currentmessage!==""){
      const messageData={
        id:Math.random(),
        room:room,
        author:username,
        message:currentmessage,
        time:new Date(Date.now()).getHours()%12 + ":" +new Date(Date.now()).getMinutes()
      }
      await socket.emit("send_message",messageData)
      setMessageList((list)=>[...list,messageData]);
      setCurrentmessage("");
      notification.play()
    

    
     
    }};
  useEffect(() => {
  const handdleReceiveMsg =(data) =>{
    setMessageList((list)=>[...list,data])
  }
socket.on("receive_message",handdleReceiveMsg);
    return () => {
     socket.off("receive_message",handdleReceiveMsg);
    }
  }, [socket])

  const containRef = useRef(null)
  useEffect(() => {
   containRef.current.scrollTop = containRef.current.scrollHeight;
  }, [messageList])
  
  
  return (
    
    <>
   
    <div className="chat_container">
       <h1>Welcome { username} </h1>
     
      <div className="chat_box">
        <div className="auto_scrolling_div" ref={containRef}

        style={{
          height:'450px',
        overflow:'auto',
      border:'2px solid yellow'}

        }>
        {
          messageList.map((data)=>(
            <div key={data.id} className='message_content'
            id={username ==data.author ? "you":"other"}>
              <div>
                <div 
                className="msg"
                 id={username ==data.author ? "y":"b"}>
                  <p>{data.message}</p>
                </div>
                <div className="msg_detail">
                  <p>{data.author}</p>
                  <p>{data.time}</p>
                </div>
              </div>
              </div>
          ))   
           }
           </div>
        <div className="chat_body">
          <input
          value={currentmessage}
          type='text'
          placeholder='Enter your message'
          onChange={(e)=>setCurrentmessage(e.target.value)}
          onKeyPress={(e)=>{e.key=="Enter" && sendMessage()}}/>
          <button onClick={sendMessage} >&#9658;</button>
        </div>
      </div></div>

    </>
  )
}
export default Chat