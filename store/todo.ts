import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";

export interface Todo {
  id: string;
  title: string;
  done: boolean;
  createAt: number;
  updateAt: number;
}

export interface TodoState {
  items: Todo[] | undefined[];
}

const state = (): TodoState => ({
  items: [],
});

const getters = {
  getById: (state: TodoState) => (id: string) => {
    return state.items.find((item: Todo) => item.id === id);
  },
  getOrderedTodos: (state: TodoState) =>
    [...state.items].sort((a: Todo, b: Todo) => a.createAt - b.createAt),
};

const actions = {
  addTodo(partialTodo: Partial<Todo>) {
    this.items.push({
      id: uuid(),
      ...partialTodo,
      done: false,
      createdAt: Date.now(),
      updateAt: Date.now(),
    });
  },
  updateTodo(id: string, updatedTodo: Partial<Todo>) {
    const index = this.items.findIndex((item) => item.id === id);

    this.items[index] = { ...this.items[index], ...updatedTodo, updateAt: Date.now() };
  },
  deleteTodo(id: string) {
    this.items = this.items.filter((todo: Todo) => todo.id !== id);
  },
};

export const useTodoStore = defineStore("todoStore", {
  state,
  getters,
  actions,
});
