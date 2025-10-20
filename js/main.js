document.addEventListener('DOMContentLoaded', () => {
    // Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenuTop = document.querySelector('.nav-menu-top');

    if (navToggle && navMenuTop) {
        navToggle.addEventListener('click', () => {
            navMenuTop.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            const isClickInsideNav = navToggle.contains(event.target) || navMenuTop.contains(event.target);
            if (!isClickInsideNav && navMenuTop.classList.contains('active')) {
                navMenuTop.classList.remove('active');
            }
        });
    }

    // Fade In Animation
    const fadeInSections = document.querySelectorAll('.fade-in');
    const observerOptions = {
        root: null,
        threshold: 0.1,
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    fadeInSections.forEach(section => observer.observe(section));
});

// Slider for activities
(function() {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const sliderItems = document.querySelectorAll('.slider-item');
    const btnLeft = document.querySelector('.slider-btn-left');
    const btnRight = document.querySelector('.slider-btn-right');
    let current = 0;
    function showSlide(idx) {
        sliderItems.forEach((item, i) => {
            item.classList.toggle('active', i === idx);
        });
    }
    if (btnLeft && btnRight && sliderItems.length > 1) {
        btnLeft.addEventListener('click', () => {
            current = (current - 1 + sliderItems.length) % sliderItems.length;
            showSlide(current);
        });
        btnRight.addEventListener('click', () => {
            current = (current + 1) % sliderItems.length;
            showSlide(current);
        });
    }
})();

(function(){
	// Language toggle
	const btn = document.getElementById('lang-toggle');
	if(btn){
		const href = window.location.pathname;
		const isEN = href.includes('-en.html');
		const isZH = href.includes('-zh.html');
		if(isEN || isZH){
			const sibling = isEN ? href.replace('-en.html','-zh.html') : href.replace('-zh.html','-en.html');
			btn.setAttribute('aria-pressed', isEN ? 'false' : 'true');
			btn.addEventListener('click', function(){ window.location.pathname = sibling; });
		}
	}

	// Current page highlight
	var nav = document.querySelector('nav[aria-label="Primary"]');
	if(nav){
		var links = nav.querySelectorAll('a[href]');
		var path = window.location.pathname.split('/').pop();
		links.forEach(function(a){
			var href = a.getAttribute('href');
			if(href === path){ a.setAttribute('aria-current', 'page'); }
		});
	}

	// Mobile nav toggle
	var toggle = document.querySelector('.nav-toggle');
	if(toggle && nav){
		toggle.setAttribute('aria-expanded', 'false');
		toggle.addEventListener('click', function(){
			var open = nav.getAttribute('data-open') === 'true';
			nav.setAttribute('data-open', String(!open));
			toggle.setAttribute('aria-expanded', String(!open));
		});
	}

	// Lazy image loaded class for fade-in
	var lazyImages = document.querySelectorAll('img[loading="lazy"]');
	lazyImages.forEach(function(img){
		if(img.complete){ img.classList.add('loaded'); return; }
		img.addEventListener('load', function(){ img.classList.add('loaded'); });
	});

	// Simple carousel
	var carousel = document.querySelector('.carousel');
	if(carousel){
		var track = carousel.querySelector('.carousel-track');
		var slides = Array.prototype.slice.call(track.children);
		var index = 0; var timer = null; var intervalMs = 4000;
		function go(i){ index = (i + slides.length) % slides.length; track.style.transform = 'translateX(' + (-100*index) + '%)'; }
		function autoplay(){ stop(); timer = setInterval(function(){ go(index+1); }, intervalMs); }
		function stop(){ if(timer){ clearInterval(timer); timer = null; } }
		var prev = carousel.querySelector('.carousel-btn.prev');
		var next = carousel.querySelector('.carousel-btn.next');
		prev && prev.addEventListener('click', function(e){ e.preventDefault(); go(index-1); });
		next && next.addEventListener('click', function(e){ e.preventDefault(); go(index+1); });
		carousel.addEventListener('mouseenter', stop);
		carousel.addEventListener('mouseleave', autoplay);
		autoplay();
	}
})();

