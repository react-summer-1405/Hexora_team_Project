import DatePickerModule from "react-multi-date-picker";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";

const DatePicker = DatePickerModule.default ?? DatePickerModule;

const inputClass =
  "w-full rounded-lg border border-border bg-bg-field px-3 py-2 text-sm text-text-dark outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20";

const JalaliDateField = ({ id, value, onChange }) => (
  <DatePicker
    id={id}
    value={
      value
        ? new DateObject({
            date: value,
            format: "YYYY-MM-DD",
            calendar: gregorian,
            locale: gregorian_en,
          })
        : ""
    }
    calendar={persian}
    locale={persian_fa}
    calendarPosition="bottom-right"
    inputClass={inputClass}
    containerStyle={{ width: "100%" }}
    editable={false}
    portal
    zIndex={2000}
    onChange={(date) =>
      onChange(
        date ? date.convert(gregorian, gregorian_en).format("YYYY-MM-DD") : ""
      )
    }
  />
);

export default JalaliDateField;