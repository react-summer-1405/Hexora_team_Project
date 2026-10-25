import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "../../../../common/Button";
import sentIcon from "../../../../../assets/icons/details/sent.svg";
import EmojiPicker from "emoji-picker-react";
import useToggle from "../../../../hooks/useToggle";
import { createPortal } from "react-dom";
import smileIcon from "../../../../../assets/icons/smile.svg";

const commentSchema = Yup.object({
  title: Yup.string().trim().required("عنوان را وارد کنید"),

  describe: Yup.string().trim().required("متن را وارد کنید"),
});

const CommentForm = ({ onSubmit, isPending }) => {
  const [isOpenSticker, toggle] = useToggle(false);

  return (
    <Formik
      initialValues={{ title: "", describe: "" }}
      validationSchema={commentSchema}
      onSubmit={(values, { resetForm }) =>
        onSubmit(
          {
            title: values.title.trim(),
            describe: values.describe.trim(),
          },
          resetForm,
        )
      }
    >
      {({ errors, submitCount, setFieldValue, values }) => (
        <Form className="w-full rounded-[24px] border border-primary flex flex-row items-center gap-2 p-2">
          {isOpenSticker &&
            createPortal(
              <div className="fixed bottom-0 left-1/2 z-[100] -translate-x-1/2">
                <EmojiPicker
                  onEmojiClick={(emojiData) => {
                    setFieldValue(
                      "describe",
                      values.describe + emojiData.emoji,
                    );
                  }}
                  width={1000}
                  height={450}
                />
              </div>,
              document.body,
            )}

          <Button
            type="submit"
            circle
            customStyle="w-10 h-10"
            icon={sentIcon}
            color="bg-primary"
            disable={isPending}
          />
          
          <Button
            type="button"
            onClick={toggle}
            circle
            icon={smileIcon}
            color="bg-bg-main"
            disabled={isPending}
            customStyle="p-2 border border-border"
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
};

export default CommentForm;
