import { useState } from "react";
import "./App.css";
import "./tailwind.css";
import Header from "./Header.js";

import Form from "./Form";
import Arraypractice from "./Arraypractice";
import SecondaryNav from "./SecondaryNav";

function App() {
  return (
    <>
      <Header />

      <div className="w-full h-screen flex items-center justify-center bg-gray-200 ">
        <Arraypractice />

        {/* <Form />  */}
      </div>
      <Arraypractice />
      <SecondaryNav />
    </>
  );
}

export default App;
