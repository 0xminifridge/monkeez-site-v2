import { useState, useRef } from "react";
import { TYPE_MAPPINGS } from "../../utils/collection-data";
import { ChevronDownIcon } from "../icons/ChevronDown";

export default function AttributesContainer({
  attributes,
  tribe,
  opacity,
  startingVisibility,
}) {
  const [attributesOpen, setAttributesOpen] = useState(startingVisibility);
  const attributeRef = useRef(null);

  return (
    <div
      class={`${
        opacity ? TYPE_MAPPINGS[tribe] + "/" + opacity : TYPE_MAPPINGS[tribe]
      } flex flex-col border-black border-solid border-4 rounded-lg p-4 my-2 md:my-4 overflow-hidden box-shadow-custom`}
    >
      <div
        class="flex flex-row justify-between items-center py-2  hover:cursor-pointer"
        onClick={() => setAttributesOpen(!attributesOpen)}
      >
        <p class="font-semibold">Attributes</p>
        <div class="flex flex-row items-center">
          <div>
            <p>{attributes?.length}</p>
          </div>
          <ChevronDownIcon direction={attributesOpen ? "up" : "down"} />
        </div>
      </div>
      <div
        class={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ${
          attributesOpen ? "" : "hidden"
        }`}
        ref={attributeRef}
      >
        {attributes?.map((attribute, index) => {
          return (
            <div
              key={index}
              class={`bg-white flex flex-col justify-start px-4 py-2 rounded-lg border-black border-2 border-solid text-start`}
            >
              <p class="text-sm">{attribute.trait_type}</p>
              <p class="text-lg font-bold">{attribute.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
