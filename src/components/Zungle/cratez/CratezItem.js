import React, { useState } from "react";
import { useEffect } from "react";

export default function CratezItem({ id, addCrate, removeCrate }) {
  const [clicked, setClicked] = useState(false);

  const onCratePressed = (e) => {
    if (clicked) {
      // true -> false: remove
      removeCrate(id);
    } else {
      // false -> true: add
      addCrate(id);
    }
    setClicked(!clicked);
  };

  const clickedClass = clicked ? "border-mnkz-tan" : "";
  const imgClass = `w-16 bg-mnkz-blue border-2 border-black rounded border-solid ${clickedClass} hover:border-mnkz-tan hover:cursor-pointer`;

  return (
    <>
      <div class="flex justify-center">
        <div class="flex flex-col m-2 rounded overflow-hidden w-16">
          <img
            class={imgClass}
            onClick={() => onCratePressed()}
            src={
              clicked
                ? `${process.env.PUBLIC_URL}/images/cratez/zoogz.gif`
                : `${process.env.PUBLIC_URL}/images/cratez/crate-full.png`
            }
          />
          <p>#{id}</p>
        </div>
      </div>
    </>
  );
}
