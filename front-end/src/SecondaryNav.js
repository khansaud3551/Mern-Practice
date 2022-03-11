import React, { useState } from "react";

function SecondaryNav() {
  const [showdiv, setShowdiv] = useState(false);
  const handle = () => {
    setShowdiv(!showdiv);
    console.log("clicked");
  };
  return (
    <div className="bg-gray-200 h-[800px]">
      <navbar className="flex justify-around items-center h-full bg-gray-100 h-40">
        <h1 className="text-3xl">Logo</h1>
        <ul className="flex ">
          <li className="menue">Home</li>
          <li className="parent-menue menue li_styling">
            <a href="">DropDown</a>
            <ul className="drop-menue ">
              <li className="li_styling">
                <a href="">Shirts</a>
              </li>
              <li className="li_styling">
                <a href="">Shirts</a>
              </li>
              <li className="li_styling">
                <a href="">Shirts</a>
              </li>
              <li className="li_styling">
                <a href="">Shirts</a>
              </li>
            </ul>
          </li>
        </ul>
      </navbar>
      <div className="flex">
        <div className="sidebar">
          <ul className="right-menue">
            <li className="men-li">
              <a href="">Men</a>
              <div className="menue-div mt-[10px] bg-green-400 w-96  p-2">
                <h1>demo content</h1>
                <h1>demo content</h1>
                <h1>demo content</h1>
              </div>
            </li>
            <li class="aftered">
              <a href="">Name</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SecondaryNav;
