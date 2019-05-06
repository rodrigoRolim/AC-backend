<template>
  <div id="ac-navbar">
    <slot></slot>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
#ac-navbar {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  text-align: center;
  
}
button {
  display: flex;
  flex-direction: row;
  padding: 9px 8px;
  margin: 5px 190px 5px;
  background-color:#f03a685e;
  border: 1px solid #f03a67;
  color: white;
  border-radius: 4px;
}
.rot-logout {
  align-self: center;
}
</style>
