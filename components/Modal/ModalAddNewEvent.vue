<template>
  <div class="backdrop w-full"></div>

  <div class="Modal">
    <div class="modal_container">
      <div class="header">
        <img src="/images/close.svg" alt="close" @click="handleCancel" />
      </div>
      <div class="input">
        <input type="text" required v-model="what" />
        <span class="floating-label">Event Name</span>
        <i></i>
      </div>
      <div class="input">
        <input type="text" required v-model="eventDescription" />
        <span class="floating-label">Description</span>
        <i></i>
      </div>
      <!-- <div class="dropdown">
       <input type="text" class="textBox" placeholder="Dropdown Menu" readonly/>
       <div class="option">
        <div v-for="user in props.users" :key="user.id" :value="user.id" @click="eventUser=user.id" class="option">
          {{ user.name }}
        </div>
       </div>ß
        
      </div> -->
      <CustomSelect :options="props.users" :eventUser="eventUser" :default="eventUser.name" class="select" @input="handleInput"/>
      <customSelectevent :options="eventOption" :default="selectedOption" class="select" @input="handleEvent" />
      <div class="input_container">
        <label class="event_label">Start Date</label>
        <input type="date" v-model="eventStartDate" />
      </div>
      <div class="input_container">
        <label class="event_label">End Date</label>
        <input type="date" v-model="eventEndDate" />
      </div>
      <div class="input_container_button">
        <button
          type="submit"
          :disabled="
            what.trim() === '' ||
            eventType.trim() === '' ||
            eventStartDate.trim() === '' ||
            eventEndDate.trim() === ''
          "
          @click="handleSubmit"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>
  
<script setup>


const props = defineProps({
  date: {
    type: Date,
    default: () => new Date(),
  },
  users:{
    type:Array,
    default:()=>[]
  },
  event:{
    type:Object,
    default:null
  }
  
});
const data = new Date(props.date);
let day = data.getDate();
let month = data.getMonth() + 1;

if (day < 10) {
  day = "0" + day;
}
if (month < 10) {
  month = "0" + month;
}
const buildDate = (prop)=>{
  const data = new Date(prop);
  let day = data.getDate();
  let month = data.getMonth() + 1;

  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  return `${data.getFullYear()}-${month}-${day}`;
}
const sendUser = computed(()=>{
  props.users.map((user)=>{
    return user.name
  })
})
const eventOption =ref(["Holiday","Birthday","Leave"]);
const selectedOption = ref(eventOption.value[0])


const eventStartDate = ref(`${data.getFullYear()}-${month}-${day}`);
const eventEndDate = ref(`${data.getFullYear()}-${month}-${day}`);
const firstUser = props.users[0];
const eventUser = ref(firstUser);
const what = ref("");
const eventType = ref("1");
const eventDescription = ref("");
const editEvent = ref(false);


if(props.event !== null){
    editEvent.value = true;
    const user = props.users.find((user) => user.name === (props.event.eventUser));
    eventUser.value = user;
    eventStartDate.value = buildDate(props.event.startDate);
    eventEndDate.value = buildDate(props.event.endDate);
    what.value = props.event.what;
    
    selectedOption.value = eventOption.value[Number(props.event.id)-1];
    eventType.value = String(props.event.id);
    eventDescription.value = props.event.eventDescription;
   
}


const emit = defineEmits(["closeModal", "toggleModal"]);


const handleSubmit = () => {
  if(eventStartDate.value>eventEndDate.value){
    alert("Start Date should be less than End Date");
    return;
  }
  
  const evenDetail = {
    eventUser: eventUser.value.id,
    what: what.value,
    eventType: Number(eventType.value),
    startDate: eventStartDate.value,
    endDate: eventEndDate.value,
    eventDescription: eventDescription.value,
  };
 
  if(editEvent.value){
    evenDetail._id = props.event._id;
  }
  emit("closeModal", evenDetail);
};
const handleCancel = () => {
  emit("closeModal");
};
const handleInput = (prop) => {
  eventUser.value = prop;
  
};

const handleEvent = (prop) => {
  const event = eventOption.value.findIndex((item) => item === prop);
  eventType.value = String(event+1);
  selectedOption.value = prop
  
};

</script>
  
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Alata&family=Anton&family=Barlow+Semi+Condensed:wght@400;500;600&family=Josefin+Sans:wght@300&family=Open+Sans:ital,wght@0,300;1,300&family=Roboto:wght@300&display=swap");

.form {
  width: 100%;
  height: 32rem;
  font-family: "Roboto", sans-serif;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.Modal {
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 1rem;
  transform: translate(-50%, -50%);
  width: 500px;
  z-index: 20;
}
.select {
  outline: none;
  border: none;
  background-color: white;
}
.select .option {
  font-weight: noraml;
  min-height: 1.2rem;
  white-space: nowrap;
  padding: 1rem;
  background-color: white;
  color: black;
  border-radius: 10px;
  border: none;
  outline: none;
  cursor: pointer;
}

.modal_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: min-content;
  background-color: #fff;
  margin: auto;
  border-radius: 10px;
  position: relative;
  animation: slide-up 0.4s linear;
}

.header {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  min-height: 2.4rem;
  max-height: 2.4rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  background: #f1f3f4;
  margin-bottom: 8px;
}
.header img {
  width: 1.6rem;
  height: 1.6rem;
  padding: 0.2rem;
  padding-top: 0.4rem;
  cursor: pointer;
}
.header img:hover {
  border-radius: 50%;
  background-color: rgb(235, 235, 235);
}

.button_container {
  position: absolute;
  top: 0;
  right: 0;
  margin: 0.5rem;
}
.input {
  margin-top: 1rem;
  position: relative;
  width: 400px;
  padding-left: 0px;
  margin-left: 0px;
  /* left:-50px; */
  border: 4px;
  height: 2.2rem;
  border-radius: 10px;
  margin-bottom: 1rem;
}
.input input {
  width: 400px;
  background: transparent;
  color: rgb(64, 64, 64);
  height: 1.5rem;
  border: none;
  outline: none;
  box-shadow: none;
  letter-spacing: 0.1px;
  font-size: 1.2rem;
  font-family: "Roboto", sans-serif;
  padding-left: 17px;

  
}

.input span {
  position: absolute;
  top: -5px;
  left: 16px;
  padding: 10px 0 10px;
  color: rgb(64, 64, 64);
  text-transform: uppercase;
  pointer-events: none;
  letter-spacing: 1px;
  transition: 0.5s;
  font-size: 1rem;
  font-family: "Roboto", sans-serif;
}
.input input:focus ~ span,
.input input:valid ~ span {
  transform: translateY(-26px);
  left: 0;

  color: rgb(26, 115, 232);
  font-size: 0.8rem;
  font-weight: 600;
}
.input i {
  position: absolute;
  width: 400px;
  height: 1px;
  background: rgb(64, 64, 64);
  left: 0;
  bottom: 0;
  overflow: hidden;
}
.input i::before {
  content: "";
  position: absolute;
  left: -100%;
  height: 1px;
  width: 100%;
  height: 1px;
  overflow: hidden;
  background: rgb(26, 115, 232);
  bottom: 0;
  transition: 0.5s;
  animation: animate 0.5s linear infinite;
}

@keyframes animate {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: 100%;
  }
}
.input input:focus ~ i::before,
.input input:valid ~ i::before {
  left: 0;
}
.button_container button {
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 1rem;
  transition: all;
  background: white;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  color: black;
}

.button_container button:hover {
  transform: translateY(1px);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  background: #c8ffe0;
  color: black;
}

.line {
  border-bottom: 2px;
  border-color: black;
}

.input_container {
  display: grid;
  grid-template-columns: 2fr 5fr;
  justify-content: left;
  align-items: center;
  width: 80%;
  margin-top:10px;
  font-family: 'Roboto', sans-serif;
  letter-spacing: 1px;
}

.event_label {
  text-align: flex-start;
  column-span: 1;
  justify-self: left;
  padding-left: 16px;
}

.input_container input,
select {
  column-span: 3;
  margin: 0.6rem;
  margin-left: 2rem;
  border: 4px;
  height: 1rem;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  align-self: flex-end;
  width: 80%;
  text-decoration: none;
 
}

.input_container_button {
  font-family: 'Roboto', sans-serif;
  margin: 10px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* animation: slide-up 0.3s linear;
  animation-delay: 0.4s;
  animation-fill-mode: both; */
}

.input_container_button button {
  border: none;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  font-size: larger;
  border-radius: 10px;
  background-color: white;
  color: black;
  cursor: pointer;
  width: 100%;
  margin-bottom: 10px;
}

.input_container_button button:hover {
  transform: translateY(1px);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  background: rgb(26, 115, 232);
}

.select {
  height: 2rem;
  padding: 0;
  background-color: white;
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(100%);
    size: 0%;
  }
  to {
    opacity: 1;
    transform: none;
    size: 100%;
  }
}
.dropdown {
  position: relative;
  width: 400px;
  margin-top:0;
  padding-top:6px;
  margin-bottom: 1rem;
  cursor: pointer;
  background: white;
  border: none;
  outline: none;
  padding: 2px 10px;
  border-radius: 10px;
}
.dropdown input{
  width: 400px;
  position: relative;
  background: transparent;
  color: rgb(64, 64, 64);
  border: none;
  outline: none;
  box-shadow: none;
  letter-spacing: 0.1px;
  font-size: 1.2rem;
  font-family: "Roboto", sans-serif;
  border-bottom: 1px solid black;
  padding-top: 8px;
}
.dropdown input::placeholder{
  
  font-family: 'Roboto', sans-serif;
  font-size: 1.1rem;
  letter-spacing: 0.2px;
  color:rgb(64, 64, 64);
}
.dropdown input::focus,
.dropdown input::valid{
  border-bottom: 1px solid ;
  
}
.dropdown .option{
  position:absolute;
  top:10;
  left: 2px;
  height:min-content;
  width:100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  /* box-shadow: 0 30px 30px rgba(0, 0, 0, 0.01); */
  z-index:50;
  overflow: hidden;
}
.dropdown .option div{
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
  font-size: medium;
  border-radius: 10px;
  background-color: white;
  color: black;
  cursor: pointer;
  width: 370px;
  /* z-index:50; */
  margin-bottom: 10px;
}
.dropdown .option div:hover{
  background-color: #62baea;
  color: white;
}
.select{
  width:400px;
  margin-top:1rem;
  margin-bottom: 1rem;;
  /* height: 2rem; */
}
</style>
  