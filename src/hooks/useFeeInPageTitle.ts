import { useEffect } from "react";
import { PAGE_TITLE } from "~/config";
import { BaseFee } from "~/types";

const setPageTitle = (currentFee: BaseFee) =>
  (document.title = `${currentFee} gwei | ${PAGE_TITLE}`);

const resetPageTitle = () => {
  document.title = PAGE_TITLE;
};

export function useFeeInPageTitle(currentFee?: BaseFee) {
  useEffect(() => {
    if (currentFee) {
      setPageTitle(currentFee);
    } else {
      resetPageTitle();
    }

    return resetPageTitle;
  }, [currentFee]);
}
