<template>
  <TheHeader />
  <TodoList />
</template>

<script>
import TheHeader from './components/TheHeader.vue'
import TodoList from './components/TodoList.vue'

export default {
  name: 'App',
  components: {
    TheHeader,
    TodoList
  }
}
</script>

<style>
/* Tailwind CSS will handle most styling */
</style>
