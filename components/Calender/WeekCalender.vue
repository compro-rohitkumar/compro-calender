<template>
    <div class="grid">
        <div></div>
        <div v-for="day in props.calenderDays" :key="day" :class="{'selected': select(day.Date) }">
            <p>{{ getWeekNameAndDate(day.Date) }}</p>
        </div>
    </div>
</template>


<script setup>
const props = defineProps({
    calenderDays:{
        type: Array,
        required: true
    },
})

const select = (date) => {
  const currentDate = new Date();
  return (
    date.getDate() === currentDate.getDate() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear()
  );
};

</script>


<style scoped>
    .grid{
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        
        border: 0.5px gray solid;
        text-align: center;
    }
    .grid div{
        border: 0.5px gray solid;
        
    }
    .selected {
        background-color: #c8ffe0;
    }
</style>