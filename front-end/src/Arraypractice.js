import React, { useState } from "react";
import { users } from "./user";

function Arraypractice() {
  const [userdata, SetUserdata] = useState({
    id: "",
    name: "",
    age: "",
  });
  const [final, setFinal] = useState([...users]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    SetUserdata({ ...userdata, [name]: value });
  };

  const removeitem = (id) => {
    console.log(`called`);
    console.log(final[1].id, "==", id);
    const newdata = final.filter((item) => item.id !== id);
    setFinal(newdata);
    console.log(final);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    SetUserdata((userdata.id = final.length + 1));
    setFinal([...final, userdata]);
  

    // SetUserdata((userdata.id = aray.length + 1));
  };
  // console.log(aray);
 

  //   const deleteHandler = (id) => {
  //     return setAray(aray.filter((user) => user.id !== id));
  //   };

  return (
    <div className="flex flex-col space-y-3 px-10 w-[550px]">
      <h1 className="text-center text-3xl font-semibold mb-3">
        Array Practice
      </h1>
      <form className="space-y-3 flex flex-col" onSubmit={submitHandler}>
        <input
          name="name"
          value={userdata.name}
          className="w-100 outline-none px-2 py-3"
          type="text"
          placeholder="Enter Name ..."
          onChange={changeHandler}
        />
        <input
          name="age"
          value={userdata.age}
          className="w-100 outline-none px-2 py-3"
          type="text"
          placeholder="Enter Age ..."
          onChange={changeHandler}
        />

        <button
          onClick={submitHandler}
          className="bg-blue-500 shadow-blue-500/50 shadow-lg mx-auto rounded-md text-white font-semibold px-3 py-2"
        >
          Submit
        </button>
      </form>

      {final.map((user) => {
        return (
          <div
            key={user.id}
            className="bg-white px-8 py-3 flex justify-between items-center  border border-white w-100"
          >
            <div>
              <h1>{`Name : ${user.name}`}</h1>
              <h1>{`Age : ${user.age}`}</h1>
              <h1>{user.id}</h1>
            </div>
            <button onClick={() => removeitem(user.id)}>Remove</button>
          </div>
        );
      })}
    </div>
  );
}

export default Arraypractice;
