import { fetchBaseFee, subscribeToBaseFee } from "~/services/api";

const USE_LONG_POLL = !!Number(process.env.REACT_APP_USE_LONG_POLL || 0);
const REQUEST_INTERVAL = Number(process.env.REACT_APP_REQUEST_INTERVAL || 3000); // 3 seconds

async function subscribe() {
  if (USE_LONG_POLL) {
    subscribeToBaseFee(handleBaseFeeUpdate, handleBaseFeeError, requestBaseFee);
  } else {
    await fetchBaseFee().then(handleBaseFeeUpdate).catch(handleBaseFeeError);
    setTimeout(subscribe, REQUEST_INTERVAL);
  }
}

async function handleBaseFeeUpdate(fee: number) {
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
subscribe();

// NOTE: Wake up event
// https://stackoverflow.com/questions/66618136/persistent-service-worker-in-chrome-extension
chrome.alarms.create({ periodInMinutes: 4.9 });
chrome.alarms.onAlarm.addListener(() => {
  console.log("Wake up event:", new Date().toTimeString());
});

export {};
