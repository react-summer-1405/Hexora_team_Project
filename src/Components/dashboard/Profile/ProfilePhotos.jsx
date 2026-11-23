import imageAddIcon from "../../../assets/icons/dashboard/selectedImage.svg";
import addIcon from "../../../assets/icons/dashboard/image-add-02-stroke-rounded 2.png";
import threePointMenu from "../../../assets/icons/dashboard/more-vertical-circle.svg";
import uploadIcon from "../../../assets/icons/dashboard/Upload.svg";
import Button from "../../common/Button";

import { useEffect, useState } from "react";
import { Skeleton } from "@heroui/react";
import {
  useAddProfileImage,
  useDeleteProfileImage,
  useProfile,
  useSelectProfileImage,
} from "../../../hooks/dashboard/userProfile";
import toast from "react-hot-toast";

const maxSizeMB = 5;

const PREVIEW_ID = "preview";

export default function ProfilePhotos() {
  const { data: profileData, isLoading } = useProfile();
  const { mutate: addImage, isPending: isAdding } = useAddProfileImage();
  const { mutate: selectImage, isPending: isSelecting } =
    useSelectProfileImage();
  const { mutate: deleteImage, isPending: isDeleting } =
    useDeleteProfileImage();

  const profileImages = profileData?.userPicture ?? [];

  const [selectedId, setSelectedId] = useState(null);
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const isDeleteModalOpen = deleteTarget !== null;

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("فقط فایل تصویری مجاز است");
      return;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`حجم عکس نباید بیشتر از ${maxSizeMB} مگابایت باشد`);
      return;
    }

    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSelectImage = (id) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const handleAddImage = () => {
    if (isAdding) return;

    if (!image) {
      toast.error("ابتدا یک عکس آپلود کنید");
      return;
    }

    addImage(image, {
      onSuccess: (data) => {
        if (data?.success) {
          setImage(null);
          setPreviewUrl(null);
        }
      },
    });
  };

  const handleSetProfileImage = () => {
    if (isSelecting) return;

    if (!selectedId) {
      toast.error("ابتدا یکی از عکس‌های لیست را انتخاب کنید");
      return;
    }

    selectImage(selectedId, {
      onSuccess: (data) => {
        if (data?.success) setSelectedId(null);
      },
    });
  };

  const handleToggleMenu = (id) => {
    setMenuOpenId((prev) => (prev === id ? null : id));
  };

  const handleOpenDeleteModal = (target) => {
    setMenuOpenId(null);
    setDeleteTarget(target);
  };

  const handleConfirmDelete = () => {
    if (isDeleting) return;

    if (deleteTarget === PREVIEW_ID) {
      setImage(null);
      setPreviewUrl(null);
      setDeleteTarget(null);
      return;
    }

    deleteImage(deleteTarget, {
      onSuccess: (data) => {
        if (data?.success && selectedId === deleteTarget) setSelectedId(null);
      },
      onSettled: () => setDeleteTarget(null),
    });
  };

  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-6" dir="rtl">
        <div className="flex w-full flex-col items-center justify-between gap-3 sm:flex-row">
          <Skeleton className="h-[48px] w-full rounded-full sm:w-[200px]">
            <div className="h-full w-full rounded-full bg-default-200"></div>
          </Skeleton>
          <Skeleton className="h-[48px] w-full rounded-full sm:w-[250px]">
            <div className="h-full w-full rounded-full bg-default-200"></div>
          </Skeleton>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={`skeleton-img-${i}`}
              className="aspect-square w-full rounded-[16px]"
            >
              <div className="h-full w-full rounded-[16px] bg-default-200"></div>
            </Skeleton>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6" dir="rtl">
      <div className="flex w-full flex-col items-center justify-between gap-3 sm:flex-row">
        <Button
          color="bg-primary"
          icon={addIcon}
          content={isAdding ? "در حال ارسال..." : "اضافه کردن عکس"}
          customStyle={`w-full sm:w-auto ${
            !image || isAdding ? "opacity-50" : ""
          }`}
          onClick={handleAddImage}
        />

        <Button
          color="bg-primary"
          icon={imageAddIcon}
          content={
            isSelecting ? "در حال ثبت..." : "انتخاب به‌عنوان عکس پروفایل"
          }
          customStyle={`w-full sm:w-auto ${
            !selectedId || isSelecting ? "opacity-50" : ""
          }`}
          onClick={handleSetProfileImage}
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-text-muted sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
        {profileImages.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => handleSelectImage(photo.id)}
            className={`relative flex aspect-square w-full cursor-pointer flex-col items-start justify-start rounded-[16px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:translate-y-0 active:scale-95 ${
              selectedId === photo.id
                ? "ring-2 ring-primary ring-offset-2 ring-offset-white dark:ring-offset-bg-light"
                : ""
            } ${menuOpenId === photo.id ? "z-20" : ""}`}
          >
            <div className="absolute top-2 right-2 z-20 flex items-center gap-2">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleMenu(photo.id);
                }}
              >
                <Button
                  circle
                  icon={threePointMenu}
                  color="bg-bg-main"
                  iconSize="w-4 h-4"
                  customStyle="p-2"
                />
              </div>

              {selectedId === photo.id && (
                <img src={imageAddIcon} className="h-8 w-8" />
              )}

              {menuOpenId === photo.id && (
                <div className="absolute top-full right-0 z-20 mt-2 w-max overflow-hidden rounded-[12px] bg-bg-light p-2 text-text-dark shadow-lg">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDeleteModal(photo.id);
                    }}
                    className="cursor-pointer text-center text-xs text-danger transition-colors hover:bg-bg-field"
                  >
                    <span>حذف عکس</span>
                  </div>
                </div>
              )}
            </div>

            <img
              src={photo.puctureAddress}
              alt={`Photo ${index + 1}`}
              className="h-full w-full rounded-[16px] object-cover"
            />
          </div>
        ))}

        <div
          className={`relative aspect-square w-full rounded-[16px] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg active:translate-y-0 active:scale-95 ${
            menuOpenId === PREVIEW_ID ? "z-20" : ""
          }`}
        >
          <label
            className={`group relative flex h-full w-full cursor-pointer flex-col items-center justify-center gap-5 overflow-hidden rounded-[16px] ${
              image
                ? ""
                : "select-none border border-dashed border-primary hover:border-solid hover:bg-primary/10"
            }`}
          >
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {previewUrl ? (
              <img
                src={previewUrl}
                alt="پیش‌نمایش عکس انتخاب‌شده"
                className="h-full w-full rounded-[16px] object-cover"
              />
            ) : (
              <>
                <img
                  src={uploadIcon}
                  className="h-6 w-6 transition-all duration-300 group-hover:scale-120"
                />
                <span className="text-base text-primary transition-all duration-300 ease-in-out group-hover:scale-x-105 group-hover:text-primary-hover">
                  آپلود عکس
                </span>
              </>
            )}
          </label>

          {previewUrl && (
            <div className="absolute top-2 right-2 z-20 flex items-center gap-2">
              <Button
                circle
                icon={threePointMenu}
                color="bg-bg-main"
                iconSize="w-4 h-4"
                customStyle="p-2"
                onClick={() => handleToggleMenu(PREVIEW_ID)}
              />

              {menuOpenId === PREVIEW_ID && (
                <div className="absolute top-full right-0 z-20 mt-2 w-max overflow-hidden rounded-[12px] bg-bg-light p-2 text-text-dark shadow-lg">
                  <div
                    onClick={() => handleOpenDeleteModal(PREVIEW_ID)}
                    className="cursor-pointer text-center text-xs text-danger transition-colors hover:bg-bg-field"
                  >
                    <span>حذف عکس</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {menuOpenId && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setMenuOpenId(null)}
        />
      )}

      <div
        aria-hidden={!isDeleteModalOpen}
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm transition-all duration-300 ease-in-out ${
          isDeleteModalOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setDeleteTarget(null)}
      >
        <div
          className={`flex w-full max-w-sm flex-col items-center gap-5 rounded-[16px] bg-white p-6 text-center text-text-dark transition-all duration-300 ease-out dark:bg-bg-field ${
            isDeleteModalOpen
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-4 scale-95 opacity-0"
          }`}
          dir="rtl"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-base font-medium">
            آیا مطمئن هستید که می‌خواهید حذف کنید؟
          </span>
          <div className="flex w-full gap-3">
            <div
              onClick={handleConfirmDelete}
              className={`flex-1 cursor-pointer rounded-[12px] bg-danger py-2 text-text-white transition-opacity hover:opacity-80 ${
                isDeleting ? "pointer-events-none opacity-60" : ""
              }`}
            >
              <span>{isDeleting ? "در حال حذف..." : "بله، حذف شود"}</span>
            </div>
            <div
              onClick={() => setDeleteTarget(null)}
              className="flex-1 cursor-pointer rounded-[12px] bg-border py-2 text-text-dark transition-opacity hover:opacity-80"
            >
              <span>انصراف</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
