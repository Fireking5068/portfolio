function updateTime() {
    const timeElement = document.getElementById("time");

    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timeElement.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
}

function currentDate() {
    const dateElement = document.getElementById("date");

    const now = new Date();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    let year = now.getFullYear();

    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    dateElement.textContent = `${month}/${day}/${year}`;
}

setInterval(updateTime, 1000);

updateTime();
currentDate();