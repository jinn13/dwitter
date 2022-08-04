// const moment = require("./moment");

let Target_date = document.getElementById("date");
let Target = document.getElementById("clock");
let Target_apm = document.getElementById("apm");
let test22 = document.getElementById("test2");
let test3 = document.getElementById("test3");
let day22 = document.getElementById("day");

function clock() {
  let time = new Date();
  let year = time.getFullYear();
  let day = time.getDate();
  let month = time.getMonth() + 1;
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  let date = time.getDay();
  if (date == 1) {
    date = "월요일(Mon)";
  } else if (date == 2) {
    date = "화요일(Tue)";
  } else if (date == 3) {
    date = "수요일(Wed)";
  } else if (date == 4) {
    date = "목요일(Thur)";
  } else if (date == 5) {
    date = "금요일(Fri)";
  } else if (date == 6) {
    date = "토요일(Sat)";
  } else if (date == 7) {
    date = "일요일(Sun)";
  }

  let AmPm = "AM";
  if (hours > 12) {
    AmPm = "PM";
    hours %= 12;
  }

  Target.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;

  Target_date.innerText = `${year}년 ${month}월 ${day}일 ${date}`;
  Target_apm.innerText = `${AmPm}`;

  let test_time = moment().subtract(13, "hours").format("YYYY년 MM월 DD일");
  test22.innerText = `${test_time}`;

  let day2 = moment().day();
  if (day2 == 1) {
    day2 = "월요일(Mon)";
  } else if (day2 == 2) {
    day2 = "화요일(Tue)";
  } else if (day2 == 3) {
    day2 = "수요일(Wed)";
  } else if (day2 == 4) {
    day2 = "목요일(Thur)";
  } else if (day2 == 5) {
    day2 = "금요일(Fri)";
  } else if (day2 == 6) {
    day2 = "토요일(Sat)";
  } else if (day2 == 7) {
    day2 = "일요일(Sun)";
  }

  day22.innerText = `${day2}`;

  let test_data = moment().subtract(13, "hours").format("HH:mm:ss");
  test3.innerText = `${test_data}`;
}
clock();
setInterval(clock, 1000); // 1초마다 실행
