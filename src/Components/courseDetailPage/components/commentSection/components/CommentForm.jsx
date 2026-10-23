
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "../../../../common/Button";
import sentIcon from "../../../../../assets/icons/details/sent.svg";

const commentSchema = Yup.object({
  title: Yup.string()
    .trim()
    .required("عنوان را وارد کنید"),

  describe: Yup.string()
    .trim()
    .required("متن را وارد کنید"),
});

const CommentForm = ({ onSubmit, isPending }) => (
  <Formik
    initialValues={{ title: "", describe: "" }}
    validationSchema={commentSchema}
    onSubmit={(values, { resetForm }) =>
      onSubmit(
        {
          title: values.title.trim(),
          describe: values.describe.trim(),
        },
        resetForm
      )
    }
  >
    {({ errors, submitCount }) => (
      <Form className="w-full rounded-[24px] border border-primary flex flex-row items-center gap-2 p-2">
        <Button
          type="submit"
          circle
          customStyle="w-10 h-10"
          icon={sentIcon}
          color="bg-primary"
          disable={isPending}
          
        />

        <div className="w-full flex flex-col text-sm font-medium">
          <Field
            name="title"
            placeholder="عنوان نظر خود را بنویسید"
            className="border-b border-border h-9 w-full outline-none"
          />

          <Field
            name="describe"
            placeholder="متن نظر خود را بنویسید"
            className="w-full h-9 outline-none"
          />

          {submitCount > 0 && (errors.title || errors.describe) && (
            <span className="text-xs text-red-500">
              {errors.title || errors.describe}
            </span>
          )}
        </div>
      </Form>
    )}
  </Formik>
);

export default CommentForm;
