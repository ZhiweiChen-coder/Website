/**
 * Elegant Scroll Reveal Animation
 * 优雅的滚动渐显动画
 * 
 * Usage:
 * - Add class "reveal" to any element for fade-up + blur effect
 * - Add class "reveal-stagger" to container for staggered children animation
 * - Add class "reveal-left" for fade-in from left
 * - Add class "reveal-right" for fade-in from right
 * - Add class "reveal-scale" for scale + blur effect
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    // Trigger animation when element is X% visible
    threshold: 0.15,
    // Root margin (trigger slightly before element enters viewport)
    rootMargin: '0px 0px -50px 0px',
    // Animation will only trigger once
    triggerOnce: true
  };

  // Check if reduced motion is preferred
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Skip animations if user prefers reduced motion
    return;
  }

  // Create Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add revealed class to trigger animation
        entry.target.classList.add('revealed');
        
        // Stop observing if triggerOnce is enabled
        if (CONFIG.triggerOnce) {
          observer.unobserve(entry.target);
        }
      } else if (!CONFIG.triggerOnce) {
        // Remove revealed class if element leaves viewport (only if triggerOnce is false)
        entry.target.classList.remove('revealed');
      }
    });
  }, {
    threshold: CONFIG.threshold,
    rootMargin: CONFIG.rootMargin
  });

  // Initialize on DOM ready
  function init() {
    // Find all elements with reveal classes
    const revealElements = document.querySelectorAll(
      '.reveal, .reveal-stagger, .reveal-left, .reveal-right, .reveal-scale'
    );

    // Observe each element
    revealElements.forEach(element => {
      observer.observe(element);
    });

    // Log initialization (can be removed in production)
    if (revealElements.length > 0) {
      console.log(`🎭 Scroll reveal initialized for ${revealElements.length} elements`);
    }
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Add header scroll effect
  function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll(); // Initial check

  // Expose reveal method for dynamically added content
  window.revealObserver = {
    observe: (element) => observer.observe(element),
    unobserve: (element) => observer.unobserve(element),
    refresh: () => {
      observer.disconnect();
      init();
    }
  };

})();

