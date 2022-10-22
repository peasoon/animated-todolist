import "./App.scss";
import Button from "./components/Button";
import InputForm from "./components/InputForm";
import { ListContextProvider } from "./utils/ListContext/ListContextProvider";
import React from "react";
import { IListContext, Todo } from "./utils/ListContext/listContenxt";
import uniqid from "uniqid";
import TodoList from "./components/TodoList";
import { ReactComponent as Picture } from "./assets/moon.svg";

function App() {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [todo, setTodo] = React.useState<Todo>({
    id: "",
    title: "",
    description: "",
  });

	const List = React.useCallback(()=>{
		return <TodoList/>
	},[todos])

	const onChangeTitle = React.useCallback((e: React.ChangeEvent<HTMLInputElement>)=>{
		setTodo({ ...todo, title: e.target.value });
	},[])


  React.useEffect(() => {
    console.log(todos);
  }, [todos]);

  return (
    <ListContextProvider value={{ todos, setTodos }}>
      <div className="App">
        <div className="container">
          <h1>Very beautiful todo-листик</h1>
          <Picture width="128px" height="128px" className="moon"/>
          <div className="content">
            <div className="content__add">
              <InputForm
                style={{ width: "70%" }}
                onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                  event.preventDefault();
                  setTodos([
                    ...todos,
                    {
                      id: uniqid(),
                      title: todo.title,
                      description: todo.description,
                    },
                  ]);
                  setTodo({ id: "", title: "", description: "" });
                }}
              >
                <label>
                  <span>Title:</span>
                  <input
                    type="text"
                    value={todo.title}
                    onChange={onChangeTitle}
                  />
                </label>
                <label>
                  <span>Description:</span>
                  <input
                    type="text"
                    value={todo.description}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setTodo({ ...todo, description: e.target.value });
                    }}
                  />
                </label>
                <Button color="green">Add</Button>
              </InputForm>
            </div>
            <List />
          </div>
        </div>
      </div>
    </ListContextProvider>
  );
}

export default App;
