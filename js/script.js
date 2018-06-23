'use strict';
document.addEventListener('DOMContentLoaded', function(event) { //document ready
//global variables
//js check function
let jsNoJsCollection = document.getElementsByClassName('no-js'),
    jsNoJs = jsNoJsCollection[0],
//loading-logo animation
    loadS = document.getElementsByClassName('jsLoadStart'),
    loadStart = loadS[0],
    loadL = document.getElementsByClassName('jsLoadLogo'),
    loadLogo = loadL[0],
    loadSi = document.getElementsByClassName('jsLoadSidebar'),
    loadSidebar = loadSi[0],
    logoAnimMZ = document.getElementsByClassName('jsLogoAnim-mz'),
    logoAnimAB = document.getElementsByClassName('jsLogoAnim-ab'),
//menuNames function
    menu = document.getElementsByClassName('jsNavigation'),
    menuBar = menu[0],
    slidingNames = document.getElementsByClassName('jsSlidingName'),
//burger menu function
    burgerButtons = document.getElementsByClassName('jsBurger'),
    burgerButton = burgerButtons[0],
    burgerIcons = document.getElementsByClassName('jsBurgerIcon'),
    burgerIcon = burgerIcons[0],
    crossIcons = document.getElementsByClassName('jsCrossIcon'),
    crossIcon = crossIcons[0],
//scrolling functions
    windowHeight = windowHeightCheck(),
    windowWidth = windowWidthCheck(),
    latestKnownScrollY,
    scrollyVh,
    ticking = false,
    toggleHeader = false,
    toggleChart = false,
    
    bgOpacityElmts = document.getElementsByClassName('jsBgOpacity'),
    bgOpacityElmt = bgOpacityElmts[0],
    showHideElmts = document.getElementsByClassName('jsShowHideOnScroll'),
    
    aboutElmts = document.getElementsByClassName('jsParallaxAbout'),
    skillsElmts = document.getElementsByClassName('jsParallaxSkills'),
    projectsElmts = document.getElementsByClassName('jsParallaxProjects'),
    contactElmts = document.getElementsByClassName('jsParallaxContact'),

    yAbout, yAboutNotRounded, elmtOpacity, elmtOp, ySkills, ySkillsNotRounded;
    
const yStartAbout = [-140,-110,-130,-100],
      yStartChart = [-130,-100,-120,-125,-130,-105,-120,-115,-130],
      yStartProjects = [-120,-140,-110],
      yStartContacts = [-150,-80];

//init
(function init() {
    
    jsCheck();
    menuNames();
    menuShowHide();
    
    window.addEventListener('load', function(event) {
        fireUpAnimation();
     });
    
    window.addEventListener('scroll', function(event){
        parallaxEffects(1085);
    });
    
    window.addEventListener('resize', function(event) {
        winSizeAfterResize();
    });
    
})()//end init
    
//definitions
function jsCheck() {
    jsNoJs.classList.add('js');
    jsNoJs.classList.remove('no-js');
}
function winSizeAfterResize(){
    clearTimeout(window.resizedFinished);
    window.resizedFinished = setTimeout(function(){
        windowHeight = windowHeightCheck();
        windowWidth = windowWidthCheck();
    }, 250);
}    
function windowHeightCheck(){
    let windowHeight = window.innerHeight;
    return windowHeight;
}
function windowWidthCheck(){
    let windowWidth = window.innerWidth;
    return windowWidth;
}
function fireUpAnimation(){
    setTimeout(function() {
        window.scrollTo(0, 0);
        logoAnimation();
    },1);
}
function logoAnimation(){
    for(let i = 0; i < logoAnimAB.length; i++){
        logoAnimAB[i].classList.add('jsLogoAnim-ab--active');
    }
    for(let i = 0; i < logoAnimMZ.length; i++){
        logoAnimMZ[i].classList.add('jsLogoAnim-mz--active');
    }
    setTimeout(function() { loadingShow(); }, 2000);
}
function loadingShow(){
    loadStart.classList.add('jsLoadStart--load');
    loadSidebar.classList.add('jsLoadSidebar--load');
    loadLogo.classList.add('jsLoadLogo--load');
    bgOpacityElmt.classList.add('jsBgOpacity--load');
}
function menuShowHide(){
    let isClicked = false;
    burgerButton.addEventListener('click', function(){
        if(isClicked === false){
            isClicked = true;
            menuBar.classList.add('jsNavigation--open');
            burgerIcon.classList.add('jsBurgerIcon--open');
            crossIcon.classList.add('jsCrossIcon--open');
        } else {
            isClicked = false;
            menuBar.classList.remove('jsNavigation--open');
            crossIcon.classList.remove('jsCrossIcon--open');
            burgerIcon.classList.remove('jsBurgerIcon--open');
        }
    })
}
function menuNames(){
    
    menuBar.addEventListener('mouseenter', menuMouseEnter);
    menuBar.addEventListener('mouseleave', menuMouseLeave);
    
    function menuMouseEnter(){
        for(let i = 0; i < slidingNames.length; i++){
            let slidingName = slidingNames[i];
            slidingName.classList.add('jsSlidingName--active');
        }
    }
    function menuMouseLeave(){
        for(let i = 0; i < slidingNames.length; i++){
            let slidingName = slidingNames[i];
            slidingName.classList.remove('jsSlidingName--active');
        }
    }   
}//end f menuNames

function parallaxEffects(){
//    let windowWidth = windowWidthCheck();
//    if(windowWidth > minWinWidth){
        latestKnownScrollY = window.scrollY;
        requestTick();
//    }
}//end f onScroll
    
function requestTick(){
    if(!ticking) {
        requestAnimationFrame(updateElmts);
    }
    ticking = true;
}//end f requestTick

function updateElmts() {
    ticking = false;
    let currentScrollY = latestKnownScrollY,
        scrollyVhNotRounded = (currentScrollY * 100) / windowHeight;
    
    scrollyVh = Math.round(scrollyVhNotRounded);
      
    setAttOnScroll(aboutElmts, yStartAbout, 0, 90, -100);
    setAttOnScroll(skillsElmts, yStartChart, 100, 180, -90);
    setAttOnScroll(projectsElmts, yStartProjects, 220, 280, -150);
    setAttOnScroll(contactElmts, yStartContacts, 290, 380, -250);
    
    if(scrollyVh >= 75 && toggleHeader === false){
        toggleHeader = true;
        for(let i = 0; i < showHideElmts.length; i++){
            let headerElmt = showHideElmts[i];
            headerElmt.classList.add('jsShowHideOnScroll--active');
        }
    } else if(scrollyVh < 75 && toggleHeader === true){
        toggleHeader = false;
        for(let i = 0; i < showHideElmts.length; i++){
            let headerElmt = showHideElmts[i];
            headerElmt.classList.remove('jsShowHideOnScroll--active');
        }
    } else if(scrollyVh >= 180 && toggleChart === false){
        toggleChart = true;
        for(let i = 0; i < skillsElmts.length; i++){
            let skillsElmt = skillsElmts[i];
            skillsElmt.classList.add('jsBarsAnim');
        }
    } else if(scrollyVh < 180 && toggleChart === true){
        toggleChart = false;
        for(let i = 0; i < skillsElmts.length; i++){
            let skillsElmt = skillsElmts[i];
            skillsElmt.classList.remove('jsBarsAnim');
        }
    }
    
//    addClassOnScroll(showHideElmts,'jsShowHideOnScroll--visible', 75, isHeaderElmtsVisible);
//    addClassOnScroll(skillsElmts,'jsBarsAnim', 180, isChartAnimated);
//    setNewBg(0.25);
          
}//end updateEltm
//kolekcja elementów do przesunięcia, początkowa pozycja Y, numer sekcji, rozpoczęcie animacji, koniec animacji

function setAttOnScroll(elements, yPoStart, sY, eY, minValue) {    
    let yPosNotRounded, yPos, elmtOpacity;
    for(let i = 0; i < elements.length; i++){
        
        yPosNotRounded = (yPoStart[i]*(scrollyVh-eY))/(sY-eY);
        yPos = Math.round(yPosNotRounded);
        
//        console.log('scrolly: '+scrollyVh);
        
        if(yPos < minValue){
            yPos = minValue;
        } else if(yPos > 0) {
            yPos = 0;
        }
        
        elmtOpacity = -(yPos/minValue)+1;
         
        if(elmtOpacity < 0){
            elmtOpacity = 0;
        } else if(elmtOpacity > 1){
            elmtOpacity = 1;
        }
        
        let element = elements[i];
        
        element.setAttribute('style','transform: translate3d(0,' + yPos + '%, 0); opacity: '+ elmtOpacity +';');
    }
}
//function setNewBg(maxOpacity){
//    let bgOpacity = scrollyVh/100;
//    if(bgOpacity > maxOpacity){
//        bgOpacity = maxOpacity;
//    }
//    bgOpacityElmt.setAttribute('style', 'opacity: '+ bgOpacity +';');
//}
});//end document ready