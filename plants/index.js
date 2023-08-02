console.log('Вёрстка соответствует макету. Ширина экрана 768px +24\n' + 
    'блок <header> +2\n' + 
    'секция welcome +3\n' + 
    'секция about +4\n' + 
    'секция service +4\n' + 
    'секция prices +4\n' + 
    'секция contacts +4\n' + 
    'блок <footer> + 3\n' + 
    'Вёрстка соответствует макету. Ширина экрана 380px +24\n' + 
    'блок <header> +2\n' + 
    'секция welcome +3\n' + 
    'секция about +4\n' + 
    'секция service +4\n' + 
    'секция prices +4\n' + 
    'секция contacts +4\n' + 
    'блок <footer> + 3\n' + 
    'Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15\n' + 
    'нет полосы прокрутки при ширине страницы от 1440рх до 380px +7\n' + 
    'нет полосы прокрутки при ширине страницы от 380px до 320рх +8\n' + 
    'На ширине экрана 380рх и меньше реализовано адаптивное меню +22\n' + 
    'при ширине страницы 380рх панель навигации скрывается, появляется бургер-иконка +2\n' + 
    'при нажатии на бургер-иконку плавно появляется адаптивное меню +4\n' + 
    'адаптивное меню соответствует цветовой схеме макета +4\n' + 
    'при нажатии на крестик адаптивное меню плавно скрывается уезжая за экран +4\n' + 
    'ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям +4\n' + 
    'при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, также скрытие меню происходит если сделать клик вне данного окна +4');


import CITIES from './assets/cities.js';
/* ----------------     burger-menu ---------------------------------------- */
    const burgerBtn = document.querySelector('.burger');
    const background = document.querySelector('.under');
    const menu = document.querySelector('.menu');
    const nav = document.querySelector('nav');
    const burgerLines = document.querySelectorAll('.burger__item');
    const links = document.querySelectorAll('.menu__link');


function openMenu() {
        console.log('open menu');
        background.classList.toggle('background');
        menu.classList.toggle('mobileMenu');
        nav.classList.toggle('mobileMenu-nav');
    }


    burgerBtn.addEventListener('click', openMenu);
    background.addEventListener('click', openMenu);
    links.forEach(link => link.addEventListener('click', openMenu));


    /* -----------------------  BLUR OF CARDS  ------------------------- */

    const cards = document.querySelectorAll('.cards__item');
    const buttonsForCards = document.querySelectorAll('.buttons__item ');
    let activeButtons = []; //HTML-elements active buttons
    let activeCards = []; // datasets of active cards

    buttonsForCards.forEach(button => button.addEventListener('click', selectCards));

    function addClasses(activeBtnsArray, activeCardsArray) {
        buttonsForCards.forEach(button => button.classList.remove('active-btn'));
        activeBtnsArray.forEach(btn => btn.classList.add('active-btn'));
        cards.forEach(card => {
            card.classList.add('blur');

                if(card.dataset.card === activeCardsArray[0] ||
                    card.dataset.card === activeCardsArray[1])
                    card.classList.remove('blur');
        });
    }

    function addCards(dataset){
        activeButtons.push(document.querySelector(`[data-btn=${dataset}]`));
    }

    function selectCards(event) {
        const buttonData = event.target.dataset.btn;
        if(activeButtons.includes(event.target)) {
            activeButtons = activeButtons.filter(btn => btn.dataset.btn !== buttonData);
            activeCards = activeCards.filter(card => card !== buttonData);
        } else {
            if(activeButtons.length === 2){
                let cardToDelete = activeButtons.shift();
                activeCards = activeCards.filter(card => card !== cardToDelete.dataset.btn);
                addCards(buttonData);
                activeCards.push(buttonData);
            } else {
                addCards(buttonData);
                activeCards.push(buttonData);
            }
        }
            addClasses(activeButtons, activeCards);
    }

    /*------------------------   PRICES DROP LISTS   --------------------------*/

    const priceSwitcher = document.querySelector('.price__switcher');
    const allPriceCards = document.querySelectorAll('.price__rate');
    const allTextBlocks = document.querySelectorAll('.more');

    priceSwitcher.addEventListener('click', function(event) {
        console.log([...event.target.classList].includes('more__btn'));
        if(event.target.closest('.price__rate')){
           console.log(' i m here') 
            allPriceCards.forEach(card => {
                if((![...event.target.classList].includes('more__btn')) && card.dataset.price === event.target.closest('.price__rate').dataset.price) {
                    card.classList.toggle('price__active');
                    card.children[1].classList.toggle('visible');
                } else {
                    if(![...event.target.classList].includes('more__btn')) {
                        card.classList.remove('price__active');
                        card.children[1].classList.remove('visible');   
                    }               
                }
            })           
        } 
        const isPriceSwitcherReduced = [...allPriceCards]
                            .map(el => [...el.classList].includes('price__active'))
                            .every(el => el === false);

        if(isPriceSwitcherReduced) {
            priceSwitcher?.classList.remove('active-price');
        } else {
            if(![...priceSwitcher?.classList].includes('active-price')) {
                priceSwitcher?.classList.add('active-price');
            } 
        }
        
    })


/*------------------------   CITIES DROP LIST   --------------------------*/

const linesBox = document.querySelector('.cities__items');
const droplistWrapper = document.querySelector('.contacts__wrapper');
const defaultCity = document.querySelector('.default-city');
let iscityMenuOpen = false;
const citiesIndexes = CITIES.map(city => city['city'].toLowerCase());
let allCitiBlocks = [];
let selectedCity; //HTML Element
let selectedBlock; // HTML Element


linesBox?.addEventListener('click', function(event){
    const whichWasClicked = event.target.dataset.city;
    const defaultCity = document.querySelector('.default-city');
    
    if(iscityMenuOpen){
        linesBox.classList.remove('active-cities');
        iscityMenuOpen = false;
        const lines = linesBox.querySelectorAll('.cities__item');
        selectedCity = document.querySelector('.selected-city');

        if (whichWasClicked === 'city') {
            lines.forEach(line => {
                if(line.dataset.city !== 'city') line.remove()
            });
            allCitiBlocks.forEach(block => block.classList.add('invisible'));

        } else if (selectedCity.dataset.city !== whichWasClicked) {
            selectedCity.classList.remove('selected-city');
            document.querySelector(`[data-city=${whichWasClicked}]`)?.classList.add('selected-city');
            selectedCity = whichWasClicked;
            defaultCity?.classList.add('invisible');
            allCitiBlocks.forEach(block => {

                if (block.dataset.city === whichWasClicked) {
                    block.classList.remove('invisible');
                    selectedBlock = block;
                }
            });
        };

        if (whichWasClicked !== 'city') {
            lines.forEach(line => {

                if([...line.classList].includes('selected-city')) {                
                    defaultCity?.classList.add('invisible');
                    selectedBlock.classList.remove('invisible');
                    
                } else if (![...line.classList].includes('default-city')) {
                    line.remove();
                }
            });
        }        

    } else {
        linesBox.classList.add('active-cities');
        iscityMenuOpen = true;
        defaultCity?.classList.remove('invisible');
        if(selectedBlock) selectedBlock.classList.add('invisible');
        CITIES.forEach(city => {
            if(!city['html']) {
                let cityNameHTMLElement = document.createElement('div');
                cityNameHTMLElement.innerText = city['city'];
                cityNameHTMLElement.classList.add('cities__item', 'opened-cities');
                cityNameHTMLElement.dataset.city = city['city'].toLowerCase();
                city['html'] = cityNameHTMLElement;
                linesBox.appendChild(cityNameHTMLElement);

                let cityCardHTMLElement = document.createElement('div');
                cityCardHTMLElement.classList.add('city-block', 'invisible');
                cityCardHTMLElement.dataset.city = city['city'].toLowerCase();

                let dataWrapper = document.createElement('div');
                dataWrapper.classList.add('block');

                let nameColumn = document.createElement('div');
                nameColumn.classList.add('block__name');

                let valueColumn = document.createElement('div');
                valueColumn.classList.add('block__value');

                let nameCity = document.createElement('div');
                nameCity.innerHTML = `City: `;

                let nameTel = document.createElement('div');
                nameTel.innerHTML = `Phone: `;

                let nameAdress = document.createElement('div');
                nameAdress.innerHTML = `Office adress: `;

                nameColumn.appendChild(nameCity);
                nameColumn.appendChild(nameTel);
                nameColumn.appendChild(nameAdress);

                let valueCity = document.createElement('div');
                valueCity.innerHTML = `${city['city']}`;

                let valueTel = document.createElement('div');
                valueTel.innerHTML = `${city['phone']}`;

                let valueAdress = document.createElement('div');
                valueAdress.innerHTML = `${city['adress']}`;

                valueColumn.appendChild(valueCity);
                valueColumn.appendChild(valueTel);
                valueColumn.appendChild(valueAdress);

                let cityBtn = document.createElement('a');
                cityBtn.setAttribute('href', `tel:${city['phone']}`)
                cityBtn.classList.add('city-block__btn');
                cityBtn.innerText = 'Call us';
                dataWrapper.appendChild(nameColumn);
                dataWrapper.appendChild(valueColumn);
                cityCardHTMLElement.appendChild(dataWrapper);
                cityCardHTMLElement.appendChild(cityBtn);
                city['card'] = cityCardHTMLElement;
                droplistWrapper?.appendChild(cityCardHTMLElement);
                allCitiBlocks = document.querySelectorAll('.city-block');
            } else {
                linesBox.appendChild(city['html']);
            }
        });
    }
})