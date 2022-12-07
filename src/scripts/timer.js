class Timer {
    constructor(baseElement) {
        // Initialize DOM elements
        this.progress = baseElement.querySelector('.timer__inner');
        this.min = baseElement.querySelector('.timer__countdown #min');
        this.sec = baseElement.querySelector('.timer__countdown #sec');
        this.trigger = baseElement.querySelector('.timer__trigger');
        this.set = baseElement.querySelector('.timer__set');
        const found = this.progress && this.min && this.sec && this.trigger && this.set;
        if (!found) throw new Error('Elements missing for initialization');

        // Add root for custom property manipulation
        this.root = document.querySelector(':root');

        // Add event listeners
        this.trigger.addEventListener('click', () => {
            if (this.running) this.reset();
            else this.runTimer();
        });

        this.set.addEventListener('click', () => {
            this.min.disabled = false;
            this.sec.disabled = false;
            this.min.focus();
        });

        this.progress.addEventListener('change', ({ target: { name, value } }) => {
            const numericValue = Number.parseInt(value);
            this.setTime = {
                ...this.setTime,
                [name]: numericValue === -1 ? 59 : numericValue === 60 ? 0 : numericValue
            };
            this.renderTime();
        });

        this.progress.addEventListener('submit', evt => evt.preventDefault());

        // Set default state
        this.setTime = { min: 5, sec: 0 };
        this.duration = null;
        this.interval = null;
        this.running = false;

        // Reset
        this.reset();
    }

    reset() {
        this.running = false;
        clearInterval(this.interval);
        this.trigger.innerText = 'Start';
        this.root.style.setProperty('--color-active', '#00aa51');
        this.root.style.setProperty('--timer-state', '100%');
        this.set.disabled = false;
        this.renderTime();
    }

    runTimer() {
        this.duration = new Date();
        this.duration.setMinutes(this.duration.getMinutes() + this.setTime.min);
        this.duration.setSeconds(this.duration.getSeconds() + this.setTime.sec);
        this.running = true;
        this.trigger.innerText = 'Stop';
        this.set.disabled = true;
        this.min.disabled = true;
        this.sec.disabled = true;

        this.interval = setInterval(() => {
            const difference = (this.duration - Date.now()) / 1000;
            this.renderTime(difference);
            if (difference <= 0) {
                clearInterval(this.interval);
                this.root.style.setProperty('--color-active', '#9d0000');
                this.root.style.setProperty('--timer-state', '100%');
                setTimeout(() => window.confirm("Time's up!") && this.reset(), 0);
            }
        }, 1000);
    }

    renderTime(difference) {
        const differenceMin = Math.trunc(Math.round(difference) / 60);
        const differenceSec = Math.round(difference) % 60;
        const progressInPercent = this.running ? (difference / (this.setTime.min * 60 + this.setTime.sec)) * 100 : 100;
        this.root.style.setProperty('--timer-state', `${progressInPercent}%`);
        this.min.value = (this.running ? differenceMin : this.setTime.min).toString().padStart(2, '0');
        this.sec.value = (this.running ? differenceSec : this.setTime.sec).toString().padStart(2, '0');
    }
}

export default Timer;
