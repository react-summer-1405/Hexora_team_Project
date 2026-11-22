import Button from "../../common/Button";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
const initials = {
  fullName: "",
  email: "",
  subject: "",
  message: "",
};
const SUBJECTS = [
  "پشتیبانی دوره‌ها",
  "مشکل فنی",
  "همکاری با آکادمی",
  "پیشنهاد و انتقاد",
];

const validationSchema = Yup.object({
  fullName: Yup.string()
    .trim()
    .min(3, "نام را کامل وارد کنید")
    .required("نام و نام خانوادگی الزامی است"),
  email: Yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
  subject: Yup.string().required("موضوع پیام را انتخاب کنید"),
  message: Yup.string()
    .trim()
    .min(10, "پیام حداقل ۱۰ کاراکتر باشد")
    .required("متن پیام الزامی است"),
});
const ContactForm = () => {
  const FIELDS = [
    {
      name: "fullName",
      label: "نام و نام خانوادگی",
      type: "text",
      placeholder: "مثلا آرتا رشیدی",
    },
    {
      name: "email",
      label: "ایمیل",
      type: "email",
      placeholder: "you@example.com",
      ltr: true,
    },
    {
      name: "subject",
      label: "موضوع",
      type: "select",
      placeholder: "موضوع پیام را انتخاب کنید",
      options: SUBJECTS,
      full: true,
    },
    {
      name: "message",
      label: "پیام",
      type: "textarea",
      placeholder: "پیام خود را بنویسید ...",
      full: true,
    },
  ];

  return (
    <div className="md:w-2/3 w-full">
      <Formik
        initialValues={initials}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <Form className="flex flex-col gap-5  rounded-[16px] border border-border md:p-10 p-5">
          <div className="flex flex-row flex-wrap gap-5">
            {FIELDS.map(
              ({ name, label, type, placeholder, options, ltr, full }) => (
                <div
                  key={name}
                  className={`flex flex-col items-start gap-2 ${
                    full ? "w-full" : "md:w-[calc(50%_-_10px)] "
                  }`}
                >
                  <label htmlFor={name} className="md:text-lg text-sm font-semibold">
                    {label}
                  </label>

                  {type === "select" ? (
                    <Field
                      as="select"
                      id={name}
                      name={name}
                      className="w-full h-13 rounded-[16px] text-text-muted bg-bg-field px-3"
                    >
                      <option value="" disabled>
                        {placeholder}
                      </option>
                      {options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Field>
                  ) : type === "textarea" ? (
                    <Field
                      as="textarea"
                      id={name}
                      name={name}
                      placeholder={placeholder}
                      className="w-full h-40 py-4 rounded-[16px] bg-bg-field indent-2.5 resize-none"
                    />
                  ) : (
                    <Field
                      type={type}
                      id={name}
                      name={name}
                      placeholder={placeholder}
                      dir={ltr ? "ltr" : undefined}
                      className={`w-full h-13 rounded-[16px] bg-bg-field indent-2.5 ${
                        ltr ? "text-left pe-3" : ""
                      }`}
                    />
                  )}
                  <ErrorMessage
                    name={name}
                    component={"p"}
                    className="text-danger text-s"
                  />
                </div>
              ),
            )}
          </div>

          <Button
            content="ارسال پیام"
            color="bg-primary"
            customStyle="px-10 font-semibold"
            type="submit"
          />
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;
