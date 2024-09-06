// Load events from localStorage
let events = JSON.parse(localStorage.getItem('events')) || [];

// Get event ID from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const eventId = parseInt(urlParams.get('id'));

// Find the event
const event = events.find(e => e.id === eventId);

// Display event details
function displayEventDetails() {
    const eventDetailsEl = document.getElementById('eventDetails');
    if (event) {
        eventDetailsEl.innerHTML = `
            <h2>${event.name}</h2>
            <p><strong>Date:</strong> ${event.date}</p>
            <!-- Add more event details here -->
        `;
    } else {
        eventDetailsEl.innerHTML = '<p>Event not found.</p>';
    }
}

displayEventDetails();