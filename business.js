// Load businesses from localStorage
let businesses = JSON.parse(localStorage.getItem('businesses')) || [];

// Get business ID from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const businessId = parseInt(urlParams.get('id'));

// Find the business
const business = businesses.find(b => b.id === businessId);

// Display business details
function displayBusinessDetails() {
    const businessDetailsEl = document.getElementById('businessDetails');
    if (business) {
        businessDetailsEl.innerHTML = `
            <h2>${business.name}</h2>
            <p><strong>Category:</strong> ${business.category}</p>
            <!-- Add more business details here -->
        `;
    } else {
        businessDetailsEl.innerHTML = '<p>Business not found.</p>';
    }
}

displayBusinessDetails();