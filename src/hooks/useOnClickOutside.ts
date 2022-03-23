import React from "react";

type OnTrigger = () => void;
function useOnClickOutside(
  ref: React.RefObject<HTMLDivElement>,
  onTrigger: OnTrigger
) {
  React.useEffect(() => {
    function handleClickOutside(this: Document, ev: MouseEvent) {
      if (ref.current && !ref.current.contains(ev.target as Node)) {
        onTrigger();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onTrigger, ref]);
}

export default useOnClickOutside;
