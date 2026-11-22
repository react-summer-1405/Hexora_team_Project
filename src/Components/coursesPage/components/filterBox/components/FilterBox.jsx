import { Field, Form, Formik } from "formik";
import searchIcon from "../../../../../assets/icons/filter/search-01-stroke-rounded.svg";
import catIcon from "../../../../../assets/icons/filter/cells-stroke-rounded.svg";
import costIcon from "../../../../../assets/icons/filter/money-04-stroke-rounded.svg";
import teacherIcon from "../../../../../assets/icons/filter/teacher-stroke-rounded.svg";
import levelIcon from "../../../../../assets/icons/filter/layers-01-stroke-rounded.svg";
import dateIcon from "../../../../../assets/icons/filter/calendar-02-stroke-rounded.svg";
import reset from "../../../../../assets/icons/Arrows_Reload.svg";
import PriceRange from "./PriceRange";
import DateRange from "./DateRange";
import { useQuery } from "@tanstack/react-query";
import {
  getCourseLevel,
  getTeachers,
} from "../../../../../core/services/courses/getFilterdData";
import AutoSubmit from "./AutoSubmit";
import Button from "../../../../common/Button";
import SelectTech from "./SelectTech";
import RadioSelect from "./RadioSelect";

const initialValues = {
  Query: "",
  ListTech: [],
  courseLevelId: "",
  TeacherId: "",
  CostDown: 0,
  CostUp: 10000000,
  StartDate: "",
  EndDate: "",
};

const FilterBox = ({ setFilters, toggleFilter, isFilterModal, techs }) => {
  const { data: levels = [] } = useQuery({
    queryKey: ["courseLevel"],
    queryFn: getCourseLevel,
    staleTime: 1000 * 60 * 60,
    select: (res) =>
      res.map((l) => ({
        id: l.id,
        name: l.levelName,
      })),
  });

  const { data: teachers = [] } = useQuery({
    queryKey: ["allTeachers"],
    queryFn: getTeachers,
    staleTime: 1000 * 60 * 60,
    select: (res) =>
      res.map((l) => ({
        id: l.teacherId,
        name: l.fullName,
      })),
  });

  const filterFields = [
    {
      name: "Query",
      label: "جست‌وجو",
      icon: searchIcon,
      type: "search",
      placeholder: "دوره مورد نظر را جست‌وجو کنید...",
    },
    {
      name: "ListTech",
      label: "دسته‌بندی",
      icon: catIcon,
      type: "checkbox",
      placeholder: "دسته مورد نظر را انتخاب کنید",
      options: techs,
    },
    {
      name: "courseLevelId",
      label: "سطح آموزشی",
      icon: levelIcon,

      type: "select",
      placeholder: "سطح مورد نظر را انتخاب کنید",
      options: levels,
    },
    {
      name: "TeacherId",
      label: "اساتید",
      icon: teacherIcon,

      type: "select",
      placeholder: "استاد مورد نظر را انتخاب کنید",
      options: teachers,
    },
    {
      type: "range",
      label: "قیمت",
      icon: costIcon,
      names: ["CostDown", "CostUp"],
      min: 0,
      max: 10000000,
      step: 10000,
    },
    {
      type: "dateRange",
      label: "تاریخ برگزاری - اتمام",
      icon: dateIcon,
      names: ["StartDate", "EndDate"],
    },
  ];

  const handleSubmit = (values) => {
    if (values.StartDate && !values.EndDate) return;

    const { ListTech, ...rest } = values;

    const params = Object.fromEntries(
      Object.entries({
        ...rest,
        ListTech: ListTech.join(","),
        TechCount: ListTech.length,
      }).filter(([, v]) => v !== "" && v !== null && v !== 0),
    );

    console.log("params", params);
    setFilters(params);
  };

  return (
    <>
      <div
        onClick={toggleFilter}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
          isFilterModal
            ? "visible opacity-100"
            : "invisible opacity-0 pointer-events-none"
        }`}
      ></div>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ resetForm, values, setFieldValue }) => (
          <Form
            className={`filter w-full max-w-full lg:w-75 md:mt-16.5 z-50 text-right px-5 py-4 gap-4
    rounded-4xl border-2 bg-bg-main border-border
    flex lg:flex lg:flex-col
    fixed bottom-0 left-0 lg:static
    max-h-[85vh] overflow-y-auto lg:max-h-none lg:overflow-visible
    transition-all duration-500 ease-out lg:transition-none
    ${
      isFilterModal
        ? "visible opacity-100 translate-y-0"
        : "invisible opacity-0 translate-y-full lg:visible lg:opacity-100 lg:translate-y-0"
    }`}
          >
            <AutoSubmit delay={500} />
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-row justify-between w-full">
                <h2 className="text-2xl font-bold">فیلتر</h2>

                <div className="flex flex-row items-center gap-2">
                  <Button
                    circle
                    icon={reset}
                    type="button"
                    color="bg-bg-light"
                    iconSize="dark:invert-0"
                    customStyle="p-2 "
                    onClick={() => {
                      resetForm();
                      setFilters(false);
                    }}
                  />

                  <button
                    className={`${isFilterModal ? "block" : "hidden"} lg:hidden rounded-[34px] border border-danger text-danger bg-[url(../../assets/icons/cancel-01.svg)] 
        bg-no-repeat bg-[90%] bg-5 ps-9 transition-all
         duration-200 cursor-pointer text-lg  font-medium py-1.5 px-4 active:scale-85`}
                    onClick={toggleFilter}
                  >
                    بستن
                  </button>
                </div>
              </div>
              {filterFields.map((field) => (
                <div
                  key={field.label}
                  className="filter-field flex flex-col gap-2 "
                >
                  <label className="flex flex-row gap-2 font-medium text-base text-text-dark ">
                    <img src={field.icon} className="dark:invert" />
                    {field.label}
                  </label>

                  {field.type === "search" && (
                    <div className="relative w-full">
                      <Field
                        name={field.name}
                        placeholder={field.placeholder}
                        className="w-full rounded-[16px] outline-0 bg-bg-field p-4 px-3 text-xs"
                      />
                      <div className="absolute left-0 top-0 w-12 h-12 bg-[url(../../assets/icons/search-01.svg)] bg-no-repeat  bg-center bg-primary rounded-[16px] "></div>
                    </div>
                  )}

                  {field.type === "select" && (
                    <RadioSelect
                      name={field.name}
                      selected={values[field.name]}
                      onChange={(v) => setFieldValue(field.name, v)}
                      options={field.options}
                      placeholder={field.placeholder}
                    />
                  )}

                  {field.type === "checkbox" && (
                    <SelectTech
                      selected={values[field.name]}
                      onChange={(v) => setFieldValue(field.name, v)}
                      options={field.options}
                      placeholder={field.placeholder}
                    />
                  )}

                  {field.type === "range" && (
                    <PriceRange
                      min={field.min}
                      max={field.max}
                      step={field.step}
                      names={field.names}
                    />
                  )}

                  {field.type === "dateRange" && (
                    <DateRange names={field.names} />
                  )}
                </div>
              ))}
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FilterBox;
