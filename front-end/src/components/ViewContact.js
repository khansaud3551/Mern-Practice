import axios from "axios";
import React, { useEffect } from "react";
import { Oval } from "react-loader-spinner";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function ViewContact() {
  const { contactid } = useParams();
  const [state, setState] = React.useState({
    contacts: [],
    loading: false,
  });

  console.log("1st");

  const { contacts, loading } = state;

  useEffect(() => {
    console.log("2nd");
    fetchData();
  }, []);

  const fetchData = async () => {
    console.log("3rd");
    setState({ ...state, loading: true });
    const response = await axios.get(
      `http://localhost:3001/api/contact/${contactid}`
    );
    setState({ contacts: response.data, loading: false });
    console.log("4th");
  };

  console.log("4th");

  return (
    <div className="w-[700px] mx-auto mt-32 shadow-md shadow-yellow-400 flex justify-center items-center flex-col py-3">
      {loading ? (
        <Oval height="100" width="100" color="#fbbf24" ariaLabel="loading" />
      ) : (
        <>
          <img className="p-5  h-[500px]" src={contacts.photo} alt="" />
          <h1 className="text-3xl text-center font-normal mb-2">
            <span>Name :</span> {contacts.name}
          </h1>
          <p className="text-center text-3xl  font-normal mb-2">
            <span>Email : </span>
            {contacts.email}
          </p>
          <p className="text-center text-3xl  font-normal mb-2">
            <span>Phone : </span>
            {contacts.phone}
          </p>
          <p className="text-center text-3xl  font-normal mb-2">
            <span>Designation : </span>
            {contacts.designation}
          </p>
          <Link to="/">
            <button className="bg-yellow-400 text-black  text-white font-bold py-2 px-8 rounded-sm ">
              Back
            </button>
          </Link>
        </>
      )}
    </div>
  );
}

export default ViewContact;
