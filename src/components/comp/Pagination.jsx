import React from "react";

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul>
      {pageNumbers.map((number) => (
        <li
          key={number}
          className={`h-6 w-6 mt-2 text-neutral-50 text-center font-bold rounded ${
            currentPage === number ? "bg-neutral-900" : "bg-neutral-800"
          }`}
        >
          <button onClick={() => paginate(number)}>{number}</button>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
