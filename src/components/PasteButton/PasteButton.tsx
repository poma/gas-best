import NavButton from "../NavButton";
import { ReactComponent as PasteSVG } from "./assets/paste.svg";

interface PasteButtonProps {
  onClick: () => void;
}

const PasteButton: React.FC<PasteButtonProps> = ({ onClick }) => (
  <NavButton onClick={onClick}>
    <PasteSVG />
  </NavButton>
);

export default PasteButton;
