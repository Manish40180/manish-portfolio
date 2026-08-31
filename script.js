/* =====================
   PRELOADER
===================== */
window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    preloader.classList.add('hide');
    setTimeout(() => {
      preloader.style.display = 'none';
      initAnimations();
    }, 600);
  }, 2000);
});

/* =====================
   THEME TOGGLE
===================== */
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
themeToggle.textContent = savedTheme === 'dark' ? '🌙' : '☀️';

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeToggle.textContent = next === 'dark' ? '🌙' : '☀️';
});

/* =====================
   MOBILE MENU
===================== */
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');

mobileMenuBtn.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  mobileMenuBtn.classList.toggle('open', isOpen);
  mobileNav.style.display = isOpen ? 'flex' : 'none';
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    mobileMenuBtn.classList.remove('open');
    mobileNav.style.display = 'none';
  });
});

/* =====================
   HEADER SCROLL EFFECT
===================== */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
});

/* =====================
   BACK TO TOP
===================== */
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* =====================
   TYPING ANIMATION
===================== */
const phrases = [
  'Full Stack Developer',
  'AI Enthusiast',
  'Freelancer',
  'Problem Solver',
  'KIIT Student'
];
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;
const typingEl = document.getElementById('typing');

function type() {
  const current = phrases[phraseIndex];
  if (deleting) {
    typingEl.textContent = current.substring(0, charIndex--);
  } else {
    typingEl.textContent = current.substring(0, charIndex++);
  }

  if (!deleting && charIndex === current.length + 1) {
    deleting = true;
    setTimeout(type, 1800);
    return;
  }

  if (deleting && charIndex === 0) {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }

  setTimeout(type, deleting ? 60 : 100);
}

setTimeout(type, 2500);

/* =====================
   SCROLL ANIMATIONS
===================== */
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.fade-up').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
    observer.observe(el);
  });
}

// Fallback: run without preloader delay too
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initAnimations, 2200);
});

/* =====================
   PROJECT MODAL
===================== */
const projectData = {
  finrobot: {
    num: '01',
    title: 'FinRobot',
    description: 'An AI-powered financial analysis platform that provides real-time stock market insights and automated trading recommendations using machine learning models.',
    tech: ['Python', 'TensorFlow', 'React', 'Node.js', 'REST API'],
    live: '#',
    github: '#'
  },
  portfolio: {
    num: '02',
    title: 'Portfolio Website',
    description: 'A modern, responsive developer portfolio built with HTML, CSS, and JavaScript featuring smooth animations, glassmorphism design, and a dark/light theme toggle.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'EmailJS'],
    live: '#',
    github: '#'
  },
  ecommerce: {
    num: '03',
    title: 'E-commerce Platform',
    description: 'A scalable online store with optimized performance, secure payment integration, dynamic product management, and a clean modern UI/UX experience.',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Express'],
    live: '#',
    github: '#'
  }
};

const modal = document.getElementById('project-modal');

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', (e) => {
    if (e.target.classList.contains('proj-link') || e.target.closest('.proj-link')) return;

    const key = card.dataset.project;
    const data = projectData[key];
    if (!data) return;

    document.getElementById('modal-num').textContent = `Project ${data.num}`;
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-description').textContent = data.description;
    document.getElementById('modal-tech').innerHTML = data.tech.map(t => `<span>${t}</span>`).join('');
    document.getElementById('modal-live').href = data.live;
    document.getElementById('modal-github').href = data.github;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

document.querySelector('.close-modal').addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

/* =====================
   ACTIVE NAV HIGHLIGHT
===================== */
const sections = document.querySelectorAll('section[id], .about-section[id]');
const navLinks = document.querySelectorAll('.nav-center a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--accent)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => sectionObserver.observe(sec));

/* =====================
   CONTACT FORM
===================== */
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const submitBtn = document.getElementById('submit-btn');
  const nameInput = this.user_name;
  const emailInput = this.user_email;
  const messageInput = this.message;

  // Clear errors
  ['name-error', 'email-error', 'message-error'].forEach(id => {
    document.getElementById(id).textContent = '';
  });

  let valid = true;

  if (nameInput.value.trim().length < 2) {
    document.getElementById('name-error').textContent = 'Name must be at least 2 characters.';
    valid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value)) {
    document.getElementById('email-error').textContent = 'Please enter a valid email address.';
    valid = false;
  }

  if (messageInput.value.trim().length < 10) {
    document.getElementById('message-error').textContent = 'Message must be at least 10 characters.';
    valid = false;
  }

  if (!valid) return;

  submitBtn.classList.add('loading');
  submitBtn.disabled = true;

  emailjs.sendForm("service_gkjcumd", "template_gwls43m", this).then(
    () => {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-text').textContent = '✓ Message Sent!';
      submitBtn.style.background = '#2ed573';
      document.getElementById("contactForm").reset();

      setTimeout(() => {
        submitBtn.querySelector('.btn-text').textContent = 'Send Message';
        submitBtn.style.background = '';
      }, 3500);
    },
    (error) => {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-text').textContent = '✕ Failed – Try Again';
      submitBtn.style.background = '#ff4757';
      console.error('EmailJS error:', error);

      setTimeout(() => {
        submitBtn.querySelector('.btn-text').textContent = 'Send Message';
        submitBtn.style.background = '';
      }, 3500);
    }
  );
});

/* =====================
   SMOOTH SCROLL NAV
===================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* =====================
   3D TILT CARDS
===================== */
document.querySelectorAll('[data-tilt], .skill-card, .project-card').forEach(card=>{
  card.addEventListener('pointermove',e=>{
    if(matchMedia('(pointer: coarse)').matches)return;
    const r=card.getBoundingClientRect(); const x=(e.clientX-r.left)/r.width-.5; const y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(900px) rotateX(${(-y*7).toFixed(2)}deg) rotateY(${(x*9).toFixed(2)}deg) translateZ(4px)`;
  });
  card.addEventListener('pointerleave',()=>card.style.transform='');
});

/* =====================
   PARTICLE CANVAS
===================== */
(()=>{const c=document.getElementById('particleCanvas'); if(!c)return; const ctx=c.getContext('2d'); let w,h,dots=[];
function resize(){w=c.width=c.offsetWidth*devicePixelRatio;h=c.height=c.offsetHeight*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);const n=Math.min(75,Math.floor(c.offsetWidth/18));dots=Array.from({length:n},()=>({x:Math.random()*c.offsetWidth,y:Math.random()*c.offsetHeight,vx:(Math.random()-.5)*.28,vy:(Math.random()-.5)*.28,r:Math.random()*1.8+.4}));}
function draw(){ctx.clearRect(0,0,c.offsetWidth,c.offsetHeight);for(let i=0;i<dots.length;i++){const a=dots[i];a.x+=a.vx;a.y+=a.vy;if(a.x<0||a.x>c.offsetWidth)a.vx*=-1;if(a.y<0||a.y>c.offsetHeight)a.vy*=-1;ctx.fillStyle='rgba(201,169,110,.65)';ctx.beginPath();ctx.arc(a.x,a.y,a.r,0,Math.PI*2);ctx.fill();for(let j=i+1;j<dots.length;j++){const b=dots[j],dx=a.x-b.x,dy=a.y-b.y,d=Math.hypot(dx,dy);if(d<105){ctx.strokeStyle=`rgba(124,92,255,${.14*(1-d/105)})`;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}}}requestAnimationFrame(draw)}resize();addEventListener('resize',resize);draw();})();
