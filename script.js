// Automatically update the year in the footer
const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}


// Reveal sections when they enter the screen
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});


// Change the active sidebar link while scrolling
const sections = document.querySelectorAll("main section[id]");

const navigationLinks = document.querySelectorAll(
  '.sidebar-nav a[href^="#"]'
);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const sectionId = entry.target.getAttribute("id");

      navigationLinks.forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    });
  },
  {
    rootMargin: "-30% 0px -60% 0px"
  }
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});


// Mobile navigation
const menuButton = document.getElementById("menuButton");
const sidebar = document.getElementById("sidebar");

menuButton.addEventListener("click", () => {
  const isOpen = sidebar.classList.toggle("open");

  menuButton.setAttribute("aria-expanded", isOpen);

  menuButton.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});


// Close the mobile sidebar after selecting a section
navigationLinks.forEach((link) => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});


// Prevent unfinished placeholder links from jumping to the top
const placeholderLinks = document.querySelectorAll(".placeholder-link");

placeholderLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    if (link.getAttribute("href") === "#") {
      event.preventDefault();
    }
  });
});
