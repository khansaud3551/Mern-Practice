import { useState } from "react";
import "./App.css";
import "./tailwind.css";
import axios from "axios";

function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");

  const onsubmit = async (e) => {
    e.preventDefault();
    if (name && email && message && phone) {
      const response = await fetch("http://localhost:3001/read", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
          phone: phone,
        }),
      });
      const data = await response.json();
      if (data.user) {
        alert("Login Successfully");
      }
    } else {
      alert("Please fill all the fields");
    }
  };

  return (
    <div className="App flex justify-center mt-32 ">
      <form
        className="p-20  shadow-lg flex flex-col space-y-5"
        onSubmit={onsubmit}
      >
        <input
          name="name"
          className="px-4 py-3 outline-none border border-gray-600"
          placeholder="Enter Name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          name="email"
          className="px-4 py-3 outline-none border border-gray-600"
          placeholder="Enter Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          name="message"
          className="px-4 py-3 outline-none border border-gray-600"
          placeholder="Enter Message"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input
          name="phone"
          className="px-4 py-3 outline-none border border-gray-600"
          placeholder="Enter Phone"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button className="bg-yellow-500 py-2 text-white">Submit</button>
      </form>
    </div>
  );
}

export default Form;
