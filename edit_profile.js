// Load user data from localStorage
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};

// Populate form fields with user data
document.getElementById('name').value = currentUser.name || '';
document.getElementById('email').value = currentUser.email || '';
document.getElementById('bio').value = currentUser.bio || '';
document.getElementById('skills').value = currentUser.skills ? currentUser.skills.join(', ') : '';
document.getElementById('interests').value = currentUser.interests ? currentUser.interests.join(', ') : '';

// Handle form submission
document.getElementById('editProfileForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Update currentUser object with form data
    currentUser.name = document.getElementById('name').value;
    currentUser.email = document.getElementById('email').value;
    currentUser.bio = document.getElementById('bio').value;
    currentUser.skills = document.getElementById('skills').value.split(',').map(skill => skill.trim());
    currentUser.interests = document.getElementById('interests').value.split(',').map(interest => interest.trim());
    
    // Save updated user data to localStorage
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Redirect back to the main page
    window.location.href = 'index.html';
});