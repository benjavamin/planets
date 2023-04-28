import { planetsData } from './planets-data.js';

const planetImageDefault = document.querySelector('.planet-image-default');
const planetImageGeology = document.querySelector('.planet-image-geology');
const planetTitle = document.querySelector('.planet-title');
const planetInfo = document.querySelector('.planet-info');
const navbarItems = document.querySelector('.navbar-items');
const allNavbarTitleColorWrappers = document.querySelectorAll('.navbar-title-color-wrapper');
const overviewSectionButtons = document.querySelectorAll('.overview-btn');
const structureSectionButtons = document.querySelectorAll('.structure-btn');
const geologySectionButtons = document.querySelectorAll('.geology-btn');
const rotationTimeFact = document.querySelector('#rotation-time');
const revolutionTimeFact = document.querySelector('#revolution-time');
const radiusFact = document.querySelector('#radius');
const avgTempFact = document.querySelector('#avg-temp');
const wikipediaLink = document.querySelector('.wikipedia-link');
const hamburgerMenuIcon = document.querySelector('.hamburger');
const sectionToImageMapping = { overview: 'planet', structure: 'internal', geology: 'planet' };
let selectedPlanet = null;

const setOverviewSectionAsActive = () => {
    overviewSectionButtons.forEach(button => button.classList.add('active'));
    structureSectionButtons.forEach(button => button.classList.remove('active'));
    geologySectionButtons.forEach(button => button.classList.remove('active'));
    planetImageGeology.style.display = 'none';
}

const setStructureSectionAsActive = () => {
    structureSectionButtons.forEach(button => button.classList.add('active'));
    overviewSectionButtons.forEach(button => button.classList.remove('active'));
    geologySectionButtons.forEach(button => button.classList.remove('active'));
    planetImageGeology.style.display = 'none';
}

const setGeologySectionAsActive = () => {
    geologySectionButtons.forEach(button => button.classList.add('active'));
    structureSectionButtons.forEach(button => button.classList.remove('active'));
    overviewSectionButtons.forEach(button => button.classList.remove('active'));
    planetImageGeology.src = selectedPlanet.images.geology;
    planetImageGeology.style.display = 'block';
}

hamburgerMenuIcon.addEventListener('click', () => {
    toggleMobileMenu();
});

const toggleMobileMenu = () => {
    if (navbarItems.classList.contains('active')) {
        closeMobileMenu();
    } else {
        navbarItems.classList.add('active');
        document.body.style.overflowY = 'hidden';
    }
}

const closeMobileMenu = () => {
    navbarItems.classList.remove('active');
    document.body.style.overflowY = 'visible';
}

const loadPlanetData = (planetName, section) => {
    section = section ? section : 'overview';
    const currentActiveImage = sectionToImageMapping[section];
    const planetData = planetsData.filter(planet => planet.name == planetName);
    removeButtonClasses();
    selectedPlanet = planetData[0];
    setOverviewSectionAsActive();
    setButtonClasses();
    planetImageDefault.src = selectedPlanet.images[currentActiveImage];
    planetTitle.textContent = planetName;
    planetInfo.textContent = selectedPlanet[section].content;
    rotationTimeFact.textContent = selectedPlanet.rotation;
    revolutionTimeFact.textContent = selectedPlanet.revolution;
    radiusFact.textContent = selectedPlanet.radius;
    avgTempFact.textContent = selectedPlanet.temperature;
    wikipediaLink.href = selectedPlanet[section].source;
    closeMobileMenu();
}

overviewSectionButtons.forEach(button => {
    button.addEventListener('click', () => {
        loadPlanetData(selectedPlanet.name, 'overview');
        setOverviewSectionAsActive();
    }
    )
});

structureSectionButtons.forEach(button => {
    button.addEventListener('click', () => {
        loadPlanetData(selectedPlanet.name, 'structure');
        setStructureSectionAsActive();
    }
    )
});


geologySectionButtons.forEach(button => {
    button.addEventListener('click', () => {
        loadPlanetData(selectedPlanet.name, 'geology');
        setGeologySectionAsActive();
    }
    )
});

window.onload = () => {
    loadPlanetData('Mercury');
    setOverviewSectionAsActive();
}

window.onresize = () => {
    if (innerWidth > 991) closeMobileMenu();
}

allNavbarTitleColorWrappers.forEach(wrapperItem => {
    const planetName = wrapperItem.textContent.trim();
    wrapperItem.addEventListener('click', () => {
        allNavbarTitleColorWrappers.forEach(wrapper => {
            wrapper.classList.remove('active');
        });
        loadPlanetData(planetName);
        wrapperItem.classList.add('active');
    })
})

const setButtonClasses = () => {
    const planetClassName = "--" + selectedPlanet.name.toLowerCase();
    overviewSectionButtons.forEach(button => button.classList.add(planetClassName));
    structureSectionButtons.forEach(button => button.classList.add(planetClassName));
    geologySectionButtons.forEach(button => button.classList.add(planetClassName));
}

const removeButtonClasses = () => {
    if (selectedPlanet) {
        const planetClassName = "--" + selectedPlanet.name.toLowerCase();
        overviewSectionButtons.forEach(button => button.classList.remove(planetClassName));
        structureSectionButtons.forEach(button => button.classList.remove(planetClassName));
        geologySectionButtons.forEach(button => button.classList.remove(planetClassName));
    }
}

