import { useContext } from "react";
import { ModalContext } from "~/contexts/ModalContext";

function useModal() {
  return useContext(ModalContext);
}

export default useModal;
