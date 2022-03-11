import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Alerts from "./Alerts";

function ContactList() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    designation: "",
  });
  const [success, setSuccess] = useState(false);
  const [contacts, setContacts] = useState([]);

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
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
    const response = await axios.post(
      "http://localhost:3001/api/contact/new",
      formData
    );
    setSuccess(true);

    console.log(response);
  };

  useEffect(() => {
    const contactsfetcher = async () => {
      const response = await axios.get("http://localhost:3001/api/contacts");
      setContacts(response.data);
      console.log(contacts, "res");
    };
    contactsfetcher();
  }, []);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  }, [success]);

  const deleteContact = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/contact/${id}`
      );
      console.log(response, "deleted");
      setContacts(contacts.filter((contact) => contact.id !== id));
      setSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };

  const updateContact = async (id) => {
    const name = prompt("Enter new name");
    try {
      const response = await axios.put(
        `http://localhost:3001/api/contact/${id}`,
        { name }
      );
      console.log(response, "updated");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="w-[400px] mx-auto mt-20  border p-4 shadow-md shadow-yellow-300 ">
        <form onSubmit={submitHandler}>
          <h1 className="text-3xl text-center font-semibold mb-2">
            Enter Details
          </h1>

          {success && (
            <>
              <Alerts
                severity="success"
                message="The request has successfull"
              />
            </>
          )}

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
            Save
          </button>
        </form>
      </div>

      <div className="w-[700px]  mx-auto mt-20">
        {contacts.map((contact) => {
          return (
            <div
              key={contact._id}
              className="shadow-sm border shadow-yellow-500  px-8 py-4 flex justify-between items-center  w-100 mb-5"
            >
              <div className="">
                <h1>{`Name : ${contact.name}`}</h1>
                <h1>{`Age :  ${contact.email}`}</h1>
              </div>
              <div>
                <h1>{`Phone :  ${contact.phone}`}</h1>
                <h1>{`Designation :  ${contact.designation}`}</h1>
              </div>

              <div className="flex flex-col gap-2">
                <Link
                  to={`/contact/view/${contact._id}`}
                  className="btn bg-amber-400 px-4 py-1"
                >
                  View
                </Link>

                <Link
                  to={`/contact/edit/${contact._id}`}
                  className="btn bg-amber-400 px-4 py-1"
                >
                  Update
                </Link>
                <button
                  onClick={() => deleteContact(contact._id)}
                  className="btn bg-amber-400 px-4 py-1"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ContactList;
