<template>
  <header class="bg-gray-900/50 backdrop-blur-sm text-white py-4 shadow-lg shadow-cyan-500/10 border-b border-cyan-500/20">
    <div class="container mx-auto flex justify-between items-center max-w-6xl px-5">
      <h1 class="m-0 text-3xl tracking-wider font-mono font-bold text-cyan-400">My Todo List</h1>
      <button class="md:hidden flex flex-col justify-around w-[30px] h-[25px] bg-transparent border-none cursor-pointer p-0 z-50" @click="toggleNav">
        <span class="bar w-full h-[3px] bg-cyan-400 rounded-full transition-all duration-300 ease-in-out" :class="{ 'translate-y-[11px] rotate-45': isNavOpen }"></span>
        <span class="bar w-full h-[3px] bg-cyan-400 rounded-full transition-all duration-300 ease-in-out" :class="{ 'opacity-0': isNavOpen }"></span>
        <span class="bar w-full h-[3px] bg-cyan-400 rounded-full transition-all duration-300 ease-in-out" :class="{ '-translate-y-[11px] -rotate-45': isNavOpen }"></span>
      </button>
      <nav :class="{ 'translate-x-full': !isNavOpen, 'translate-x-0': isNavOpen }" class="fixed top-0 right-0 h-full w-full bg-gray-900/95 backdrop-blur-lg pt-20 shadow-lg transition-transform duration-300 ease-in-out z-50 md:relative md:right-auto md:w-auto md:h-auto md:bg-transparent md:pt-0 md:shadow-none md:transition-none md:z-auto md:transform-none">
        <ul class="list-none m-0 p-0 flex flex-col items-center md:flex-row">
          <li class="my-4 md:ml-5"><a href="#" class="text-cyan-400 no-underline font-bold transition-colors duration-300 ease hover:text-cyan-300 hover:text-shadow-lg text-xl md:text-base">Home</a></li>
          <li class="my-4 md:ml-5"><a href="#" class="text-cyan-400 no-underline font-bold transition-colors duration-300 ease hover:text-cyan-300 hover:text-shadow-lg text-xl md:text-base">About</a></li>
          <li class="my-4 md:ml-5"><a href="#" class="text-cyan-400 no-underline font-bold transition-colors duration-300 ease hover:text-cyan-300 hover:text-shadow-lg text-xl md:text-base">Settings</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'TheHeader',
  data() {
    return {
      isNavOpen: false,
    };
  },
  methods: {
    toggleNav() {
      this.isNavOpen = !this.isNavOpen;
    },
  },
};
</script>


