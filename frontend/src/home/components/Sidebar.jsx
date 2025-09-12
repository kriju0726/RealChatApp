import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { useSocketContext } from "../../context/socketContext.jsx";
import userConversation from "../../Zustans/useConversation.jsx";

const Sidebar = ({ onSelectUser }) => {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useAuth();
  const [searchInput, setSearchInput] = useState("");
  const [searchUser, setSearchuser] = useState([]);
  const [chatUser, setChatUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUserId, setSetSelectedUserId] = useState(null);
  const [newMessageUsers, setNewMessageUsers] = useState("");
  const {
    messages,
    setMessage,
    selectedConversation,
    setSelectedConversation,
  } = userConversation();
  const { onlineUsers, socket } = useSocketContext();

  const nowOnline = chatUser.map((user) => user._id);
  //Chats Function
  const isOnline = nowOnline.map(
    (userId) => onlineUsers.includes(userId) ?? false
  );
  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      setNewMessageUsers(newMessage);
    });

    return () => socket?.off("newMessage");
  }, [socket, messages]);

  useEffect(() => {
    const chatUserHandler = async () => {
      try {
        const chatters = await axios.get(`/api/user/currentchatters`);
        const data = chatters.data;
        if (data.success === false) {
          console.log(data.message);
        }
        setChatUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    chatUserHandler();
  }, []);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const search = await axios.get(`api/user/search?search=${searchInput}`);
      const data = search.data;
      if (data.success === false) {
        console.log(data.message);
      }
      if (data.length === 0) {
        toast.info("User not Found");
      } else {
        setSearchuser(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = (user) => {
    onSelectUser(user);
    setSelectedConversation(user);
    setSetSelectedUserId(user._id);
    setNewMessageUsers("");
  };

  const handleSearchback = () => {
    setSearchuser([]);
    setSearchInput("");
  };

  const handleLogOut = async () => {
    const confirmlogout = window.prompt("type 'UserName' To LOGOUT");
    if (confirmlogout === authUser.username) {
      setLoading(true);
      try {
        const logout = await axios.post("/api/auth/logout");
        const data = logout.data;
        if (data.success === false) {
          console.log(data.message);
        }
        toast.info(data.message);
        localStorage.removeItem("ChatApp(2.0)");
        setAuthUser(null);
        navigate("/login");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      toast.info("LogOut Cancelled");
    }
  };

  return (
    <div className="flex flex-col h-screen w-full px-2 py-2 bg-white">
      {/* Header - Search and Profile */}
      <div className="flex justify-between items-center mb-2">
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center bg-gray-100 rounded-full px-3 py-1 flex-1 mr-2"
        >
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            placeholder="Search User"
            className="bg-transparent outline-none w-full"
          />
          <button className="text-sky-600 hover:text-sky-800">
            <FaSearch size={18} />
          </button>
        </form>
        <img
          onClick={() => navigate(`/profile/${authUser?._id}`)}
          src={authUser?.profilepic}
          alt="Profile"
          className="h-12 w-12 rounded-full cursor-pointer hover:scale-110 transition"
        />
      </div>

      <hr className="border-gray-300 mb-2" />

      {/* User List */}
      <div className="flex-1 overflow-y-auto pr-1">
        {searchUser?.length > 0 ? (
          <>
            {searchUser.map((user, index) => (
              <div key={user._id}>
                <div
                  onClick={() => handleUserClick(user)}
                  className={`flex gap-3 items-center rounded p-2 cursor-pointer ${
                    selectedUserId === user?._id ? "bg-sky-100" : ""
                  }`}
                >
                  {/*Socket is Online*/}
                  <div
                    className={`avatar relative ${
                      isOnline[index]
                        ? "after:content-[''] after:w-3 after:h-3 after:bg-green-500 after:rounded-full after:absolute after:bottom-0 after:right-0 after:border-2 after:border-white"
                        : ""
                    }`}
                  >
                    <div className="w-12 rounded-full overflow-hidden">
                      <img
                        src={user.profilepic}
                        alt="user"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-semibold text-gray-800">
                      {" "}
                      {user.username}{" "}
                    </p>
                  </div>
                </div>
                <hr className="border-gray-300" />
              </div>
            ))}
            <div className="py-2 flex justify-center">
              <button
                onClick={handleSearchback}
                className="bg-gray-200 rounded-full px-3 py-1 hover:bg-gray-300"
              >
                <IoArrowBackSharp size={22} />
              </button>
            </div>
          </>
        ) : chatUser.length === 0 ? (
          <div className="text-center text-yellow-600 font-semibold text-lg mt-4">
            <p>Why Are You Alone?</p>
            <p>Search Username to Chat.</p>
          </div>
        ) : (
          <>
            {chatUser.map((user, index) => (
              <div key={user._id}>
                <div
                  onClick={() => handleUserClick(user)}
                  className={`flex gap-3 items-center rounded p-2 cursor-pointer ${
                    selectedUserId === user?._id ? "bg-sky-100" : ""
                  }`}
                >
                  <div
                    className={`avatar relative ${
                      isOnline[index]
                        ? "after:content-[''] after:w-3 after:h-3 after:bg-green-500 after:rounded-full after:absolute after:bottom-0 after:right-0 after:border-2 after:border-white"
                        : ""
                    }`}
                  >
                    <div className="w-12 rounded-full overflow-hidden">
                      <img
                        src={user.profilepic}
                        alt="user"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-semibold text-gray-800">
                      {user.username}
                    </p>
                  </div>
                  <div>
                    {newMessageUsers.reciverId === authUser._id &&
                    newMessageUsers.senderId === user._id ? (
                      <div className="rounded-full bg-green-700 text-sm text-white px-[6px]">
                        +1
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <hr className="border-gray-300" />
              </div>
            ))}
          </>
        )}
      </div>

      {/* Logout */}
      <div className="mt-3 flex items-center gap-2 px-1 py-2">
        <button
          onClick={handleLogOut}
          className="hover:bg-red-600 hover:text-white text-red-600 p-2 rounded-full transition"
        >
          <BiLogOut size={24} />
        </button>
        <span className="text-sm font-medium text-gray-600">LogOut</span>
      </div>
    </div>
  );
};

export default Sidebar;
