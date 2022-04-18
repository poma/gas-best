import browser from "webextension-polyfill";
import {
  NOTIFICATION_INTERVAL_MS,
  REQUEST_INTERVAL_MS,
  USE_LONG_POLL,
} from "~/config";
import { fetchBaseFee, subscribeToBaseFee } from "~/services/api";

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
    await browser.storage.local.get(["feeNotification", "feeNotificationLast"]);

  if (!feeNotification?.target) {
    return;
  }

  const isEnoughTimePassed =
    !feeNotificationLast ||
    Date.now() - feeNotificationLast >= NOTIFICATION_INTERVAL_MS;

  if (isEnoughTimePassed && fee <= feeNotification.target) {
    if (feeNotification.once) {
      await browser.storage.local.remove("feeNotification");
    }

    await chrome.storage.local.set({ feeNotificationLast: Date.now() });
    browser.notifications.create("gas-best-fee-notification", {
      title: "GasBest",
      message: `Current base fee is <b>${fee}</b> Gwei`,
      iconUrl: "images/icon48.png",
      type: "basic",
    });
  }
}

function handleBaseFeeUpdate(fee: number) {
  browser.browserAction.setBadgeText({ text: `${fee}` });
  showNotification(fee);
}

function handleBaseFeeError(error: Error) {
  console.info(error);
  browser.browserAction.setBadgeText({ text: "" });
}

function requestBaseFee() {
  fetchBaseFee().then(handleBaseFeeUpdate).catch(handleBaseFeeError);
}

browser.browserAction.setBadgeBackgroundColor({ color: "#21222D" });
browser.runtime.onStartup.addListener(() => requestBaseFee());

requestBaseFee();
subscribe();

export {};
