import React, { useState, useRef } from 'react';
import { FaUserCircle, FaStar } from 'react-icons/fa';
import axios from 'axios';


const Chatbot = () => {
  // const [messages, setMessages] = useState([
  //   { sender: 'ChatBot', text: "Hello, I’m here to listen. Can you tell me a bit more about what’s been troubling you?" },
  //   { sender: 'User', text: 'hello'},
  //   { sender: 'User', text: "I just feel... empty. Like, nothing I do really matters." },
  //   { sender: 'ChatBot', text: "That sounds difficult. Have you felt this way for a while?" },
  //   { sender: 'User', text: "Yeah, for months. I thought it would pass, but it hasn’t." }
  // ]);

  interface messageObj{
    user: string;
    chatbot: string;
  }

  const [messages, setMessages] = useState<messageObj>({
    user: "hello i am a user",
    chatbot: "i am a chatbot"
  })

  
  const userInput = useRef<HTMLInputElement>(null)


  
  //ahandling the user input
  const handlebtn = async () => {
    if (userInput.current && userInput.current.value) {
      const user_input = userInput.current.value
      console.log(userInput.current.value)
      console.log("Input is given to the model");

      const response = await axios.post('http://127.0.0.1:5000/post_userinput', { input: user_input }, {
        headers: {
          "Content-Type": "application/json",  // Set content type to JSON
        },
      });

      console.log(response.data)


      if (userInput.current) {
        userInput.current.value = ""
      }
    }
  };


  return (
    <div className="bg-gray-200 h-screen p-4 flex">
      <div className="w-1/3 bg-gray-400 rounded-md p-4 flex flex-col">
        <div className="text-3xl font-bold mb-4">MENU</div>
        <div className="space-y-2">
          <button className="w-full bg-gray-300 rounded p-2 text-left">Depression and laziness ...</button>
          <button className="w-full bg-gray-300 rounded p-2 text-left">I feel worthless in life...</button>
          <button className="w-full bg-gray-300 rounded p-2 text-left">
            I don’t think I am doing well lately. I feel anxious every now and then...
          </button>
          <button className="w-full bg-gray-300 rounded p-2 text-left">
            My GPA is less than expected. I don’t feel like working hard now...
          </button>
        </div>
        <button className="mt-auto flex items-center justify-center gap-2 p-2 bg-gray-300 rounded">
          <FaStar /> Rate Us
        </button>
      </div>
      <div className="w-2/3 bg-gray-300 rounded-md p-4 flex flex-col">
        <div className="flex justify-end">
          <FaUserCircle size={32} />
        </div>
        <div className="flex-grow space-y-4 overflow-y-auto p-4">
          {/* {messages.map((message, index) => (
            <div key={index} className={`p-2 rounded-md ${message.sender === 'User' ? 'bg-gray-100 self-end' : 'bg-gray-200'}`}>
              <strong>{message.sender}</strong>
              <div>{message.text}</div>
            </div>
          ))} */}
          {/* This is the user input: {messages} */}

          <h1 className='p-2 rounded-md bg-gray-200'>{messages.chatbot}</h1>
          <h1 className='p-2 rounded-md bg-gray-100'>{messages.user}</h1>

          

        </div>
        <div className="flex items-center mt-4">
          <input ref={userInput} type="text" placeholder="Message ChatBot" className="flex-grow p-2 rounded-l-md border" />
          <button onClick={handlebtn} className="p-2 bg-gray-400 rounded-r-md">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.003 21L23 12 2.003 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
