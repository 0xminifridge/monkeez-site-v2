import { getTargetNetwork } from "../utils/networks";

export function log(message) {
  if (getTargetNetwork().LOG_ENABLED) {
    console.log(message);
  }
}
