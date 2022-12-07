import throttle from 'lodash/throttle';

import SegmentedControl from './scripts/segmentedControl';
import WhatIDoCard from './scripts/whatIDoCard';
import WhyICareItem from './scripts/whyICareItem';
import { handleNavClick, handleStickyNav, handleCurrentNavItem } from './scripts/nav';
import { handleOpenModal } from './scripts/showcaseModal';
import { handleOpenForm } from './scripts/contactFormModal';
import { handleOpenLegal } from './scripts/legalModal';
import wherIAmLE from './images/whereiam_le.svg';

import '@/sass/index.scss';

document.addEventListener('DOMContentLoaded', () => {
    // DOM Selectors
    const menuIcon = document.querySelector('.nav__icon');
    const whatIDoSegmented = document.querySelector('.whatido .segmented-control');
    const whatIDoUX = document.querySelector('.whatido .cardview');
    const whatIDoCode = document.querySelector('.whatido .codeview');
    const whatIDoUXCards = whatIDoUX.querySelectorAll('.card');
    const whyICareItems = document.querySelectorAll('.whyicare__item');
    const nav = document.querySelector('.nav');
    const navMain = nav.querySelector('.nav__main');
    const navItems = nav.querySelectorAll('.nav__list li');
    const navIcon = nav.querySelector('.nav__icon');
    const sections = document.querySelectorAll('body > main div.row:not(.nav)');
    const whereIam = document.querySelector('section.whereiam');

    // Event Listeners and Initialization
    menuIcon.addEventListener('click', () => menuIcon.classList.toggle('nav__icon--close'));
    document.body.addEventListener('click', evt => {
        evt.target.closest('button')?.dataset.target === 'getintouch' && handleOpenForm(evt);
        evt.target.dataset.target === 'legal' && handleOpenLegal(evt);
    });
    // Make nav sticky when scrolling down
    document.addEventListener(
        'scroll',
        throttle(() => handleStickyNav(nav), 200)
    );
    // Make currently visible section in nav active
    document.addEventListener(
        'scroll',
        throttle(() => handleCurrentNavItem(sections, navItems), 35)
    );
    // Prevent scrolling when mobile nav modal is open
    navMain.addEventListener(
        'touchmove',
        evt => navIcon.classList.contains('nav__icon--close') && evt.preventDefault()
    );
    navMain.addEventListener('click', evt => handleNavClick.call(this, evt, navIcon));
    whatIDoSegmented && whatIDoUX && whatIDoCode && new SegmentedControl(whatIDoSegmented, whatIDoUX, whatIDoCode);
    whatIDoUXCards.forEach(card => new WhatIDoCard(card));
    whatIDoUX.addEventListener('click', handleOpenModal);
    whyICareItems.forEach(item => new WhyICareItem(item));
    // Load whereiam SVG from file since it is too big for inlining
    const whereIamImage = document.createElement('img');
    whereIamImage.setAttribute('src', wherIAmLE);
    whereIamImage.setAttribute('alt', 'Leipzig');
    whereIam.appendChild(whereIamImage);
});
