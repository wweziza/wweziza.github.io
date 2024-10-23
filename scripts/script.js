function toggleTheme() {
    const body = document.documentElement;
    const currentTheme = body.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    document.addEventListener('click', function(event) {
        const navLinks = document.querySelector('.nav-links');
        const hamburger = document.querySelector('.hamburger');
        const isClickInsideNav = navLinks.contains(event.target) || hamburger.contains(event.target);
        
        if (!isClickInsideNav && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            const navLinks = document.querySelector('.nav-links');
            const hamburger = document.querySelector('.hamburger');
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    fetch('layout/projects.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            document.querySelector('#projects-container .projects').innerHTML = html;
        })
        .catch(error => console.error('Error loading projects:', error));

    fetch('layout/playground.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            document.querySelector('#playground-container .playground').innerHTML = html;
        })
        .catch(error => console.error('Error loading playground:', error));
        
    fetch('layout/blogs.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            document.querySelector('#blogs-container .blogs').innerHTML = html;
        })
        .catch(error => console.error('Error loading blogs:', error));
});