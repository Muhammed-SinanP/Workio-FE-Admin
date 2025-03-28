import React from "react";
import ReactPaginate from "react-paginate";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const PaginationBtn = ({ handlePageClick, pageNo, pageCount }) => {
  return (
    <ReactPaginate
      containerClassName="my-10 flex gap-2 items-center justify-center"
      pageLinkClassName="font-medium pagination-btn"
      previousLinkClassName="pagination-btn"
      nextLinkClassName="pagination-btn"
      activeLinkClassName="!bg-brand scale-110 text-white"
      breakLinkClassName="dark:text-gray-300"
      disabledLinkClassName="cursor-not-allowed hover:bg-white dark:hover:bg-gray-300 text-darkColor opacity-50"
      breakLabel={<MoreHorizIcon />}
      previousLabel={<KeyboardArrowLeftIcon />}
      nextLabel={<KeyboardArrowRightIcon />}
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      pageCount={pageCount?pageCount:1}
      forcePage={pageNo ? pageNo : 0}
    />
  );
};

export default PaginationBtn;