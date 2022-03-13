import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Alerts from "./Alerts";

function ContactList() {
  const [formsData, setFormsData] = useState({
    name: "",
    phone: "",
    email: "",
    designation: "",
    photo: "",
  });
  const [image, setImage] = useState("");
  const [success, setSuccess] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [url, setUrl] = useState("");

  //fetches data from the server
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

  //Deleting an item
  const deleteContact = async (id) => {
    try {
      let response = await axios.delete(
        `http://localhost:3001/api/contact/${id}`
      );
      console.log(response, "deleted");
      if (response) {
        let resposne = await axios.get("http://localhost:3001/api/contacts");
        setContacts(resposne.data);
        setSuccess(true);
      }
      // setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="w-[400px] mx-auto mt-20  border p-4 flex justify-center">
        <Link
          to="/createcontact"
          className="bg-yellow-500  text-white font-bold py-2 px-4 rounded-sm "
        >
          Create Contact
        </Link>
      </div>

      <div className="w-[800px]  mx-auto mt-20">
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
              <div className="d-flex justify-center items-center">
                <img
                  className="w-[250px] h-[250px] p-3"
                  src={contact.photo}
                  alt=""
                />
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
