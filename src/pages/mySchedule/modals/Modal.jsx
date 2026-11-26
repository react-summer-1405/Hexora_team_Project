
import { useEffect, useRef, useState } from "react";
import { X } from "react-feather";
import gsap from "gsap";

const sizes = {
  md: "max-w-md",
  lg: "max-w-2xl",
};

export default function Modal({
  isOpen,
  onClose,
  title,
  size = "md",
  footer,
  children,
}) {
  const [mounted, setMounted] = useState(isOpen);

  const backdropRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      return;
    }

    if (!mounted) return;

    const tl = gsap.timeline({
      onComplete: () => setMounted(false),
    });

    tl.to(
      modalRef.current,
      {
        opacity: 0,
        scale: 0.94,
        y: 15,
        duration: 0.2,
        ease: "power2.in",
      },
      0
    ).to(
      backdropRef.current,
      {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      },
      0
    );

    return () => tl.kill();
  }, [isOpen, mounted]);

  // Opening animation
  useEffect(() => {
    if (!mounted || !isOpen) return;

    gsap.fromTo(
      backdropRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      }
    );

    gsap.fromTo(
      modalRef.current,
      {
        opacity: 0,
        scale: 0.92,
        y: 25,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.45,
        ease: "power3.out",
        clearProps: "all",
      }
    );
  }, [mounted, isOpen]);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/50 backdrop-blur-[3px]"
        onClick={onClose}
      />

      <div
        ref={modalRef}
        className={`relative flex max-h-[90vh] w-full ${sizes[size]} flex-col overflow-hidden rounded-2xl border border-border bg-bg-main shadow-2xl`}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h3 className="text-base font-bold text-text-dark">
            {title}
          </h3>

          <button
            type="button"
            onClick={onClose}
            aria-label="بستن"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-text-muted transition-all duration-200 hover:rotate-90 hover:bg-bg-field hover:text-text-dark"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {children}
        </div>

        {footer && (
          <div className="flex items-center justify-start gap-2 border-t border-border px-5 py-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
