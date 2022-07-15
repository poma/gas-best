import { useEffect } from "react";
import { IS_EXTENSION, NOTIFICATION_INTERVAL_MS } from "~/config";
import { noop } from "~/utils/functions";
import useFeeNotificationSetting from "./useFeeNotificationSettings";
import { BaseFee } from "~/types";

function useFeeNotification(currentFee?: BaseFee) {
  const {
    notification,
    clearNotification,
    lastNotificationTime,
    updateLastNotificationTime,
  } = useFeeNotificationSetting();

  useEffect(() => {
    const permission = Notification.permission;

    if (!notification.target || !currentFee) {
      return;
    }

    if (permission !== "granted") {
      console.info("Notification permission is not granted!");
      return;
    }

    const isEnoughTimePassed =
      !lastNotificationTime ||
      Date.now() - lastNotificationTime >= NOTIFICATION_INTERVAL_MS;

    if (isEnoughTimePassed && currentFee <= notification.target) {
      if (notification.once) {
        clearNotification();
      }

      updateLastNotificationTime();
      new Notification("GasBest", {
        body: `Current base fee is ${currentFee} Gwei`,
        icon: "/images/icon48.png",
        tag: "gas-best-fee-notification",
      });
    }
  }, [
    currentFee,
    notification,
    clearNotification,
    lastNotificationTime,
    updateLastNotificationTime,
  ]);
}

// Remove in extension
export default !IS_EXTENSION && !!window.Notification
  ? useFeeNotification
  : noop;
