// import { useEffect, RefObject } from "react";

// function useClickOutside<T extends HTMLElement>(
//   ref: RefObject<T>,
//   callback: () => void,
//   activateHook: boolean = true
// ) {
//   useEffect(() => {
//     if (!activateHook) return;
//     const handleClickOutside = (event: MouseEvent) => {
//       if (ref.current && !ref.current.contains(event.target as Node)) {
//         callback();
//       }
//     };

//     // Ajoute l'écouteur d'événements au montage
//     window.addEventListener("click", handleClickOutside);

//     // Retire l'écouteur d'événements au démontage
//     return () => {
//       window.removeEventListener("click", handleClickOutside);
//     };
//   }, [ref, callback, activateHook]);
// }

// export default useClickOutside;

import { useEffect, RefObject, useState } from "react";

function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  callback: () => void,
  activateHook: boolean = true,
  animationDuration: number = 300 // Durée de l'animation en ms
) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!activateHook) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        // Démarrer l'animation de fermeture
        setIsAnimating(true);

        // Appeler le callback après la durée de l'animation
        setTimeout(() => {
          setIsAnimating(false);
          callback();
        }, animationDuration);
      }
    };

    // Ajouter l'écouteur d'événements
    window.addEventListener("click", handleClickOutside);

    // Nettoyage lors du démontage
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [ref, callback, activateHook, animationDuration]);

  return isAnimating;
}

export default useClickOutside;
