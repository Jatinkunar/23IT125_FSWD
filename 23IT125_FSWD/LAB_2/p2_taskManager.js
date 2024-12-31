class Task {
    constructor(title, dueTime, priority) {
        this.title = title;
        this.dueTime = dueTime; // in minutes from now
        this.priority = priority;
    }
}

let tasks = [];

function addTask(title, dueTime, priority) {
    try {
        if (!title || !dueTime || !priority) {
            throw new Error("Invalid task data. Ensure all fields are provided.");
        }
        const task = new Task(title, dueTime, priority);
        tasks.push(task);
    } catch (error) {
        console.error(error.message);
    }
}

function sortTasksByPriority() {
    tasks.sort((a, b) => a.priority - b.priority);
}

function displayTasksDueWithin(minutes) {
    const now = new Date();
    const upcomingTasks = tasks.filter(task => {
        const taskDueTime = new Date(now.getTime() + task.dueTime * 60000);
        return taskDueTime <= new Date(now.getTime() + minutes * 60000);
    });
    console.log("Tasks due within the next", minutes, "minutes:");
    upcomingTasks.forEach(task => {
        console.log(`Title: ${task.title}, Due in: ${task.dueTime} minutes, Priority: ${task.priority}`);
    });
}

function scheduleReminders() {
    tasks.forEach(task => {
        setTimeout(() => {
            console.log(`Reminder: ${task.title} is due now!`);
        }, task.dueTime * 60000);
    });
}

export { addTask, sortTasksByPriority, displayTasksDueWithin, scheduleReminders };