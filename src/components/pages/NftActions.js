import { updateProfileImage } from "../../contracts/messages";
import ImageIcon from "../icons/ImageIcon";
import { Tooltip } from "flowbite-react";

export default function NFTActions({ isOwner, contractAddress, id, signer }) {
  return (
    <div class="self-end">
      {isOwner && (
        <>
          <Tooltip content={"Set as profile picture"}>
            <button
              data-tooltip-target="update-pfp-tooltip"
              data-tooltip-placement="right"
              class={`box-shadow-custom p-2 md:p-4 rounded-lg bg-mnkz-blue hover:bg-gray-900 hover:text-white my-1`}
              onClick={() => updateProfileImage(signer, contractAddress, id)}
            >
              <ImageIcon />
            </button>
          </Tooltip>
        </>
      )}
    </div>
  );
}
