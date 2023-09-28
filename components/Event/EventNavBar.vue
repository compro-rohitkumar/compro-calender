<template>
  <div class="RightBar_container">
    <p>Events</p>
    <div>
      <event
        v-for="item in props.events"
        :key="item.id"
        :name="item.name"
        :image="item.image"
        :fillImage="item.fillImage"
        :id="item.id"
        @click="handleClick"
      />
    </div>
  </div>
</template>
  
<script setup>
const emit = defineEmits(["addEvent", "removeEvent"]);
const props = defineProps({
  events: {
    type: Array,
    required: true,
  },
});

const handleClick = (prop) => {
  if (prop.checked) {
    emit("addEvent", prop.id);
  } else {
    emit("removeEvent", prop.id);
  }
};
</script>
<style scoped>
.RightBar_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  margin: 12px 10px;
  pading: 14px 10px;
  min-width: 100px;
}

.RightBar_container p {
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
}

.RightBar_container div {
  display: flex;
  flex-direction: column;
}
</style>
  