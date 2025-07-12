import { useState } from 'react';

export default function useSidebar(initial = true) {
  const [isOpen, setIsOpen] = useState(initial);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);
  return {
    isOpen,
    open,
    close,
    toggle,
  };
}
