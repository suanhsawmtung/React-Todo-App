import React, { useState } from "react";

export default function Todo({ todo, deleteTodo, updateTodo }) {
  let [isEdit, setIsEdit] = useState(false);
  let [title, setTitle] = useState(todo.title);

  let handleSubmit = (e) => {
    e.preventDefault();
    updateTodo({ ...todo, title });
    setIsEdit(false);
  };

  let handleChecked = () => {
    updateTodo({ ...todo, completed: !todo.completed });
  };

  return (
    <li className="todo-item-container">
      <div className="todo-item">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleChecked}
        />
        {!isEdit && (
          <span
            onDoubleClick={() => setIsEdit(true)}
            className={`todo-item-label ${
              todo.completed ? "line-through" : ""
            }`}
          >
            {todo.title}
          </span>
        )}
        {isEdit && (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="todo-input"
              placeholder="What do you need to do?"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </form>
        )}
        {/* <input type="text" className="todo-item-input" value="Go to Grocery" /> */}
      </div>
      <button className="x-button" onClick={() => deleteTodo(todo)}>
        <svg
          className="x-button-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </li>
  );
}
