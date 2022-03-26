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
subscribe();

export {};
