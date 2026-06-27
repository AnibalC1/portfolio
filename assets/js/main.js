/**
 * Anibal Cabral — Portfolio Site
 * Foundation: Bridgewell Standards (Vanilla JS, IIFE Pattern, No Global Pollution)
 * Enhancements: 2026 Trends (Motion-First UX, IntersectionObserver, RAF)
 */

(function () {
  'use strict';

  // ================================================================
  // Utilities
  // ================================================================

  const raf = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || function (callback) { setTimeout(callback, 16); };

  const debounce = (fn, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
  };

  const lerp = (start, end, factor) => start + (end - start) * factor;

  // ================================================================
  // Loading Animation
  // ================================================================

  const loader = document.querySelector('[data-loader]');

  const hideLoader = () => {
    if (loader) {
      loader.setAttribute('data-loaded', '');
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }
  };

  // Hide loader after page fully loaded
  if (document.readyState === 'complete') {
    hideLoader();
  } else {
    window.addEventListener('load', hideLoader);
  }

  // ================================================================
  // Header Scroll Behavior
  // ================================================================

  const header = document.querySelector('[data-header]');
  let lastScrollY = window.scrollY;
  let ticking = false;

  const updateHeader = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
      header?.setAttribute('data-scrolled', '');
    } else {
      header?.removeAttribute('data-scrolled');
    }

    // Hide header on scroll down, show on scroll up
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }

    lastScrollY = currentScrollY;
    ticking = false;
  };

  const handleScroll = () => {
    if (!ticking) {
      raf(updateHeader);
      ticking = true;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ================================================================
  // Mobile Navigation Toggle
  // ================================================================

  const navToggle = document.querySelector('[data-nav-toggle]');
  const navMenu = document.querySelector('[data-nav-menu]');

  navToggle?.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);

    if (!isExpanded) {
      navMenu?.setAttribute('data-expanded', '');
    } else {
      navMenu?.removeAttribute('data-expanded');
    }
  });

  // Close nav when clicking menu links
  navMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle?.setAttribute('aria-expanded', 'false');
      navMenu?.removeAttribute('data-expanded');
    });
  });

  // Close nav when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu?.hasAttribute('data-expanded') &&
        !navMenu?.contains(e.target) &&
        !navToggle?.contains(e.target)) {
      navToggle?.setAttribute('aria-expanded', 'false');
      navMenu?.removeAttribute('data-expanded');
    }
  });

  // ================================================================
  // Cursor Spotlight Effect
  // ================================================================

  const cursorSpot = document.querySelector('[data-cursor]');

  if (cursorSpot) {
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY + window.scrollY;
    }, { passive: true });

    const updateCursor = () => {
      cursorSpot.style.setProperty('--x', `${mouseX}px`);
      cursorSpot.style.setProperty('--y', `${mouseY}px`);
      raf(updateCursor);
    };

    updateCursor();
  }

  // ================================================================
  // Scroll Reveal Animations (IntersectionObserver)
  // ================================================================

  const revealElements = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-revealed', '');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -100px 0px' }
    );

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: reveal all immediately
    revealElements.forEach(el => el.setAttribute('data-revealed', ''));
  }

  // ================================================================
  // Counter Animations
  // ================================================================

  const counterElements = document.querySelectorAll('[data-counter]');

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuad = progress * (2 - progress);
      const current = Math.floor(easeOutQuad * target);

      el.textContent = current + suffix;

      if (progress < 1) {
        raf(updateCounter);
      } else {
        el.textContent = target + suffix;
      }
    };

    raf(updateCounter);
  };

  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counterElements.forEach(el => counterObserver.observe(el));
  }

  // ================================================================
  // Letter-by-Letter Animation
  // ================================================================

  const letterElements = document.querySelectorAll('[data-letters]');

  letterElements.forEach(el => {
    const lines = el.querySelectorAll('.ht-line');

    lines.forEach((line, lineIndex) => {
      const text = line.textContent;
      line.textContent = '';

      const chars = text.split('');
      chars.forEach((char, charIndex) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        span.style.transition = `opacity 0.3s ease ${(charIndex * 0.03)}s, transform 0.3s ease ${(charIndex * 0.03)}s`;
        line.appendChild(span);
      });
    });

    // Trigger animation when visible
    if ('IntersectionObserver' in window) {
      const letterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const lines = entry.target.querySelectorAll('.ht-line');
              lines.forEach(line => {
                line.querySelectorAll('span').forEach(span => {
                  span.style.opacity = '1';
                  span.style.transform = 'translateY(0)';
                });
              });
              letterObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );

      letterObserver.observe(el);
    } else {
      // Fallback: show immediately
      el.querySelectorAll('span').forEach(span => {
        span.style.opacity = '1';
        span.style.transform = 'translateY(0)';
      });
    }
  });

  // ================================================================
  // 3D Tilt Cards
  // ================================================================

  const tiltCards = document.querySelectorAll('[data-tilt]');

  tiltCards.forEach(card => {
    let bounds = card.getBoundingClientRect();

    const updateBounds = debounce(() => {
      bounds = card.getBoundingClientRect();
    }, 100);

    window.addEventListener('resize', updateBounds, { passive: true });

    card.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;

      const deltaX = (mouseX - centerX) / (bounds.width / 2);
      const deltaY = (mouseY - centerY) / (bounds.height / 2);

      const rotateX = deltaY * -10;
      const rotateY = deltaX * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ================================================================
  // Magnetic CTA Buttons
  // ================================================================

  const magneticElements = document.querySelectorAll('[data-magnetic]');

  magneticElements.forEach(el => {
    let bounds = el.getBoundingClientRect();

    const updateBounds = debounce(() => {
      bounds = el.getBoundingClientRect();
    }, 100);

    window.addEventListener('resize', updateBounds, { passive: true });

    el.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;

      const deltaX = (mouseX - centerX) * 0.3;
      const deltaY = (mouseY - centerY) * 0.3;

      el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    }, { passive: true });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });

  // ================================================================
  // Scroll Progress Bar
  // ================================================================

  const scrollProgress = document.querySelector('[data-scroll-progress]');

  if (scrollProgress) {
    let progressTicking = false;

    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = scrollHeight > 0 ? scrolled / scrollHeight : 0;

      scrollProgress.style.transform = `scaleX(${progress})`;
      progressTicking = false;
    };

    const handleProgressScroll = () => {
      if (!progressTicking) {
        raf(updateProgress);
        progressTicking = true;
      }
    };

    window.addEventListener('scroll', handleProgressScroll, { passive: true });
  }

  // ================================================================
  // Section Rail Navigation
  // ================================================================

  const rail = document.querySelector('[data-rail]');
  const railDots = document.querySelectorAll('[data-rail-dot]');

  if (rail && railDots.length > 0) {
    const sections = Array.from(railDots).map(dot => {
      const sectionId = dot.getAttribute('data-rail-dot');
      return document.getElementById(sectionId);
    }).filter(Boolean);

    if ('IntersectionObserver' in window) {
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const sectionId = entry.target.id;
              const activeDot = document.querySelector(`[data-rail-dot="${sectionId}"]`);

              railDots.forEach(dot => dot.removeAttribute('data-active'));
              activeDot?.setAttribute('data-active', '');
            }
          });
        },
        { threshold: 0.3 }
      );

      sections.forEach(section => sectionObserver.observe(section));
    }

    // Smooth scroll to sections
    railDots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = dot.getAttribute('data-rail-dot');
        const section = document.getElementById(sectionId);

        section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  // ================================================================
  // Form Validation (Contact Form)
  // ================================================================

  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());

      // Client-side validation (UX)
      const email = data.email;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      // Submit form (placeholder - implement actual backend endpoint)
      try {
        const response = await fetch('/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          alert('Message sent successfully! We'll get back to you soon.');
          contactForm.reset();
        } else {
          alert('Failed to send message. Please try again or email directly.');
        }
      } catch (error) {
        console.error('Form submission error:', error);
        alert('Failed to send message. Please try again or email directly.');
      }
    });
  }

  // ================================================================
  // Performance: Passive Event Listeners
  // ================================================================

  // All scroll and mouse events use { passive: true } for better scrolling performance
  // IntersectionObserver used instead of scroll events where possible
  // RequestAnimationFrame used for all animations

  // ================================================================
  // Reduced Motion Support
  // ================================================================

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Disable all non-essential animations
    document.querySelectorAll('[data-reveal]').forEach(el => {
      el.setAttribute('data-revealed', '');
    });
  }

})();
