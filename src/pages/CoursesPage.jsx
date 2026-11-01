import { useRef, useState } from "react";
import CoursesList from "../Components/coursesPage/components/coursesSection/components/CoursesList";
import SortingRow from "../Components/coursesPage/components/coursesSection/components/SortingRow";
import FilterBox from "../Components/coursesPage/components/filterBox/components/FilterBox";
import HeroSection from "../Components/coursesPage/components/heroSection/components/HeroSection";
import Button from "../Components/common/Button";
import filterIcon from "../assets/icons/filter/filter.svg";
import sortIcon from "../assets/icons/filter/sorting.svg";
import useToggle from "../Components/hooks/useToggle";
import { useQuery } from "@tanstack/react-query";
import { getCourseTech } from "../core/services/courses/getFilterdData";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CoursesPage = () => {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(false);
  const [filters, setFilters] = useState(false);
  const containerRef = useRef();

  const sortingButtons = [
    { name: "جدیدترین", SortingCol: "lastUpdate", SortType: "desc" },
    { name: "محبوب‌ترین", SortingCol: "likeCount", SortType: "desc" },
    { name: "گران‌ترین", SortingCol: "cost", SortType: "desc" },
    { name: "ارزان‌ترین", SortingCol: "cost", SortType: "asc" },
  ];

  const sortingHandler = (s) => {
    if (selected === s.name) setSelected(false);
    else setSelected(s.name);
    setPage(1);
  };

  const [isOpenModal, toggle] = useToggle(false);
  const [isFilterModal, toggleFilter] = useToggle(false);

  const selectedButton = sortingButtons.find((b) => b.name === selected);

  const sortParams = selectedButton
    ? {
        SortingCol: selectedButton.SortingCol,
        SortType: selectedButton.SortType,
      }
    : { SortingCol: "Active", SortType: "desc" };

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

  useGSAP(
    () => {
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .from(containerRef.current, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          clearProps: "transform,opacity",
        })
        .from(".filter", {
          opacity: 0,
          y: 30,
          duration: 1,
          stagger: 0.15,
          clearProps: "transform,opacity",
        })

    },
    { scope: containerRef },
  );

  return (
    <div className="flex flex-col gap-28">
      <HeroSection/>
      <div
        className="flex flex-col lg:flex-row items-stretch lg:items-start gap-6 px-7 lg:gap-8"
        ref={containerRef}
      >
        <FilterBox
          setFilters={setFilters}
          toggleFilter={toggleFilter}
          isFilterModal={isFilterModal}
          techs={techs}
        />

        <div className="w-[75%] flex flex-col lg:items-start lg:self-start self-center gap-6">
          <div className="lg:hidden flex flex-row w-full justify-between ">
            <Button content="فیلتر" icon={filterIcon} onClick={toggleFilter} />
            <Button content="ترتیب" icon={sortIcon} onClick={toggle} />
          </div>
          <CoursesList
            page={page}
            setPage={setPage}
            sortParams={sortParams}
            filters={filters}
              sortingButtons={sortingButtons}
            selected={selected}
            sortingHandler={sortingHandler}
            toggle={toggle}
            isOpenModal={isOpenModal}
          />
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
