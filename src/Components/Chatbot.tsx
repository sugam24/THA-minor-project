import React, { useState, useRef, useEffect } from 'react';
import { FaUserCircle, FaStar } from 'react-icons/fa';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


const Chatbot = () => {
  const iconSize: number = 32


  // This is teh user which logged in

  const location = useLocation()



  const [usermessages, setUsermessages] = useState<string[]>([])

  const [chatbotmessages, setChatbotmessages] = useState<string[]>([
    `Hi ${location.state}! How can I help you?`
  ])

  const userInput = useRef<HTMLInputElement>(null)


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response1 = await axios.get("http://127.0.0.1:5000/get_username")
  //       console.log(response1.data)

  //       const response2 = await axios.get("http://127.0.0.1:5000/post_login_data")
  //       console.log(response2.data)
  //     }
  //     catch (error) {
  //       console.log("Error occurred while fetching the user data", error)
  //     }
  //   }
  //   fetchData()
  // }, [])



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

      setUsermessages((prevmessage) => {
        return [...prevmessage, user_input]
      })
      setChatbotmessages((prevmessage) => {
        return [...prevmessage]
      })


      if (userInput.current) {
        userInput.current.value = ""
      }
    }
  };


  return (
    <div className="bg-gray-200 h-screen p-4 flex gap-2 w-full">

      {/* left side bar */}
      <div className="w-1/4 bg-gray-400 rounded-md p-4 flex flex-col">
        <div className="text-2xl font-semibold mb-4">Chat History</div>
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





      {/* right side chatbox */}
      <div className="w-3/4 bg-gray-300 rounded-md p-4 flex flex-col">

        {/* user icon*/}
        <div className="flex justify-end">
          <FaUserCircle size={iconSize} />
        </div>



        <div className="flex-grow space-y-4 overflow-y-auto p-4">
          {/* This is how we display the chatbot response */}

          {
            chatbotmessages.map((item, index) =>
            (
              <ul className='list-none' key={index}>
                <li className='p-2 text-justify rounded-md bg-gray-50 min-h-10 w-[50%]'>{item}</li>
              </ul>
            )
            )
          }


          {/* This this how we display the user input */}
          {
            usermessages.map((item, index) => (
              <ul className='list-none flex flex-col gap-2' key={index}>
                <li className='p-2 text-justify rounded-md bg-gray-400 min-h-10 w-[50%] ml-[50%]'>{item}</li>
              </ul>
            ))
          }
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
