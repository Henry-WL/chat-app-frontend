import React, { useEffect, useState } from 'react'
import ChatMessage from './ChatMessage'

function ChatMessages() {
    const [isLoading, setIsLoading] = useState(true)
    const [chatData, setChatData] = useState([])
    // using route get chat id from url then load messages for specific chat
    useEffect(() => {
        const fetchChatData = async() => {
            const response = await fetch('http://localhost:3000/api/chats/663ea7f2f886bd698e9114f7')
            const data = await response.json()

            console.log(data)
            setIsLoading(false)
            setChatData(data.chat)
        }

        fetchChatData()
    }, [])

  return (
    <div className='border-green-100 border-8 w-3/4 overflow-y-scroll'>Chat main box
       {/* <ChatMessage/> map and user chat message pass single chat data as props in */}
       {isLoading && <p>Loading</p>}

       {!isLoading && chatData && chatData.messages.map((chat) => {
        return (
            <div className='border-pink-500 border m-2'>
                <p>{chat.sender}</p>
                <p>{chat.text}</p>
                <p>{chat.time}</p>

            </div>
        )
       })}
    </div>
  )
}

export default ChatMessages