import * as React from "react";
import { ListContext } from "../utils/ListContext/listContenxt";
import Button from "./Button";
import InputForm from "./InputForm";
import { Modal } from "antd";
import "antd/dist/antd.css";


interface ITodoListItemProps {
  title: string;
  description: string;
  id: string;
}

const TodoListItem: React.FunctionComponent<ITodoListItemProps> = ({
  title,
  description,
  id,
}) => {
  const [isEditable, setIsEditable] = React.useState(false);
  const [updatedTodo, setUpdatedTodo] = React.useState({ title, description });
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const todosData = React.useContext(ListContext);

  const valueSetter = (param: "title" | "description"): string => {
    const val = param === "title" ? title : description;
    return isEditable ? updatedTodo[param] : val;
  };
  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    param: "title" | "description"
  ) => {
    isEditable &&
      setUpdatedTodo((prev) => {
        return { ...prev, [param]: event.target.value };
      });
  };
  const updateData = (): void => {
    isEditable &&
      todosData?.setTodos((prev) =>
        prev.map((el) => {
          if (el.id !== id) {
            return el;
          } else {
            return {
              ...el,
              title: updatedTodo.title,
              description: updatedTodo.description,
            };
          }
        })
      );
    setIsEditable((prev) => !prev);
  };

  const deleteItem = () => {
    todosData?.setTodos((prev) => prev.filter((el) => el.id !== id));
  };



  return (
    <>
      <Modal
        title="Warning!!!"
        closable={false}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        onOk={() => {
          setIsModalOpen(false);
          deleteItem();
        }}
      >
        <p>Are you Shura?</p>
      </Modal>
      <div className="content__list_item">
        <InputForm
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
          }}
        >
          <label>
            <span>Title:</span>
            <input
              type="text"
              value={valueSetter("title")}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                onChangeHandler(event, "title");
              }}
            />
          </label>
          <label>
            <span>Description:</span>
            <input
              type="text"
              value={valueSetter("description")}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                onChangeHandler(event, "description");
              }}
            />
          </label>
          <Button color="orange" onClick={updateData}>
            {isEditable ? "OK" : "Edit"}
          </Button>
          <Button
            color="red"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Delete
          </Button>
        </InputForm>
      </div>
    </>
  );
};

export default React.memo(TodoListItem);
