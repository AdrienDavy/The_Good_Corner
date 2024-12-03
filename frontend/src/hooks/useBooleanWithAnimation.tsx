import { useEffect, useState } from "react";

type UseBooleanWithAnimationOptions = {
  animationDuration?: number; // Durée de l'animation (en ms)
};

type UseBooleanWithAnimationReturn = {
  isVisible: boolean; // Contrôle l'état d'animation (pendant ou après)
  toggle: () => void; // Bascule l'état (ouvrir/fermer)
  show: () => void; // Afficher
  hide: () => void; // Masquer
};

export function useBooleanWithAnimation(
  initialState: boolean = false,
  options: UseBooleanWithAnimationOptions = {}
): UseBooleanWithAnimationReturn {
  const { animationDuration = 300 } = options;

  const [isVisible, setIsVisible] = useState(initialState); // Contrôle l'état d'apparition/disparition
  const [isAnimating, setIsAnimating] = useState(initialState); // Contrôle l'animation

  // Ouvrir avec animation
  const show = () => {
    setIsAnimating(true);
    setIsVisible(true);
  };

  // Fermer avec animation
  const hide = () => {
    setIsAnimating(true);
    setIsVisible(false);
    setTimeout(() => setIsAnimating(false), animationDuration);
  };

  // Basculer l'état
  const toggle = () => {
    if (isVisible) {
      hide();
    } else {
      show();
    }
  };

  // Nettoyage en cas de transition interrompue
  useEffect(() => {
    if (!isVisible) {
      const timer = setTimeout(() => setIsAnimating(false), animationDuration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, animationDuration]);

  return {
    isVisible: isAnimating, // L'élément est visible tant que l'animation est active
    toggle,
    show,
    hide,
  };
}
