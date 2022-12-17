import React from 'react';
import logo from "../assets/logo.svg";

const Auth = () => {
  return (
    <div className="flex flex-col rounded-2xl shadow-xl shadow-zinc-400 px-10 py-6 max-w-lg w-screen">
      <div className="flex justify-center pb-8">
        <img className="w-32" src={logo} alt="logo"
             style={{filter: "invert(44%) sepia(19%) saturate(1714%) hue-rotate(219deg) brightness(88%) contrast(92%)"}}/>
      </div>
      <div className="flex flex-col gap-6 pb-8">
        <div className="flex justify-between items-center">
          <p>Никнейм</p>
          <input className="w-1/2 border border-slate-300 rounded-md p-1" type="text"/>
        </div>
        <div className="flex justify-between items-center">
          <p>Пароль</p>
          <input className="w-1/2 border border-slate-300 rounded-md p-1" type="text"/>
        </div>
      </div>
      <button className="py-1.5 px-16 rounded-xl bg-violet-600 text-white w-fit self-center">Войти</button>
    </div>
  );
};

export default Auth;