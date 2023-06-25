import React, { useEffect } from "react";
import { useRouteError } from "react-router-dom";
import { Navbar } from "./Navbar";
import Footer from "./Footer";

export default function PageNotFound(props) {
  const error = useRouteError();
  console.error(error);
  useEffect(() => {
    document.title = props.title;
  }, []);

  return (
    <>
      <Navbar />
      <div class="bg-mnkz-blue home-bg w-full px-16 md:px-0 h-screen flex items-center justify-center">
        <div class="bg-white border-black border-solid border-4 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg text-center">
          <p class="text-mnkz-blue text-shadow-custom text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider">
            404
          </p>
          <p class="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-black mt-4">
            Page Not Found
          </p>
          <p class="text-black mt-4 pb-4 border-b-2 border-black text-center">
            Sorry, the page you are looking for could not be found.
          </p>
          <a
            href="/home"
            class="border-2 border-black border-solidflex items-center space-x-2 bg-mnkz-tan hover:bg-black text-black hover:text-white px-4 py-2 mt-6 rounded duration-150 transition"
            title="Return Home"
          >
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clip-rule="evenodd"
              ></path>
            </svg> */}
            <span>Return Home</span>
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
}

{
  /* <div id="error-page" class="bg-mnkz-blue h-[100vh]">
        <div class="flex flex-col justify-center text-center">
          <div class="m-auto">
            <h1 class="text-[88vw] text-white text-shadow-custom m-auto font-bold mx-auto">
              404
            </h1>
            <div class="bg-white border-4 border-black border-solid rounded-lg h-[400px] flex flex-col justify-center">
              <div class="m-4">
                <div class="overflow-hidden rounded-full w-40 h-40 border-solid border-black border-2 m-auto bg-mnkz-blue">
                  <img
                    src="./images/sad-monkee.png"
                    class="max-w-sm sm:max-w-md my-4 w-40"
                  />
                </div>
                <span>The requested page could not be found</span>
              </div>
            </div>
          </div>
        </div>
      </div> */
}
