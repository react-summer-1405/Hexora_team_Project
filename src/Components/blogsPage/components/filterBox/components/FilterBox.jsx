import { Field, Form, Formik } from "formik";
import searchIcon from "../../../../../assets/icons/filter/search-01-stroke-rounded.svg";
import catIcon from "../../../../../assets/icons/filter/cells-stroke-rounded.svg";
import dateIcon from "../../../../../assets/icons/filter/calendar-02-stroke-rounded.svg";
import DateRange from "./DateRange";
import { useQuery } from "@tanstack/react-query";
import AutoSubmit from "./AutoSubmit";
import getBlogsTech from "../../../../../core/services/blogs/getFilteredBlogs";

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
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values }) => (
        <Form
          className={`lg:w-75 ${isFilterModal ? "fixed bottom-0 left-0 flex" : "hidden"} w-screen  z-50 lg:static lg:flex lg:flex-col text-right px-5 py-4 gap-4  rounded-4xl border-2 bg-bg-main border-border`}
        >
          <AutoSubmit delay={500} />

          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-row justify-between w-full">
              <h2 className="text-2xl font-bold">فیلتر</h2>
              <button
                className={`${isFilterModal ? "block" : "hidden"} lg:hidden rounded-[34px] border border-danger text-danger bg-[url(../../assets/icons/cancel-01.svg)] 
        bg-no-repeat bg-[90%] bg-5 ps-9 transition-[border-color,text-color,scale]
         duration-200 cursor-pointer text-lg  font-medium py-1.5 px-4 active:scale-85`}
                onClick={toggleFilter}
              >
                بستن
              </button>
            </div>
            {filterFields.map((field) => (
              <div key={field.label} className="flex flex-col gap-2 ">
                <label className="flex flex-row gap-2 font-medium text-base text-text-dark ">
                  <img src={field.icon} className="dark:invert" />
                  {field.label}
                </label>

                {field.type === "search" && (
                  <div className="relative w-full">
                    <Field
                      name={field.name}
                      placeholder={field.placeholder}
                      className="w-full rounded-[16px] bg-bg-field p-4 px-3 text-xs"
                    />
                    <div className="absolute left-0 top-0 w-13 h-full bg-[url(../../assets/icons/search-01.svg)] bg-no-repeat  bg-center bg-primary rounded-[16px] "></div>
                  </div>
                )}

                {field.type === "select" && (
                  <Field
                    as="select"
                    name={field.name}
                    className=" rounded-[16px] text-xs text-text-muted bg-bg-field px-3 py-4"
                  >
                    <option value="">{field.placeholder}</option>
                    {field.options.map((o) => (
                      <option
                        className="text-text-dark text-sm"
                        key={o.id}
                        value={o.id}
                      >
                        {o.name}
                      </option>
                    ))}
                  </Field>
                )}

              
              </div>
            ))}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FilterBox;
