import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { MessageCircle, Send, X } from 'lucide-react';
import { RootState } from '../store/store';
import { ChatActionTypes, sendMessage } from '../store/actions/support.action';
import { Message } from '../types';

const FloatingChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, ChatActionTypes>>();
  const { messages, isLoading, error } = useSelector((state: RootState) => state.chat);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      dispatch(sendMessage(input.trim()));
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Container */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 md:w-96 bg-white rounded-2xl shadow-2xl mb-4 transform transition-all duration-300 ease-in-out">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 rounded-t-2xl">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="bg-white p-2 rounded-full">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-white font-semibold">Support Chat</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-1.5 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-white/80 text-sm">How can we help you today?</p>
          </div>

          {/* Messages Container */}
          <div 
            ref={chatBoxRef}
            className="h-96 overflow-y-auto py-4 px-3 space-y-4 scroll-smooth bg-gray-50"
          >
            {messages.map((message: Message) => (
              <div
                key={message.id}
                className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className={`max-w-[85%] group relative ${
                  message.sender === 'user' 
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-t-2xl rounded-bl-2xl' 
                    : 'bg-white shadow-sm text-gray-800 rounded-t-2xl rounded-br-2xl'
                } p-3 animate-fade-in hover:shadow-md transition-shadow`}>
                  {message.text}
                  <span className={`text-xs mt-1 block opacity-70 ${
                    message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex space-x-2 p-4 bg-white rounded-2xl shadow-sm w-fit">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-200"></div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-2xl text-sm border border-red-100">
                {error}
                <button onClick={() => handleSend()} className="text-red-700 underline ml-2">
                  Try again
                </button>
              </div>
            )}
          </div>

          {/* Input Container */}
          <div className="p-4 bg-white border-t border-gray-100 rounded-b-2xl">
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className={`bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-3 rounded-xl flex items-center gap-2 hover:shadow-lg hover:translate-y-[-1px] active:translate-y-[1px] transition-all ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Send className="w-5 h-5" />
                <span className="hidden md:inline">Send</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl active:translate-y-0.5 transition-all relative"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-10 right-0 bg-white text-gray-800 px-3 py-1 rounded-full text-sm shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
              Need help?
            </span>
          </>
        )}
      </button>
    </div>
  );
};

export default FloatingChatSupport;