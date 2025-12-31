// ============================================
// TRANSLATIONS
// ============================================

const translations = {
    fr: {
        nav: {
            home: 'Accueil',
            about: 'Parcours',
            dev: 'Développement',
            creations: 'Créations 3D',
            video: 'Vidéo'
        },
        hero: {
            title1: 'Développeur C# .NET',
            title2: 'Modélisateur 3D / Animateur 3D',
            title3: 'Motion Designer / Monteur Vidéo',
            subtitle: 'Ingénieur spécialisé en technologies 3D et développement logiciel, je combine expertise technique et créativité pour concevoir des solutions innovantes.',
            btn1: 'Découvrir mon parcours',
            btn2: 'Voir mes créations',
            skills: 'Compétences Clés'
        },
        overview: {
            title: 'En quelques mots',
            exp: {
                title: 'Expérience',
                text: 'Plus de 5 ans d\'expérience dans le développement logiciel et la création 3D'
            },
            crea: {
                title: 'Créativité',
                text: 'Artiste 3D indépendant avec des créations exposées et vendues sur Displate'
            },
            innov: {
                title: 'Innovation',
                text: 'Spécialisé en AR/VR, simulation industrielle et applications immersives'
            }
        },
        recent: {
            title: 'Expériences récentes',
            btn: 'Voir tout le parcours'
        },
        links: {
            title: 'Retrouvez-moi'
        },
        footer: {
            rights: 'Tous droits réservés.',
            contact: 'Contact'
        },
        about: {
            title: 'Parcours Professionnel',
            subtitle: 'Un aperçu détaillé de mon expérience et de mes compétences'
        },
        dev: {
            title: 'Projets de Développement',
            subtitle: 'Découvrez mes projets open-source et mes contributions techniques sur GitHub',
            skills: {
                title: 'Technologies & Compétences',
                highlighted: 'Compétences principales',
                languages: 'Langages de programmation',
                frameworks: 'Frameworks & Bibliothèques',
                game: 'Game Engines & 3D',
                tools: 'Outils de développement',
                cloud: 'Cloud & DevOps',
                video: 'Montage & Animation',
                design: 'Design & Modélisation',
                arvr: 'AR/VR & Technologies',
                systems: 'Systèmes & Administration',
                other: 'Autres compétences',
                languages_spoken: 'Langues',
                sectors: 'Secteurs d\'activité'
            },
            projects: {
                title: 'Mes Projets GitHub'
            },
            filters: {
                all: 'Tous'
            },
            project: {
                view: 'Voir sur GitHub',
                published: 'Publié le'
            },
            github: {
                title: 'Retrouvez-moi sur GitHub',
                description: 'Explorez tous mes projets, contributions et repositories open-source',
                button: 'Voir mon profil GitHub'
            }
        }
    },
    en: {
        nav: {
            home: 'Home',
            about: 'Career',
            dev: 'Development',
            creations: '3D Creations',
            video: 'Video'
        },
        hero: {
            title1: 'C# .NET Developer',
            title2: '3D Modeler / 3D Animator',
            title3: 'Motion Designer / Video Editor',
            subtitle: 'Engineer specialized in 3D technologies and software development, I combine technical expertise and creativity to design innovative solutions.',
            btn1: 'Discover my career',
            btn2: 'See my creations',
            skills: 'Key Skills'
        },
        overview: {
            title: 'In a few words',
            exp: {
                title: 'Experience',
                text: 'Over 5 years of experience in software development and 3D creation'
            },
            crea: {
                title: 'Creativity',
                text: 'Independent 3D artist with creations exhibited and sold on Displate'
            },
            innov: {
                title: 'Innovation',
                text: 'Specialized in AR/VR, industrial simulation and immersive applications'
            }
        },
        recent: {
            title: 'Recent Experience',
            btn: 'See full career'
        },
        links: {
            title: 'Find me'
        },
        footer: {
            rights: 'All rights reserved.',
            contact: 'Contact'
        },
        about: {
            title: 'Professional Career',
            subtitle: 'A detailed overview of my experience and skills'
        },
        dev: {
            title: 'Development Projects',
            subtitle: 'Discover my open-source projects and technical contributions on GitHub',
            skills: {
                title: 'Technologies & Skills',
                highlighted: 'Main Skills',
                languages: 'Programming Languages',
                frameworks: 'Frameworks & Libraries',
                game: 'Game Engines & 3D',
                tools: 'Development Tools',
                cloud: 'Cloud & DevOps',
                video: 'Video & Animation',
                design: 'Design & Modeling',
                arvr: 'AR/VR & Technologies',
                systems: 'Systems & Administration',
                other: 'Other Skills',
                languages_spoken: 'Languages',
                sectors: 'Industry Sectors'
            },
            projects: {
                title: 'My GitHub Projects'
            },
            filters: {
                all: 'All'
            },
            project: {
                view: 'View on GitHub',
                published: 'Published on'
            },
            github: {
                title: 'Find me on GitHub',
                description: 'Explore all my projects, contributions and open-source repositories',
                button: 'View my GitHub profile'
            }
        }
    }
};

// Get current language from localStorage or default to 'fr'
let currentLang = localStorage.getItem('language') || 'fr';

// Translation function
function translate(key) {
    const keys = key.split('.');
    let value = translations[currentLang];
    
    for (const k of keys) {
        if (value && value[k]) {
            value = value[k];
        } else {
            // Fallback to French if translation not found
            value = translations.fr;
            for (const k2 of keys) {
                if (value && value[k2]) {
                    value = value[k2];
                } else {
                    return key;
                }
            }
            break;
        }
    }
    
    return typeof value === 'string' ? value : key;
}

// Apply translations to all elements with data-i18n attribute
function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = translate(key);
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = translation;
        } else {
            element.textContent = translation;
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLang;
}

// Language toggle
document.addEventListener('DOMContentLoaded', () => {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            currentLang = lang;
            localStorage.setItem('language', lang);
            
            // Update active state
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Apply translations
            applyTranslations();
        });
    });
    
    // Set initial language
    langButtons.forEach(btn => {
        if (btn.getAttribute('data-lang') === currentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    applyTranslations();
});

// ============================================
// THEME TOGGLE
// ============================================

// Get current theme from localStorage or default to 'light'
let currentTheme = localStorage.getItem('theme') || 'light';

// Apply theme
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update theme toggle icon
    const themeToggle = document.querySelector('.theme-toggle-slider');
    if (themeToggle) {
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

// Theme toggle button
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Apply saved theme
    applyTheme(currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            currentTheme = currentTheme === 'light' ? 'dark' : 'light';
            applyTheme(currentTheme);
        });
    }
});

// ============================================
// NAVIGATION
// ============================================

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navControls = document.querySelector('.nav-controls');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        // Also show/hide controls in mobile menu
        if (navControls) {
            if (navMenu.classList.contains('active')) {
                navControls.style.display = 'flex';
            } else {
                navControls.style.display = '';
            }
        }
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            if (navControls) {
                navControls.style.display = '';
            }
        });
    });
}

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

if (navbar) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// ACTIVE NAVIGATION LINK
// ============================================

const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// ============================================
// LAZY LOADING (for images if added)
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%c👋 Bienvenue sur le portfolio d\'Aymeric PIHERY!', 'color: #E07A5F; font-size: 16px; font-weight: bold;');
console.log('%cDéveloppeur C# .NET | Modélisateur 3D | Motion Designer', 'color: #C85A3A; font-size: 12px;');

