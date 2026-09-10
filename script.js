// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  lastScrollY = window.scrollY;
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerHeight = header.offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Counter Animation
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      
      // Animate counters when stats section is visible
      if (entry.target.classList.contains('stats')) {
        const counters = entry.target.querySelectorAll('.stat-number');
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-count'));
          animateCounter(counter, target);
        });
      }
      
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.stats, .about, .core-values, .services, .industries, .process');
  animatedElements.forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });
});

// Service Modal Functionality
const modal = document.getElementById('modalOverlay');
const modalBody = document.querySelector('.modal-body');
const closeModal = document.querySelector('.close-modal');

const serviceDetails = {
  ut: {
    title: 'Ultrasonic Testing (UT)',
    content: `
      <div class="service-detail">
        <h3>Conventional Ultrasonic Testing</h3>
        <p>Our conventional ultrasonic testing services use high-frequency sound waves to detect internal flaws, measure wall thickness, and evaluate weld integrity in critical oil and gas components.</p>
        
        <h4>What We Inspect:</h4>
        <ul>
          <li>Pipeline girth welds and seam welds</li>
          <li>Pressure vessel welds and shell</li>
          <li>Storage tank floor and shell</li>
          <li>Structural steel welds</li>
          <li>Forgings and castings</li>
        </ul>
        
        <h4>Our Approach:</h4>
        <ul>
          <li>Straight beam & angle beam examination</li>
          <li>Compression wave & shear wave techniques</li>
          <li>Thickness measurement & corrosion mapping</li>
          <li>Code-compliant procedures (ASME, API, AWS)</li>
        </ul>
        
        <div class="cta-section">
          <p><strong>Need reliable ultrasonic testing for your assets?</strong></p>
          <a href="#contact" class="btn btn-primary">Request UT Inspection</a>
        </div>
      </div>
    `
  },
  rt: {
    title: 'Radiographic Testing (RT)',
    content: `
      <div class="service-detail">
        <h3>Conventional Radiographic Testing</h3>
        <p>Our conventional radiographic testing uses X-ray and gamma ray sources to produce images of internal structures, revealing defects such as porosity, slag, incomplete fusion, and cracks in welds and castings.</p>
        
        <h4>What We Inspect:</h4>
        <ul>
          <li>Butt welds and groove welds</li>
          <li>Pipeline girth welds</li>
          <li>Pressure vessel and boiler welds</li>
          <li>Castings and forgings</li>
          <li>Valves and fittings</li>
        </ul>
        
        <h4>Our Approach:</h4>
        <ul>
          <li>X-ray and Ir-192 / Se-75 gamma sources</li>
          <li>Film and computed radiography</li>
          <li>Image quality indicators (IQI) per code</li>
          <li>ASME Section V compliant procedures</li>
        </ul>
        
        <div class="cta-section">
          <p><strong>Need radiographic testing for your welds?</strong></p>
          <a href="#contact" class="btn btn-primary">Schedule RT Inspection</a>
        </div>
      </div>
    `
  },
  mt: {
    title: 'Magnetic Particle Testing (MT)',
    content: `
      <div class="service-detail">
        <h3>Magnetic Particle Inspection</h3>
        <p>Our magnetic particle testing detects surface and near-surface discontinuities in ferromagnetic materials, providing fast and reliable crack detection for welds, shafts, and structural steel components.</p>
        
        <h4>What We Inspect:</h4>
        <ul>
          <li>Weld toes and heat-affected zones</li>
          <li>Shafts and rotating equipment</li>
          <li>Structural steel connections</li>
          <li>Drill collar threads and connections</li>
          <li>Lifting lugs and pad eyes</li>
        </ul>
        
        <h4>Our Approach:</h4>
        <ul>
          <li>Wet visible & fluorescent magnetic particle</li>
          <li>Dry powder particle methods</li>
          <li>AC & DC yoke magnetization</li>
          <li>Prod and coil magnetization techniques</li>
        </ul>
        
        <div class="cta-section">
          <p><strong>Need surface crack detection on ferromagnetic materials?</strong></p>
          <a href="#contact" class="btn btn-primary">Request MT Inspection</a>
        </div>
      </div>
    `
  },
  pt: {
    title: 'Liquid Penetrant Testing (PT)',
    content: `
      <div class="service-detail">
        <h3>Liquid Penetrant Inspection</h3>
        <p>Our liquid penetrant testing detects surface-breaking discontinuities on both ferrous and non-ferrous materials, ideal for stainless steel welds, aluminum components, and castings where magnetic particle testing is not applicable.</p>
        
        <h4>What We Inspect:</h4>
        <ul>
          <li>Stainless steel welds and components</li>
          <li>Aluminum and non-ferrous materials</li>
          <li>Castings and forgings</li>
          <li>Pressure vessel nozzles and attachments</li>
          <li>Turbine blades and vanes</li>
        </ul>
        
        <h4>Our Approach:</h4>
        <ul>
          <li>Visible dye penetrant (Type II)</li>
          <li>Fluorescent penetrant (Type I)</li>
          <li>Water-washable & post-emulsifiable methods</li>
          <li>ASME Section V compliant procedures</li>
        </ul>
        
        <div class="cta-section">
          <p><strong>Need surface inspection on non-ferrous materials?</strong></p>
          <a href="#contact" class="btn btn-primary">Request PT Inspection</a>
        </div>
      </div>
    `
  },
  vt: {
    title: 'Visual Testing (VT)',
    content: `
      <div class="service-detail">
        <h3>Visual Inspection Services</h3>
        <p>Our visual testing services provide the first line of defense in non-destructive examination, identifying surface discontinuities, dimensional discrepancies, and obvious defects through direct and remote visual inspection techniques.</p>
        
        <h4>What We Inspect:</h4>
        <ul>
          <li>Weld appearance and profile</li>
          <li>Surface finish and condition</li>
          <li>Misalignment and dimensional verification</li>
          <li>Corrosion and erosion assessment</li>
          <li>Coating and lining condition</li>
        </ul>
        
        <h4>Our Approach:</h4>
        <ul>
          <li>Direct visual inspection</li>
          <li>Remote visual inspection (borescope)</li>
          <li>Weld gauges and measuring tools</li>
          <li>Certified welding inspectors (CWI)</li>
        </ul>
        
        <div class="cta-section">
          <p><strong>Need professional visual inspection?</strong></p>
          <a href="#contact" class="btn btn-primary">Request VT Inspection</a>
        </div>
      </div>
    `
  }
};

// Service modal handlers
document.querySelectorAll('.explore-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const service = e.target.getAttribute('data-service');
    const serviceData = serviceDetails[service];
    
    if (serviceData) {
      modalBody.innerHTML = serviceData.content;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});

// Close modal handlers
closeModal.addEventListener('click', () => {
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Escape key to close modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Form validation
function validateForm(form) {
  const requiredFields = form.querySelectorAll('[required]');
  let isValid = true;
  
  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      field.style.borderColor = 'var(--safety-orange)';
      isValid = false;
    } else {
      field.style.borderColor = 'var(--gray-200)';
    }
  });
  
  return isValid;
}

// Email validation
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroBackground = document.querySelector('.hero-background');
  
  if (heroBackground) {
    heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Loading animation for page
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Accessibility improvements
document.addEventListener('keydown', (e) => {
  // Skip to main content
  if (e.key === 'Tab' && e.target === document.body) {
    const mainContent = document.querySelector('main') || document.querySelector('.hero');
    if (mainContent) {
      mainContent.focus();
    }
  }
});

// Focus management for modal
modal.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }
});

// Error handling for images
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function() {
    this.style.display = 'none';
    console.warn('Failed to load image:', this.src);
  });
});

// Performance monitoring
if ('performance' in window) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType('navigation')[0];
      console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
    }, 0);
  });
}
