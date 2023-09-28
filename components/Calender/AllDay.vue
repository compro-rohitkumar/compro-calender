<template>
  <div class="grid">
    <div>All Day</div>
    <div v-for="day in props.calenderDays" :key="day" class="border" >
        <div v-for="event in day.event" :key="event.id" >
            <p :style="{backgroundColor:event.color}" @click="handleClick(event)">{{ `${event.eventUser} : ${event.name}` }}</p>
        </div>
    </div>
  </div>
</template>

<script setup>
    const emit = defineEmits(['toggleTaskModal'])
    const props = defineProps({
        calenderDays:{
            type:Array,
            default:()=>[]
        }
    })
    const handleClick = (event)=>{
        emit('toggleTaskModal', event);
    }
   
</script>

<style scoped>
    .grid{
        font-family: inherit;
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        text-align: center;
        align-items: center;
        border: 0.5px gray solid;
        min-height: 30px;
    }
    .border{
        height: 100%;
        display: grid;
        grid-direction: row;
        border: 0.5px gray solid;
    }
    .border p{
        word-break: break-all;
        border-radius: 10px;
        padding: 2px;
        margin:2px;
        cursor: pointer;
    }
</style>