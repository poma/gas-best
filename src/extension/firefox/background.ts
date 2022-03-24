import { fetchBaseFee, subscribeToBaseFee } from "~/services/api";

function handleBaseFeeUpdate(fee: number) {
  chrome.browserAction.setBadgeText({ text: `${fee}` });
}

function handleBaseFeeError(error: Error) {
  console.info(error);
  chrome.browserAction.setBadgeText({ text: "" });
}

function requestBaseFee() {
  fetchBaseFee().then(handleBaseFeeUpdate).catch(handleBaseFeeError);
}

chrome.browserAction.setBadgeBackgroundColor({ color: "#21222D" });

requestBaseFee();
subscribeToBaseFee(handleBaseFeeUpdate, handleBaseFeeError, requestBaseFee);
console.log("Subscribed");

export {};
