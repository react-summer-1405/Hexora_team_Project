import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import DatePickerModule from "react-multi-date-picker";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import { Skeleton } from "@heroui/react";
import { accountInfoFieldRows } from "../../../core/constants/dashboard/userProfile/constantFeild";
import {
  useProfile,
  useUpdateProfile,
} from "../../../hooks/dashboard/userProfile";
import { selectThemeMode } from "../../features/theme/themeSlice";
import Button from "../../common/Button";

const validationSchema = Yup.object({
  fName: Yup.string().required("نام الزامی است"),
  lName: Yup.string().required("نام خانوادگی الزامی است"),
  about: Yup.string().max(500, "حداکثر ۵۰۰ کاراکتر"),
  phone: Yup.string()
    .matches(/^09\d{9}$/, "شماره همراه معتبر نیست")
    .required("شماره همراه الزامی است"),
  nationalId: Yup.string().matches(/^\d{10}$/, "کد ملی باید ۱۰ رقم باشد"),
  birthDay: Yup.string(),
  gender: Yup.string().required("جنسیت الزامی است"),
  email: Yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
  address: Yup.string().max(200, "حداکثر ۲۰۰ کاراکتر"),
});

const labelClass = "text-sm font-bold text-text-dark";
const inputClass =
  "h-[48px] w-full rounded-[24px] border border-border bg-transparent px-4 text-xs font-medium text-text-dark outline-none placeholder:text-text-muted";
const errorClass = "text-xs font-medium text-danger";

const DatePicker = DatePickerModule.default ?? DatePickerModule;

const renderField = (field, calendarClass) => (
  <div key={field.name} className="flex w-full flex-col gap-2 md:flex-1">
    {field.type === "radio" ? (
      <span className={labelClass}>{field.label}</span>
    ) : (
      <label htmlFor={field.name} className={labelClass}>
        {field.label}
      </label>
    )}

    {field.type === "textarea" && (
      <Field
        as="textarea"
        id={field.name}
        name={field.name}
        placeholder={field.placeholder}
        className="h-[123px] w-full resize-none rounded-[24px] border border-border bg-transparent p-4 text-xs font-medium text-text-dark outline-none placeholder:text-text-muted"
      />
    )}

    {field.type === "radio" && (
      <div className="flex h-[48px] w-full items-center justify-between px-2">
        <div className="flex items-center gap-4 sm:gap-6">
          {field.options.map((option) => (
            <label
              key={option}
              className="flex cursor-pointer items-center gap-2 text-sm font-medium text-text-dark"
            >
              <Field
                type="radio"
                name={field.name}
                value={option}
                className="h-4 w-4 accent-primary"
              />
              {option}
            </label>
          ))}
        </div>
        <button
          type="button"
          className="text-xs font-bold text-primary hover:text-primary-hover"
        >
          انتخاب کنید
        </button>
      </div>
    )}

    {field.type === "date" && (
      <div className="relative w-full">
        <Field name={field.name}>
          {({ field: formikField, form }) => (
            <DatePicker
              value={formikField.value}
              onChange={(date) =>
                form.setFieldValue(
                  field.name,
                  date ? date.format("YYYY/MM/DD") : "",
                )
              }
              onClose={() => form.setFieldTouched(field.name, true)}
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
              format="YYYY/MM/DD"
              maxDate={new DateObject({ calendar: persian })}
              editable={false}
              placeholder={field.placeholder}
              className={calendarClass}
              inputClass={`${inputClass} pl-12`}
              containerClassName="w-full"
            />
          )}
        </Field>
        <div className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-text-muted">
          <img
            src={field.icon}
            alt={field.label}
            className="h-[24px] w-[24px]"
          />
        </div>
      </div>
    )}

    {field.type !== "textarea" &&
      field.type !== "radio" &&
      field.type !== "date" && (
        <div className="relative w-full">
          <Field
            id={field.name}
            type={field.type || "text"}
            name={field.name}
            placeholder={field.placeholder}
            className={inputClass}
          />
        </div>
      )}

    <ErrorMessage
      name={field.name}
      render={(msg) => <span className={errorClass}>{msg}</span>}
    />
  </div>
);

const mapProfileToForm = (profile) => ({
  fName: profile?.fName ?? "",
  lName: profile?.lName ?? "",
  about: profile?.userAbout ?? "",
  phone: profile?.phoneNumber ?? "",
  nationalId: profile?.nationalCode ?? "",
  birthDay: profile?.birthDay
    ? new DateObject({
        date: new Date(profile.birthDay),
        calendar: persian,
        locale: persian_fa,
      }).format("YYYY/MM/DD")
    : "",
  gender:
    profile?.gender === true ? "مرد" : profile?.gender === false ? "زن" : "",
  email: profile?.email ?? profile?.gmail ?? "",
  address: profile?.homeAdderess ?? "",
});

export default function AccountInfo() {
  const { data: profile, isLoading, isError } = useProfile();
  const { mutate: updateProfile } = useUpdateProfile();
  const mode = useSelector(selectThemeMode);
  const calendarClass = mode === "dark" ? "bg-dark" : "";

  const handleSubmit = (values, { setSubmitting }) => {
    const birthDay = values.birthDay
      ? new DateObject({
          date: values.birthDay,
          format: "YYYY/MM/DD",
          calendar: persian,
          locale: persian_fa,
        })
          .convert(gregorian, gregorian_en)
          .format("YYYY-MM-DD")
      : "";

    updateProfile(
      {
        FName: values.fName.trim(),
        LName: values.lName.trim(),
        UserAbout: values.about,
        NationalCode: values.nationalId,
        HomeAdderess: values.address,
        Gender: values.gender === "مرد",
        BirthDay: birthDay,
        LinkdinProfile: profile?.linkdinProfile,
        TelegramLink: profile?.telegramLink,
        ReceiveMessageEvent: profile?.receiveMessageEvent,
        Latitude: profile?.latitude,
        Longitude: profile?.longitude,
      },
      { onSettled: () => setSubmitting(false) },
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 text-right" dir="rtl">
        {accountInfoFieldRows.map((row, index) => (
          <div
            key={`skeleton-row-${index}`}
            className="flex w-full flex-col gap-6 md:max-w-[576px] md:flex-row md:gap-[40px]"
          >
            {row.map((field, i) => (
              <div
                key={`skeleton-field-${i}`}
                className="flex w-full flex-col gap-2 md:flex-1"
              >
                <Skeleton className="h-4 w-20 rounded-lg">
                  <div className="h-4 w-full rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton
                  className={`w-full rounded-[24px] ${
                    field.type === "textarea" ? "h-[123px]" : "h-[48px]"
                  }`}
                >
                  <div className="h-full w-full rounded-[24px] bg-default-200"></div>
                </Skeleton>
              </div>
            ))}
          </div>
        ))}
        <div className="mt-4 flex w-full justify-end md:max-w-[576px]">
          <Skeleton className="h-[48px] w-[150px] rounded-[24px]">
            <div className="h-full w-full rounded-[24px] bg-default-200"></div>
          </Skeleton>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-sm font-medium text-danger" dir="rtl">
        خطا در دریافت اطلاعات پروفایل
      </div>
    );
  }

  return (
    <Formik
      initialValues={mapProfileToForm(profile)}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-6 text-right" dir="rtl" noValidate>
          {accountInfoFieldRows.map((row) => (
            <div
              key={row.map((f) => f.name).join("-")}
              className="flex w-full flex-col gap-6 md:max-w-[576px] md:flex-row md:gap-[40px]"
            >
              {row.map((field) => renderField(field, calendarClass))}
            </div>
          ))}

          <div className="mt-4 flex w-full justify-end md:max-w-[576px]">
            <Button
              color="bg-primary"
              content="اعمال تغییرات"
              type="submit"
              disabled={isSubmitting}
              className="flex h-[48px] w-full items-center justify-center rounded-[24px] bg-primary px-8 text-sm font-bold text-text-light transition-colors hover:bg-primary-hover sm:w-auto disabled:opacity-60"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}
