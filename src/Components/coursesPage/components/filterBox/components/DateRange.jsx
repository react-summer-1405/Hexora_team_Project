import { Field } from "formik";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePickerModule from "react-multi-date-picker";

const DateRange = ({ names }) => {
  const DatePicker = DatePickerModule.default ?? DatePickerModule;
  const [startName, endName] = names;

  return (
    <Field name={startName}>
      {({ form }) => {
        const start = form.values[startName];
        const end = form.values[endName];

        const value = [start, end].filter(Boolean).map((d) => new Date(d));

        return (
          <DatePicker
            range
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-right"
            value={value}
            onChange={(dates) => {
              const startDate = dates?.[0]
                ? dates[0].toDate().toISOString()
                : "";

              const endDate = dates?.[1]
                ? new Date(
                    dates[1].toDate().setHours(23, 59, 59, 999),
                  ).toISOString()
                : "";

              form.setFieldValue(startName, startDate);
              form.setFieldValue(endName, endDate);
            }}
            placeholder="انتخاب بازه‌ی تاریخ"
            inputClass="w-full text-sm rounded-xl bg-bg-field p-3 outline-0"
          />
        );
      }}
    </Field>
  );
};

export default DateRange;
