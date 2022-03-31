import { useContext } from "react";
import { FeeNotificationContext } from "~/contexts/FeeNotificationContext";

function useFeeNotificationSetting() {
  return useContext(FeeNotificationContext);
}

export default useFeeNotificationSetting;
