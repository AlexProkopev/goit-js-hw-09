
const objForTask = {
    btnStartGetRundomColor: document.querySelector("[data-start]"),
    btnStopGetRundomColor: document.querySelector("[data-stop]"),
    bodyRef: document.querySelector("body"),
    randomCollor: "",
    idTimeout: null,
    getRandomColor() {
       this.idTimeout = setInterval(() => {
            this.randomCollor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
            objForTask.bodyRef.style.backgroundColor = this.randomCollor
            localStorage.setItem("rundom color", this.randomCollor)
        },1000)
    },

    stopGetRandomColor() {
        clearInterval(this.idTimeout)
    }
}

objForTask.btnStartGetRundomColor.addEventListener("click", () => objForTask.getRandomColor());

objForTask.btnStopGetRundomColor.addEventListener("click", () => objForTask.stopGetRandomColor());


//? Если есть уже значение в локале то делаем боди тем цветом что в хранилище

const localJSON = localStorage.getItem("rundom color")
function checkLocal(promp) {
    if (promp === null) {
        return
    }

    objForTask.bodyRef.style.backgroundColor = localJSON
}

checkLocal(localJSON)





