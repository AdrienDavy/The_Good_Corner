import { ReactNode, useRef } from "react";
import useClickOutside from "../hooks/useClickOutside";
import { useModalContext } from "../hooks/useModalContext";

type ButtonTriggerModalProps = {
  id: string; // ID unique pour chaque modal
  title: string;
  children: ReactNode;
};

const ButtonTriggerModal: React.FC<ButtonTriggerModalProps> = ({
  id,
  title,
  children,
}) => {
  const { openModalId, setOpenModalId } = useModalContext();

  // Vérifie si cette modale est actuellement ouverte
  const isOpen = openModalId === id;

  const modalRef = useRef<HTMLDivElement>(null);

  // Ferme la modale en cas de clic à l'extérieur
  const isAnimating = useClickOutside(
    modalRef,
    () => setOpenModalId(null),
    isOpen,
    100 // Durée de l'animation
  );

  // Basculer l'état de la modale
  const toggleModal = () => {
    if (isOpen) {
      setTimeout(() => {
        setOpenModalId(null); // Fermer la modale
      }, 300);
      setOpenModalId(id); // Fermer la modale
    } else {
      setTimeout(() => {
        setOpenModalId(id); // Fermer la modale
      }, 300);
      setOpenModalId(null); // Ouvrir cette modale
    }
  };

  return (
    <div
      ref={modalRef}
      className="relative flex justify-center items-center z-10 ml-2"
    >
      <button
        className="flex justify-center items-center"
        title={title}
        onClick={(event) => {
          event.stopPropagation(); // Empêche la propagation de l'événement
          toggleModal();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`text-primary w-6 h-6 duration-100 ease ${
            isOpen ? "rotate-0" : "-rotate-45"
          }`}
        >
          <path d="M12,1C5.93,1,1,5.93,1,12s4.93,11,11,11,11-4.93,11-11S18.07,1,12,1ZM12,21c-4.96,0-9-4.04-9-9S7.04,3,12,3s9,4.04,9,9-4.04,9-9,9Z" />
          <path d="M15.71,8.29c-.39-.39-1.02-.39-1.41,0l-2.29,2.29-2.29-2.29c-.39-.39-1.02-.39-1.41,0s-.39,1.02,0,1.41l2.29,2.29-2.29,2.29c-.39-.39-.39,1.02,0,1.41.2.2.45.29.71.29s.51-.1.71-.29l2.29-2.29,2.29,2.29c.2.2.45.29.71.29s.51-.1.71-.29c.39-.39.39-1.02,0-1.41l-2.29-2.29,2.29-2.29c.39-.39.39-1.02,0-1.41Z" />
        </svg>
      </button>
      {isOpen && (
        <div
          className={`fixed top-1/2 left-1/2 z-20 transform transition-all duration-300 ease-in-out ${
            isAnimating
              ? "opacity-0 translate-y-10 -translate-x-1/2 scale-95 pointer-events-none blur-lg"
              : "opacity-100 -translate-y-1/2 -translate-x-1/2 scale-100"
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default ButtonTriggerModal;
