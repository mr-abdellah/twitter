import { RefObject, useEffect } from "react";

interface Props {
  ref: RefObject<HTMLDivElement>;
  handler: any;
  current: any;
}

const useOnClickOutside: React.FC<Props> = (ref, handler) => {
  useEffect(() => {
    const listener = (event: any) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
  return null;
};

export default useOnClickOutside;
