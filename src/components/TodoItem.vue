<template>
  <div :class="[
    'flex',
    'items-center',
    'p-4',
    'border-b',
    'border-gray-700/50',
    'bg-gray-800/50',
    'mb-2',
    'rounded-lg',
    'transition-all',
    'duration-300',
    'ease-in-out',
    'hover:bg-gray-700/70',
    'hover:border-cyan-500/50',
    { 'line-through-thick text-gray-500': todo.completed },
  ]">
    <input type="checkbox" :checked="todo.completed" @change="$emit('toggle-complete', todo.id)" class="mr-4 w-5 h-5 cursor-pointer bg-gray-700 border-gray-600 rounded text-cyan-500 focus:ring-cyan-500/50 focus:ring-2 accent-cyan-500" />
    <p class="flex-grow m-0 text-lg text-light" :class="{ 'text-gray-500': todo.completed }">{{ todo.text }}</p>
    <button @click="$emit('delete-todo', todo.id)" class="bg-gradient-to-br from-red-500 to-red-600 text-white border-none px-3 py-1.5 rounded-md cursor-pointer text-sm font-bold transition-all duration-300 ease-in-out shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/40 hover:scale-105">
      X
    </button>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
};
</script>


