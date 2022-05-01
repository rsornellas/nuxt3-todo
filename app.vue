<template>
  <div>
    <section mt-10>
      <h1
        c-blue
        hover-text-red
        animate-bounce-alt
        animate-count-infinite
        animate-1s
      >
        bad boy, whatcha gonna do?
      </h1>
    </section>

    <section>
      <div>
        <input border-1 border-round shadow-inner focus-shadow-blue-200 v-model="inputName" type="text" />
        <button
          b-1
          b-blue
          ml-2
          px-3
          py-2
          hover-bg-blue-200
          bg-blue-100
          :disabled="!inputName"
          @click="addTodo"
        >
          ADD
        </button>
      </div>
    </section>

    <section>
      <ul>
        <li v-for="(item, i) in todoStore.items" :key="i">
          {{ item.title }} {{ item.createdAt }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useTodoStore } from "@/store/todo";

const todoStore = useTodoStore();
const inputName = ref("");

const addTodo = () => {
  if (!inputName.value) return;

  todoStore.addTodo({ title: inputName.value });
  inputName.value = "";
};
</script>
