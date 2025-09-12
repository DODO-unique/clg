const cursor_halo = document.querySelector(".cursor");
const cursor = document.querySelector(".cursor-dot")

window.addEventListener("mousemove", (e) => {
  gsap.to(cursor_halo, {x: e.clientX, y: e.clientY, ease: "back.out(2)", duration: 1})
  gsap.to(cursor, {x: e.clientX, y: e.clientY, duration: 0})
//   console.log(e)
})

// const hoverTarget = document.getElementById('intro')

// hoverTarget.addEventListener("mouseenter", () => {
//   gsap.to(cursor_halo, {
//     duration: 0.3,
//     filter: "contrast(200%) brightness(150%)",
//     scale: 1.2
//   });
// });

// hoverTarget.addEventListener("mouseleave", () => {
//   gsap.to(cursor_halo, {
//     duration: 0.3,
//     filter: "contrast(100%) brightness(100%)",
//     scale: 1
//   });
// });

const styleStack = [];

function applyStyle(el, prop, value) {
  styleStack.push({ prop, oldValue: el.style.getPropertyValue(prop) });
  el.style.setProperty(prop, value);
}

function revertStyle(el) {
  const last = styleStack.pop();
  if (!last) return;
  if (last.oldValue) {
    el.style.setProperty(last.prop, last.oldValue);
  } else {
    el.style.removeProperty(last.prop);
  }
}

// usage
window.addEventListener("mouseenter", () => {
  applyStyle(cursor_halo, "visibility", "hidden");
  applyStyle(cursor, "visibility", "hidden");
});

window.addEventListener("mouseleave", () => {
  revertStyle(cursor_halo);
  revertStyle(cursor);
});

// window.addEventListener("mouseleave", () => {

// })

// window.addEventListener("mouseenter", () => {

// })


const drawer = document.getElementById('drawer-button');
const sidebarBtn = document.getElementById('menu-btn');
const overlay = document.querySelector('.overlay');
const navbar = document.querySelector('.navbar');
const sidebar = document.querySelector('.sidebar');

// STATE
let isNavOpen = false;
let isOverlay = false;
let isSideOpen = false;

// TOGGLE FUNCTIONS
function toggleOverlay(forceState = null) {
  const shouldOpen = forceState !== null ? forceState : !isOverlay;
  
  gsap.to(overlay, {
    opacity: shouldOpen ? 0.4 : 0,
    duration: 0.4,
    ease: "power2.inOut",
    onStart() {
      overlay.style.pointerEvents = shouldOpen ? "auto" : "none";
    }
  });

  isOverlay = shouldOpen;
}

function toggleNav(forceState = null) {
  const shouldOpen = forceState !== null ? forceState : !isNavOpen;

  gsap.to(navbar, {
    y: shouldOpen ? "0%" : "-100%",
    duration: 0.6,
    ease: "power4.out"
  });

  toggleOverlay(shouldOpen);
  isNavOpen = shouldOpen;
}

function toggleSide(forceState = null) {
  const shouldOpen = forceState !== null ? forceState : !isSideOpen;

  gsap.to(sidebar, {
    x: shouldOpen ? "0%" : "-100%",
    duration: 0.6,
    ease: "power4.inOut"
  });

  // Hide hamburger when sidebar is open
  gsap.to(sidebarBtn, {
    opacity: shouldOpen ? 0 : 1,
    duration: 0.3,
    ease: "power1.inOut",
    onComplete() {
      sidebarBtn.style.pointerEvents = shouldOpen ? "none" : "auto";
    }
  });

  isSideOpen = shouldOpen;
}

// EVENT LISTENERS
drawer.addEventListener("click", () => {
  if (isNavOpen || isSideOpen) {
    // drawer-button will close EVERYTHING if something’s open
    toggleNav(false);
    toggleSide(false);
    toggleOverlay(false);
  } else {
    toggleNav(true);
  }
});
sidebarBtn.addEventListener("click", () => {
  toggleSide();
});

// navbar.addEventListener("click", () => {
//   if (isSideOpen){
//       console.log("clicked navbar")
//       toggleSide();
//   }
// });


// Optional: click overlay closes everything
overlay.addEventListener("click", () => {
  toggleNav(false);
  toggleSide(false);
  toggleOverlay(false);
});