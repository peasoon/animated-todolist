import * as React from "react";
import { ListContext, Todo } from "../utils/ListContext/listContenxt";
import TodoListItem from "./TodoListItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useWhyDidYouUpdate } from "ahooks";

interface ITodoListProps {}

const TodoList: React.FunctionComponent<ITodoListProps> = (props) => {
  const data = React.useContext(ListContext);
  const Fade = ({ children, ...props }: { children: React.ReactNode }) => (
    <CSSTransition {...props} timeout={300} classNames="fade">
      {children}
    </CSSTransition>
  );

  const dataTodos = React.useCallback(() => {
    return (
      <TransitionGroup className="content__list">
        {data?.todos &&
          data.todos.map((todo: Todo) => {
            return (
              <Fade key={todo.id}>
                <TodoListItem
                  key={todo.id}
                  title={todo.title}
                  description={todo.description}
                  id={todo.id}
                />
              </Fade>
            );
          })}
      </TransitionGroup>
    );
  }, [data?.todos]);

  return (
		<>{data?.todos && dataTodos()}</>
    // <TransitionGroup className="content__list">
    //   {
    //     data?.todos && dataTodos()
    //     // data.todos.map((todo: Todo) => {
    //     //   return (
    //     //     <Fade key={todo.id}>
    //     //       <TodoListItem
    //     //         key={todo.id}
    //     //         title={todo.title}
    //     //         description={todo.description}
    //     //         id={todo.id}
    //     //       />
    //     //     </Fade>
    //     //   );
    //     // })
    //   }
    // </TransitionGroup>
  );
};

export default React.memo(TodoList);
