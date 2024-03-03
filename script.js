function updateMemberStatus() {
    const now = new Date();
    const cstTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Chicago" }));
    const dayOfWeek = cstTime.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
    const hours = cstTime.getHours(); // 0 to 23
    const minutes = cstTime.getMinutes();
    const seconds = cstTime.getSeconds();
    const currentTimeDisplay = document.getElementById("currentTime");
    currentTimeDisplay.textContent = "Current Time: " + cstTime.toLocaleString();

    // Weekend check
    if (dayOfWeek === 0 || dayOfWeek === 6) { // 0 is Sunday, 6 is Saturday
        document.querySelectorAll("#availabilityTable tr").forEach(row => {
            if (row.id) { // Check if the row has an id to skip the header row
                row.cells[1].textContent = "Not Around";
                row.className = "not-around";
            }
        });
        return; // No need to check further since it's a weekend
    }

    // Define the schedules for weekdays
    const schedules = {
        "Boris": { start: 9, end: 17, daysOff: [] },
        "Keith": { start: 11, end: 19, daysOff: [1] }, // Keith ends at 7pm, 1 is Monday
        "Jason": { start: 15, end: 23, daysOff: [] }, // Jason ends at 11pm
        "Dan": { start: 9, end: 17, daysOff: [5] }, // 5 is Friday
        "Joe": { start: 9, end: 17, daysOff: [] }
    };

    Object.keys(schedules).forEach(member => {
        const { start, end, daysOff } = schedules[member];
        const isAround = hours >= start && hours < end && !daysOff.includes(dayOfWeek);
        const memberRow = document.getElementById(member);
        memberRow.cells[1].textContent = isAround ? "Around" : "Not Around";
        memberRow.className = isAround ? "around" : "not-around";
    });
}

// Update status upon loading and then every minute to keep it up-to-date
updateMemberStatus();
setInterval(updateMemberStatus, 60000); // Update every minute
