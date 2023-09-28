<template>
  <div class="backdrop" @click="closeModal"></div>
  <div class="Modal">
    <div class="icon-box">
      <div class="edit" @click="editEvent">
        <svg
          focusable="false"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="NMm5M"
        >
          <path
            d="M20.41 4.94l-1.35-1.35c-.78-.78-2.05-.78-2.83 0L3 16.82V21h4.18L20.41 7.77c.79-.78.79-2.05 0-2.83zm-14 14.12L5 19v-1.36l9.82-9.82 1.41 1.41-9.82 9.83z"
          ></path>
        </svg>
      </div>
      <div class="delete-task" @click="deleteEvent">
        <svg
          focusable="false"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="NMm5M"
        >
          <path
            d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z"
          ></path>
          <path d="M9 8h2v9H9zm4 0h2v9h-2z"></path>
        </svg>
      </div>
      <div class="closemodal" @click="closeModal">
        <svg
          focusable="false"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="NMm5M"
        >
          <path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
          ></path>
        </svg>
      </div>
    </div>
    <div class="event-container">
      <div class="event_name">
        <div class="event_color">
          <div class="color"></div>
        </div>
        <div class="event_name_text">
          <p class="name">{{ event.name }}</p>
          <p class="Date">{{ date }}</p>
        </div>
      </div>
      <div class="meet">
        <div class="image_container">
          <img src="/images/meet.svg" alt="icon" />
        </div>
        <div class="meet_text">
          <button>Join With Google Meet</button>
        </div>
      </div>
      <div class="phone">
        <div class="phone_container">
          <img src="/images/call.svg" alt="icon" />
        </div>
        <div class="phone_text">
          <p>Join by phone</p>
          <span>(US) +1 678-801-8063‬ PIN: ‪759 035 935‬#</span>
        </div>
      </div>
      <div class="guest">
        <div class="guest_container">
          <img src="/images/group.svg" alt="icon" />
        </div>
        <div class="guest_text">
          <p>3 guests</p>
          <div class="user">
            <img src="/images/user.svg" alt="icon" />
            <p>Manoj Saini</p>
          </div>
          <div class="user">
            <img src="/images/user.svg" alt="icon" />
            <p>Sushanto Mondal</p>
          </div>
          <div class="user">
            <img src="/images/user.svg" alt="icon" />
            <p>Rohit Kumar</p>
          </div>
        </div>
      </div>
      <div class="event_desc">
        <div class="desc_image">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="48"
          >
            <path
              d="M319-250h322v-60H319v60Zm0-170h322v-60H319v60ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554v-186H220v680h520v-494H551ZM220-820v186-186 680-680Z"
            />
          </svg>
        </div>
        <div class="desc_text">
          <p>{{ props.event.eventDescription }}</p>
        </div>
      </div>
      <div class="notification">
        <div class="notification_image">
          <img src="/images/notification.svg" alt="icon" />
        </div>

        <div class="notification_text">
          <p>10 Min before</p>
        </div>
      </div>

      <div class="organiser">
        <div class="organiser_image">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="48"
          >
            <path
              d="M596.817-220Q556-220 528-248.183q-28-28.183-28-69T528.183-386q28.183-28 69-28T666-385.817q28 28.183 28 69T665.817-248q-28.183 28-69 28ZM180-80q-24 0-42-18t-18-42v-620q0-24 18-42t42-18h65v-60h65v60h340v-60h65v60h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600v-430H180v430Zm0-490h600v-130H180v130Zm0 0v-130 130Z"
            />
          </svg>
        </div>
        <div class="organiser_text">
          <p>{{ event.eventUser }}</p>
          <!-- <p>{{ props.event.eventUser }}</p> -->
        </div>
      </div>
      <div class="time" v-if="props.event.startTime">
        <div class="time_image">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path
              d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"
            />
          </svg>
        </div>
        <p>{{ `${props.event.startTime} - ${props.event.endTime}` }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
});
if (props.event.color === undefined) {
  props.event.color = props.event.backgroundColor;
}
if (props.event.name === undefined) {
  props.event.name = props.event.what;
}
if (props.event.start)
  document.documentElement.style.setProperty(
    "--primary-color",
    props.event.color
  );
const format_date = (date) => {
  const d = new Date(date);
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const mo = new Intl.DateTimeFormat("en", { month: "long" }).format(d);
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  return `${da} ${mo} ${ye}`;
};
const date = ref(format_date(props.event.startDate));
const emit = defineEmits(["closeTaskModal", "deleteEvent", "editEvent"]);
const closeModal = () => {
  emit("closeTaskModal");
};
const deleteEvent = async () => {
  if (!props.event.startTime) {
    const deleteTask = await fetch(`/api/event/${props.event._id}`, {
      method: "DELETE",
    });
    if (deleteTask.status === 200) {
      emit("deleteEvent", props.event._id);
    }
  }
  const deleteTask = await fetch(`/api/eventhour/${props.event._id}`, {
    method: "DELETE",
  });
  if (deleteTask.status === 200) emit("deleteEvent", props.event._id);
};
const editEvent = () => {
  emit("editEvent", props.event._id);
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Alata&family=Anton&family=Barlow+Semi+Condensed:wght@400;500;600&family=Josefin+Sans:wght@300&family=Open+Sans:ital,wght@0,300;1,300&family=Roboto:wght@300&display=swap");
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgb(0, 0, 0, 0.5);
  z-index: 15;
}
.Modal {
  background: white;
  z-index: 20;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 28rem;
  border-radius: 10px;
  height: min-content;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.icon-box {
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
}

.edit {
  margin-right: 0.8rem;
  padding: 0.2rem;
  cursor: pointer;
}
.delete-task {
  margin-right: 0.8rem;
  padding: 0.2rem;
  cursor: pointer;
}
.closemodal {
  padding: 0.2rem;
  cursor: pointer;
}
.icon-box div:hover {
  border-radius: 50%;
  background-color: rgb(235, 235, 235);
}
.event-container {
  padding: 0.5rem;
  padding-left: 1.5rem;
}
.event_name {
  display: flex;
  align-items: center;
  margin-bottom: 0.2rem;
  align-items: center;
}
.event_color {
  width: 40px;
  height: 1.5rem;
  display: flex;
  justify-content: flex-start;
}
.color {
  width: 14px;
  margin-left: 3px;
  margin-top: 3px;
  background: var(--primary-color);
  border-radius: 5px;
  height: 14px;
}
.event_name_text {
  display: block;
  overflow: hidden;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.2px;
  color: rgb(60, 64, 67);
}
.name {
  line-height: 28px;
  font-size: 22px;
  font-weight: 600;
  word-wrap: break-word;
  position: relative;
  top: 3px;
  margin-top: 0px;
  margin-bottom: 3px;
}
.Date {
  font-size: 14px;
  font-weight: bold !important;
  letter-spacing: 0.2px;
  margin-top: 3px;
  line-height: 20px;
  color: rgb(60, 64, 67);
  margin-top: 0px;
  margin-bottom: 0px;
}
.event_desc {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  align-items: center;
  justify-content: flex-start;
}
.desc_image {
  width: 24px;
  display: flex;
  justify-content: flex-start;
  margin-left: 0;
  margin-right: 16px;
}
.desc_text,
.organiser_text {
  display: block;
  overflow: hidden;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.2px;
  color: rgb(60, 64, 67);
}
.desc_text p,
.organiser_text p {
  position: relative;
  top: 6px;
  margin-top: 4px;
  margin-bottom: 10px;
  letter-spacing: 0.2px;
  line-height: 18px;
  font-size: 14px;
  font-weight: bold;
}
.organiser,
.meet {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  align-items: center;
  justify-content: flex-start;
}
.organiser_image,
.meet_image {
  width: 24px;
  display: flex;
  margin-top: 4px;
  justify-content: flex-start;
  margin-left: 0;
  margin-right: 16px;
}
.meet {
  margin-top: 0.4rem;
}
.meet_text {
  margin-left: 16px;
  color: white;
}
.meet_text button {
  color: white;
  line-height: 20px;
  background-color: rgb(26, 115, 232);
  padding: 0 16px;
  line-height: 36px;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  cursor: pointer;
  border-radius: 6px;
  border: 0px solid;
}
.phone {
  margin-top: 1rem;
  display: flex;
  margin-bottom: 0.4rem;
}
.phone_container {
  width: 24px;
  display: flex;
  margin-top: 4px;
  justify-content: flex-start;
  margin-left: 0;
  margin-right: 16px;
}
.phone_text {
  display: flex;
  flex-direction: column;
  font-family: "Roboto", sans-serif;
}
.phone_text p {
  margin: 0px;
  margin-bottom: 4px;
  color: rgb(26, 115, 232);
}
.phone_text span {
  font-size: 12px;
  letter-spacing: 0.3px;
}
.guest {
  margin-top: 1rem;
  display: flex;
  margin-bottom: 0.4rem;
}
.guest_container {
  width: 24px;
  display: flex;
  margin-top: 4px;
  justify-content: flex-start;
  margin-left: 0;
  margin-right: 16px;
}
.guest_text {
  display: flex;
  flex-direction: column;
  font-family: "Roboto", sans-serif;
}
.guest_text p {
  margin: 0px;
  margin-bottom: 4px;
  color: rgb(60, 64, 67);
  font-size: 14px;
}
.user {
  display: flex;
  margin-left: 0px;
}
.user img {
  margin-top: 2px;
  margin-left: -2px;
  border-radius: 10%;
}
.user p {
  margin-left: 4px;
  margin-top: 2px;
}
.notification {
  display: flex;
  margin-bottom: 0.4rem;
}
.notification_image {
  width: 24px;
  display: flex;
  margin-top: 4px;
  justify-content: flex-start;
  margin-left: 0;
  margin-right: 16px;
}
.notification_text {
  display: flex;
  flex-direction: column;
  font-family: "Roboto", sans-serif;
}
.notification_text p {
  margin: 0px;
  margin-bottom: 4px;
  color: rgb(60, 64, 67);
  font-size: 14px;
  margin-top: 7px;
}
.time {
  display: flex;
  margin-bottom: 0.4rem;
  position: relative;
}
.time img {
  width: 24px;
  display: flex;
  margin-top: 4px;
  justify-content: flex-start;
  margin-left: 0;
  margin-right: 16px;
}
.time p {
  margin: 0px;
  margin-bottom: 4px;
  color: rgb(60, 64, 67);
  font-size: 14px;
  margin-top: 7px;
  padding-left: 14px;
  position: relative;
  top: -3px;
}
</style>