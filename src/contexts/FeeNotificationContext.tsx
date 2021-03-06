import React, { useCallback, useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import { IS_EXTENSION } from "~/config";
import { FeeNotificationSettings } from "~/types";
import { noop } from "~/utils/functions";

interface FeeNotificationContextAPI {
  notification: FeeNotificationSettings;
  setNotification: (notification: FeeNotificationSettings) => void;
  clearNotification: () => void;

  // Web only
  lastNotificationTime?: number;
  updateLastNotificationTime: () => void;
}

const initialState: FeeNotificationSettings = { target: null, once: false };

export const FeeNotificationContext =
  React.createContext<FeeNotificationContextAPI>({
    notification: initialState,
    setNotification: noop,
    clearNotification: noop,
    lastNotificationTime: undefined,
    updateLastNotificationTime: noop,
  });

// Web
// ======================================

const isNotificationSupported = !!window.Notification;
const Noop: React.FC = ({ children }) => <>{children}</>;

export const FeeNotificationContextProviderWeb: React.FC =
  isNotificationSupported
    ? ({ children }) => {
        const [notification, setNotificationInternal, clearNotification] =
          useLocalStorage<FeeNotificationSettings>("fee-notification");
        const [
          lastNotificationTime,
          setLastNotificationTime,
          clearLastNotificationTime,
        ] = useLocalStorage<number>("fee-notification-last");

        const updateLastNotificationTime = () =>
          setLastNotificationTime(Date.now());

        const setNotification = useCallback(
          (settings: FeeNotificationSettings) => {
            const permission = Notification.permission;
            if (permission === "granted") {
              setNotificationInternal(settings);
              clearLastNotificationTime();
            } else if (permission === "denied") {
              console.info("Notification permission is denied!");
            } else {
              Notification.requestPermission()
                .then((status) => {
                  if (status === "granted") {
                    setNotificationInternal(settings);
                    clearLastNotificationTime();
                  }
                })
                .catch((e) =>
                  console.info("Notification permission error: ", e)
                );
            }
          },
          [setNotificationInternal, clearLastNotificationTime]
        );

        return (
          <FeeNotificationContext.Provider
            value={{
              notification: notification ?? initialState,
              setNotification,
              clearNotification,
              lastNotificationTime,
              updateLastNotificationTime,
            }}
          >
            {children}
          </FeeNotificationContext.Provider>
        );
      }
    : Noop;

// Extension
// ======================================

export const FeeNotificationContextProviderExt: React.FC = ({ children }) => {
  const [notification, setNotificationInternal] =
    useState<FeeNotificationSettings>(initialState);

  useEffect(() => {
    chrome.storage.local.get("feeNotification", ({ feeNotification }) => {
      setNotificationInternal(feeNotification ?? initialState);
    });
  }, []);

  const setNotification = (settings: FeeNotificationSettings) => {
    chrome.storage.local.set(
      { feeNotification: settings, feeNotificationLast: null },
      () => setNotificationInternal(settings)
    );
  };

  const clearNotification = () =>
    chrome.storage.local.set({ feeNotification: initialState }, () =>
      setNotificationInternal(initialState)
    );

  return (
    <FeeNotificationContext.Provider
      value={{
        notification,
        setNotification,
        clearNotification,
        updateLastNotificationTime: noop,
      }}
    >
      {children}
    </FeeNotificationContext.Provider>
  );
};

export const FeeNotificationContextProvider = IS_EXTENSION
  ? FeeNotificationContextProviderExt
  : FeeNotificationContextProviderWeb;
