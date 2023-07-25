import React from "react";
export default function WhatAreMonkeez(props) {
  return (
    <div
      id="Monkeez"
      class="flex flex-col md:flex-row h-auto md:min-h-[100vh] items-center mt-[10vh] container m-auto"
    >
      <div class="md:w-[50%] flex float-left justify-start mr-4">
        <img
          src={`${process.env.PUBLIC_URL}/images/home/monkeez-bubbles.png`}
          className="max-w-[400px] w-[100%]"
        />
      </div>
      <div class="md:w-[50%] float-right my-10">
        <div class="bg-mnkz-wobo mx-[10px] md:mr-[30px] md:ml-[0px] rounded-[7px] border-solid border-black border-4 p-[10px] box-shadow-custom">
          <span className="text-[3em] pb-[0.3rem] pr-[0.3rem] text-white text-shadow-custom font-bold">
            What are Monkeez?
          </span>
          <p class="text-[1.5rem]">
            The the initial and flagship collection in the Zungle! Monkeez is a
            collection of 4k randomly generated NFTs on the Avalanche blockchain
            building the biggest community of dedicated individuals on AVAX.
            Monkeez come in 4{" "}
            <a class="text-white hover:text-mnkz-tan" href="#Tribes">
              tribes
            </a>{" "}
            which change the daily emission rates of $MNKZ that can be claimed
          </p>
        </div>
      </div>
    </div>
  );
}
