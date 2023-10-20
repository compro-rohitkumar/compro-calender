<template>
  <page-loading :isLoading="loading" />
  <ModalAddNewEvent
    :date="date"
    :users="users"
    :event="event"
    @closeModal="closeModal"
    v-if="modal"
  />
  <ModalAddNewEventHour
    :dateAndTime="date"
    :users="users"
    :event="event"
    @closeModal="closeHourModal"
    v-if="modalHour"
  />
  <TaskModal
    v-if="taskModal"
    :event="event"
    @closeTaskModal="toggleTaskModal"
    @deleteEvent="deleteEvent"
    @editEvent="editEvent"
  />
  <AllEventModal
    v-if="showAllEvent"
    :event="event"
    @closeAllEventModal="toggleViewAllEvent"
    @showTask="showTask"
  />
  <div class="root-container" v-if="!loading">
    <Calender
      @openModal="toggleModal"
      :all_events="userCreatedEvent"
      :event_hour="userCreatedEventHour"
      :selected_events="selected_events"
      @toggleModel="toggleModal"
      @toggleHourModel="toggleHourModel"
      @toggleTaskModal="toggleTaskModal"
      @toggleViewAllEvent="toggleViewAllEvent"
    />
    <EventNavBar
      :events="events"
      @addEvent="addEvent"
      @removeEvent="removeEvent"
    />
  </div>
</template>

<script setup>
import { uuid } from "vue-uuid";

const route = useRoute();
const modal = ref(false);
const modalHour = ref(false);
const date = ref(null);
const userCreatedEvent = ref([]);
const userCreatedEventHour = ref([]);
const taskModal = ref(false);
const event = ref(null);
const showAllEvent = ref(false);
const loading = ref(true);

const getId = () => {
  return uuid.v4();
};
const users = ref([]);

const getUsers = async () => {
  const data = await fetch("/api/user");
  const res = await data.json();
  const users = res.map((item) => {
    const { _id, name } = item;

    return {
      name,
      id: _id,
    };
  });
  return users;
};

onMounted(() => {
  loading.value = true;
  const getData = async () => {
    const link = route.path;
    const data = await getUsers();
    const eventdata = await fetch("/api/event");
    const res = await eventdata.json();
    const events = res.map((item) => {
      const { _id, name, user, EventId, startDate, endDate, description } =
        item;
      return {
        _id,
        what: name,
        eventUser: user.name,
        id: EventId,
        backgroundColor: color[EventId],
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        eventDescription: description,
      };
    });
    userCreatedEvent.value = events;
    users.value = data;
  };
  const getEventHour = async () => {
    const eventdata = await fetch("/api/eventhour");
    const res = await eventdata.json();
    const events = res.map((item) => {
      const {
        _id,
        name,
        user,
        EventId,
        startDate,
        endDate,
        startTime,
        endTime,
        description,
      } = item;
      return {
        _id,
        what: name,
        eventUser: user.name,
        id: EventId,
        backgroundColor: color[EventId],
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        startTime,
        endTime,
        eventDescription: description,
      };
    });
    userCreatedEventHour.value = events;
  };

  getData();
  setTimeout(() => {
    loading.value = false;
  }, 500);
});
const events = ref([
  {
    name: "Holiday",
    image: "/images/home.svg",
    fillImage: "/images/home-fill.svg",
    id: 1,
  },
  {
    name: "Birthday",
    image: "/images/birthday.svg",
    fillImage: "/images/birthday-fill.svg",
    id: 2,
  },
  {
    name: "Leave",
    image: "/images/leave.svg",
    fillImage: "/images/leave-fill.svg",
    id: 3,
  },
]);
const selected_events = ref(events.value.map((item) => item.id));

const toggleModal = (dateOfClick) => {
  event.value = null;
  date.value = dateOfClick;
  window.scrollTo(0, 0);
  modal.value = true;
};

const toggleHourModel = (dateOfClick) => {
  date.value = dateOfClick;
  window.scrollTo(0, 0);
  modalHour.value = true;
};

const color = [
  "#F87171",
  "rgb(11, 128, 67)",
  "rgb(51,182,121)",
  "rgb(121,134,203)",
];

const closeHourModal = async (prop = null) => {
  if (prop === null) {
    modalHour.value = false;
    return;
  }
  if (prop._id) {
    const index = userCreatedEventHour.value.findIndex(
      (item) => item._id === prop._id
    );
    const data = {
      name: prop.what,
      user: prop.eventUser,
      id: prop.eventType,
      startDate: prop.startDate,
      endDate: prop.endDate,
      startTime: prop.startTime,
      endTime: prop.endTime,
      description: prop.eventDescription,
    };
    const postData = await fetch(`/api/eventhour/${prop._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (postData.status !== 200) {
      alert("Something went wrong");
      return;
    }
    const postEvent = await postData.json();
    userCreatedEventHour.value[index] = {
      _id: postEvent._id,
      what: postEvent.name,
      eventUser: postEvent.user.name,
      id: postEvent.EventId,
      backgroundColor: color[postEvent.EventId],
      startDate: new Date(postEvent.startDate),
      endDate: new Date(postEvent.endDate),
      startTime: postEvent.startTime,
      endTime: postEvent.endTime,
      eventDescription: postEvent.description,
    };
    userCreatedEventHour.value = [...userCreatedEventHour.value];
    modalHour.value = false;
    return;
  }
  const data = {
    name: prop.what,
    user: prop.eventUser,
    id: prop.eventType,
    startDate: prop.startDate,
    endDate: prop.endDate,
    startTime: prop.startTime,
    endTime: prop.endTime,
    description: prop.eventDescription,
  };
  const postData = await fetch("/api/eventhour/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (postData.status !== 200) {
    alert("Something went wrong");
    return;
  }

  const postEvent = await postData.json();
  userCreatedEventHour.value = [
    ...userCreatedEventHour.value,
    {
      _id: postEvent._id,
      what: postEvent.name,
      eventUser: postEvent.user.name,
      id: postEvent.EventId,
      backgroundColor: color[postEvent.EventId],
      startDate: new Date(postEvent.startDate),
      endDate: new Date(postEvent.endDate),
      startTime: postEvent.startTime,
      endTime: postEvent.endTime,
      eventDescription: postEvent.description,
    },
  ];
  modalHour.value = false;
};

const closeModal = async (prop = null) => {
  if (prop === null) {
    modal.value = false;
    return;
  }
  if (prop._id) {
    const index = userCreatedEvent.value.findIndex(
      (item) => item._id === prop._id
    );
    const data = {
      name: prop.what,
      user: prop.eventUser,
      id: prop.eventType,
      startDate: prop.startDate,
      endDate: prop.endDate,
      description: prop.eventDescription,
    };
    const postData = await fetch(`/api/event/${prop._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const postEvent = await postData.json();

    userCreatedEvent.value[index] = {
      _id: postEvent._id,
      what: postEvent.name,
      eventUser: postEvent.user.name,
      id: postEvent.EventId,
      backgroundColor: color[postEvent.EventId],
      startDate: new Date(postEvent.startDate),
      endDate: new Date(postEvent.endDate),
      eventDescription: postEvent.description,
    };

    userCreatedEvent.value = [...userCreatedEvent.value];
    modal.value = false;
    return;
  }

  const data = {
    name: prop.what,
    user: prop.eventUser,
    id: prop.eventType,
    startDate: prop.startDate,
    endDate: prop.endDate,
    description: prop.eventDescription,
  };

  const postData = await fetch("/api/event/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const postEvent = await postData.json();

  userCreatedEvent.value = [
    ...userCreatedEvent.value,
    {
      _id: postEvent._id,
      what: postEvent.name,
      eventUser: postEvent.user.name,
      id: postEvent.EventId,
      backgroundColor: color[postEvent.EventId],
      startDate: new Date(postEvent.startDate),
      endDate: new Date(postEvent.endDate),
      eventDescription: postEvent.description,
    },
  ];

  modal.value = false;
};

const addEvent = (prop) => {
  selected_events.value = [...selected_events.value, prop];
};
const removeEvent = (eventID) => {
  selected_events.value = [
    ...selected_events.value.filter((item) => item !== eventID),
  ];
};
const toggleTaskModal = (prop) => {
  event.value = prop;
  taskModal.value = !taskModal.value;
};
const toggleViewAllEvent = (prop = null) => {
  if (prop === null) {
    showAllEvent.value = !showAllEvent.value;
    return;
  }
  event.value = prop;
  showAllEvent.value = !showAllEvent.value;
};

const deleteEvent = (prop) => {
  taskModal.value = false;
  userCreatedEvent.value = [
    ...userCreatedEvent.value.filter((item) => item._id !== prop),
  ];
  userCreatedEventHour.value = [
    ...userCreatedEventHour.value.filter((item) => item._id !== prop),
  ];
};
const showTask = (prop) => {
  event.value = prop;
  showAllEvent.value = false;
  taskModal.value = true;
};
const editEvent = (prop) => {
  taskModal.value = false;
  let index = userCreatedEvent.value.findIndex((item) => item._id === prop);
  if (index === -1) {
    index = userCreatedEventHour.value.findIndex((item) => item._id === prop);
    const date = new Date(userCreatedEventHour.value[index].startDate);
    event.value = userCreatedEventHour.value[index];
    modalHour.value = true;
    return;
  }
  const date = new Date(userCreatedEvent.value[index].startDate);
  event.value = userCreatedEvent.value[index];
  modal.value = true;
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Alata&family=Anton&family=Barlow+Semi+Condensed:wght@400;500;600&family=Josefin+Sans:wght@300&family=Open+Sans:ital,wght@0,300;1,300&family=Roboto:wght@300&display=swap");
.root-container {
  /* margin: 14px 12px;
  padding: 16px 12px; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow-y: hidden;
  font-family: "Roboto", sans-serif;
  min-width: 873px;
}
</style>
