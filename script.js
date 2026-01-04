// Preloader
window.addEventListener("load",function(){
  document.querySelector(".preloader").classList.add("opacity-0");
  setTimeout(function(){
    document.querySelector(".preloader").style.display="none";
  },1000)
})

// Scroll Animations using Intersection Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -30px 0px'
};

const scrollObserver = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      // Keep observing for section changes
    } else {
      // Reset animation when element leaves viewport (for section switching)
      entry.target.classList.remove('animated');
    }
  });
}, observerOptions);

// Function to initialize scroll animations for a section
function initScrollAnimations(section) {
  if (!section) return;
  
  // Reset all animations first
  const allAnimateElements = section.querySelectorAll('.scroll-animate, .scroll-animate-scale, .scroll-animate-left, .scroll-animate-right');
  allAnimateElements.forEach(el => {
    el.classList.remove('animated');
  });
  
  // Section titles
  const sectionTitles = section.querySelectorAll('.section-title');
  sectionTitles.forEach(el => {
    if (!el.classList.contains('scroll-animate')) {
      el.classList.add('scroll-animate');
    }
    scrollObserver.observe(el);
  });
  
  // Project items with staggered delays
  const projectItems = section.querySelectorAll('.project-item');
  projectItems.forEach((el, index) => {
    if (!el.classList.contains('scroll-animate')) {
      el.classList.add('scroll-animate');
      const delay = (index % 3);
      if (delay > 0) {
        el.classList.add(`scroll-animate-delay-${delay}`);
      }
    }
    scrollObserver.observe(el);
  });
  
  // Timeline items
  const timelineItems = section.querySelectorAll('.timeline-item');
  timelineItems.forEach((el, index) => {
    if (!el.classList.contains('scroll-animate')) {
      el.classList.add('scroll-animate');
      const delay = Math.min(index, 3);
      if (delay > 0) {
        el.classList.add(`scroll-animate-delay-${delay}`);
      }
    }
    scrollObserver.observe(el);
  });
  
  // Skill items
  const skillItems = section.querySelectorAll('.skill-item');
  skillItems.forEach((el, index) => {
    if (!el.classList.contains('scroll-animate')) {
      el.classList.add('scroll-animate');
      const delay = Math.min(index % 3, 3);
      if (delay > 0) {
        el.classList.add(`scroll-animate-delay-${delay}`);
      }
    }
    scrollObserver.observe(el);
  });
  
  // Contact info items
  const contactItems = section.querySelectorAll('.contact-info-item');
  contactItems.forEach((el, index) => {
    if (!el.classList.contains('scroll-animate')) {
      el.classList.add('scroll-animate');
      if (index > 0) {
        el.classList.add(`scroll-animate-delay-${Math.min(index, 3)}`);
      }
    }
    scrollObserver.observe(el);
  });
  
  // Impact metrics with scale animation
  const impactItems = section.querySelectorAll('#impact .info-item');
  impactItems.forEach((el, index) => {
    if (!el.classList.contains('scroll-animate-scale')) {
      el.classList.add('scroll-animate-scale');
      const delay = Math.min(index % 2, 3);
      if (delay > 0) {
        el.classList.add(`scroll-animate-delay-${delay}`);
      }
    }
    scrollObserver.observe(el);
  });
  
  // About text
  const aboutTexts = section.querySelectorAll('.about-text');
  aboutTexts.forEach(el => {
    if (!el.classList.contains('scroll-animate')) {
      el.classList.add('scroll-animate');
    }
    scrollObserver.observe(el);
  });
}

// Initialize scroll animations when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize for all sections
  const allSections = document.querySelectorAll('.section');
  allSections.forEach(section => {
    if (!section.id || section.id !== 'home') {
      initScrollAnimations(section);
    }
  });
  
});
// Aside Navbar
const nav=document.querySelector(".nav"),
navList=nav.querySelectorAll("li"),
totalNavList=navList.length,
allSection=document.querySelectorAll(".section"),
totalSection=allSection.length;
for(let i=0;i<totalNavList;i++){
  const a=navList[i].querySelector("a");
  a.addEventListener("click",function(){
    for(let i=0;i<totalSection;i++){
      allSection[i].classList.remove("back-section");
    }
    for(let j=0; j<totalNavList;j++){
      if(navList[j].querySelector("a").classList.contains("active")){
        allSection[j].classList.add("back-section")
      }
      navList[j].querySelector("a").classList.remove("active");
    }
    this.classList.add("active");
    showSection(this);
    if(window.innerWidth<1200){
      asideSectionTogglerBtn();
    }
  })
}
function showSection(element){
  for(let i=0;i<totalSection;i++){
    allSection[i].classList.remove("active");
  }
  const target=element.getAttribute("href").split("#")[1];
  const activeSection = document.querySelector("#"+target);
  if(activeSection) {
    activeSection.classList.add("active");
    // Initialize scroll animations for the active section
    if(target !== 'home') {
      setTimeout(() => {
        initScrollAnimations(activeSection);
      }, 100);
    }
  }
}
const navTogglerBtn=document.querySelector(".nav-toggler"),
aside=document.querySelector(".aside");
navTogglerBtn.addEventListener("click",()=>{
  asideSectionTogglerBtn();
})
function asideSectionTogglerBtn(){
  aside.classList.toggle("open")
  navTogglerBtn.classList.toggle("open");
  for(let i=0;i<totalSection;i++){
    allSection[i].classList.toggle("open");
  }
}
