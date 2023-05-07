import { useState, useEffect } from "react";
import { FaRegCircle, FaRegCheckCircle } from "react-icons/fa";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [notFinishedOnly, setNotFinishedOnly] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      setTodos([...todos, { title: inputValue, done: false }]);
      setInputValue("");
    }
  };

  const handleCheck = (index) => {
    const newTodos = [...todos];
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
  };

  const filteredTodos = notFinishedOnly
    ? todos.filter((todo) => !todo.done)
    : todos;

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <div className="todo-list-container">
        {filteredTodos.map((todo, index) => (
          <div
            key={index}
            className={`todo-item-container ${todo.done ? "done" : ""}`}
          >
            {todo.done ? (
              <FaRegCheckCircle
                className="item-done-button"
                color="#9a9a9a"
                onClick={() => handleCheck(index)}
              />
            ) : (
              <FaRegCircle
                className="item-done-button"
                color="#9a9a9a"
                onClick={() => handleCheck(index)}
              />
            )}
            <div className="item-title">{todo.title}</div>
          </div>
        ))}
      </div>
      <div className="not-finished-checkbox">
        <label>
          <input
            type="checkbox"
            checked={notFinishedOnly}
            onChange={(e) => setNotFinishedOnly(e.target.checked)}
          />
          Not finished only
        </label>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          placeholder="Enter task ..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default TodoList;
