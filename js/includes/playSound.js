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


    let videoEl = document.querySelector('.video'),
	    btnPlay = document.querySelector('.play-sound');


	btnPlay.addEventListener('click', function() {
		this.classList.toggle('is-active');
	    videoEl.muted = videoEl.muted === true ? false : true;
	}, false);


	d.querySelector('.scroll-down').addEventListener('click', () => {
		scrollIt(
			document.querySelector('#calc'),
			300,
			'easeOutQuad',
			() => console.log(`Just finished scrolling to ${window.pageYOffset}px`)
		);
	});

	// let hiddenElement = document.getElementById("calc");
	// let btn = document.querySelector('.scroll-down');

	// function handleButtonClick() {
	//    hiddenElement.scrollIntoView({block: "center", behavior: "smooth"});
	// }

	// btn.addEventListener('click', handleButtonClick);
    
	var $siemaPagination,
		$paginationBTNS,
		currentSlideNum = d.querySelector('.slider-num--current');

	Siema.prototype.addPagination = function() {
		const dots = d.createElement('div');
		dots.classList.add('dots');
		this.selector.appendChild(dots);
		for (let i = 0; i < this.innerElements.length; i++) {
			const btn = d.createElement('div');
			btn.classList.add('dot');
			btn.addEventListener('click', () => this.goTo(i));
			dots.appendChild(btn);
		}
		$siemaPagination = d.querySelector('.dots');
		$paginationBTNS = $siemaPagination.querySelectorAll('.dot');
	}

    var mySiema = new Siema({
		selector: '.siema',
		duration: 500,
		easing: 'ease-out',
		perPage: 1,
		startIndex: 0,
		draggable: false,
		multipleDrag: true,
		threshold: 20,
		loop: true,
		rtl: false,
		onInit: function() {
			this.addPagination();
			printSlideIndex.call(this);
		},
		onChange: printSlideIndex,
	});

	var prev = d.querySelector('.siema-control--prev');
	var next = d.querySelector('.siema-control--next');

	prev.addEventListener('click', () => mySiema.prev(1));
	next.addEventListener('click', () => mySiema.next(1));
    
    function printSlideIndex() {
	  const SIEMA_CURRENT = this.currentSlide;
	  currentSlideNum ? currentSlideNum.innerHTML = SIEMA_CURRENT + 1 : currentSlideNum;
	  let paginationBTNS = Array.prototype.slice.call($paginationBTNS)
	  paginationBTNS
	    .forEach(btn => {
	      btn.classList.remove('is-active');
	    });
	  paginationBTNS[SIEMA_CURRENT].classList.add('is-active');

	  this.innerElements.forEach((slide, i) => {
	    const addOrRemove = i === this.currentSlide ? 'add' : 'remove';
	    this.innerElements[i].classList[addOrRemove]('show');
	  });
	}


	setInterval(() => mySiema.next(), 10000);




	var itemArea = d.querySelectorAll('.area-item');
	var currentSlide = 0;
	var SPEED = 1500;
	var slideInterval = setInterval(randomArea, SPEED);

	function randomArea() {
		itemArea[currentSlide].classList.remove('is-active');
		// currentSlide = (currentSlide + 1) % itemArea.length;
		currentSlide = Math.floor( Math.random() * itemArea.length )
		itemArea[currentSlide].classList.add('is-active');
	}


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