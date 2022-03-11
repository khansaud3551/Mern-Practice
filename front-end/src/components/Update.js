import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

function Update() {
  const { contactid } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    designation: "",
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const contactsfetcher = async () => {
      const response = await axios.get(
        `http://localhost:3001/api/contact/${contactid}`
      );
      setFormData(response.data);
    };
    contactsfetcher();
  }, [contactid]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (
      formData.name === "" ||
      formData.phone === "" ||
      formData.email === "" ||
      formData.designation === ""
    ) {
      alert("Please fill all the fields");
      return;
    }
    const response = await axios.put(
      `http://localhost:3001/api/contact/${contactid}`,
      formData
    );
    navigate("/");
  };

  return (
    <div className="w-[800px] mx-auto mt-20">
      <h1>{JSON.stringify(formData)}</h1>
      <form onSubmit={handleUpdate}>
        <h1 className="text-3xl text-center font-semibold mb-2">
          Enter Details
        </h1>

        <label htmlFor="name" className="">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={changeHandler}
          className="border w-full p-2 my-2"
        />

        <label htmlFor="phone" className="k">
          Phone number
        </label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={changeHandler}
          className="border w-full p-2 my-2"
        />

        <label htmlFor="email" className="w-full">
          Email
        </label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={changeHandler}
          className="border w-full p-2 my-2"
        />

        <label htmlFor="designation" className="w-full">
          Designation
        </label>

        <select
          name="designation"
          value={formData.designation}
          onChange={changeHandler}
          className="w-full border p-2 my-2"
          id=""
        >
          <option value="">Select</option>
          <option value="Sudent">Sudent</option>
          <option value="Teacher">Teacher</option>
          <option value="Developer">Developer</option>
          <option value="Sales man">Sales man</option>
        </select>

        <button className="btn bg-amber-400 w-full py-2 my-3 font-medium">
          Update
        </button>
      </form>
    </div>
  );
}

export default Update;
