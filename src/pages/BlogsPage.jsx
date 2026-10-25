import { useState } from "react";
import SortingRow from "../Components/blogsPage/components/blogsSection/components/SortingRow";
import FilterBox from "../Components/blogsPage/components/filterBox/components/FilterBox";
import HeroSection from "../Components/blogsPage/components/heroSection/components/HeroSection";
import Button from "../Components/common/Button";
import filterIcon from "../assets/icons/filter/filter.svg";
import sortIcon from "../assets/icons/filter/sorting.svg";
import useToggle from "../Components/hooks/useToggle";
import BlogsList from "../Components/blogsPage/components/blogsSection/components/BlogsList";

const BlogsPage = () => {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(false);
  const [filters, setFilters] = useState(false);

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

  return (
    <div className="flex flex-col gap-28">
      <HeroSection />
      <div className="flex flex-col lg:flex-row items-stretch lg:items-start gap-6 lg:gap-8">
        <FilterBox
          setFilters={setFilters}
          toggleFilter={toggleFilter}
          isFilterModal={isFilterModal}
        />

        <div className="w-[65%]   flex flex-col justify-center lg:items-start self-center gap-6">
          <SortingRow
            sortingButtons={sortingButtons}
            selected={selected}
            sortingHandler={sortingHandler}
            toggle={toggle}
            isOpenModal={isOpenModal}
          />
          <div className="lg:hidden flex flex-row w-full justify-between ">
            <Button content="فیلتر" icon={filterIcon} onClick={toggleFilter} />
            <Button content="ترتیب" icon={sortIcon} onClick={toggle} />
          </div>
          <BlogsList page={page} setPage={setPage} sortParams={sortParams} filters={filters} />
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
