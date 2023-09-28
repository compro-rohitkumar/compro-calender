<template>
  <div class="backdrop"></div>
  <div class="modal">
    <div class="modal_header">
        <div class="img_container" @click="closeModal">
            <img src="/images/close.svg" alt="close" @click="handleCancel"/>
        </div>
        <h2>{{day}}</h2>
        <p>{{ date.getDate() }}</p>
    </div>
    <div class="events">
        <div v-for="event in events" :key="event._id" class="event" :style="{'background':event.color}" @click="showTask(event)">
            <p >
              {{ `${event.eventUser} : ${event.name}` }}
            </p>
        </div>
        <div v-for="event in extra_event" :key="event._id" class="event" :style="{'background':event.color}" @click="showTask(event)">
            <p >
              {{ `${event.eventUser} : ${event.name}` }}
            </p>
        </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
    event:{
        type:Object,
        required:true
    }
})
const emit = defineEmits(['closeAllEventModal','showTask'])
const date = ref(new Date(props.event.date))
const getDayName = (day) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
};
const day = ref(getDayName(date.value.getDay()))
const events = ref(props.event.event)


const extra_event = ref(props.event.extra_event)
const closeModal = () => {
   emit('closeAllEventModal')
};
const showTask = (event) => {
    emit('showTask',event)
}
</script>

<style scoped>
.backdrop{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
}
.modal{
    max-width: 250px;
    min-width: 250px;
    padding: 25px;
    border-radius: 8px;
    border-width: 0;
    position: relative;
    box-shadow: 0 1px 3px 0 rgba(60,64,67,.3), 0 4px 8px 3px rgba(60,64,67,.15);
    background-color: #fff;
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 12;
} 
.modal_header{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
}
.modal_header h2{
    font-size: 14px;
    line-height:16px;
    font-weight: 500;
    margin: 0;
    color: #70757a;
}
.modal_header p{
    display: flex;
    justify-content: center;
    align-self: center;
    margin-left: 2px;
    width:24px;
    font-weight: 400;
    font-size:24px;
    padding:3px;
    margin: 0;
    margin-top:4px;
    font-family: 'Roboto', sans-serif;
    padding: 4px;
}
.modal_header p:hover{
    background-color: #eee;
    border-radius: 50%;
}
.img_container{
    position: absolute;
    top: 0;
    right: 0;
    margin: 0.5rem;
    cursor: pointer;
}
.img_container img{
    /* width: 1.5rem;
    height: 1.5rem; */
    padding:4px;
}
.img_container img:hover{
    padding: 4px;
    background-color: #eee;
    border-radius: 50%;
}
.events{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.event{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 30px;
    border-radius: 8px;
    margin-bottom: 10px;
    padding: 0 10px;
    font-size: 0.8rem;
    font-weight: 500;
    color: #fff;
    cursor: pointer;
}
</style>