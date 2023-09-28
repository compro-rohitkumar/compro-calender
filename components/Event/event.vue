<template>
  <div class="event">
    <input type="checkbox" @click="handleClick()" checked />
    <img :src="fillImage" alt="image" v-if="checked"/>
    <img :src="image" alt="image" v-else/>
    <p>{{ name }}</p>
  </div>
</template>
  
  <script setup>
const emit = defineEmits(["click"]);
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  fillImage: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
});
const checked = ref(true);
const name = computed(() => props.name);
const image = computed(() => props.image);

const handleClick = () => {
  checked.value = !checked.value;
  emit("click", {
    checked: checked.value,
    id: props.id,
  });
};
</script>


<style scoped>
.event {
  display: flex;
  flex-direction: row !important;
  align-items: center;
  margin: 4px;
}
.event input {
  width: 16px;
  height: 16px;
}
.event image {
  width: 16px !important;
  height: 16px !important;
}
.event p {
  font-size: 12px;
  font-weight: 500;
  color: #374151;
}
</style>