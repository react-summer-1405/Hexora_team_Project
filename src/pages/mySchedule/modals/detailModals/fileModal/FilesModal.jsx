import { Download, File } from "react-feather";
import Modal from "../../Modal";

const imageRegex = /\.(jpg|jpeg|png|gif|webp|svg)$/i;

const FilesModal = ({ isOpen, toggle, files = [], isLoading }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={toggle}
      title={`فایل‌های جلسه (${files.length})`}
      size="lg"
      footer={
        <button
          type="button"
          onClick={toggle}
          className="cursor-pointer rounded-lg border border-primary px-5 py-2 text-sm font-medium text-primary transition-colors hover:bg-bg-field"
        >
          بستن
        </button>
      }
    >
      {isLoading && (
        <div className="flex justify-center py-6">
          <span className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></span>
        </div>
      )}

      {!isLoading && files.length === 0 && (
        <div className="py-8 text-center text-sm text-text-muted">
          فایلی برای این جلسه ثبت نشده.
        </div>
      )}

      <div className="space-y-3">
        {files.map((file) => {
          const cleanAddress = file.fileAddress.split("?")[0];
          const isImage = imageRegex.test(cleanAddress);
          const fileName = decodeURIComponent(cleanAddress.split("/").pop() ?? "");
          const extension = fileName.includes(".")
            ? fileName.split(".").pop().toUpperCase()
            : "";

          return (
            <div
              key={file.id}
              className="flex items-center gap-3 rounded-xl border border-border p-3"
            >
              {isImage ? (
                <img
                  src={file.fileAddress}
                  alt={fileName}
                  className="h-14 w-14 shrink-0 rounded-lg object-cover"
                />
              ) : (
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <File size={22} />
                </div>
              )}

              <div className="min-w-0 flex-1">
                <span
                  dir="ltr"
                  className="block truncate text-right text-sm font-semibold text-text-dark"
                >
                  {fileName}
                </span>

                <div className="mt-1 flex items-center gap-2">
                  {extension && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      {extension}
                    </span>
                  )}
                  <span className="text-xs text-text-muted">
                    {new Date(file.insertDate).toLocaleDateString("fa-IR", {
                      dateStyle: "medium",
                    })}
                  </span>
                </div>
              </div>

              <a
                href={file.fileAddress}
                target="_blank"
                rel="noreferrer"
                download
                aria-label="دانلود فایل"
                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary-hover"
              >
                <Download size={16} />
              </a>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default FilesModal;