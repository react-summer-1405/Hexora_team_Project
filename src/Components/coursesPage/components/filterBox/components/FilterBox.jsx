import { Field, Form, Formik } from "formik";
import searchIcon from "../../../../../assets/icons/filter/search-01-stroke-rounded.svg";
import catIcon from "../../../../../assets/icons/filter/cells-stroke-rounded.svg";
import costIcon from "../../../../../assets/icons/filter/money-04-stroke-rounded.svg";
import teacherIcon from "../../../../../assets/icons/filter/teacher-stroke-rounded.svg";
import levelIcon from "../../../../../assets/icons/filter/layers-01-stroke-rounded.svg";
import dateIcon from "../../../../../assets/icons/filter/calendar-02-stroke-rounded.svg";
import PriceRange from "./PriceRange";
import DateRange from "./DateRange";
import { useQuery } from "@tanstack/react-query";
import {
  getCourseLevel,
  getCourseTech,
  getTeachers,
} from "../../../../../core/services/courses/getFilterdData";
import AutoSubmit from "./AutoSubmit";

const initialValues = {
  Query: "",
  ListTech: "",
  courseLevelId: "",
  TeacherId: "",
  CostDown: 0,
  CostUp: 10000000,
  StartDate: "",
  EndDate: "",
};

const FilterBox = ({ setFilters ,toggleFilter,isFilterModal}) => {
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

  const { data: techs = [] } = useQuery({
    queryKey: ["courseTech"],
    queryFn: getCourseTech,
    staleTime: 1000 * 60 * 60,
    select: (res) =>
      res.map((l) => ({
        id: l.id,
        name: l.techName,
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
      type: "select",
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
    if (values.startDate && !values.endDate) return;
    const params = Object.fromEntries(
      Object.entries(values).filter(([, v]) => v !== "" && v !== null),
    );

    console.log("params", params);
    setFilters(params);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values }) => (
        <Form className={`lg:w-75 ${isFilterModal? "fixed bottom-0 left-0 flex":"hidden"} w-screen  z-50 lg:static lg:flex lg:flex-col text-right px-5 py-4 gap-4  rounded-4xl border-2 bg-bg-main border-border`}>
          <AutoSubmit delay={500} />
          
        <div  className="flex flex-col gap-4 w-full">
          <div className="flex flex-row justify-between w-full">
          <h2 className="text-2xl font-bold">فیلتر</h2>
                  <button className={`${isFilterModal? "block":"hidden"} lg:hidden rounded-[34px] border border-danger text-danger bg-[url(../../assets/icons/cancel-01.svg)] 
        bg-no-repeat bg-[90%] bg-5 ps-9 transition-[border-color,text-color,scale]
         duration-200 cursor-pointer text-lg  font-medium py-1.5 px-4 active:scale-85`} 
         onClick={toggleFilter}>بستن</button>
          </div>
          {filterFields.map((field) => (
            <div key={field.label} className="flex flex-col gap-2 ">
              <label className="flex flex-row gap-2 font-medium text-base text-text-dark ">
                <img src={field.icon} />
                {field.label}
              </label>

              {field.type === "search" && (
                <div className="relative w-full">
                <Field
                  name={field.name}
                  placeholder={field.placeholder}
                  className="w-full rounded-xl bg-bg-field p-4 px-3 text-xs"
                />
                <div className="absolute left-0 top-0 w-12 h-12 bg-[url(../../assets/icons/search-01.svg)] bg-no-repeat  bg-center bg-primary rounded-[16px] "></div>
                </div>
              )}

              {field.type === "select" && (
                <Field
                  as="select"
                  name={field.name}
                  className=" rounded-xl text-xs text-text-muted bg-bg-field px-3 py-4"
                >
                  <option value="">{field.placeholder}</option>
                  {field.options.map((o) => (
                    <option className="text-text-dark text-sm" key={o.id} value={o.id}>
                      {o.name}
                    </option>
                  ))}
                </Field>
              )}

              {field.type === "range" && (
                <PriceRange
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  names={field.names}
                />
              )}

              {field.type === "dateRange" && <DateRange names={field.names} />}
            </div>
          ))}
          </div>
        </Form>
      )}
    </Formik>
  );


};

export default FilterBox;
