import { fetchBaseFee, subscribeToBaseFee } from "~/services/api";

const BADGE_HIDE_TIMEOUT_MS = 15000; // 15 seconds
const USE_LONG_POLL = !!Number(process.env.REACT_APP_USE_LONG_POLL || 0);
const REQUEST_INTERVAL_MS = Number(
  process.env.REACT_APP_REQUEST_INTERVAL || 3000 // 3 seconds
);
const NOTIFICATION_INTERVAL_MS =
  Number(process.env.REACT_APP_NOTIFICATION_INTERVAL_MINUTES || 60) * 60 * 1000; // 1 hour

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
    chrome.notifications.create("gas-tracker-fee-notification", {
      title: "Gas Tracker",
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
