import { fetchBaseFee, subscribeToBaseFee } from "~/services/api";

const BADGE_HIDE_TIMEOUT = 15000; // 15 seconds
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
  await chrome.storage.local.set({ baseFeeUpdated: Date.now() });
  chrome.action.setBadgeText({ text: `${fee}` });
}

async function handleBaseFeeError(error: Error) {
  console.info(error);

  // Hide badge after timeout
  // unless connection is restored
  const { baseFeeUpdated } = await chrome.storage.local.get("baseFeeUpdated");
  const diff = Date.now() - Number(baseFeeUpdated) || Date.now();
  if (diff > BADGE_HIDE_TIMEOUT) {
    chrome.action.setBadgeText({ text: "" });
  }
}

function requestBaseFee() {
  fetchBaseFee().then(handleBaseFeeUpdate).catch(handleBaseFeeError);
}

async function setAlarm() {
  await chrome.alarms.clearAll();
  chrome.alarms.create({ periodInMinutes: 1 });
}

chrome.action.setBadgeBackgroundColor({ color: "#21222D" });

requestBaseFee();
subscribe();
setAlarm();

// HACK: Wake up event
// https://stackoverflow.com/questions/66618136/persistent-service-worker-in-chrome-extension
chrome.alarms.onAlarm.addListener(() => {
  console.log("Wake up event");
});

export {};
