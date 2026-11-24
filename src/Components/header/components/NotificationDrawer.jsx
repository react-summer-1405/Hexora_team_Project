import Button from "../../common/Button";
import cancel from "../../../assets/icons/cancel-01.svg";
import { useAllAlerts, useSeeAlert } from "../../hooks/useNotification";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const NotificationDrawer = ({ isOpen, onClose }) => {
  const { data: alerts = [], isLoading, isError } = useAllAlerts(isOpen);
  const { mutate: markSeen } = useSeeAlert();

  const unseenCount = alerts.filter((alert) => !alert.seen).length;

  const drawerRef = useRef(null);
  const backdropRef = useRef(null);
  const panelRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      if (isOpen) {
        tl.fromTo(
          backdropRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.out" },
        ).fromTo(
          panelRef.current,
          {
            xPercent: -100,
            opacity: 0,
            scale: 0.97,
          },
          {
            xPercent: 0,
            opacity: 1,
            scale: 1,
            duration: 0.55,
            ease: "power3.out",
          },
          "-=0.15",
        );
      } else {
        tl.to(panelRef.current, {
          xPercent: -100,
          opacity: 0,
          scale: 0.97,
          duration: 0.4,
          ease: "power3.in",
        }).to(
          backdropRef.current,
          {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
          },
          "-=0.2",
        );
      }

      return () => tl.kill();
    },
    {
      dependencies: [isOpen],
      scope: drawerRef,
    },
  );

  return (
    <div
      ref={drawerRef}
      className={`fixed inset-0 z-[60] ${isOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <div
        ref={backdropRef}
        onClick={onClose}
        className="absolute inset-0 bg-black/50 opacity-0"
      ></div>

      <div
        ref={panelRef}
        className="absolute inset-y-0 left-0 flex w-[380px] max-w-[90vw] flex-col border-r border-border bg-bg-main shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-text-dark">اعلان‌ها</span>
            {unseenCount > 0 && (
              <span className="rounded-full bg-danger px-2 py-0.5 text-xs font-semibold text-white">
                {unseenCount} جدید
              </span>
            )}
          </div>

          <Button
            circle
            color="bg-bg-main"
            customStyle="p-3"
            icon={cancel}
            onClick={onClose}
          />
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {isLoading && (
            <div className="flex justify-center py-10">
              <span className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></span>
            </div>
          )}

          {isError && (
            <div className="rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
              دریافت اعلان‌ها ناموفق بود.
            </div>
          )}

          {!isLoading && !isError && alerts.length === 0 && (
            <div className="py-10 text-center text-sm text-text-muted">
              اعلانی برای نمایش وجود ندارد.
            </div>
          )}

          {alerts.map((alert) => (
            <div
              key={alert.id}
              role="button"
              tabIndex={0}
              onClick={() => !alert.seen && markSeen(alert.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !alert.seen) markSeen(alert.id);
              }}
              className={`flex gap-3 rounded-xl border p-3 text-right transition-colors ${
                alert.seen
                  ? "border-border bg-bg-main"
                  : "cursor-pointer border-primary/30 bg-primary/10 hover:bg-primary/15"
              }`}
            >
              <span
                className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                  alert.seen ? "bg-disabled" : "bg-primary"
                }`}
              ></span>

              <div className="min-w-0 flex-1">
                <span
                  className={`block break-words text-sm leading-6 ${
                    alert.seen
                      ? "text-text-muted"
                      : "font-semibold text-text-dark"
                  }`}
                >
                  {alert.message}
                </span>
                <span className="mt-1 block text-xs text-text-muted">
                  {new Date(alert.insertDate).toLocaleString("fa-IR", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationDrawer;
