import Button from "../../../../common/Button";
import blackLike from "../../../../../assets/icons/details/blackLike.svg";
import blackDislike from "../../../../../assets/icons/details/blackDislike.svg";
import useToggle from "../../../../hooks/useToggle";
import sentIcon from "../../../../../assets/icons/details/sent.svg";
import smileIcon from "../../../../../assets/icons/details/smile.svg";
import { Field, Formik } from "formik";
import { Form } from "react-aria-components";
export const CommentRow = ({
  title,
  text,
  authorName,
  authorImage,
  date,
  likes = 0,
  dislikes = 0,
  onLike,
  onDislike,
}) => {
  const [isReplyOpen, toggleReply] = useToggle(false);
  return (
    <div className="flex flex-col items-start justify-start gap-3">
      <div className="cursor-default flex flex-row gap-2 w-43.6 overflow-hidden ">
        <img
          src={authorImage}
          className="w-10 h-10 rounded-full border shrink-0"
        />
        <div className="text-right flex flex-col min-w-0 flex-1">
          <span className="text-sm font-semibold text-text-dark truncate">
            {authorName}
          </span>
          <span className="text-xs font-medium text-text-muted truncate">
            {date}
          </span>
        </div>
      </div>
      <div className="flex flex-col  text-right text-text-dark">
        <span className="text-lg font-bold ">{title}</span>
        <span className="text-base font-medium  ">{text}</span>
      </div>
      <div className="flex  w-3/4 flex-row items-center justify-start gap-5 p-2">
        <div className="flex flex-row items-center gap-1">
          <Button
            circle={true}
            color="bg-bg-main"
            icon={blackLike}
            customStyle="w-8 h-8"
            onClick={onLike}
          />
          <span className="text-base font-medium text-black">{likes}</span>
        </div>
        <div className="flex flex-row items-center gap-1">
          <Button
            circle={true}
            color="bg-bg-main"
            icon={blackDislike}
            customStyle="w-8 h-8"
            onClick={onDislike}
          />
          <span className="text-base font-medium text-black">{dislikes}</span>
        </div>
        {!isReplyOpen ? (
          <Button
            content="جواب دادن"
            textColor="primary"
            customStyle="border border-primary px-2 py-1.5 shrink-0"
            circle={false}
            color="bg-bg-main"
            onClick={toggleReply}
          />
        ) : (
          <Formik>
            <Form className="w-full  h-18 rounded-[24px] border border-primary flex flex-row items-center justify-start gap-2 p-2">
              <Button
                type="submit"
                circle={true}
                customStyle="w-10 h-10 "
                icon={sentIcon}
                color="bg-primary"
              />
              <Button
                icon={smileIcon}
                circle={true}
                color="bg-bg-main"
                customStyle="border border-border w-10 h-10"
              />
              <div className="h-full w-full flex flex-col justify-start items-center  text-sm font-medium text-text-muted">
                <Field
                  placeHolder="عنوان نظر خود را بنویسید"
                  className=" border-b border-border h-1/2 w-full"
                />
                <Field placeHolder="متن نظر خود را بنویسید" className="w-full h-1/2" />
              </div>
            </Form>
          </Formik>
        )}
      </div>
    </div>
  );
};
