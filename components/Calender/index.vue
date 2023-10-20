<template>
  <main>
    <Navigation
      :date="currentDate"
      @current="getCurrentMonth"
      @prevMonth="PrevMonth"
      @nextMonth="NextMonth"
      @prevWeek="prevWeek"
      @nextWeek="nextWeek"
      @changeView="changeView"
      @openModal="toggleModal(new Date(), 'from-nevigetion')"
      :view="view"
      :key="view"
    />
    <div v-if="view === 'week'" class="weekCalender">
      <WeekCalender :calenderDays="calenderDays" />
      <AllDay :calenderDays="calenderDays" @toggleTaskModal="toggleTaskModal" />
      <AllHour
        :calenderDays="calenderDays"
        :event_hour="event_hour"
        :selected_event="selected_events"
        @addEvent="toggleHourModel"
        @toggleTaskModal="toggleTaskModal"
      />
    </div>
    <div v-if="view === 'month'">
      <WeekDay />
      <div class="calender-container">
        <div
          class="calender-day"
          v-for="calenderDay in calenderDays"
          :key="calenderDay.Date"
          :data-date="calenderDay.Date"
          @click="toggleModal(calenderDay.Date, $event)"
        >
          <div class="calender-date">
            <p
              class="text-center"
              :class="{
                prevnextmonth: !calenderDay.current,
                current: current(calenderDay.Date),
              }"
            >
              {{ calenderDay.Date.getDate() }}
            </p>
          </div>
          <div
            v-for="event in calenderDay.event"
            :key="event.name"
            class="calender-event"
            :style="{ backgroundColor: event.color }"
            @click="toggleTaskModal(event)"
          >
            <p>{{ `${event.eventUser} : ${event.name}` }}</p>
          </div>
          <div
            style="margin-left: px"
            class="hover_text"
            @click="
              toggleViewAllEvent(
                calenderDay.event,
                calenderDay.extra_event,
                calenderDay.Date
              )
            "
          >
            <p
              v-if="calenderDay.extra_event.length"
              style="margin: 2px; text-align: left; font-weight: bold"
            >
              {{ `${calenderDay.extra_event.length} more` }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>


const emit = defineEmits([
  "openModal",
  "toggleHourModel",
  "toggleTaskModal",
  "toggleViewAllEvent",
]);
const view = ref("month");
let row = 5,
  height = 1,
  heightOfRow = 1;

const props = defineProps({
  all_events: {
    type: Array,
    default: () => [],
  },
  selected_events: {
    type: Array,
    required: true,
    // default: () => [],
  },
  event_hour: {
    type: Array,
    default: () => [],
  },
});

const currentDate = ref(new Date());
const calenderDays = ref(null);
const selected_event = computed(() => props.selected_events);
const changeView = (viewValue) => {
  view.value = viewValue;
  if (viewValue === "week") {
    changeViewToWeek();
  } else {
    changeViewToMonth();
  }
};

const events = computed(() =>
  props.all_events.map((item) => {
    return {
      _id: item._id,
      name: item.what,
      eventUser: item.eventUser,
      startDate: new Date(item.startDate),
      endDate: new Date(item.endDate),
      color: item.backgroundColor,
      id: item.id,
      eventDescription: item.eventDescription,
    };
  })
);
const select = (date) => {
  return (
    date.getDate() === currentDate.value.getDate() &&
    date.getMonth() === currentDate.value.getMonth() &&
    date.getFullYear() === currentDate.value.getFullYear()
  );
};
const linkEventToDate = () => {
  const changeIntoNumber = (str) => {
    if (typeof str === "number") return str;
    return Number(str.slice(0, -2));
  };
  const heightRow = changeIntoNumber(heightOfRow);
  const heightInRem = changeIntoNumber(heightRow) / 16;
  const totalELemenent = Math.floor(heightInRem / 1.4) - 3;
  calenderDays.value.forEach((item) => {
    item.event = [];
    item.date = item.Date;
    item.extra_event = [];
    events.value.forEach((event) => {
      const date = new Date(event.startDate);
      date.setHours(0, 0, 0, 0);
      const endDate = new Date(event.endDate);
      endDate.setHours(23, 59, 59, 59);
      if (
        item.Date >= date &&
        item.Date <= endDate &&
        props.selected_events.includes(event.id)
      ) {
        if (item.event.length < totalELemenent)
          item.event = [...item.event, event];
        else item.extra_event = [...item.extra_event, event];
      }
    });
  });
};

const current = (date) => {
  const persentDate = new Date();
  persentDate.setHours(0, 0, 0, 0);
  return (
    date.getDate() === persentDate.getDate() &&
    date.getMonth() === persentDate.getMonth() &&
    date.getFullYear() === persentDate.getFullYear()
  );
};

onMounted(() => {

  calenderDays.value = getCalenderDays(
    view.value,
    "current",
    currentDate.value
  );
  linkEventToDate();
  row = calenderDays.value.length / 7;
  height = (window.innerHeight / 100) * 80;
  heightOfRow = height / row + "px";

  document.documentElement.style.setProperty("--row", heightOfRow);
});

onBeforeUpdate(() => {
  row = calenderDays.value.length / 7;
  height = (window.innerHeight / 100) * 83;
  heightOfRow = height / row + "px";
  document.documentElement.style.setProperty("--row", heightOfRow);
  linkEventToDate();
});

const PrevMonth = () => {
  calenderDays.value = getCalenderDays(view.value, "prev", currentDate.value);
  const new_date = new Date(currentDate.value);
  new_date.setMonth(new_date.getMonth() - 1);
  currentDate.value = new_date;
  linkEventToDate();
};
const NextMonth = () => {
  calenderDays.value = getCalenderDays(view.value, "next", currentDate.value);
  const new_date = new Date(currentDate.value);
  new_date.setMonth(new_date.getMonth() + 1);
  currentDate.value = new_date;
  linkEventToDate();
};

const prevWeek = () => {
  calenderDays.value = getCalenderDays(view.value, "prev", currentDate.value);

  const new_date = new Date(currentDate.value);
  new_date.setDate(new_date.getDate() - 7);
  currentDate.value = new_date;
  linkEventToDate();
};
const nextWeek = () => {
  calenderDays.value = getCalenderDays(view.value, "next", currentDate.value);
  const new_date = new Date(currentDate.value);
  new_date.setDate(new_date.getDate() + 7);
  currentDate.value = new_date;
  linkEventToDate();
};
const getCurrentMonth = () => {
  calenderDays.value = getCalenderDays(view.value, "current", new Date());

  currentDate.value = new Date();
  linkEventToDate();
};

const getCurrentWeek = () => {
  calenderDays.value = getCalenderDays(view.value, "current", new Date());
  currentDate.value = new Date();
  linkEventToDate();
};

const changeViewToWeek = () => {
  calenderDays.value = getCalenderDays(
    view.value,
    "current",
    currentDate.value
  );
  linkEventToDate();
};

const changeViewToMonth = () => {
  calenderDays.value = getCalenderDays(
    view.value,
    "current",
    currentDate.value
  );
  linkEventToDate();
};

const toggleModal = (date, e) => {
  if (e === "from-nevigetion") return emit("openModal", date);
  const target = e.target.parentElement.classList.contains("calender-event");
  const target2 =
    e.target.classList.contains("hover_text") ||
    e.target.parentElement.classList.contains("hover_text");

  if (target || target2) return;
  emit("openModal", date);
};
const toggleHourModel = (dateAndTime) => {
  emit("toggleHourModel", dateAndTime);
};
const toggleTaskModal = (event) => {
  emit("toggleTaskModal", event);
};
const toggleViewAllEvent = (event, extra_event, date) => {
  emit("toggleViewAllEvent", { event, extra_event, date });
};
</script>

<style scoped>
/* :root{
  --row:5;
} */
@import url("https://fonts.googleapis.com/css2?family=Alata&family=Anton&family=Barlow+Semi+Condensed:wght@400;500;600&family=Josefin+Sans:wght@300&family=Open+Sans:ital,wght@0,300;1,300&display=swap");

.point {
  cursor: pointer;
}

.selected {
  background-color: #c8ffe0;
}

.current {
  background-color: rgb(26, 115, 232);
  border-radius: 50%;
  padding: 5px !important;
  margin: 2px;
}

.prevnextmonth {
  color: rgb(229, 218, 218);
}

main {
  display: flex;
  flex-direction: column;
  width: 90%;
  min-width: 600px;
}

h1 {
  font-size: 1.5rem;
  margin-top: 1rem;
  font-weight: bold;
  justify-items: center;
  align-items: center;
  text-align: center;
}

.calender-container {
  width: 100%;
  display: grid;
  grid-auto-rows: var(--row);
  grid-template-columns: repeat(7, 1fr);
  border: 0.1px solid rgb(176, 172, 172, 0.6);
}

.calender-day {
  text-align: center;
  border: 0.1px solid rgb(176, 172, 172, 0.6);
  grid-column: span 1;
  overflow: hidden;
}

.calender-day-events {
  display: flex;
  flex-direction: column;
}

.calender-date {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1px !important;
  margin-bottom: 1px !important;
}

.calender-date p {
  margin: 0;
  padding: 5px;
}

.calender-event {
  display: flex;
  justify-content: left;
  align-items: center;
  height: 1.25rem;
  z-index: 5;
  margin: 3px;
  text-align: left;
  border-radius: 5px;
  word-break: break-all;
}

/* .calender-event p {
  padding-left: 0.125;
  line-height: 1.25rem;
  padding-top:0.125rem ;
  font-size: 0.8rem;
} */
.calender-week-container {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  border: 0.1px solid rgb(176, 172, 172, 0.6);
  /* bors */
  justify-content: center;
  align-items: center;
  text-align: center;
}

.all-day {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  border: 0.1px solid rgb(176, 172, 172, 0.6);

  justify-content: center;
  align-items: center;
  text-align: center;
}
.border {
  display: grid;
  grid-direction: column;
  height: 100%;
  width: 100%;
  border: 0.5px gray solid;
}

.time {
  display: grid;
  grid-direction: column;
}

.calender-event {
  /* padding: 0.4px; */
  margin-left: 0px;
  border-radius: 4px;
  color: white;
  padding: 1px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  hover: pointer;
}
.calender-event:hover {
  cursor: pointer;
  opacity: 0.8;
}
.calender-event p {
  margin: 0;
  padding: 0;
  font-size: 1rem !important;
  line-height: 1.25rem;
}
.week_calender {
  height: 60vh;
}

.hover_text {
  padding: 0.4px;
  margin-left: 0px;
  border-radius: 4px;
  color: black;
  /* padding: 2px; */
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-right: 3px;
  z-index: 5;
}
.hover_text:hover {
  cursor: pointer;
  background: rgb(176, 172, 172, 0.6);
}
</style>
