import React from 'react'

export type Todo = {
	id: string;
	title: string;
	description: string
}

export interface IListContext {
	todos: Todo[];
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

export const ListContext = React.createContext<IListContext | null>(null)