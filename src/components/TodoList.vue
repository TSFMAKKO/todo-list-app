<template>
  <div class="max-w-2xl mx-auto mt-8 p-6 bg-gray-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl shadow-lg md:mx-5">
    <div class="flex mb-6 gap-3 flex-col sm:flex-row">
      <input type="text" v-model="newTodoText" @keyup.enter="addTodo" placeholder="Add a new todo..." class="flex-grow p-3 bg-gray-800 border border-gray-700 rounded-lg text-base text-light outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder-gray-500" />
      <button @click="addTodo" class="bg-gradient-to-br from-cyan-500 to-blue-600 text-white px-5 py-3 border border-cyan-500/50 rounded-lg cursor-pointer text-base font-bold transition-all duration-300 ease-in-out shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/40 hover:-translate-y-0.5">
        Add Todo
      </button>
    </div>
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @toggle-complete="toggleComplete"
      @delete-todo="deleteTodo"
    />
  </div>
</template>

<script>
import TodoItem from './TodoItem.vue';

export default {
  name: 'TodoList',
  components: {
    TodoItem,
  },
  data() {
    return {
      newTodoText: '',
      todos: [], // Initialize as empty array
    };
  },
  created() {
    this.fetchTodos();
  },
  methods: {
    async fetchTodos() {
      try {
        const response = await fetch('http://localhost:3100/todos');
        const data = await response.json();
        console.log('Fetched todos:', data);
        this.todos = data.data;
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    },
    async addTodo() {
      if (this.newTodoText.trim() === '') return;
      try {
        const response = await fetch('http://localhost:3100/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: this.newTodoText }),
        });
        const data = await response.json();
        if (data.data) {
          this.todos.unshift(data.data);
          this.newTodoText = '';
        }
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    },
    async toggleComplete(id) {
      const todoToUpdate = this.todos.find(todo => todo.id === id);
      if (!todoToUpdate) return;

      const newCompletedStatus = !todoToUpdate.completed;

      try {
        const response = await fetch(`http://localhost:3100/todos/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ completed: newCompletedStatus ? 1 : 0 }),
        });
        if (response.ok) {
          this.todos = this.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: newCompletedStatus } : todo
          );
        }
      } catch (error) {
        console.error('Error toggling complete status:', error);
      }
    },
    async deleteTodo(id) {
      try {
        const response = await fetch(`http://localhost:3100/todos/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          this.todos = this.todos.filter((todo) => todo.id !== id);
        }
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    },
  },
};
</script>


