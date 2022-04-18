import { useEffect } from "react";
import { usePermission } from "react-use";
import { IS_EXTENSION, NOTIFICATION_INTERVAL_MS } from "~/config";
import { noop } from "~/utils/functions";
import useFeeNotificationSetting from "./useFeeNotificationSettings";
import { BaseFee } from "~/types";

function useFeeNotification(currentFee: BaseFee | undefined) {
  const {
    notification,
    clearNotification,
    lastNotificationTime,
    updateLastNotificationTime,
  } = useFeeNotificationSetting();

  const state = usePermission({ name: "notifications" });

  useEffect(() => {
    if (!notification.target || !currentFee) {
      return;
    }

    if (state === "") {
      console.info("Loading notifications...");
      return;
    }

    if (state !== "granted") {
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
    state,
    currentFee,
    notification,
    clearNotification,
    lastNotificationTime,
    updateLastNotificationTime,
  ]);
}

// Remove in extension
export default !IS_EXTENSION ? useFeeNotification : noop;
