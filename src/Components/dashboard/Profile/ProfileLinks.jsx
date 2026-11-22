import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import Button from "../../common/Button";
import {
  useProfile,
  useUpdateProfile,
} from "../../../hooks/dashboard/userProfile";

const validationSchema = Yup.object({
  telegram: Yup.string().trim().url("لینک تلگرام معتبر نیست"),

  linkedin: Yup.string().trim().url("لینک لینکدین معتبر نیست"),
});

export default function ProfileLinks() {
  const { mutate, isPending } = useUpdateProfile();
  const { data: profile } = useProfile();

  const birthDay = profile?.birthDay ?? "";

  console.log("birthday", birthDay);

  const initialValues = {
    telegram: "",
    linkedin: "",
  };

  const handleSubmit = (values) => {
    mutate({
      BirthDay: birthDay,
      TelegramLink: values.telegram,
      LinkdinProfile: values.linkedin,
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="flex w-full flex-col gap-6 text-right">
        <div className="flex flex-col gap-3">
          <label className="text-[16px] font-semibold text-text-dark">
            تلگرام
          </label>

          <Field
            type="text"
            name="telegram"
            placeholder="لینک تلگرام خود را وارد کنید"
            className="h-[48px] w-full max-w-[576px] rounded-[24px] border border-border bg-bg-main px-5 text-[12px] font-medium text-text-muted outline-none focus:border-primary"
          />

          <ErrorMessage
            name="telegram"
            component="p"
            className="text-xs text-danger"
          />
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-[16px] font-semibold text-text-dark">
            لینکدین
          </label>

          <Field
            type="text"
            name="linkedin"
            placeholder="لینک لینکدین خود را وارد کنید"
            className="h-[48px] w-full max-w-[576px] rounded-[24px] border border-border bg-bg-main px-5 text-[12px] font-medium text-text-muted outline-none focus:border-primary"
          />

          <ErrorMessage
            name="linkedin"
            component="p"
            className="text-xs text-danger"
          />
        </div>

        <Button
          type="submit"
          content={isPending ? "در حال ثبت..." : "ذخیره اطلاعات"}
          color="bg-primary"
          disabled={isPending}
        />
      </Form>
    </Formik>
  );
}