import { useRef, useState } from "react";
import SortingRow from "../Components/blogsPage/components/blogsSection/components/SortingRow";
import FilterBox from "../Components/blogsPage/components/filterBox/components/FilterBox";
import HeroSection from "../Components/blogsPage/components/heroSection/components/HeroSection";
import Button from "../Components/common/Button";
import filterIcon from "../assets/icons/filter/filter.svg";
import sortIcon from "../assets/icons/filter/sorting.svg";
import useToggle from "../Components/hooks/useToggle";
import BlogsList from "../Components/blogsPage/components/blogsSection/components/BlogsList";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const BlogsPage = () => {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(false);
  const [filters, setFilters] = useState(false);
  const containerRef = useRef();

  const sortingButtons = [
    { name: "جدیدترین", SortingCol: "insertDate", SortType: "desc" },
    { name: "محبوب‌ترین", SortingCol: "currentLikeCount", SortType: "desc" },
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

useGSAP(
  () => {
    const tl = gsap.timeline({
      defaults: {
        ease: "expo.out",
      },
    });

    tl.from(containerRef.current, {
      y: 60,
      opacity: 0,
      duration: 1.2,
      clearProps: "transform,opacity",
    })
      .from(
        ".filter",
        {
          opacity: 0,
          y: 30,
          duration: 1,
          stagger: 0.15,
          clearProps: "transform,opacity",
        },
        "-=0.5",
      )

  },
  {
    scope: containerRef,
  },
);
  return (
    <div className="flex flex-col gap-28 ">
      <HeroSection />
      <div
        ref={containerRef}
        className="flex flex-col lg:flex-row items-stretch lg:items-start gap-6 px-7 lg:gap-8 "
      >
        <FilterBox
          setFilters={setFilters}
          toggleFilter={toggleFilter}
          isFilterModal={isFilterModal}
        />

        <div className="w-[65%]  flex flex-col justify-center lg:items-start self-center gap-6">
          <div className="lg:hidden flex flex-row w-full justify-between ">
            <Button content="فیلتر" icon={filterIcon} onClick={toggleFilter} />
            <Button content="ترتیب" icon={sortIcon} onClick={toggle} />
          </div>
          <BlogsList
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

export default BlogsPage;
