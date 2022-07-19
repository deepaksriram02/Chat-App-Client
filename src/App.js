
import './App.css'
import  io  from "socket.io-client"
import {useEffect, useState} from 'react'


// const socket = io("http://localhost:3001")
const socket =io("https://dpk-chat.herokuapp.com")


function App() {

  const [message, setMessage]=useState('')
  const [messages, setMessages]=useState([])
  const [username, setUsername]=useState('')
  const [user, setUser]=useState('')


  useEffect(()=>{
    socket.on("receive_message", data=>{
      // alert(data.msg)  
   
      setMessages(prev=>{
        return [...prev, {msg:data.msg, user: data.user}]
      })
    })
  }, [socket])


  function sendMessage(){
    if(message===''){
      return
    }
    socket.emit("send_message", {msg: message, user: user})
    setMessages(prev=>{
      return [...prev, {msg:message, user: 'You'}]
    })
    setMessage('')

  }


  function displayMessages(){
    return messages.map((data,index)=>
      <div key={index} className='msg-line'>
        <div className={data.user==='You'?'message my-message':'message other-message'}>
          <div className="name">{data.user}:</div>
          <div className= "message">{data.msg}</div>
        </div>
        
      </div>
    )
  }



  if(!user){
    return(
      <div className="full-container">
        <div className='container'>
          <div className="heading">Chat App</div>
          <div className='inner-container'>
            <input className="join-tb" type="text" placeholder="enter name" value={username}onChange={
              event=>{
                setUsername(event.target.value)
                event.preventDefault()}}></input>
            <div className='join-btn' onClick={()=>{setUser(username)}}>join</div>
          </div>
    
        </div>
      </div>
      

      
    )
  }


  return (
    <div className="main-container">
      <div className="heading">Chat Room</div>
      <div className="msg-container">{displayMessages()}</div>
      <div className="tb-container">
        <input className="msg-tb" type="text" placeholder="message.." value={message} onChange={event=>{
          event.preventDefault()
          setMessage(event.target.value)
        }}></input>
        <div className="msg-btn"onClick={sendMessage}>send</div>
      </div>
    </div>
  );
}



export default App;
