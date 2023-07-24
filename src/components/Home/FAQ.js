import { useState, useEffect, useRef } from "react";

export function FAQ() {
  const FAQItems = [
    {
      question: "What can I do with my NFTs?",
      answer:
        "Apart from the interactions that our team develops within the Zungle, all Monkeez and Zoogz holders have IP rights to the art of the character they own. For further questions, check out our Terms of Service.",
    },
    {
      question: "What are Cratez?",
      answer:
        "Every Monkee holder was aidropped at least one crate in Sept 2022. Each crate can be opened for a zoog",
    },
    {
      question: "Are Zoogz stakeable?",
      answer:
        "Only Monkeez are stakeable at the moment. You can stake your Monkeez in the Zungle section of the site",
    },
    {
      question: "What can I do with $MNKZ?",
      answer:
        "$MNKZ is an ecosystem token with evergrowing use cases as our ecosystem exapnds. At current time, you can buy Bananaz to feed your Zoog to level their stats and battle other Zoogz for tokens. From time to time, MNKZ will also be used for certain WL spots to upcoming NFT drops for other projects",
    },
    {
      question: "Is the roadmap public?",
      answer:
        "After releasing Monkeez, Cratez, Zoogz, $MNKZ, Items, and Zoog Battlez, our public roadmap has come to an end. Keep an eye on our socials for news and updates.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className="flex flex-col h-auto min-h-[100vh] items-center mt-[10vh] container m-auto ">
      <div class="m-auto flex flex-col justify-center w-full">
        <span
          id="Tribes"
          class="text-6xl md:text-[100px] text-white text-shadow-custom m-auto font-bold"
        >
          FAQ
        </span>
        {FAQItems?.map((item, index) => {
          return (
            <div
              class="border-black border-4 border-solid bg-white rounded-xl px-4 py-2 mb-4 hover:cursor-pointer box-shadow-custom"
              onClick={() => toggleAccordion(index)}
            >
              <div class="flex flex-row items-center justify-between text-xl md:text-2xl lg:text-3xl font-bold">
                <span>{item?.question}</span>
                <span>{activeIndex !== index ? "+" : "-"}</span>
              </div>
              <div
                class={`${
                  activeIndex === index
                    ? "max-h-full opacity-100"
                    : "hidden max-h-0 opacity-0"
                } overflow-hidden text-base md:text-lg lg:text-xl transition-all duration-300 ease-in-out`}
                // style={{ transition: "max-height 0.6s ease" }}
              >
                <span>{item?.answer}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
