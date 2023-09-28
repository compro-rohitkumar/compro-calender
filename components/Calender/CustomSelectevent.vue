<template>
    <div class="custom-select" :tabindex="tabindex" @blur="open = false">
      <div class="selected" :class="{ open: open }" @click="open = !open">
        {{ selected }}
      </div>
      <div class="items" :class="{ selectHide: !open }">
        <div
          v-for="(option, i) of options"
          :key="i"
          @click="
            selected = option;
            open = false;
            $emit('input', option);
          "
        >
          {{ option }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  });
    const selected = ref(props.default);

    const open = ref(false);

  </script>
  
  <style scoped>
  .custom-select {
    position: relative;
    width: 80%;
    text-align: left;
    outline: none;
    height: 47px;
    line-height: 47px;
    margin-top:1rem;
    font-family: 'Roboto', sans-serif;
  }
  
  .custom-select .selected {
    background-color: white;
    border-bottom: 1px solid rgb(64, 64, 64);
    color: rgb(64, 64, 64);
    padding-left: 1em;
    cursor: pointer;
    user-select: none;
    font-size:1.1rem;
    letter-spacing: 1px;
    margin-top:-1rem ;
  }
  
  .custom-select .selected.open {
    border-bottom: 1px solid rgb(26, 115, 232);;
    /* border-radius: 6px 6px 0px 0px; */
  }
  
  .custom-select .selected:after {
    position: absolute;
    content: "";
    top: 22px;
    right: 1em;
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-color: #fff transparent transparent transparent;
  }
  
  .custom-select .items {
    border-radius: 0px 0px 6px 6px;
    overflow: hidden;
    border-right: 1px solid  rgb(26, 115, 232);
    border-left: 1px solid rgb(26, 115, 232);
    border-bottom: 1px solid rgb(26, 115, 232);
    position: absolute;
    background-color: white;
    left: 0;
    right: 0;
    z-index: 1;
  }
  
  .custom-select .items div {
    color: rgb(64, 64, 64);
    padding-left: 1em;
    cursor: pointer;
    user-select: none;
  }
  
  .custom-select .items div:hover {
    background-color: rgb(26, 115, 232);
  }
  
  .selectHide {
    display: none;
  }
  </style>
  