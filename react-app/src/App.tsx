import React from 'react';
import Test from "./Test"
import "./main.css";

export default function App(): JSX.Element {
  return (
    <div className='bg-black h-screen w-screen'>
      <span className='font-extrabold text-3xl text-white'>
        <Test />
      </span>
    </div>
  );
}
