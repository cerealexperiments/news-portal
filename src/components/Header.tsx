import React from 'react';
import { IoSearch, IoPersonCircleOutline } from "react-icons/io5";

const Header = () => {
  return (
    <div className="bg-gray-500 h-[240px] pt-8 flex">
      <div className="max-w-screen-xl mx-auto w-full flex flex-col">
        <div className="flex items-center justify-between">
          <h1 className="text-white font-bold text-2xl">Megalab</h1>
          <div className="flex align-center gap-6">
            <IoSearch size="30" fill="white"/>
            <IoPersonCircleOutline size="30" fill="white"/>
          </div>
        </div>
        <h2 className="text-center font-medium text-6xl text-white flex items-center justify-center align-middle h-full">Новости</h2>
      </div>
    </div>
  );
};

export default Header;
