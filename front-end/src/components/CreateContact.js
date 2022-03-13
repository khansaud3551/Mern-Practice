import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Alerts from "./Alerts";
import { Oval } from "react-loader-spinner";

function CreateContact() {
  const [formsData, setFormsData] = useState({
    name: "",
    phone: "",
    email: "",
    designation: "",
    photo: "",
    loading: false,
  });
  const [image, setImage] = useState("");
  const [success, setSuccess] = useState(false);

  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setFormsData({
      ...formsData,
      [e.target.name]: e.target.value,
    });
  };

  const imageHandle = (e) => {
    setImage(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setFormsData({ ...formsData, loading: true });
    if (
      formsData.name === "" ||
      formsData.phone === "" ||
      formsData.email === "" ||
      formsData.designation === ""
    ) {
      alert("Please fill all the fields");
      return;
    }

    //image work

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "mern-pratice");
    data.append("cloud_name", "dzzg7drmz");

    //sync call to cloudinary

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dzzg7drmz/image/upload",
        data
      );
      setUrl(res.data.url);
    } catch (err) {
      console.log(err);
    }

    console.log(url);

    console.log(formsData);
  };

  //api call

  useEffect(() => {
    if (url) {
      fetch("http://localhost:3001/api/contact/new", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formsData.name,
          phone: formsData.phone,
          email: formsData.email,
          designation: formsData.designation,
          photo: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            console.log(data);
            setSuccess(true);
            setFormsData({ ...formsData, loading: false });
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url]);

  return (
    <div>
      <div className="w-[400px] mx-auto mt-20  border p-4 shadow-md shadow-yellow-300 ">
        <form onSubmit={submitHandler}>
          {formsData.loading ? (
            <Oval
              height="100"
              width="100"
              color="#fbbf24"
              ariaLabel="loading"
            />
          ) : (
            <>
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
                value={formsData.name}
                onChange={changeHandler}
                className="border w-full p-2 my-2"
              />

              <label htmlFor="phone" className="k">
                Phone number
              </label>
              <input
                type="text"
                name="phone"
                value={formsData.phone}
                onChange={changeHandler}
                className="border w-full p-2 my-2"
              />

              <label htmlFor="email" className="w-full">
                Email
              </label>
              <input
                type="text"
                name="email"
                value={formsData.email}
                onChange={changeHandler}
                className="border w-full p-2 my-2"
              />

              <label htmlFor="designation" className="w-full">
                Designation
              </label>

              <select
                name="designation"
                value={formsData.designation}
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

              <div className="w-full border p-2 my-2">
                <label className="my-2" htmlFor="image">
                  Upload Image
                </label>
                <input className="my-2" type="file" onChange={imageHandle} />
              </div>

              <button className="btn bg-amber-400 w-full py-2 my-3 font-medium">
                Save
              </button>
              <Link to="/">
                <button className="btn bg-amber-400 w-full py-2 my-0 font-medium">
                  Back
                </button>
              </Link>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default CreateContact;
