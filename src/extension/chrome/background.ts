import { fetchBaseFee, subscribeToBaseFee } from "~/services/api";

function handleBaseFeeUpdate(fee: number) {
  chrome.action.setBadgeText({ text: `${fee}` });
}

function handleBaseFeeError(error: Error) {
  console.error(error);
  chrome.action.setBadgeText({ text: "" });
}

function requestBaseFee() {
  fetchBaseFee().then(handleBaseFeeUpdate).catch(handleBaseFeeError);
}

chrome.action.setBadgeBackgroundColor({ color: "#21222D" });

requestBaseFee();
subscribeToBaseFee(handleBaseFeeUpdate, handleBaseFeeError, requestBaseFee);
console.log("Subscribed");

// NOTE: Wake up event
// https://stackoverflow.com/questions/66618136/persistent-service-worker-in-chrome-extension
chrome.alarms.create({ periodInMinutes: 4.9 });
chrome.alarms.onAlarm.addListener(() => {
  console.log("Wake up event:", new Date().toTimeString());
});

export {};
