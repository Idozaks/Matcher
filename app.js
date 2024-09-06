// Simulated user data
let currentUser = {
    id: 1,
    name: "John Doe",
    connections: [],
    events: [],
    interactions: []
};

// Simulated businesses and events
const businesses = [
    { id: 1, name: "TechCorp", category: "Technology" },
    { id: 2, name: "GreenEnergy", category: "Energy" },
    { id: 3, name: "HealthPlus", category: "Healthcare" }
];

const events = [
    { id: 1, name: "Tech Conference 2023", date: "2023-09-15" },
    { id: 2, name: "Green Energy Expo", date: "2023-10-01" },
    { id: 3, name: "Health and Wellness Summit", date: "2023-11-05" }
];

// DOM elements
const totalConnectionsEl = document.getElementById('totalConnections');
const upcomingEventsEl = document.getElementById('upcomingEvents');
const recentInteractionsEl = document.getElementById('recentInteractions');
const userProfileEl = document.getElementById('userProfile');
const businessListEl = document.getElementById('businessList');
const eventListEl = document.getElementById('eventList');
const modalEl = document.getElementById('modal');
const modalContentEl = document.getElementById('modalContent');
const closeModalBtn = document.querySelector('.close');

// Initialize the app
function init() {
    updateDashboard();
    updateProfile();
    displayBusinesses();
    displayEvents();
}

// Update dashboard
function updateDashboard() {
    totalConnectionsEl.textContent = currentUser.connections.length;
    upcomingEventsEl.innerHTML = currentUser.events.map(event => `<li>${event.name} - ${event.date}</li>`).join('');
    recentInteractionsEl.innerHTML = currentUser.interactions.slice(-5).map(interaction => `<li>${interaction}</li>`).join('');
}

// Update profile
function updateProfile() {
    userProfileEl.innerHTML = `
        <h3>${currentUser.name}</h3>
        <p>Connections: ${currentUser.connections.length}</p>
        <p>Events: ${currentUser.events.length}</p>
        <button class="pure-button pure-button-primary" onclick="editProfile()">Edit Profile</button>
    `;
}

// Display businesses
function displayBusinesses() {
    businessListEl.innerHTML = businesses.map(business => `
        <div class="business-card">
            <h4>${business.name}</h4>
            <p>Category: ${business.category}</p>
            <button class="pure-button ${currentUser.connections.includes(business.id) ? 'pure-button-disabled' : ''}" 
                    onclick="connectWithBusiness(${business.id})" 
                    id="connect-${business.id}">
                ${currentUser.connections.includes(business.id) ? 'Connected' : 'Connect'}
            </button>
            <button class="pure-button" onclick="requestInfo(${business.id})">Request Info</button>
        </div>
    `).join('');
}

// Display events
function displayEvents() {
    eventListEl.innerHTML = events.map(event => `
        <div class="event-card">
            <h4>${event.name}</h4>
            <p>Date: ${event.date}</p>
            <button class="pure-button ${currentUser.events.some(e => e.id === event.id) ? 'pure-button-disabled' : ''}" 
                    onclick="rsvpEvent(${event.id})" 
                    id="rsvp-${event.id}">
                ${currentUser.events.some(e => e.id === event.id) ? 'RSVP\'d' : 'RSVP'}
            </button>
        </div>
    `).join('');
}

// Connect with business
function connectWithBusiness(businessId) {
    if (!currentUser.connections.includes(businessId)) {
        const business = businesses.find(b => b.id === businessId);
        currentUser.connections.push(businessId);
        currentUser.interactions.push(`Connected with ${business.name}`);
        updateDashboard();
        updateProfile();
        const connectButton = document.getElementById(`connect-${businessId}`);
        connectButton.textContent = 'Connected';
        connectButton.classList.add('pure-button-disabled');
        showModal(`You have connected with ${business.name}!`);
    }
}

// Request info from business
function requestInfo(businessId) {
    const business = businesses.find(b => b.id === businessId);
    currentUser.interactions.push(`Requested info from ${business.name}`);
    updateDashboard();
    // Here you would typically call the Claude API for a response
    showModal(`Information request sent to ${business.name}. They will respond shortly.`);
}

// RSVP to event
function rsvpEvent(eventId) {
    if (!currentUser.events.some(e => e.id === eventId)) {
        const event = events.find(e => e.id === eventId);
        currentUser.events.push(event);
        currentUser.interactions.push(`RSVP'd to ${event.name}`);
        updateDashboard();
        const rsvpButton = document.getElementById(`rsvp-${eventId}`);
        rsvpButton.textContent = 'RSVP\'d';
        rsvpButton.classList.add('pure-button-disabled');
        showModal(`You have RSVP'd to ${event.name}!`);
    }
}

// Show modal
function showModal(content) {
    modalContentEl.innerHTML = content;
    modalEl.style.display = 'block';
}

// Close modal
closeModalBtn.onclick = function() {
    modalEl.style.display = 'none';
}

// Initialize the app
init();