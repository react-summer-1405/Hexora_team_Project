import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Button from "../../common/Button";
import { ChangeSecurityInfo, getSecurityInfo } from "../../../core/services/dashboard/profile.api";

const securityKey = ["securityInfo"];

const validationSchema = Yup.object({
  recoveryEmail: Yup.string().nullable().email("ایمیل واردشده معتبر نیست"),
  telegramUsername: Yup.string()
    .nullable()
    .matches(/^@?[A-Za-z0-9_]{5,32}$/, {
      message: "یوزرنیم تلگرام معتبر نیست (۵ تا ۳۲ کاراکتر انگلیسی، عدد یا _)",
      excludeEmptyString: true,
    }),
});

export default function SecurityInfo() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: securityKey,
    queryFn: getSecurityInfo,
  });

  const { mutate, isPending } = useMutation({
     mutationFn: ChangeSecurityInfo,

    onSuccess: () => {
      toast.success("اطلاعات امنیتی با موفقیت ذخیره شد");
      queryClient.invalidateQueries({ queryKey: securityKey });
    },

    onError: (error) => {
      const errors = error?.response?.data?.errors;
      toast.error(
        errors?.[0]?.message ||
          error?.response?.data?.message ||
          "ذخیره اطلاعات امنیتی ناموفق بود",
      );
    },
  });

  const handleSubmit = (values) => {
    mutate({
      twoStepAuth: values.twoStepAuth,
      recoveryEmail: values.recoveryEmail,
      telegramUsername: values.telegramUsername,
    });
  };

  if (isLoading) {
    return <div className="text-sm text-text-muted">در حال بارگذاری...</div>;
  }

  const telegrams = data?.userTelegrams;

  return (
    <Formik
      enableReinitialize
      initialValues={{
        twoStepAuth: data?.twoStepAuth ?? false,
        recoveryEmail: data?.recoveryEmail ?? "",
        telegramUsername: Array.isArray(telegrams)
          ? (telegrams[0]?.telegramUsername ?? telegrams[0] ?? "")
          : (telegrams ?? ""),
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className="flex w-full flex-col gap-6 text-right" dir="rtl">
          <div className="flex w-full max-w-[576px] items-center justify-between">
            <span className="text-[16px] font-semibold text-text-dark">
              ورود دو مرحله‌ای
            </span>

            <div
              role="switch"
              aria-checked={values.twoStepAuth}
              onClick={() => setFieldValue("twoStepAuth", !values.twoStepAuth)}
              className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors ${
                values.twoStepAuth ? "bg-primary" : "bg-border"
              }`}
            >
              <div
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${
                  values.twoStepAuth ? "right-0.5" : "right-[22px]"
                }`}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-[16px] font-semibold text-text-dark">
              ایمیل بازیابی
            </label>

            <div className="relative w-full max-w-[576px]">
              <Field
                type="email"
                name="recoveryEmail"
                dir="ltr"
                placeholder="ایمیل بازیابی خود را وارد کنید"
                className="h-[48px] w-full rounded-[24px] border border-border bg-bg-main px-5 text-[12px] font-medium text-text-muted outline-none focus:border-primary"
              />
            </div>

            <ErrorMessage
              name="recoveryEmail"
              component="p"
              className="text-xs text-danger"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-[16px] font-semibold text-text-dark">
              یوزرنیم تلگرام
            </label>

            <div className="relative w-full max-w-[576px]">
              <Field
                type="text"
                name="telegramUsername"
                dir="ltr"
                placeholder="@username"
                className="h-[48px] w-full rounded-[24px] border border-border bg-bg-main px-5 text-[12px] font-medium text-text-muted outline-none focus:border-primary"
              />
            </div>

            <ErrorMessage
              name="telegramUsername"
              component="p"
              className="text-xs text-danger"
            />
          </div>

          <div className="mt-2 w-full sm:w-auto">
            <Button
              type="submit"
              content={isPending ? "در حال ثبت..." : "ذخیره تغییرات"}
              color="bg-primary"
              disabled={isPending}
              customStyle="w-full sm:w-auto"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}
