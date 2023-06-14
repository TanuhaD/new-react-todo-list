import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import css from "./TodoList.module.css";
import { taskFilter } from "../../constants";

const TodoList = () => {
  const [taskList, setTaskList] = useState(() => {
    return JSON.parse(localStorage.getItem("taskList")) || [];
  });
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState(taskFilter.all);
  let filteredTaskList = taskList;
  if (filter !== taskFilter.all) {
    filteredTaskList = taskList.filter((task) => {
      return filter === taskFilter.completed ? task.completed : !task.completed;
    });
  }
  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleAddTask = () => {
    const task = {
      id: nanoid(),
      text: input,
      completed: false,
    };
    setTaskList((prevTaskList) => {
      return [...prevTaskList, task];
    });
    setInput("");
  };

  const handleDeleteTask = (id) => {
    setTaskList((prevTaskList) => {
      return prevTaskList.filter((task) => {
        return id !== task.id;
      });
    });
  };

  const handleCompletTask = (id) => {
    setTaskList((prevTaskList) => {
      const newTaskList = [...prevTaskList];
      const indexTaskToUpdate = newTaskList.findIndex((task) => {
        return task.id === id;
      });
      newTaskList[indexTaskToUpdate].completed = true;
      return newTaskList;
    });
  };
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  console.log(filteredTaskList);
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <textarea
          type="text"
          value={input}
          placeholder="Text"
          onChange={handleInputChange}
          className={css.input}
        />
        <button onClick={handleAddTask} className={css.btnAddTask}>
          Add a task
        </button>
      </div>
      <div>
        <form onChange={handleFilterChange} className={css.form}>
          <label>
            All
            <input type="radio" name="filter" value={taskFilter.all} />
          </label>
          <label>
            Completed
            <input type="radio" name="filter" value={taskFilter.completed} />
          </label>
          <label>
            Incompleted
            <input type="radio" name="filter" value={taskFilter.incompleted} />
          </label>
        </form>
      </div>

      <ul className={css.taskList}>
        {filteredTaskList.map(({ id, text, completed }) => {
          return (
            <li key={id} className={css.taskItem}>
              <p className={css.taskText}>{text}</p>
              <p className={css.taskComplete}>
                completed: {completed ? "yes" : "no"}
              </p>
              <div className={css.wrapperBtn}>
                <button
                  type="button"
                  onClick={() => handleCompletTask(id)}
                  className={css.taskBtnComplete}
                >
                  Completed
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteTask(id)}
                  className={css.taskBtnDelete}
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
