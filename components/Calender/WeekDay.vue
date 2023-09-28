<template>
    <div class="grid">
        <div>Monday</div>
        <div>Tuesday</div>
        <div>Wednesday</div>
        <div>Thursday</div>
        <div>Friday</div>
        <div>Saturday</div>
        <div>Sunday</div>
    </div>
</template>
<style scoped>
    .grid{
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-template-rows: 1fr;
        grid-column-gap: 0px;
        grid-row-gap: 0px;
        justify-content: center;
        align-items: center;
        width: 100%;
        border: 0.1px solid rgb(176, 172, 172, 0.6);

        border-bottom: none;
    }
    .grid div{
        text-align: center;
        border: 0.1px solid rgb(176, 172, 172, 0.6);
        grid-column: span 1;
        align-self: center;
        word-break: break-all;
        padding: 5px;
    }
</style>