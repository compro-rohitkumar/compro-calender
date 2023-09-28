<template>
  <div class="navigation_bar">
    <div class="left_container">
      <h2 class="company_logo">Compro Calender</h2>
    <div class="left">
      <button @click="CurrentFunction" class="today_button">Today</button>
      <button @click="previousFunction" class="navigation_button">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M561-240 320-481l241-241 43 43-198 198 198 198-43 43Z"/></svg>
      </button>
      <button @click="nextFunction" class="navigation_button">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M530-481 332-679l43-43 241 241-241 241-43-43 198-198Z"/></svg>
      </button>
      <h2>{{ monthAndYear }}</h2>
    </div>
  </div>
  <div class="right">
    <div class="middle">
      <button
        @click="changeView('month')"
        :class="{ selected: props.view === 'month' }"
        class="today_button"
      >
        Month
      </button>
      <button
        @click="changeView('week')"
        :class="{ selected: props.view === 'week' }"
        class="today_button"
      >
        Week
      </button>
    </div>
    <div class="add event">
      <button @click="toggleModal" class="today_button">Add Event</button>
    </div>
  </div>
</div>
</template>
  
  <script setup>
const props = defineProps({
  date: {
    type: Date,
    required: true,
  },
  view: {
    type: String,
    required: true,
  },
});
const emit = defineEmits([
  "prevMonth",
  "nextMonth",
  "prevWeek",
  "nextWeek",
  "changeView",
  "current",
  "openModal",
]);
const monthAndYear = ref(
  computed(() => {
    const date = props.date;
    return getMonthNameAndYear(date.getMonth(), date.getFullYear());
  })
);
const previousFunction = () => {
  if (props.view === "month") {
    emit("prevMonth");
  } else if (props.view === "week") {
    emit("prevWeek");
  }
};
const CurrentFunction = () => {
  emit("current");
};
const nextFunction = () => {
  if (props.view === "month") {
    emit("nextMonth");
  } else if (props.view === "week") {
    emit("nextWeek");
  }
};
const changeView = (view) => {
  emit("changeView", view);
};
const toggleModal = () => {
  emit("openModal");
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Alata&family=Anton&family=Barlow+Semi+Condensed:wght@400;500;600&family=Josefin+Sans:wght@300&family=Open+Sans:ital,wght@0,300;1,300&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Alata&family=Anton&family=Barlow+Semi+Condensed:wght@400;500;600&family=Josefin+Sans:wght@300&family=Open+Sans:ital,wght@0,300;1,300&family=Roboto:wght@300&display=swap");
.navigation_bar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height:4rem;
}

.navigation_bar div {
  display: flex;
  align-items: center;
}
.left_container {
  display: flex;
  align-items: center;
}
.company_logo{
  font-size: 1.5rem !important;
  position: relative;
  top:5px;
  margin-right:5px;
}
.left {
  margin-left:0.7rem;
  justify-self: left;
}
.image_name {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-bottom: 10px;
  font-family: "Roboto", sans-serif !important;
}
.image_name p {
  font-size: 1.5rem;
  font-weight: 600;
  margin-left: 1rem;
}
.image {
  height: 3rem;
}

/* .navigation_bar button {
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 1rem;
  transition: all;
  background: white;
  margin-right: 0.3rem;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  color: black;
  border: 1px solid black;
  margin-bottom: 1rem;
  font-family: "Roboto", sans-serif !important;
  font-weight: 600;
} */
.today_button {
  border: 0.1px rgb(216, 211, 211) solid;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  background: white;
  margin-right: 0.3rem;
  margin-left: -0.3rem;
}
.today_button:hover {
  background-color: rgba(245, 243, 243, 0.737);

  opacity: 1;
  color: black;
  transform: translateY(1px);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}
.add.event {
  margin-left: 1rem;
}
.navigation_button {
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: none;
  padding: 2px;
}
.navigation_button:hover {
  border-radius: 50%;
  background: rgba(245, 243, 243, 0.737);
}

/* .navigation_bar button:hover {
  background-color: #c8ffe0;
  opacity: 0.6;
  color: black;
  transform: translateY(1px);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
} */

.navigation_bar h2 {
  margin-top: 6px;
  font-size: 1rem;
  font-weight: bold;
  justify-self: end;
}
/* .selected {
  background-color: #c8ffe0 !important;
}
.selected:hover {
  color: black !important;
} */
.middle {
  position: relative;
  /* left: -6%; */
  display: flex;
  justify-self: middle;
}
.middle button {
  margin-left: 5px;
}

.left h2 {
  position: relative;
  top: 5px;
  margin-top: 5px;
  font-size: 1.2rem;
}
@media (max-width: 957px) {
  .left h2 {
    display: none;
  }
}
</style>