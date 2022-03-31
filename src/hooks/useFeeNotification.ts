import { useEffect } from "react";
import { usePermission } from "react-use";
import useFeeNotificationSetting from "./useFeeNotificationSettings";
import { BaseFee } from "~/types";

const isExt = !!process.env.REACT_APP_EXTENSION;

function useFeeNotification(current: BaseFee | undefined) {
  const { notification, clearNotification } = useFeeNotificationSetting();

  const state = usePermission({ name: "notifications" });

  useEffect(() => {
    if (state !== "granted") {
      console.info("Notification permission is not granted");
    }

    if (notification.target && current && current <= notification.target) {
      if (notification.once) {
        clearNotification();
      }
      new Notification("Gas Tracker", {
        body: `Current base fee is <b>${current}</b> Gwei`,
        icon: "/images/icon48.png",
        tag: "gas-tracker-fee-notification",
      });
    }
  }, [state, current, notification, clearNotification]);
}

// Remove in extension
export default !isExt ? useFeeNotification : () => {};
