// Membership data
const memberships = [
    {
        title: "NP Membership",
        description: "Non-profit, no fee.",
        benefits: "Details about NP membership benefits."
    },
    {
        title: "Bronze Membership",
        description: "Basic membership level.",
        benefits: "Details about Bronze membership benefits."
    },
    {
        title: "Silver Membership",
        description: "Intermediate membership level.",
        benefits: "Details about Silver membership benefits."
    },
    {
        title: "Gold Membership",
        description: "Premium membership level.",
        benefits: "Details about Gold membership benefits."
    }
];

// Function to create cards and modals dynamically
function createMembershipCards() {
    const cardsContainer = document.getElementById('membership-cards');
    const modalsContainer = document.getElementById('modals');

    memberships.forEach((membership, index) => {
        // Create card
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h2>${membership.title}</h2>
            <p>${membership.description}</p>
            <a href="#" class="modal-link" data-modal="modal-${index}">More Info</a>
        `;
        cardsContainer.appendChild(card);

        // Create modal
        const modal = document.createElement('div');
        modal.id = `modal-${index}`;
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>${membership.title} Benefits</h2>
                <p>${membership.benefits}</p>
            </div>
        `;
        modalsContainer.appendChild(modal);
    });

    // Add event listeners to open and close modals
    const modalLinks = document.querySelectorAll('.modal-link');
    modalLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            modal.style.display = "block";
        });
    });

    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = "none";
        });
    });

    // Close modals when clicking outside the modal content
    window.onclick = function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });
    };
}

// Call the function to build cards and modals
createMembershipCards();
