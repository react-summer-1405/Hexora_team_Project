
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff } from "react-feather";
import { useMutation } from "@tanstack/react-query";

import Button from "../../common/Button";
import { changingPassword } from "../../../core/services/dashboard/profile.api";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  oldPassword: Yup.string().required("رمز عبور فعلی الزامی است"),
  newPassword: Yup.string()
    .required("رمز عبور جدید الزامی است")
    .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
});

export default function ChangePassword() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);


const { mutate, isPending } = useMutation({
  mutationFn: changingPassword,

  onSuccess: () => {
    toast.success("رمز عبور با موفقیت تغییر کرد");
  },

  onError: (error) => {
    toast.error(
      error?.response?.data?.message || "تغییر رمز عبور ناموفق بود"
    );
  },
});

const handleSubmit = (values, { resetForm }) => {
  mutate(values, {
    onSuccess: () => resetForm(),
  });
};
  return (
    <Formik
      initialValues={{
        oldPassword: "",
        newPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="flex w-full flex-col gap-6 text-right" dir="rtl">
        <div className="flex flex-col gap-3">
          <label className="text-[16px] font-semibold text-text-dark">
            رمز عبور فعلی
          </label>

          <div className="relative w-full max-w-[576px]">
            <Field
              type={showOldPassword ? "text" : "password"}
              name="oldPassword"
              placeholder="رمز عبور فعلی خود را وارد کنید"
              className="h-[48px] w-full rounded-[24px] border border-border bg-bg-main px-5 pl-12 text-[12px] font-medium text-text-muted outline-none focus:border-primary"
            />

            <button
              type="button"
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary"
            >
              {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <ErrorMessage
            name="oldPassword"
            component="p"
            className="text-xs text-danger"
          />
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-[16px] font-semibold text-text-dark">
            رمز عبور جدید
          </label>

          <div className="relative w-full max-w-[576px]">
            <Field
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              placeholder="رمز عبور جدید خود را وارد کنید"
              className="h-[48px] w-full rounded-[24px] border border-border bg-bg-main px-5 pl-12 text-[12px] font-medium text-text-muted outline-none focus:border-primary"
            />

            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary"
            >
              {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <ErrorMessage
            name="newPassword"
            component="p"
            className="text-xs text-danger"
          />
        </div>

        <div className="mt-2 w-full sm:w-auto">
          <Button
            type="submit"
            content={isPending ? "در حال ثبت..." : "تغییر رمز عبور"}
            color="bg-primary"
            disabled={isPending}
            customStyle="w-full sm:w-auto"
          />
        </div>
      </Form>
    </Formik>
  );
}
