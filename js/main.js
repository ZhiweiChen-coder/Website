document.addEventListener('DOMContentLoaded', () => {
    // Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.header nav');

    console.log('Nav toggle found:', navToggle);
    console.log('Nav menu found:', navMenu);
    
    // 确保移动端导航默认关闭
    if (navMenu) {
        navMenu.setAttribute('data-open', 'false');
        navMenu.style.display = 'none'; // 确保默认隐藏
    }
    
    if (navToggle) {
        navToggle.setAttribute('aria-expanded', 'false');
    }

    if (navToggle && navMenu) {
        console.log('Adding click listener to nav toggle');
        console.log('Initial data-open:', navMenu.getAttribute('data-open'));
        
        // Monitor attribute changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-open') {
                    console.log('⚠️ data-open changed to:', navMenu.getAttribute('data-open'));
                    console.trace('Changed by:');
                }
            });
        });
        observer.observe(navMenu, { attributes: true });
        
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            console.log('=== Nav toggle clicked ===');
            const currentState = navMenu.getAttribute('data-open');
            console.log('Before toggle - data-open:', currentState);
            
            // Toggle the state
            if (currentState === 'true') {
                navMenu.setAttribute('data-open', 'false');
                navToggle.setAttribute('aria-expanded', 'false');
                console.log('Set to: false');
            } else {
                navMenu.setAttribute('data-open', 'true');
                navToggle.setAttribute('aria-expanded', 'true');
                console.log('Set to: true');
            }
            
            // Verify the change
            setTimeout(() => {
                const newState = navMenu.getAttribute('data-open');
                console.log('After toggle - data-open:', newState);
                if (newState === currentState) {
                    console.error('❌ State did not change! Something is resetting it.');
                } else {
                    console.log('✅ State changed successfully');
                }
            }, 10);
        });

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            const isClickInsideNav = navToggle.contains(event.target) || navMenu.contains(event.target);
            if (!isClickInsideNav && navMenu.getAttribute('data-open') === 'true') {
                console.log('Closing menu from outside click');
                navMenu.setAttribute('data-open', 'false');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    } else {
        console.error('Navigation elements not found!');
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

	// Mobile nav toggle - REMOVED (handled at top of file)

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

// 添加卡片点击反馈效果
document.addEventListener('click', (e) => {
    const card = e.target.closest('.card, .event-card');
    if (card) {
        // 添加点击反馈类
        card.classList.add('clicked');
        
        // 移除点击反馈类
        setTimeout(() => {
            card.classList.remove('clicked');
        }, 150);
    }
});

