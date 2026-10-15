import React from "react";
import { useLocation } from "react-router-dom";

export default function AuthProgress({ steps = [], activeStep }) {
  const { pathname } = useLocation();

  if (!steps.length) {
    return null;
  }

  const matchedRoutes = steps
    .flatMap((step, index) =>
      (step.paths || []).map((path) => ({
        index,
        path,
      })),
    )
    .filter(({ path }) => pathname === path || pathname.startsWith(`${path}/`))
    .sort((a, b) => b.path.length - a.path.length);

  const matchedIndex = matchedRoutes[0]?.index ?? -1;

  const currentIndex = Number.isInteger(activeStep)
    ? Math.max(0, Math.min(activeStep - 1, steps.length - 1))
    : matchedIndex >= 0
      ? matchedIndex
      : 0;

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 md:flex-row md:items-start md:gap-4">
      {steps.map((step, index) => {
        const isActive = index <= currentIndex;
        const isPrevious = index < currentIndex;

        return (
          <div
            key={step.id || step.label}
            className="flex w-full min-w-0 flex-1 flex-col items-center gap-2 md:items-start md:gap-1"
          >
            <div
              className={`h-[8px] w-full rounded-full md:max-w-[246px] ${
                isActive ? "bg-primary" : "bg-[#E5E7EB] md:bg-disabled"
              } ${isPrevious ? "opacity-50" : ""}`}
            />

            <div
              className={`mt-1 text-center md:text-right ${
                isPrevious ? "opacity-50" : ""
              }`}
            >
              <p
                className={`text-[13px] font-medium md:text-base md:font-semibold ${
                  isActive ? "text-text-dark" : "text-text-muted"
                }`}
              >
                {step.label}
              </p>

              {step.description && (
                <p className="mt-1 text-[11px] text-text-muted md:mt-0.5 md:text-xs">
                  {step.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
