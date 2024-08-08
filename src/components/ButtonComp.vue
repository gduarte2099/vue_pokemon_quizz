<template>
  <div class="mt-6 flow-root">
    <button
      :class="['float-right px-5 py-2 text-white text-lg text-sm-font-bold tracking-wide rounded-full', btnClass]"
    >
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    btnClass: {
      type: String,
      default: ''
    }
  }
};
</script>

<style scoped>
/* Puedes definir estilos predeterminados aquí si es necesario */
</style>

