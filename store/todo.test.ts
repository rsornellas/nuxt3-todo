import { createPinia, setActivePinia } from "pinia";
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from "vitest";

import { useTodoStore } from "./todo";

beforeAll(() => {
  setActivePinia(createPinia());
});

describe("useTodoStore", () => {
  let store: ReturnType<typeof useTodoStore>;

  beforeEach(() => {
    store = useTodoStore();
  });

  afterEach(() => {
    store.$reset();
  });

  test("creates a store", () => {
    expect(store).toBeDefined();
  });

  test("store state is empty", () => {
    expect(store.items).toStrictEqual([]);
  });

  test("create a todo", () => {
    store.addTodo({ title: "New todo" });
    expect(store.items[0]).toBeDefined();
    expect(store.items[0].title).toBe("New todo");
  });

  test("get todo by id", () => {
    store.addTodo({ title: "New todo" });
    const item = store.items[0];
    const getedById = store.getById(item.id);
    expect(getedById.title).toBe("New todo");
  });

  test("get ordered todos", () => {
    store.addTodo({ title: "second todo", createAt: 2 });
    store.addTodo({ title: "third todo", createAt: 3 });
    store.addTodo({ title: "first todo", createAt: 1 });
    const getOrderedTodos = store.getOrderedTodos;
    expect(getOrderedTodos[0].title).toBe("first todo");
    expect(getOrderedTodos[1].title).toBe("second todo");
    expect(getOrderedTodos[2].title).toBe("third todo");
  });
  
  test("update a Todo", () => {
    store.addTodo({ title: "first todo", id: "1" });
    store.updateTodo("1", { title: "new title", done: true });
    expect(store.items[0]).toBe(store.items[0]);
    expect(store.items[0].title).toBe("new title");
    expect(store.items[0].done).toBe(true);
  });

  test("delete a Todo", () => {
    store.addTodo({ title: "first todo", id: "1" });
    store.deleteTodo('1')
    expect(store.items).toStrictEqual([]);
  });
});
