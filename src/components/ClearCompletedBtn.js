import React from "react";

export default function ClearCompletedBtn({ clearCompletedTodos }) {
  return (
    <div>
      <button className="button" onClick={clearCompletedTodos}>
        Clear completed
      </button>
    </div>
  );
}
