// ============================================
// PROJECT FILTERS
// ============================================

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    
                    setTimeout(() => {
                        card.classList.remove('hidden');
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 150);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .skill-category-card, .github-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ============================================
// TECH BADGES HOVER EFFECT
// ============================================

document.querySelectorAll('.tech-badge, .skill-badge').forEach(badge => {
    badge.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });

    badge.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// ============================================
// GITHUB API INTEGRATION (Optional)
// ============================================

// Fonction pour récupérer les données GitHub (optionnel)
// Décommentez et configurez si vous voulez utiliser l'API GitHub
/*
async function fetchGitHubRepos(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
        const repos = await response.json();
        
        const projectsGrid = document.getElementById('projects-grid');
        if (!projectsGrid) return;
        
        projectsGrid.innerHTML = '';
        
        repos.forEach(repo => {
            const projectCard = createProjectCard(repo);
            projectsGrid.appendChild(projectCard);
        });
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
    }
}

function createProjectCard(repo) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-category', getRepoCategories(repo));
    
    const languages = repo.language ? [repo.language.toLowerCase()] : [];
    const topics = repo.topics || [];
    const categories = [...languages, ...topics].join(' ');
    
    card.innerHTML = `
        <div class="project-header">
            <h3 class="project-title">${repo.name}</h3>
        </div>
        <p class="project-description">${repo.description || 'Aucune description disponible.'}</p>
        <div class="project-tech">
            ${repo.language ? `<span class="tech-badge">${repo.language}</span>` : ''}
            ${topics.slice(0, 3).map(topic => `<span class="tech-badge">${topic}</span>`).join('')}
        </div>
        <div class="project-footer">
            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="project-link">
                <span class="link-icon">🔗</span>
                <span>Voir sur GitHub</span>
            </a>
            <span class="project-date">Publié le</span> <span class="project-date-value">${formatPublishedDate(repo.created_at)}</span>
        </div>
    `;
    
    return card;
}

function getRepoCategories(repo) {
    const categories = [];
    if (repo.language) {
        const lang = repo.language.toLowerCase();
        if (lang === 'c#' || lang === 'csharp') categories.push('csharp');
        else if (lang === 'javascript' || lang === 'typescript') categories.push('javascript');
        else if (lang === 'python') categories.push('python');
    }
    if (repo.topics) {
        if (repo.topics.includes('unity')) categories.push('unity');
        if (repo.topics.includes('web') || repo.topics.includes('react') || repo.topics.includes('vue')) categories.push('web');
    }
    return categories.join(' ');
}

function formatPublishedDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Décommentez pour utiliser l'API GitHub
// Remplacez 'votre-username' par votre nom d'utilisateur GitHub
// fetchGitHubRepos('votre-username');
*/

