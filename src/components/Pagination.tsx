// components/Pagination.tsx
import React from "react";
import Link from "next/link";
import { itemsPerPage } from "../data";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalItems }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, index) => (
        <Link href={`/page/${index + 1}`} key={index + 1}>
          <a className={currentPage === index + 1 ? "active" : ""}>{index + 1}</a>
        </Link>
      ))}
    </div>
  );
};

export default Pagination;
