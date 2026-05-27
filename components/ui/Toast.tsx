"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ToastProps {
  message: string;
  isVisible: boolean;
}

function ToastDisplay({ message, isVisible }: ToastProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-24 left-1/2 z-[100]"
          style={{ transform: "translateX(-50%)" }}
        >
          <div className="glass-strong px-6 py-3 rounded-full flex items-center gap-2">
            <span className="text-[var(--accent-primary)] text-lg">✓</span>
            <span className="text-[var(--text-primary)] text-sm font-medium font-mono">
              {message}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function useToast() {
  const [toast, setToast] = useState({ message: "", isVisible: false });

  const showToast = useCallback((message: string, duration = 2000) => {
    setToast({ message, isVisible: true });
    setTimeout(() => setToast({ message: "", isVisible: false }), duration);
  }, []);

  const ToastComponent = () => (
    <ToastDisplay message={toast.message} isVisible={toast.isVisible} />
  );

  return { showToast, ToastComponent };
}
