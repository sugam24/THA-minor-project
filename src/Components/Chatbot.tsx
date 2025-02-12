import React, { useState, useRef } from 'react';
import { FaUserCircle, FaStar } from 'react-icons/fa';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Chatbot = () => {
  const iconSize: number = 32;
  const [showFirstMessage, setShowFirstMessage] = useState(true);
  const [conversation, setConversation] = useState<{ sender: string; text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isRateUs, setIsRateUs] = useState(false);
  const [rating, setRating] = useState(0);
  const location = useLocation();

  // Access user_id and user_name from location.state passed from login
  const user_id = location.state?.user_id; // Ensure this is passed from login.tsx
  const user_name = location.state?.user_name || "User"; // Default to "User" if name is missing

  const questions_array: string[] = [
    "See I am feeling very sleepy day by day. What can I do?",
    "How is it possible to establish a consistent sleep schedule?",
    "I'm feeling really down and don't see the point in anything. What's the point of therapy anyway?"
  ];

  const userInput = useRef<HTMLInputElement | null>(null);

  // Handling user input and chatbot response
  const handlebtn = async () => {
    if (userInput.current && userInput.current.value) {
      const user_input = userInput.current.value;
      setConversation(prev => [...prev, { sender: "user", text: user_input }]);
      userInput.current.value = "";

      setIsTyping(true);

      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/post_userinput",
          {
            input: user_input,
            user_id: user_id // Include the user_id in the request
          },
          { headers: { "Content-Type": "application/json" } }
        );

        setTimeout(() => {
          setConversation(prev => [...prev, { sender: "bot", text: response.data.chatbot_response }]);
          setIsTyping(false);
        }, 1500);
      } catch (error) {
        console.error("Error fetching chatbot response:", error);
        setIsTyping(false);
      }
    }
  };

  // Show rating modal
  const handleRateUs = () => {
    setIsRateUs(true);
  };

  // Handle rating selection
  const handleRating = async (rate: number) => {
    setRating(rate);
    setIsRateUs(false);

    try {
      await axios.post("http://127.0.0.1:5000/submit_rating", { rating: rate, user_id: user_id }, { headers: { "Content-Type": "application/json" } });
      alert("Thank you for your feedback!");
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <div className="bg-gray-200 h-screen p-4 flex gap-2 w-full">

      {/* Left Side: Frequent Questions */}
      <div className="w-1/4 bg-gray-400 rounded-md p-4 flex flex-col">
        <div className="text-2xl font-semibold mb-4">Frequent Questions</div>
        <div className="space-y-2">
          {questions_array.map((question, index) => (
            <button
              key={index}
              onClick={() => userInput.current && (userInput.current.value = question)}
              className="w-full bg-gray-300 rounded p-2 text-left"
            >
              {question}
            </button>
          ))}
        </div>
        <button onClick={handleRateUs} className="mt-auto flex items-center justify-center gap-2 p-2 bg-gray-300 rounded">
          <FaStar /> Rate Us
        </button>
      </div>

      {/* Right Side: Chat Box */}
      <div className="w-3/4 bg-gray-300 rounded-md p-4 flex flex-col">

        {/* User Icon */}
        <div className="flex justify-end">
          <FaUserCircle size={iconSize} />
        </div>

        {/* Chat Messages */}
        <div className="flex-grow space-y-4 overflow-y-auto p-4">
          <div className="p-2 text-justify rounded-md min-h-10 w-[50%] bg-gray-50">
            Hi {user_name}! How can I help you?
          </div>

          {conversation.map((message, index) => (
            <div key={index} className={`p-2 text-justify rounded-md min-h-10 w-[50%] ${message.sender === "user" ? "bg-gray-400 ml-[50%]" : "bg-gray-50"}`}>
              {message.text}
            </div>
          ))}

          {/* Typing Animation */}
          {isTyping && (
            <div className="typing-indicator">
              Bot is typing<span className="dot1">.</span><span className="dot2">.</span><span className="dot3">.</span>
            </div>
          )}
        </div>

        {/* Input Box */}
        <div className="flex items-center mt-4">
          <input ref={userInput} type="text" placeholder="Message ChatBot" className="flex-grow p-2 rounded-l-md border" />
          <button onClick={handlebtn} className="p-2 bg-gray-400 rounded-r-md">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.003 21L23 12 2.003 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Rating Modal */}
      {isRateUs && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md text-center">
            <h2 className="text-lg font-semibold mb-2">Rate Us</h2>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar key={star} size={24} className={`cursor-pointer ${star <= rating ? "text-yellow-500" : "text-gray-400"}`} onClick={() => handleRating(star)} />
              ))}
            </div>
            <button onClick={() => setIsRateUs(false)} className="mt-2 p-2 bg-gray-300 rounded">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
