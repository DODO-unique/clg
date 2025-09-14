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

// The intro overlay for each attack pages
// const heading = document.getElementById('intro-head');

// // gsap.set(heading, {y:100})

// gsap.fromTo(heading, 
//   {
//     y: 50,     // start slightly below
//     opacity: 0,   // invisible at start
//     scale: 0.9,
//     zIndex: 1500,
//   }, 
//   {
//     y: 0,         // natural position
//     opacity: 1,   // fade in
//     duration: 1,
//     scale: 1,
//     ease: "power3.out",
//     color: 'green',
//   }
// );

introOverlay = document.querySelector('.intro-pop-overlay')
const headings = document.querySelectorAll('#intro-head span');

let timeline1 = gsap.timeline({default: {duration: 5}, paused: true})

// headings.forEach((heading) => {
timeline1.to(introOverlay, {
  // opacity: 0,
  '--circle': '#1b8b6ffc',
  ease: 'power2.inOut',
  duration: 1.5
})

.fromTo(headings, 
{
  y: 20,     // start slightly below
  x: 1000,
  color: 'black',
  opacity: 0,
  scale: 0.8,
  zIndex: 1500,
  lineHeight: 1.5,
}, 
{
  y: 0,         // natural position
  x: 200,
  opacity: 1,   // fade in
  duration: 1,
  scale: 1.3,
  ease: "power4.inOut",
  color: 'black',
  stagger: 0.2,
  
  // delay: 0.5
},
"-=0.5"
)

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


let timeline2 = gsap.timeline({default: {duration:1}, paused: true})

timeline2.to(introOverlay, {
  opacity: 0,
  ease: 'sine.out',
  duration: 2,
  onComplete: () => {
    introOverlay.style.setProperty('display', 'none')
  },
})

.to(headings, {
  y: 0,
  x: 0,
  color: 'inherit',
  ease: 'sine.inOut',
  lineHeight: 1,
  stagger: 0.2,
  scale: 1
}, '<' )

.eventCallback('onComplete', () => {
    const parentOverlay = document.querySelector('.parent-overlay')
    parentOverlay.style.display = 'none'
    // parentOverlay.style.pointerEvents = 'none'
    headings.forEach((heading) => {
      heading.style.zIndex = 1
    cursor.style.display = 'block'
    cursor_halo.style.display = 'block'

    window.scrollTo({top: 0, behavior: "smooth"})
    })
  })



async function intro() {
  timeline1.play()
  await sleep(3000)
  timeline2.play()
}

intro()
// timeline1.reverse()


// })

