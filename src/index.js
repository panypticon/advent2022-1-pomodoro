import Timer from './scripts/timer';

import '@/sass/index.scss';

document.addEventListener('DOMContentLoaded', () => {
    const baseElement = document.querySelector('#timer');
    baseElement && new Timer(baseElement);
});
