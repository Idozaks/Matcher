// Load user data and businesses/events from localStorage
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
let businesses = JSON.parse(localStorage.getItem('businesses')) || [];
let events = JSON.parse(localStorage.getItem('events')) || [];

// Display businesses and events
function displayBusinessesAndEvents() {
    const businessListEl = document.getElementById('businessList');
    const eventListEl = document.getElementById('eventList');

    businessListEl.innerHTML = businesses.map(business => `
        <div class="business-card">
            <h4><a href="business.html?id=${business.id}">${business.name}</a></h4>
            <p>Category: ${business.category}</p>
        </div>
    `).join('');

    eventListEl.innerHTML = events.map(event => `
        <div class="event-card">
            <h4><a href="event.html?id=${event.id}">${event.name}</a></h4>
            <p>Date: ${event.date}</p>
        </div>
    `).join('');
}

displayBusinessesAndEvents();