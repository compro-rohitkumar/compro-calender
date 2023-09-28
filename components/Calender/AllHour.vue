<template>
  <div class="scroll">
    <div class="container" v-for="i in 24" :key="i" >
        <div class="row_container">
            <div v-for="j in 8" :key="j" class="child">
                <div v-if="j===1" class="cell">
                    <p>{{i-1<=12?i-1:(i-1)%12}}:00 {{ i-1< 12?'AM':'PM' }}</p>
                </div>
                <div v-if=" j > 1" class="cell" @click="addEvent" :data-date="j-2" :data-time="i-1">
                    <div   :data-index="j" :data-hour="i-1">
                        <p v-for="event in array[i-1][j-2]" :key="event.id" :style="{backgroundColor:event.backgroundColor}" class="event_para" @click="toggleTaskModal(event)">{{ `${event.eventUser} : ${event.what}` }}</p>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
  </div>
</template>

<script setup>




const emit = defineEmits(["addEvent",'toggleTaskModal']);
const props = defineProps({
  calenderDays: {
    type: Array,
    required: true,
  },
  event_hour: {
    type: Array,
    required: true,
  },
  selected_event: {
    type: Array,
    required: true,
    
  },
});
console.log(props.selected_event)
const array = ref(Array(24).fill(null).map(() => Array(7).fill([])));
const addEvent = (e) => {
  if(e.target.classList.contains("event_para")){
    return;
  }
    let y= e.target;
    const date = props.calenderDays[y.getAttribute("data-date")].Date;
    
    const hour = y.getAttribute("data-time");
    date.setHours(hour);
    date.setMinutes(0);
    emit("addEvent", date);
};
const linkEvent = () => {
props.calenderDays.forEach((day,index) => {
  props.event_hour.forEach((event) => {
    if (
      event.startDate.getDate() <= day.Date.getDate() &&
      event.endDate.getDate() >= day.Date.getDate() &&
      event.startDate.getMonth() <= day.Date.getMonth() &&
      event.endDate.getMonth() >= day.Date.getMonth() &&
      event.startDate.getFullYear() <= day.Date.getFullYear() &&
      event.endDate.getFullYear() >= day.Date.getFullYear()&&
      props.selected_event.includes(event.id)
    ) {
      const startTime = event.startTime.split(":");
      const endTime = event.endTime.split(":");
      let starthour = Number(startTime[0]);
      let endhour = Number(endTime[0]);
      if(starthour>endhour){
        starthour = endhour;
        endhour = Number(startTime[0]);
      }
      while(starthour<=endhour){
        array.value[starthour][index] = [...array.value[starthour][index],event] 
        // starthour++;
        break;
      }
        
    }
  });
});
}

onBeforeUpdate(()=>{
  
    array.value = Array(24).fill(null).map(() => Array(7).fill([]));
    linkEvent();
    const currentTour = new Date().getHours();
    const row = document.querySelector(`.container:nth-child(${currentTour+1})`);
    // row.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
    row.style.backgroundColor = "#c8ffe0";
    
})

onMounted(() => {
    array.value = Array(24).fill(null).map(() => Array(7).fill([]));
    linkEvent();
    const currentTour = new Date().getHours();
    const row = document.querySelector(`.container:nth-child(${currentTour+1})`);
    // row.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
    row.style.backgroundColor = "#c8ffe0";
});

const toggleTaskModal = (event) =>{
    emit("toggleTaskModal",event);
}

</script>

<style scoped>
.scroll {
  /* overflow-y: scroll; */
  border-bottom: 0.5px gray solid;
}
.container {
  display: flex;
  flex-direction: column;
}
.row_container {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  border: 0.5px gray solid;
}
.time {
  display: flex;
  flex-direction: column;
  text-align: center;
  color: black !important;
  border: 0.5px gray solid;
}
.cell {
    height: 100%;
    text-align: center;
   border:0.6px gray solid ;
}
.event_para{
    margin-left:2px;
    margin-right:2px;
    border-radius: 5px;
    word-break: break-all;
    cursor: pointer;
}
</style>