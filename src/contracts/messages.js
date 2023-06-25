import { log } from "../helpers/console-logger";
import axios from "axios";

export async function signMessage(signer, message) {
  let signature,
    error = null;
  try {
    signature = await signer.signMessage(message);
  } catch (err) {
    console.error(error);
    error = err;
  }

  return { signature, error };
}

export async function updateProfileImage(signer, contractAddress, tokenId) {
  let signature,
    error = null;
  try {
    const address = await signer.getAddress();

    const message = `Update profile for address ${address}:\nContract address: ${contractAddress}\nToken Id: ${tokenId}`;

    const { signature: messageSignature, error: messageError } =
      await signMessage(signer, message);
    signature = messageSignature;
    error = messageError;

    if (messageError) {
      console.error(error);
    } else {
      const data = {
        address: address,
        message: message,
        signature: signature,
        contractAddress: contractAddress,
        tokenId: tokenId,
      };

      axios
        .post("https://zungle-stat-bot.herokuapp.com/update-profile", data) // TOOD: update link
        .then((response) => {
          log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  } catch (err) {
    console.error(err);
    error = err;
  }
  return { signature, error };
}
