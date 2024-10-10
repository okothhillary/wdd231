const memberships = [
    {
        title: "NP Membership",
        description: "Non-profit, no fee.",
        benefits: "Direct phone call access to other NGOs and non profits like you."
    },
    {
        title: "Bronze Membership",
        description: "Basic membership level.",
        benefits: "Access to customers within your town."
    },
    {
        title: "Silver Membership",
        description: "Intermediate membership level.",
        benefits: "Access to customers within the whole state and free delivery for them."
    },
    {
        title: "Gold Membership",
        description: "Premium membership level.",
        benefits: "Access to country-wide customers and free shipping for them."
    }
];

const currentTimestamp = new Date().toLocaleString();
document.getElementById('timestamp').value = currentTimestamp;

const yearElem = document.querySelector("#currentyear");
const lastModElem = document.querySelector("#lastModified");

yearElem.textContent = new Date().getFullYear();
lastModElem.textContent = document.lastModified;

function createMembershipCards() {
    const cardsContainer = document.getElementById('membership-cards');
    const modalsContainer = document.getElementById('modals');

    memberships.forEach((membership, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h2>${membership.title}</h2>
            <p>${membership.description}</p>
            <a href="#" class="modal-link" data-modal="modal-${index}">More Info</a>
        `;
        cardsContainer.appendChild(card);

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

    window.onclick = function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });
    };
}

createMembershipCards();
