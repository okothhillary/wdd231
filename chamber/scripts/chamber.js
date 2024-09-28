document.addEventListener('DOMContentLoaded', function () {
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').innerHTML = currentYear;

    const lastModified = document.lastModified;
    document.getElementById('lastModified').innerHTML = `Last Modified: ${lastModified}`;

    const url = 'data/members.json';

    async function fetchMembers() {
        try {
            const response = await fetch(url); 
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            displayMembers(data.members);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    fetchMembers();
    
    function displayMembers(members) {
        const cardsContainer = document.getElementById('cards');
    
        members.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('business-card'); 
            card.innerHTML = `
                <h3>${member.name}</h3>
                <p>${member.info}</p>
                <p>${member.address}</p>
                <p>Email: <a href="mailto:${member.phone}">${member.phone}</a></p>
                <p>Website: <a href="${member.website}" target="_blank">${member.website}</a></p>
                <img src="images/${member.image}" alt="${member.name} image" />
                <p>Membership Level: ${getMembershipLevel(member.membership_level)}</p>
            `;
            cardsContainer.appendChild(card);
        });
    }

    function getMembershipLevel(level) {
        switch (level) {
            case 1:
                return 'Member';
            case 2:
                return 'Silver';
            case 3:
                return 'Gold';
            default:
                return 'Unknown';
        }
    }

    document.getElementById('toggleView').addEventListener('click', () => {
        const cardsContainer = document.getElementById('cards');
        const isGridView = cardsContainer.classList.toggle('grid-view');
        cardsContainer.classList.toggle('list-view', !isGridView); // Toggle list-view class
        const buttonText = isGridView ? 'Switch to List View' : 'Switch to Grid View';
        document.getElementById('toggleView').innerText = buttonText;
    });

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', function () {
        const navList = navMenu.querySelector('ul');
        navList.classList.toggle('active');
        hamburger.textContent = navList.classList.contains('active') ? 'X' : '☰';
    });

//things are confusing
    
});
