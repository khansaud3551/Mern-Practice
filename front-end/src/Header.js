import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function Header() {
  useEffect(() => {
    AOS.init({
      duration: 800,
    });
  }, []);

  window.addEventListener("scroll", scrollfunction);
  const [scroll, setScroll] = useState(false);
  function scrollfunction() {
    if (window.scrollY > 10) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  }

  return (
    <>
      <div
        className={`${
          scroll ? "bg-red-500" : "bg-transparent"
        } w-full h-20 fixed flex items-center justify-between text-white font-semibold px-4`}
      >
        <h1>HEader</h1>
        <div
          data-aos="fade"
          data-aos-delay="50"
          className={`${scroll ? "animated" : "hidden"} w-80 `}
        >
          <input
            type="text"
            className="w-full rounded-md h-10 outline-none text-red-600 px-2"
          />
        </div>
        <h2 className="">Right</h2>
      </div>
    </>
  );
}

export default Header;

// {
//   scroll
//     ? "bg-red-500 w-full p-4 fixed"
//     : "bg-green-500 w-full p-4 fixed"
// }
