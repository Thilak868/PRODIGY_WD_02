let startTime, elapsedTime = 0, timerInterval;
let running = false;

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    return `${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
}

function startPause() {
    const container = document.querySelector('.stopwatch-container');
    if (!running) {
        // ADD THIS LINE BELOW:
        startTime = Date.now() - elapsedTime; 
        
        container.classList.add('active');
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            document.getElementById("display").innerHTML = timeToString(elapsedTime);
        }, 10);
        document.getElementById("startPauseBtn").innerHTML = "Pause";
        running = true;
    } else {
        container.classList.remove('active');
        clearInterval(timerInterval);
        document.getElementById("startPauseBtn").innerHTML = "Start";
        running = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    document.getElementById("display").innerHTML = "00:00:00.00";
    elapsedTime = 0;
    running = false;
    document.getElementById("startPauseBtn").innerHTML = "Start";
    document.getElementById("lapsList").innerHTML = "";
}

let laps = [];

function lap() {
    if (running) {
        let time = elapsedTime;
        laps.push(time);

        let li = document.createElement("li");
        li.innerText = timeToString(time);

        // Highlight logic
        if (time === Math.min(...laps)) {
            li.style.color = "lightgreen"; // fastest
        }
        if (time === Math.max(...laps)) {
            li.style.color = "red"; // slowest
        }

        document.getElementById("lapsList").appendChild(li);
    }
}
