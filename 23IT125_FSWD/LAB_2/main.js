import { addTask, sortTasksByPriority, displayTasksDueWithin, scheduleReminders } from './taskManager.js';

// Example usage:
addTask("Complete project", 15, 1);
addTask("Attend meeting", 30, 2);
addTask("Workout", 5, 3);

sortTasksByPriority();
displayTasksDueWithin(20);
scheduleReminders();