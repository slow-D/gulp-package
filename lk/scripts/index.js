'use strict';

(function(d, w){
  
  w.addEventListener('load', () => {
    
    let headLk = d.querySelector('.head--lk'),
        tBold = d.querySelector('.t-bold'),
        gradientBlock = d.querySelector('.block-welcome__overlay'),
        html = document.querySelector('html'),
        // меню
        menuGamburger = d.querySelector('.mobile-menu-gamburg'),
        menuWrap = d.querySelector('.mobile-menu'),
        // табы в форме
        tabsItem = d.querySelectorAll('.tabs__item'),
        tabsContent = d.querySelectorAll('.tabs--content');
    
    let delayScroll = delay(noScroll, 150);
    
    // эффект появления заголовка, текста и градиента
    if (headLk) {
      headLk.classList.add('visible');
      tBold.classList.add('visible--text');
      gradientBlock.classList.add('visible--gradient');
    }
    
    // кнопка меню для моб версии
    if (menuGamburger) {
      menuGamburger.addEventListener('touchstart', function () {
        this.classList.toggle('mobile-menu-gamburg--close');
        menuWrap.classList.toggle('mobile-menu--animate');
        noScroll();
      });
    }
    
    let arrayTabsItem = Array.prototype.slice.call(tabsItem),
        arrayTabsContent = Array.prototype.slice.call(tabsContent);
    
    arrayTabsItem.forEach(function(element, i) {
      element.addEventListener('click', function (e) {
        e.preventDefault();
        arrayTabsItem.forEach(function (el, index) {
          el.classList.remove('active');
          arrayTabsContent[index].classList.remove('active');
        });
        this.classList.add('active');
        arrayTabsContent[arrayTabsItem.indexOf(this)].classList.add('active');
      });
    });
    
    
    
    openModal();
    closeModal();
    
    
    function noScroll () {
      let scrollWidth = w.innerWidth - html.clientWidth;
      html.classList.toggle('no-scroll');
      html.style.marginRight = scrollWidth + 'px';
    }
    
    function delay(f, ms) {
      return function() {
        setTimeout(() => f.apply(this, arguments), ms)
      }
    }
    
    function openModal() {
      let modalTrigger = document.querySelectorAll('.modal-trigger');
      
      modalTrigger.forEach(function(trigger) {
        trigger.addEventListener('click', function(event) {
                // remove "#" from #modal
          const target = this.getAttribute('href').substr(1),
                // use dynamic target to reference given modal
                modalWindow = document.getElementById(target);
          
          noScroll();
          
          if (modalWindow.classList) {
            modalWindow.classList.add('open');
          }

          event.preventDefault();
        });
      });
    }
    
    
    function closeModal() {
      let closeBtns = document.querySelectorAll('.modalLogin-close'),
          modalOverlays = document.querySelectorAll('.modalLogin-overlay');
      
      closeBtns.forEach(function(btn) {
        btn.addEventListener('click', function(event) {

          // target the whole modal
          const modalWindow = this.parentNode.parentNode;
          
          delayScroll();
          modalWindow.classList.remove('open');
        });
      });
      
      
      modalOverlays.forEach(function(overlay) {
        // get the whole modal using overlay argument
        const modalWindow = overlay.parentNode;

        // close modal if click event is fired on overlay background
        overlay.addEventListener('click', function() {
          delayScroll();
          modalWindow.classList.remove('open');
        });
      });
      
    }
    
    
  });
  
}(document, window));