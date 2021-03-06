import React, { useState } from "react";
import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{ user }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);

  const Login = async () => {
    if (!user) {
      const res = await signInWithPopup(firebaseAuth, provider)
        .then((result) => {
          const {
            user: { refreshToken, providerData },
          } = result;
          dispatch({
            type: actionType.SET_USER,
            user: providerData[0],
          });
          localStorage.setItem("user", JSON.stringify(providerData[0]));
        })
        .catch((err) => {
          console.warn(err);
        });
    } else {
      setIsMenu(!isMenu);
    }
  };

  const Logout = () => {
    setIsMenu(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16  backdrop-blur-lg bg-red-50 shadow-md">
      {/* desktop && tablet */}
      <div className="hidden md:flex w-full h-full items-center justify-between gap-2 ">
        <Link to="/">
          <div className="flex items-center w-full gap-2">
            <img src={Logo} className="w-10 object-cover" alt="logo" />
            <p className="text-headingColor text-xl font-bold">City</p>
          </div>
        </Link>

        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 1, x: 200 }}
            className="flex items-center gap-8 "
          >
            <li
              className="text-base text-textColor cursor-pointer hover:text-headingColor transition-all duration-100 ease-in-out"
              onClick={() => {
                setIsMenu(false);
              }}
            >
              Home
            </li>
            <li
              className="text-base text-textColor cursor-pointer hover:text-headingColor transition-all duration-100 ease-in-out"
              onClick={() => {
                setIsMenu(false);
              }}
            >
              Menu
            </li>
            <li
              className="text-base text-textColor cursor-pointer hover:text-headingColor transition-all duration-100 ease-in-out"
              onClick={() => {
                setIsMenu(false);
              }}
            >
              About
            </li>
            <li
              className="text-base text-textColor cursor-pointer hover:text-headingColor transition-all duration-100 ease-in-out"
              onClick={() => {
                setIsMenu(false);
              }}
            >
              Service
            </li>
          </motion.ul>
          <div className="relative flex items-center justify-center">
            <MdShoppingBasket className="text-textColor text-2xl " />

            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">2</p>
            </div>
          </div>

          <div className="relative">
            <img
              src={user ? user.photoURL : Avatar}
              alt="userprofile"
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              onClick={Login}
            />

            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 flex flex-col shadow-xl rounded-lg absolute  gap-3 top-12 right-0"
              >
                {user && user.email === "funkexohero@gmail.com" && (
                  <Link to="/createItem">
                    <p
                      className="px-4 py-2 flex items-center justify-center cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                      onClick={() => {
                        setIsMenu(false);
                      }}
                    >
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}

                <p
                  onClick={Logout}
                  className="px-4 py-2 flex items-center justify-center cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="flex md:hidden items-center justify-between  w-full h-full ">
        <div className="relative flex items-center justify-center">
          <MdShoppingBasket className="text-textColor text-2xl " />

          <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
            <p className="text-xs text-white font-semibold">2</p>
          </div>
        </div>

        <Link to="/">
          <div className="flex items-center w-full gap-2">
            <img src={Logo} className="w-10 object-cover" alt="logo" />
            <p className="text-headingColor text-xl font-bold">City</p>
          </div>
        </Link>

        <div className="relative">
          <img
            src={user ? user.photoURL : Avatar}
            alt="userprofile"
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
            onClick={() => {
              Login();
            }}
          />

          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-gray-50 flex flex-col shadow-xl rounded-lg absolute top-12 right-0"
            >
              {user && user.email === "funkexohero@gmail.com" && (
                <Link to="/createItem">
                  <p
                    className="px-4 py-2 flex items-center justify-center cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                    onClick={() => {
                      setIsMenu(false);
                    }}
                  >
                    New Item <MdAdd />
                  </p>
                </Link>
              )}

              <ul className="flex flex-col">
                <li
                  className="text-base text-textColor cursor-pointer hover:text-headingColor transition-all duration-100 ease-in-out hover:bg-slate-100 px-4 py-2"
                  onClick={() => {
                    setIsMenu(false);
                  }}
                >
                  Home
                </li>
                <li
                  className="text-base text-textColor cursor-pointer hover:text-headingColor transition-all duration-100 ease-in-out hover:bg-slate-100 px-4 py-2"
                  onClick={() => {
                    setIsMenu(false);
                  }}
                >
                  Menu
                </li>
                <li
                  className="text-base text-textColor cursor-pointer hover:text-headingColor transition-all duration-100 ease-in-out hover:bg-slate-100 px-4 py-2"
                  onClick={() => {
                    setIsMenu(false);
                  }}
                >
                  About
                </li>
                <li
                  className="text-base text-textColor cursor-pointer hover:text-headingColor transition-all duration-100 ease-in-out hover:bg-slate-100 px-4 py-2"
                  onClick={() => {
                    setIsMenu(false);
                  }}
                >
                  Service
                </li>
              </ul>

              <p
                className="m-2 p-2 rounded-md shadow-md flex items-center justify-center cursor-pointer bg-red-300 hover:bg-red-400 transition-all duration-100 ease-in-out text-textColor text-base"
                onClick={() => {
                  Logout();
                }}
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
