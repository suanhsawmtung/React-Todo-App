import "./reset.css";
import "./App.css";
import TodoForm from "./components/TodoForm.js";
import TodoList from "./components/TodoList.js";
import CheckAllAndRemaining from "./components/CheckAllAndRemaining.js";
import TodoFilters from "./components/TodoFilters.js";
import ClearCompletedBtn from "./components/ClearCompletedBtn.js";
import { useState, useEffect, useCallback } from "react";

function App() {
  let [todos, setTodos] = useState([]);
  let [filteredTodos, setFilteredTodos] = useState([]);
  let remainingItemsCount = todos.filter((todo) => !todo.completed).length;

  useEffect(() => {
    fetch("http://localhost:2000/todos")
      .then((res) => res.json())
      .then((todos) => {
        setTodos(todos);
        setFilteredTodos(todos);
      });
  }, []);

  let addTodo = (todo) => {
    fetch("http://localhost:2000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    setTodos((prevState) => [...prevState, todo]);
  };

  let deleteTodo = (todo) => {
    fetch(`http://localhost:2000/todos/${todo.id}`, {
      method: "DELETE",
    });
    setTodos((prevState) => prevState.filter((Todo) => Todo.id !== todo.id));
  };

  let updateTodo = (todo) => {
    fetch(`http://localhost:2000/todos/${todo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    setTodos((prevState) =>
      prevState.map((Todo) => {
        if (Todo.id === todo.id) return todo;
        return Todo;
      })
    );
  };

  let checkAll = () => {
    todos.forEach((todo) => {
      if (!todo.completed) {
        todo.completed = true;
        updateTodo(todo);
      }
    });
  };

  let clearCompletedTodos = () => {
    todos.forEach((todo) => {
      if (todo.completed) {
        deleteTodo(todo);
      }

      setTodos((prevState) => prevState.filter((Todo) => !Todo.completed));
    });
  };

  let filterTodos = useCallback(
    (type) => {
      switch (type) {
        case "all":
          setFilteredTodos(todos);
          break;
        case "active":
          setFilteredTodos(todos.filter((todo) => !todo.completed));
          break;
        case "completed":
          setFilteredTodos(todos.filter((todo) => todo.completed));
          break;
        default:
          setFilteredTodos(todos);
      }
    },
    [todos]
  );

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <TodoForm addTodo={addTodo} />

        <TodoList
          todos={filteredTodos}
          setTodos={setTodos}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />

        <CheckAllAndRemaining
          remainingItemsCount={remainingItemsCount}
          checkAll={checkAll}
        />

        <div className="other-buttons-container">
          <TodoFilters filterTodos={filterTodos} />

          <ClearCompletedBtn clearCompletedTodos={clearCompletedTodos} />
        </div>
      </div>
    </div>
  );
}

export default App;
