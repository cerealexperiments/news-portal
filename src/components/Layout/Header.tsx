import {Menu, Transition} from "@headlessui/react";
import {IoSearch, IoPersonCircleOutline} from "react-icons/io5";
import logo from "../../assets/logo.svg";
import {Link, useNavigate} from "react-router-dom";
import React, {Fragment, useContext, useState} from "react";
import headerImage from "../../assets/header.png";
import AuthContext from "../../context/AuthContext";
import {notifySuccess} from "../../helpers/notifications";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const { logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(`/?search=${searchValue}`);
    setSearchValue("");
  };

  const handleLogout = () => {
    logout();
    notifySuccess("Выполнен выход из аккаунта");
  };

  return (
    <div
      className="bg-gray-500 h-[240px] pt-8 flex bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: `url(${headerImage})` }}>
      <div className="max-w-screen-xl mx-auto w-full flex flex-col">
        <div className="flex items-center justify-between">
          <Link to={"/"}>
            <img src={logo} alt="" />
          </Link>
          <div className="flex align-center gap-6">
            <div className="flex items-center gap-2">
              <form onSubmit={handleSubmit} className="h-full">
                <input
                  onChange={(event) => {
                    setSearchValue(event.target.value);
                  }}
                  value={searchValue}
                  type="text"
                  disabled={!isOpen}
                  id="default-search"
                  className={`${
                    isOpen ? "opacity-100" : "opacity-0"
                  } block self-stretch h-full px-4 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:outline-none transition-all duration-300`}
                  placeholder="Найти пост..."
                />
              </form>
              <IoSearch
                className="self-stretch max-w-max w-full cursor-pointer hover:fill-slate-300 transition-colors"
                onClick={() => setIsOpen((prevState) => !prevState)}
                size="30px"
                fill="white"
              />
            </div>
            <Menu as="div" className="relative text-left self-center">
              <Menu.Button className="flex">
                <IoPersonCircleOutline
                  className="hover:fill-slate-300 transition-colors"
                  size="30"
                  fill="white"
                />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-300"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95">
                <Menu.Items className="absolute right-0 top-6 z-10 mt-3.5 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/profile"
                          className={
                            "w-full " +
                            classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )
                          }>
                          Мой профиль
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={
                            "w-full text-left " +
                            classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )
                          }>
                          Выйти
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <Menu as="div" className="relative text-left self-center">
              <div>
                <Menu.Button className="flex flex-col justify-center gap-1.5 group">
                  <div className="w-6 h-0.5 bg-white group-hover:bg-slate-300 transition-colors"></div>
                  <div className="w-6 h-0.5 bg-white group-hover:bg-slate-300 transition-colors"></div>
                  <div className="w-6 h-0.5 bg-white group-hover:bg-slate-300 transition-colors"></div>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-300"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95">
                  <Menu.Items className="absolute right-0 top-6 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/favorites"
                            className={
                              "w-full " +
                              classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )
                            }>
                            Избранные новости
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </div>
            </Menu>
          </div>
        </div>
        <h2 className="text-center font-medium text-6xl text-white flex items-center justify-center align-middle h-full">
          Новости
        </h2>
      </div>
    </div>
  );
};

export default Header;
