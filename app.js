// At the beginning of the file, replace the currentUser object with:
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Enthusiastic tech professional with a passion for innovation.",
    skills: ["JavaScript", "HTML", "CSS", "React"],
    interests: ["AI", "Blockchain", "IoT"],
    connections: [],
    events: [],
    interactions: []
};

// Save the initial user data if it doesn't exist in localStorage
if (!localStorage.getItem('currentUser')) {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

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
    addHoverToClickables();
}

// Update dashboard
function updateDashboard() {
    totalConnectionsEl.textContent = currentUser.connections.length;
    upcomingEventsEl.innerHTML = currentUser.events.map(event => `<li>${event.name} - ${event.date}</li>`).join('');
    
    // Display only the last 10 interactions, with the most recent at the top
    const recentInteractions = currentUser.interactions.slice(-10).reverse();
    recentInteractionsEl.innerHTML = recentInteractions.map(interaction => {
        let interactionClass = 'interaction-other';
        if (interaction.startsWith('Connected with')) {
            interactionClass = 'interaction-connect';
        } else if (interaction.startsWith('Requested info from')) {
            interactionClass = 'interaction-request';
        } else if (interaction.startsWith('RSVP')) {
            interactionClass = 'interaction-rsvp';
        }
        return `<li class="${interactionClass}">${interaction}</li>`;
    }).join('');
    
    // Scroll to the top of the recent interactions
    const recentInteractionsContainer = document.getElementById('recentInteractionsContainer');
    recentInteractionsContainer.scrollTop = 0;
}

// Update profile
function updateProfile() {
    userProfileEl.innerHTML = `
        <h3>${currentUser.name}</h3>
        <p><strong>Email:</strong> ${currentUser.email}</p>
        <p><strong>Bio:</strong> ${currentUser.bio}</p>
        <div>
            <strong>Skills:</strong>
            <ul>${currentUser.skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
        </div>
        <div>
            <strong>Interests:</strong>
            <ul>${currentUser.interests.map(interest => `<li>${interest}</li>`).join('')}</ul>
        </div>
        <p><strong>Connections:</strong> ${currentUser.connections.length}</p>
        <p><strong>Events:</strong> ${currentUser.events.length}</p>
        <button class="pure-button pure-button-primary" onclick="editProfile()">Edit Profile</button>
    `;
}

// Display businesses
function displayBusinesses() {
    businessListEl.innerHTML = businesses.map(business => `
        <div class="business-card">
            <h4><a href="business.html?id=${business.id}">${business.name}</a></h4>
            <p>Category: ${business.category}</p>
            <button class="pure-button ${currentUser.connections.includes(business.id) ? 'pure-button-disabled' : ''}" 
                    onclick="connectWithBusiness(${business.id})" 
                    id="connect-${business.id}"
                    data-hover="Connect with ${business.name}">
                ${currentUser.connections.includes(business.id) ? 'Connected' : 'Connect'}
            </button>
            <button class="pure-button" 
                    onclick="requestInfo(${business.id})"
                    data-hover="Request information from ${business.name}">
                Request Info
            </button>
        </div>
    `).join('');
}

// Display events
function displayEvents() {
    eventListEl.innerHTML = events.map(event => `
        <div class="event-card">
            <h4><a href="event.html?id=${event.id}">${event.name}</a></h4>
            <p>Date: ${event.date}</p>
            <button class="pure-button ${currentUser.events.some(e => e.id === event.id) ? 'pure-button-disabled' : ''}" 
                    onclick="rsvpEvent(${event.id})" 
                    id="rsvp-${event.id}"
                    data-hover="RSVP to ${event.name}">
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
        showToast(`You have connected with ${business.name}!`);
        
        // Save the updated user data to localStorage
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
}

// Request info from business
function requestInfo(businessId) {
    const business = businesses.find(b => b.id === businessId);
    const interaction = `Requested info from ${business.name}`;
    currentUser.interactions.push(interaction);
    
    // Limit the total number of interactions stored
    if (currentUser.interactions.length > 50) {
        currentUser.interactions = currentUser.interactions.slice(-50);
    }
    
    updateDashboard();
    // Here you would typically call the Claude API for a response
    showToast(`Information request sent to ${business.name}. They will respond shortly.`);
    
    // Save the updated user data to localStorage
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
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
        showToast(`You have RSVP'd to ${event.name}!`);
        
        // Save the updated user data to localStorage
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
}

// Show hover dialog
function showHoverDialog(event) {
    const content = event.target.getAttribute('data-hover');
    currentDialog = document.createElement('div');
    currentDialog.className = 'hover-dialog';
    currentDialog.textContent = content;
    document.body.appendChild(currentDialog);
    
    moveHoverDialog(event);
    setTimeout(() => currentDialog.classList.add('fade-in'), 10);
}

// Move hover dialog
function moveHoverDialog(event) {
    if (currentDialog) {
        const rect = event.target.getBoundingClientRect();
        
        // Ensure the dialog stays within the element's bounds
        let x = Math.max(rect.left, Math.min(event.clientX, rect.right));
        let y = Math.max(rect.top, Math.min(event.clientY, rect.bottom));
        
        // Offset the dialog slightly from the cursor
        x += 10;
        y += 10;
        
        currentDialog.style.left = `${x}px`;
        currentDialog.style.top = `${y}px`;
    }
}

// Hide hover dialog
function hideHoverDialog() {
    if (currentDialog) {
        currentDialog.classList.remove('fade-in');
        currentDialog.classList.add('fade-out');
        setTimeout(() => {
            currentDialog.remove();
            currentDialog = null;
        }, 300);
    }
}

// Show toast notification
function showToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.getElementById('toastContainer').appendChild(toast);
    
    setTimeout(() => toast.classList.add('fade-in'), 10);
    
    setTimeout(() => {
        toast.classList.remove('fade-in');
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Show business info
function showBusinessInfo(event, businessId, action) {
    const business = businesses.find(b => b.id === businessId);
    let content;
    if (action === 'connect') {
        content = `${business.name}\nCategory: ${business.category}\nClick to connect!`;
    } else if (action === 'info') {
        content = `${business.name}\nCategory: ${business.category}\nClick to request more information!`;
    }
    currentDialog = showHoverDialog(content, event.clientX + 10, event.clientY + 10);
}

// Show event info
function showEventInfo(event, eventId) {
    const eventItem = events.find(e => e.id === eventId);
    const content = `${eventItem.name}\nDate: ${eventItem.date}\nClick to RSVP!`;
    currentDialog = showHoverDialog(content, event.clientX + 10, event.clientY + 10);
}

// Hide business info
function hideBusinessInfo() {
    if (currentDialog) {
        hideHoverDialog(currentDialog);
        currentDialog = null;
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

// Add hover functionality to all clickable elements
function addHoverToClickables() {
    const clickables = document.querySelectorAll('button, a, [onclick]');
    clickables.forEach(element => {
        if (!element.hasAttribute('data-hover')) {
            element.setAttribute('data-hover', element.textContent.trim());
        }
        element.addEventListener('mouseenter', showHoverDialog);
        element.addEventListener('mouseleave', hideHoverDialog);
        element.addEventListener('mousemove', moveHoverDialog);
    });
}

let currentDialog = null;

// Initialize the app
init();

// Update the editProfile function
function editProfile() {
    // Navigate to edit_profile.html
    window.location.href = 'edit_profile.html';
}