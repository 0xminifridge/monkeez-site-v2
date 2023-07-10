import { getTargetNetwork } from "../utils/networks";

export function log(message, ...args) {
  if (getTargetNetwork().LOG_ENABLED) {
    console.log(message, ...args);
  }
}
