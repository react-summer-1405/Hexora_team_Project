import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Skeleton } from "@heroui/react";

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
  const { data: profile, isLoading } = useProfile();

  const birthDay = profile?.birthDay ?? "";

  const initialValues = {
    telegram: profile?.telegramLink ?? "",
    linkedin: profile?.linkdinProfile ?? "",
  };

  const handleSubmit = (values) => {
    mutate({
      BirthDay: birthDay,
      TelegramLink: values.telegram,
      LinkdinProfile: values.linkedin,
    });
  };

  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-6 text-right" dir="rtl">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-5 w-16 rounded-lg">
            <div className="h-5 w-full rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="h-[48px] w-full max-w-[576px] rounded-[24px]">
            <div className="h-full w-full rounded-[24px] bg-default-200"></div>
          </Skeleton>
        </div>

        <div className="flex flex-col gap-3">
          <Skeleton className="h-5 w-16 rounded-lg">
            <div className="h-5 w-full rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="h-[48px] w-full max-w-[576px] rounded-[24px]">
            <div className="h-full w-full rounded-[24px] bg-default-200"></div>
          </Skeleton>
        </div>

        <div className="mt-2 w-full sm:w-auto">
          <Skeleton className="h-[48px] w-full rounded-[24px] sm:w-[150px]">
            <div className="h-full w-full rounded-[24px] bg-default-200"></div>
          </Skeleton>
        </div>
      </div>
    );
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      <Form className="flex w-full flex-col gap-6 text-right" dir="rtl">
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

        <div className="mt-2 w-full sm:w-auto">
          <Button
            type="submit"
            content={isPending ? "در حال ثبت..." : "ذخیره اطلاعات"}
            color="bg-primary"
            disabled={isPending}
            customStyle="w-full sm:w-auto"
          />
        </div>
      </Form>
    </Formik>
  );
}
