import { Field, Form, Formik } from "formik";
import searchIcon from "../../../../../assets/icons/filter/search-01-stroke-rounded.svg";
import catIcon from "../../../../../assets/icons/filter/cells-stroke-rounded.svg";
import dateIcon from "../../../../../assets/icons/filter/calendar-02-stroke-rounded.svg";
import DateRange from "./DateRange";
import { useQuery } from "@tanstack/react-query";
import AutoSubmit from "./AutoSubmit";
import getBlogsTech from "../../../../../core/services/blogs/getFilteredBlogs";
import RadioSelect from "../../../../coursesPage/components/filterBox/components/RadioSelect";
import Button from "../../../../common/Button";
import reset from "../../../../../assets/icons/Arrows_Reload.svg";


const initialValues = {
  Query: "",
  NewsCategoryId: "",
  insertDate: "",
  updateDate: "",
};

const FilterBox = ({ setFilters, toggleFilter, isFilterModal }) => {
  const { data:techs=[] } = useQuery({
    queryKey: ["blogTech"],
    queryFn: getBlogsTech,
    staleTime: 1000 * 60 * 60,
       select: (res) =>
      res.map((l) => ({
        id: l.id,
        name: l.categoryName,
      })),
});

 

  

  const filterFields = [
    {
      name: "Query",
      label: "جست‌وجو",
      icon: searchIcon,
      type: "search",
      placeholder: "بلاگ مورد نظر را جست‌وجو کنید...",
    },
    {
      name: "NewsCategoryId",
      label: "دسته‌بندی",
      icon: catIcon,
      type: "select",
      placeholder: "دسته مورد نظر را انتخاب کنید",
      options: techs,
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
      {({ values , setFieldValue , resetForm }) => (
        <Form
          className={`filter  w-full max-w-full lg:w-75 md:mt-16.5 z-50 text-right px-5 py-4 gap-4
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
              <div key={field.label} className="filter-field flex flex-col gap-2 ">
                <label className="flex flex-row gap-2 font-medium text-base text-text-dark ">
                  <img src={field.icon} className="dark:invert" />
                  {field.label}
                </label>

                {field.type === "search" && (
                  <div className="relative w-full">
                    <Field
                      name={field.name}
                      placeholder={field.placeholder}
                      className="w-full rounded-[16px] bg-bg-field p-4 px-3 text-xs outline-0"
                    />
                    <div className="absolute left-0 top-0 w-13 h-full bg-[url(../../assets/icons/search-01.svg)] bg-no-repeat  bg-center bg-primary rounded-[16px] "></div>
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
