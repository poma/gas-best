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

function createNotification(fee: number) {
  chrome.notifications.create("gas-tracker-fee-notification", {
    title: "Gas Tracker",
    message: `Current base fee is <b>${fee}</b> Gwei`,
    iconUrl: "images/icon48.png",
    type: "basic",
  });
}

function showNotification(fee: number) {
  chrome.storage.local.get("feeNotification", ({ feeNotification }) => {
    if (feeNotification?.target && fee <= feeNotification.target) {
      if (feeNotification.once) {
        chrome.storage.local.remove("feeNotification", () =>
          createNotification(fee)
        );
      } else {
        createNotification(fee);
      }
    }
  });
}

function handleBaseFeeUpdate(fee: number) {
  chrome.browserAction.setBadgeText({ text: `${fee}` });
  showNotification(fee);
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
