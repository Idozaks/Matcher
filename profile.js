// Load user data from localStorage
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};

// Display user profile
function displayProfile() {
    const userProfileEl = document.getElementById('userProfile');
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
    `;
}

displayProfile();