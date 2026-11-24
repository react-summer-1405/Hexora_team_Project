import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UploadCloud, X, Upload, File } from "react-feather";
import toast from "react-hot-toast";
import { addExerciseFile } from "../../../../../core/services/dashboard/mySchedule/schedule";

const homeWorkKey = ["session-allHomeWork"];

const UploadFile = ({ homeWorkId, onUploaded }) => {
  const queryClient = useQueryClient();
  const [sessionFiles, setSessionFiles] = useState([]);
  const objectUrls = useRef([]);

  useEffect(() => {
    return () => {
      objectUrls.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const { mutate: addFile, isPending } = useMutation({
    mutationFn: addExerciseFile,
    onSuccess: () => {
      toast.success("فایل‌ها با موفقیت ارسال شدند");

      objectUrls.current.forEach((url) => URL.revokeObjectURL(url));
      objectUrls.current = [];
      setSessionFiles([]);

      queryClient.invalidateQueries({ queryKey: homeWorkKey });
      onUploaded?.();
    },
    onError: () => {
      toast.error("خطا در ارسال فایل‌ها");
    },
  });

  const handleFileChange = (e) => {
    const files = [...e.target.files];

    e.target.value = "";

    if (!files.length) return;

    const newItems = files.map((file) => {
      const previewUrl = URL.createObjectURL(file);
      objectUrls.current.push(previewUrl);

      return { file, previewUrl };
    });

    setSessionFiles((prev) => [...prev, ...newItems]);
  };

  const removeFile = (index) => {
    const previewUrl = sessionFiles[index].previewUrl;

    URL.revokeObjectURL(previewUrl);
    objectUrls.current = objectUrls.current.filter((url) => url !== previewUrl);

    setSessionFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const addFileHandler = () => {
    if (isPending) return;

    if (sessionFiles.length === 0) {
      toast.error("ابتدا یک فایل انتخاب کنید");
      return;
    }

    addFile({ files: sessionFiles.map((item) => item.file), homeWorkId });
  };

  return (
    <div className="space-y-4">
      <label
        htmlFor="sessionFiles"
        className={`flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-border px-4 py-6 text-center transition-colors hover:border-primary hover:bg-bg-field ${
          isPending ? "pointer-events-none opacity-50" : ""
        }`}
      >
        <UploadCloud size={36} className="mb-2 text-primary" />
        <span className="text-sm font-semibold text-text-dark">
          برای انتخاب فایل کلیک کنید
        </span>
        <span className="mt-1 text-xs text-text-muted">
          امکان انتخاب چند فایل وجود دارد
        </span>
      </label>

      <input
        type="file"
        id="sessionFiles"
        multiple
        onChange={handleFileChange}
        disabled={isPending}
        className="hidden"
      />

      {sessionFiles.length > 0 && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-text-dark">
              فایل‌های انتخاب‌شده
            </span>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {sessionFiles.length} فایل
            </span>
          </div>

          <div className="space-y-2">
            {sessionFiles.map((item, index) => (
              <div
                key={item.previewUrl}
                className="flex items-center gap-3 rounded-lg border border-border p-2"
              >
                {item.file.type.startsWith("image/") ? (
                  <img
                    src={item.previewUrl}
                    alt={item.file.name}
                    className="h-11 w-11 shrink-0 rounded-md object-cover"
                  />
                ) : (
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <File size={20} />
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <span
                    dir="ltr"
                    className="block truncate text-right text-sm font-medium text-text-dark"
                  >
                    {item.file.name}
                  </span>
                  <span className="text-xs text-text-muted">
                    {(item.file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  disabled={isPending}
                  aria-label="حذف فایل"
                  className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-danger transition-colors hover:bg-danger/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={addFileHandler}
        disabled={isPending || !sessionFiles.length}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? (
          <>
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
            <span>در حال ارسال فایل‌ها...</span>
          </>
        ) : (
          <>
            <Upload size={15} />
            <span>ارسال فایل‌ها</span>
          </>
        )}
      </button>
    </div>
  );
};

export default UploadFile;