import React, { useEffect, useState } from 'react'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'

function ChatMessages(props) {
    const [isLoading, setIsLoading] = useState(true)
    const [chatData, setChatData] = useState([])
    const [newMessageSent, setNewMessageSent] = useState('')

    const newMessageSentHandler = (textInput) => {
        setNewMessageSent(textInput)
    }


    // using route get chat id from url then load messages for specific chat
    useEffect(() => {
        const fetchChatData = async() => {
            const response = await fetch(`http://localhost:3000/api/chats/${props.chatId}`)
            const data = await response.json()

            console.log(data)
            setIsLoading(false)
            setChatData(data.chat)
        }

        fetchChatData()
    }, [props.chatId, newMessageSent])

  return (
    <div className='border-green-100 border-8 w-3/4 overflow-y-scroll flex flex-col'>
    <div className='flex-1 relative'>
      {/* Chat messages */}
      {isLoading && <p>Loading</p>}
      {!isLoading && chatData && chatData.messages.map((chat) => (
        <div className='border-pink-500 border m-2' key={chat._id}>
          <p>{chat.sender}</p>
          <p>{chat.text}</p>
          <p>{chat.time}</p>
        </div>
      ))}
    </div>
    <div className='bg-white p-4 border-blue-500 border-2'>
      <ChatInput chatId={props.chatId} newMessageSentHandler={newMessageSentHandler}/>
    </div>
  </div>
  )
}

export default ChatMessages