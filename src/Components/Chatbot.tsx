import React, { useState, useRef, useEffect } from 'react';
import { FaUserCircle, FaStar } from 'react-icons/fa';
import axios from 'axios';
import { useLocation } from 'react-router-dom';



const Chatbot = () => {
  const iconSize: number = 32
  const [showFirstMessage, setShowFirstMessage] = useState(true)
  const [conversation, setConversation] = useState<{ sender: string; text: string }[]>([]);

  // This is teh user which logged in

  const location = useLocation()


  // these are the frequently asked sample questions
  const questions_array: string[] = [
    "Depression and laziness ...",
    "I feel worthless in life...",
    " I don’t think I am doing well lately. I feel anxious every now and then...",
    "My GPA is less than expected. I don’t feel like working hard now..."
  ]


  const userInput = useRef<HTMLInputElement>(null)


  //ahandling the user input
  const handlebtn = async () => {
    if (userInput.current && userInput.current.value) {
      const user_input = userInput.current.value;
      console.log("User Input:", user_input);

      // Add user message to conversation history
      setConversation((prev) => [...prev, { sender: "user", text: user_input }]);

      // Clear input field
      userInput.current.value = "";

      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/post_userinput",
          { input: user_input },
          { headers: { "Content-Type": "application/json" } }
        );

        console.log("Chatbot Response:", response.data.chatbot_response);

        // Add chatbot response to conversation history
        setConversation((prev) => [...prev, { sender: "bot", text: response.data.chatbot_response }]);
      } catch (error) {
        console.error("Error fetching chatbot response:", error);
      }
    }
  };




  return (
    <div className="bg-gray-200 h-screen p-4 flex gap-2 w-full">

      {/* left side questions */}
      <div className="w-1/4 bg-gray-400 rounded-md p-4 flex flex-col">
        <div className="text-2xl font-semibold mb-4">Frequent Questions</div>
        <div className="space-y-2">
          {
            questions_array.map((questions, index) => (
              <ul key={index}>
                <li>
                  <button
                    onClick={() => {
                      console.log("question is there");
                      if (userInput.current) {
                        userInput.current.value = questions;
                      }
                    }}
                    className="w-full bg-gray-300 rounded p-2 text-left"
                  >
                    {questions}
                  </button>

                </li>
              </ul>
            ))
          }

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


        
        {/* {`${showFirstMessage === true ? "p-2 text-justify rounded-md min-h-10 w-[50%] bg-gray-50 " : setShowFirstMessage(false) }} */}


        <div className="flex-grow space-y-4 overflow-y-auto p-4">
          {/* This is how we display the chatbot response */}


          <div className="flex-grow space-y-4 overflow-y-auto p-4">

            <div className={`${showFirstMessage === true ? "p-2 text-justify rounded-md min-h-10 w-[50%] bg-gray-50" : setShowFirstMessage(false) } `}>
            Hi {location.state}! How can I help you?
            </div>

            <div className="flex-grow space-y-4 overflow-y-auto p-4">
              {conversation.map((message, index) => (
                <ul key={index} className="list-none flex flex-col gap-2">
                  <li
                    className={`p-2 text-justify rounded-md min-h-10 w-[50%] ${message.sender === "user" ? "bg-gray-400 ml-[50%]" : "bg-gray-50"
                      }`}
                  >
                    {message.text}
                  </li>
                </ul>
              ))}
            </div>

          </div>




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
