import React, { useEffect, useRef, useState } from "react";
import userConversation from "../../Zustans/useConversation";
import { useAuth } from "../../context/AuthContext";
import { TiMessages } from "react-icons/ti";
import { IoArrowBackSharp, IoSend } from "react-icons/io5";
import axios from "axios";
import { useSocketContext } from "../../context/socketContext";
import notify from "../../assets/sound/notification.mp3";

const MessageContainer = ({ onBackUser }) => {
  const {
    messages,
    selectedConversation,
    setMessage,
    setSelectedConversation,
  } = userConversation();
  const { socket } = useSocketContext();
  const { authUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendData, setSendData] = useState("");
  const lastMessageRef = useRef();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      const sound = new Audio(notify);
      sound.play();
      setMessage([...messages, newMessage]);
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessage, messages]);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        //const get = await axios.get(`/api/message/${selectedConversation?._id}`);
        const get = await axios.get(
          `http://localhost:3000/api/message/${selectedConversation?._id}`,
          {
            withCredentials: true,
          }
        );

        const data = await get.data;
        if (data.success === false) {
          console.log(data.message);
        }
        setMessage(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessage]);

  const handleMessages = (e) => setSendData(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      // const res = await axios.post(`/api/message/send/${selectedConversation?._id}`, { message: sendData });
      const res = await axios.post(
        `http://localhost:3000/api/message/send/${selectedConversation?._id}`,
        { message: sendData },
        { withCredentials: true } // 👈 if you're using cookie-based auth
      );

      const data = await res.data;
      if (data.success === false) {
        console.log(data.message);
      } else {
        setMessage([...messages, data]);
        setSendData(""); // ✅ Clear the input box after send
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="h-full flex flex-col md:min-w-[500px] bg-white">
      {selectedConversation === null ? (
        <div className="flex items-center justify-center w-full h-full">
          <div className="px-4 text-center text-2xl text-gray-950 font-semibold flex flex-col items-center gap-2">
            <p>Welcome!!👋 {authUser.username} 😉</p>
            <p className="text-lg">Select a chat to start messaging</p>
            <TiMessages className="text-6xl text-center" />
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex justify-between items-center gap-1 bg-sky-600 md:px-4 h-12 rounded-lg">
            <div className="flex gap-2 items-center w-full">
              <div className="md:hidden ml-1">
                <button
                  onClick={() => onBackUser(true)}
                  className="bg-white rounded-full px-2 py-1"
                >
                  <IoArrowBackSharp size={25} />
                </button>
              </div>
              <div className="flex items-center gap-2 mr-2">
                <img
                  className="rounded-full w-8 h-8 md:w-10 md:h-10 object-cover"
                  src={selectedConversation?.profilepic}
                  alt="Profile"
                />
                <span className="text-gray-950 text-sm md:text-xl font-bold">
                  {selectedConversation?.username}
                </span>
              </div>
            </div>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
            {loading && (
              <div className="flex w-full h-full flex-col items-center justify-center">
                <div className="loading loading-spinner"></div>
              </div>
            )}
            {!loading && messages?.length === 0 && (
              <p className="text-center text-gray-500">
                Send a message to start conversation
              </p>
            )}
            {!loading &&
              messages?.length > 0 &&
              messages.map((message) => (
                <div key={message._id} ref={lastMessageRef}>
                  <div
                    className={`flex ${
                      message.senderId === authUser._id
                        ? "justify-end"
                        : "justify-start"
                    } my-2`}
                  >
                    <div
                      className={`max-w-[70%] px-3 py-2 rounded-lg break-words ${
                        message.senderId === authUser._id
                          ? "bg-sky-600 text-white"
                          : "bg-gray-300 text-black"
                      }`}
                    >
                      {message.message}
                      <div className="text-[10px] opacity-70 mt-1 text-right">
                        {new Date(message.createdAt).toLocaleDateString(
                          "en-IN"
                        )}{" "}
                        {new Date(message.createdAt).toLocaleTimeString(
                          "en-IN",
                          {
                            hour: "numeric",
                            minute: "numeric",
                          }
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Input Box - Always Bottom */}
          <form
            onSubmit={handleSubmit}
            className="mt-auto bg-white px-3 py-2 border-t border-gray-300"
          >
            <div className="flex items-center bg-gray-300 rounded-full px-4 py-2">
              <input
                value={sendData}
                onChange={handleMessages}
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-transparent outline-none text-black"
                required
              />
              <button type="submit" className="ml-2">
                {sending ? (
                  <div className="loading loading-spinner"></div>
                ) : (
                  <IoSend size={24} className="text-sky-700 cursor-pointer" />
                )}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default MessageContainer;
