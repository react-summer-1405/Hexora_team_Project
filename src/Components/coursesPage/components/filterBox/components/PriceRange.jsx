"use client";

import { Slider } from "@heroui/react";
import { Field } from "formik";

const PriceRange = ({ names, min, max, step }) => {
  const [minName, maxName] = names;

  return (
    <Field name={minName}>
      {({ form }) => {
        const low = Number(form.values[minName]);
        const high = Number(form.values[maxName]);

 const flip = (v) => min + max - v;

        return (
          <Slider
            dir="ltr"
            aria-label="بازه‌ی قیمت"
            className="w-full flex flex-col gap-3"
            value={[flip(high), flip(low)]}
            onChange={(v) => {
              form.setFieldValue(minName, flip(v[1]));
              form.setFieldValue(maxName, flip(v[0]));
            }}
            minValue={min}
            maxValue={max}
            step={step}
          >
            <Slider.Track
              className="relative h-2 w-full rounded-full bg-bg-lightGray
                shadow-[inset_3px_3px_5px_rgba(0,0,0,0.15),inset_-3px_-3px_5px_rgba(255,255,255,0.9)]"
            >
       {({ state }) => {
    const total = max - min;
    const start = ((state.values[0] - min) / total) * 100;
    const end = ((state.values[1] - min) / total) * 100;
    const thumbLabels = ["حداکثر قیمت", "حداقل قیمت"];


    return (
      <>
        {/* خط آبی بین دو دستگیره */}
        <div
          className="absolute top-0 left h-full rounded-full bg-primary"
          style={{ left: `${start}%`, width: `${end - start}%` }}
        />

        {state.values.map((_, i) => (
          <Slider.Thumb
            key={i}
            index={i}
              aria-label={thumbLabels[i]}
            className="relative top-1/2 h-5 w-5 rounded-full bg-white
              border-4 border-blue-500 shadow-md cursor-grab
              transition-transform duration-200
              data-[dragging=true]:scale-125 data-[dragging=true]:cursor-grabbing
              data-[focus-visible=true]:ring-2 data-[focus-visible=true]:ring-blue-300
              outline-none"
          />
        ))}
      </>
    );
  }}
            </Slider.Track>

            <div   className="flex justify-between text-sm font-medium text-text-dark">
              <span>تا {high.toLocaleString("fa-IR")}</span>
              <span>از {low.toLocaleString("fa-IR")}</span>
            </div>
          </Slider>
        );
      }}
    </Field>
  );
};

export default PriceRange;
