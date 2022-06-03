import {
  NOTIFICATION_INTERVAL_MS,
  REQUEST_INTERVAL_MS,
  USE_LONG_POLL,
} from "~/config";
import { fetchBaseFee, subscribeToBaseFee } from "~/services/api";

const BADGE_HIDE_TIMEOUT_MS = 15000; // 15 seconds

async function subscribe() {
  if (USE_LONG_POLL) {
    subscribeToBaseFee(handleBaseFeeUpdate, handleBaseFeeError, requestBaseFee);
  } else {
    await fetchBaseFee().then(handleBaseFeeUpdate).catch(handleBaseFeeError);
    setTimeout(subscribe, REQUEST_INTERVAL_MS);
  }
}

async function showNotification(fee: number) {
  const { feeNotification, feeNotificationLast } =
    await chrome.storage.local.get(["feeNotification", "feeNotificationLast"]);

  if (!feeNotification?.target) {
    return;
  }

  const isEnoughTimePassed =
    !feeNotificationLast ||
    Date.now() - feeNotificationLast >= NOTIFICATION_INTERVAL_MS;

  if (isEnoughTimePassed && fee <= feeNotification.target) {
    if (feeNotification.once) {
      await chrome.storage.local.remove("feeNotification");
    }

    await chrome.storage.local.set({ feeNotificationLast: Date.now() });
    chrome.notifications.create("gas-best-fee-notification", {
      title: "GasBest",
      message: `Current base fee is ${fee} Gwei`,
      iconUrl: "images/icon48.png",
      type: "basic",
    });
  }
}

async function handleBaseFeeUpdate(fee: number) {
  await chrome.storage.local.set({ baseFeeUpdated: Date.now() });
  chrome.action.setBadgeText({ text: `${fee}` });
  showNotification(fee);
}

async function handleBaseFeeError(error: Error) {
  console.info(error);

  // Hide badge after timeout
  // unless connection is restored
  const { baseFeeUpdated } = await chrome.storage.local.get("baseFeeUpdated");
  const diff = Date.now() - Number(baseFeeUpdated) || Date.now();
  if (diff > BADGE_HIDE_TIMEOUT_MS) {
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

chrome.runtime.onStartup.addListener(() => requestBaseFee());

requestBaseFee();
subscribe();
setAlarm();

// HACK: Wake up event
// https://stackoverflow.com/questions/66618136/persistent-service-worker-in-chrome-extension
chrome.alarms.onAlarm.addListener(() => {
  console.log("Wake up event");
});

export {};
