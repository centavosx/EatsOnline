import React, { useState } from 'react'
import socket from '../socket.js'
import ShowChat from './ShowChat.js'
import '../CSS/Goback.css'
const Chat = () => {
  const [show, setShow] = useState(false)
  const [unread, setUnread] = useState(0)
  React.useEffect(async () => {
    socket.emit('user', localStorage.getItem('id'))
    socket.emit('chat', localStorage.getItem('id'))
    socket.on(`unread/${localStorage.getItem('id')}`, (unread) => {
      setUnread(unread)
    })
  }, [])

  return (
    <div>
      <button
        onClick={() => setShow(!show)}
        id="msgBtn"
        className="msgBtn"
        title="Chat feature"
      >
        <a href={void 0} id="messenger">
          {unread > 0 ? (
            <p
              style={{
                position: 'absolute',
                color: 'red',
                top: '-5px',
                left: '-5px',
                fontWeight: 'bold',
              }}
            >
              {unread}
            </p>
          ) : null}
          <img src={'../../assets/EOLogo_TransparentBG.png'}></img>
        </a>
      </button>
      {show ? <ShowChat /> : null}
    </div>
  )
}

export default Chat
