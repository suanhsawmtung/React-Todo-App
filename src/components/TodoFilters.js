import React, { useEffect, useState } from "react";

export default function TodoFilters({ filterTodos }) {
  let [filterType, setFilterType] = useState("all");

  let handleFilter = (type) => setFilterType(type);

  useEffect(() => {
    filterTodos(filterType);
  }, [filterType, filterTodos]);

  return (
    <div>
      <button
        className={`button filter-button ${
          filterType === "all" ? "filter-button-active" : ""
        }`}
        onClick={() => handleFilter("all")}
      >
        All
      </button>
      <button
        className={`button filter-button ${
          filterType === "active" ? "filter-button-active" : ""
        }`}
        onClick={() => handleFilter("active")}
      >
        Active
      </button>
      <button
        className={`button filter-button ${
          filterType === "completed" ? "filter-button-active" : ""
        }`}
        onClick={() => handleFilter("completed")}
      >
        Completed
      </button>
    </div>
  );
}
