import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { X } from "react-feather";
import Button from "../../common/Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const initialValues = {
  problem: "",
  describe: "",
};

const validationSchema = Yup.object({
  problem: Yup.string()
    .trim()
    .min(3, "عنوان مشکل حداقل ۳ کاراکتر باشد")
    .required("عنوان مشکل الزامی است"),

  describe: Yup.string()
    .trim()
    .min(10, "توضیحات حداقل ۱۰ کاراکتر باشد")
    .required("توضیحات الزامی است"),
});

const CreateTicketModal = ({ isOpen, onClose, onSubmit, isPending }) => {
  const modalRef = useRef(null);
  const backdropRef = useRef(null);

  useGSAP(
    () => {
      if (!isOpen) return;

      const tl = gsap.timeline();

      tl.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25 },
      ).fromTo(
        modalRef.current,
        {
          opacity: 0,
          y: 35,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "power3.out",
        },
        "-=0.1",
      );
    },
    { dependencies: [isOpen], revertOnUpdate: true },
  );

  if (!isOpen) return null;

  const handleSubmit = (values) => {
    onSubmit({
      problem: values.problem.trim(),
      describe: values.describe.trim(),
      errorId: null,
      ticketTypeId: null,
    });
  };

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      {" "}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-2xl bg-bg-main p-6 shadow-xl"
        dir="rtl"
      >
        <div className="mb-6 flex items-center justify-between">
          <div className="flex flex-col items-start gap-1 justify-start">
            <h2 className="text-lg font-bold text-text-dark">ثبت تیکت جدید</h2>
            <p className="mt-1 text-sm text-text-muted">
              مشکل خود را توضیح دهید تا پشتیبانی بررسی کند.
            </p>
          </div>

          <Button
            type="button"
            content={<X size={20} />}
            color="bg-transparent"
            textColor="text-text-muted"
            circle
            disabled={isPending}
            onClick={onClose}
            customStyle="h-9 w-9 hover:text-danger"
          ></Button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="problem"
                className="text-sm font-semibold text-text-dark"
              >
                موضوع مشکل
              </label>

              <Field
                id="problem"
                name="problem"
                type="text"
                placeholder="مثلاً دوره‌ها باز نمی‌شوند"
                disabled={isPending}
                className="h-12 w-full rounded-xl border border-border bg-bg-field px-4 text-sm text-text-dark outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
              />

              <ErrorMessage
                name="problem"
                component="p"
                className="text-xs text-danger"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="describe"
                className="text-sm font-semibold text-text-dark"
              >
                توضیحات مشکل
              </label>

              <Field
                as="textarea"
                id="describe"
                name="describe"
                rows={5}
                placeholder="مشکل خود را با جزئیات توضیح دهید..."
                disabled={isPending}
                className="w-full resize-none rounded-xl border border-border bg-bg-field p-4 text-sm leading-7 text-text-dark outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
              />

              <ErrorMessage
                name="describe"
                component="p"
                className="text-xs text-danger"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isPending}
                className="rounded-full border cursor-pointer border-border px-5 py-3 text-sm text-text-muted transition hover:bg-bg-field disabled:opacity-50"
              >
                انصراف
              </button>

              <Button
                type="submit"
                content={isPending ? "در حال ثبت..." : "ثبت تیکت"}
                color="bg-primary"
                textColor="text-white"
                textSize="text-sm"
                customStyle="px-6 py-3 font-semibold hover:shadow-none hover:bg-primary-hover disabled:opacity-50"
                disabled={isPending}
              />
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default CreateTicketModal;
