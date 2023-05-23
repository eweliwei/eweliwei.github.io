(function () {
  "use strict";

  // Selector helper function
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  // Event listener function
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  // Scrolls to an element with header offset
  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }


  // Mobile Navigation
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  // Scroll with offset on links with a class name .scrollto
  on('click', '#navbar .nav-link', function (e) {
    let section = select(this.hash)
    if (section) {
      e.preventDefault()

      let navbar = select('#navbar')
      let header = select('#header')
      let sections = select('section', true)
      let navlinks = select('#navbar .nav-link', true)
      let footer = document.querySelector('footer');

      navlinks.forEach((item) => {
        item.classList.remove('active')
      })

      this.classList.add('active')


      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }

      if (this.hash == '#header') {
        header.classList.remove('header-top')
        sections.forEach((item) => {
          item.classList.remove('section-show')
          footer.style.opacity = 1;
        })

        return;
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top')
        setTimeout(function () {
          sections.forEach((item) => {
            item.classList.remove('section-show')
          })
          section.classList.add('section-show')
          footer.style.opacity = 0;

        }, 350);
      } else {
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        section.classList.add('section-show')
        footer.style.opacity = 0;
      }

      scrollto(this.hash)
    }
  }, true)


  // Show sections
  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash)

      if (initial_nav) {
        let header = select('#header')
        let navlinks = select('#navbar .nav-link', true)

        header.classList.add('header-top')

        navlinks.forEach((item) => {
          if (item.getAttribute('href') == window.location.hash) {
            item.classList.add('active')
          } else {
            item.classList.remove('active')
          }
        })

        setTimeout(function () {
          initial_nav.classList.add('section-show')
        }, 350);

        scrollto(window.location.hash)
      }
    }
  });

  // Progress bars animation
  let skilsContent = select('.languages-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  // Show or hide the back to top button
  window.addEventListener("scroll", toggleBackToTopButton);

  function toggleBackToTopButton() {
    const backToTopButtons = document.querySelectorAll(".back-to-top-button");
    const scrollPosition = window.pageYOffset;

    backToTopButtons.forEach((button) => {
      const sectionOffsetTop = button.parentElement.offsetTop;
      if (scrollPosition > sectionOffsetTop) {
        button.classList.add("show");
      } else {
        button.classList.remove("show");
      }
    });
  }

  // Scroll to top when clicked
  document.querySelectorAll(".back-to-top-button").forEach((button) => {
    button.addEventListener("click", backToTop);
  });

  function backToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

})()