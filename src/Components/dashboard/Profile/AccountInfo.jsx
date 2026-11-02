import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePickerModule from "react-multi-date-picker";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import { accountInfoFieldRows } from "../../../core/constants/dashboard/userProfile/constantFeild";
import { useProfile, useUpdateProfile } from "../../../hooks/dashboard/userProfile";
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
  email: Yup.string()
    .email("ایمیل معتبر نیست")
    .required("ایمیل الزامی است"),
  address: Yup.string().max(200, "حداکثر ۲۰۰ کاراکتر"),
});
const labelClass = "text-sm font-bold text-gray-800";
const inputClass ="h-[48px] rounded-[24px] border border-[#dcdcdc] bg-transparent px-4 text-xs font-medium text-gray-700 outline-none placeholder:text-gray-400";
const errorClass = "text-xs font-medium text-red-500";

const DatePicker = DatePickerModule.default ?? DatePickerModule;



const renderField = (field, widthClass) => (
  <div key={field.name} className="flex flex-col gap-2">
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
        className="h-[123px] w-[576px] resize-none rounded-[24px] border border-[#dcdcdc] bg-transparent p-4 text-xs font-medium text-gray-700 outline-none placeholder:text-gray-400"
      />
    )}

    {field.type === "radio" && (
      <div className={`flex h-[48px] items-center justify-between px-2 ${widthClass}`}>
        <div className="flex items-center gap-6">
          {field.options.map((option) => (
            <label
              key={option}
              className="flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-700"
            >
              <Field
                type="radio"
                name={field.name}
                value={option}
                className="h-4 w-4 accent-blue-500"
              />
              {option}
            </label>
          ))}
        </div>
        <button
          type="button"
          className="text-xs font-bold text-blue-500 hover:text-blue-600"
        >
          انتخاب کنید
        </button>
      </div>
    )}

  {field.type === "date" && (
  <div className="relative">
    <Field name={field.name}>
      {({ field: formikField, form }) => (
        <DatePicker
          value={formikField.value}
          onChange={(date) =>
            form.setFieldValue(field.name, date ? date.format("YYYY/MM/DD") : "")
          }
          onClose={() => form.setFieldTouched(field.name, true)}
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-right"
          format="YYYY/MM/DD"
          maxDate={new DateObject({ calendar: persian })}
          editable={false}
          placeholder={field.placeholder}
          inputClass={`${inputClass} ${widthClass} pl-12`}
        />
      )}
    </Field>
    <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#707070]">
      <img src={field.icon} alt={field.label} className="h-[24px] w-[24px]" />
    </div>
  </div>
)}

{field.type !== "textarea" && field.type !== "radio" && field.type !== "date" && (
  <div className="relative">
    <Field
      id={field.name}
      type={field.type || "text"}
      name={field.name}
      placeholder={field.placeholder}
      className={`${inputClass} ${widthClass}`}
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
      <div className="text-sm text-gray-500" dir="rtl">
        در حال دریافت اطلاعات...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-sm text-red-500" dir="rtl">
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
          {accountInfoFieldRows.map((row) =>
            row.length === 2 ? (
              <div
                key={row.map((f) => f.name).join("-")}
                className="flex w-[576px] items-start justify-between gap-[40px]"
              >
                {row.map((field) => renderField(field, "w-[268px]"))}
              </div>
            ) : (
              renderField(row[0], "w-[576px]")
            ),
          )}

          <div className="mt-4 flex w-[576px] justify-end">
            <Button
            color="bg-primary"
            content="اعمال تغییرات"
              type="submit"
              disabled={isSubmitting}
              className="flex h-[48px] items-center justify-center rounded-[24px] bg-blue-500 px-8 text-sm font-bold text-white transition-colors hover:bg-blue-600 disabled:opacity-60"
            />
          
          </div>
        </Form>
      )}
    </Formik>
  );

}
