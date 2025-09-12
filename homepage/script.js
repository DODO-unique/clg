const cursor = document.querySelector(".cursor");

window.addEventListener("mousemove", (e) => {
  gsap.to(cursor, {x: e.clientX, y: e.clientY, ease: "back.out(2)", duration: 1})
  // console.log(e)
})
// THIS IS PART 0 OF universalScript.js

function screen_disappear() {

}

const terminalOutput = [
  'Initializing connection… [OK]',
  'Sending SYN-ACK request to target…',
  'Response: REJECTED',
  'PAUSE',
  'trojan-master: auth recognizing master…',
  'success!',
  'trojan-master: would try creating a session now…',
  'Injecting reconfiguring scripts...',
  'trojan_message: reconfiguring firewall...',
  'success!',
  'trojan_message: Ports affected: 22, 80, 8080',
  'success!',
  'Lock acquisition initiated…',
  'TARGET',
  'WARNING: latent intrusion detected, system integrity compromised'
];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function terminalTyping() {
  const sentence = 'sudo hping3 -S -p 2201 192.168.1.100';
  const span = document.getElementById('def-start');

  for (const char of sentence) {
    let delay = 10 + Math.random() * 200;
    await sleep(delay);
    span.innerText += char;
  }
}

async function terminal() {
  console.log("reached here");
  const parent = document.getElementById('terminal');

  for (const line of terminalOutput) {
    // Random pause before each line
    let delay = 100 + Math.random() * 1500;
    await sleep(delay);

    if (line === 'PAUSE') {
      await sleep(2000);
      continue;
    }

    if (line === 'TARGET') {
      const TARGET = document.createElement('p');
      TARGET.textContent = 'root@user1:~# Lock acquired -> ';

      const target_found = document.createElement('span');
      target_found.className = 'target';
      target_found.textContent = 'TARGET_FOUND';

      TARGET.appendChild(target_found);
      parent.appendChild(TARGET);



      continue;
    }

    const newItem = document.createElement('p');
    newItem.textContent = `root@user1:~# ${line}`;
    parent.appendChild(newItem);
  }
}

async function main() {
  await terminalTyping(); // wait until typing finishes
  await terminal();       // then start logs
  disappear();            // after everything, fade overlay
}

function disappear() {
  gsap.to('.target', {
    color: 'red',
    ease: "power1.inOut",
    duration: 0.5,
    delay: 2,
  });
gsap.to('.intro-overlay', {
  opacity: 0,
  duration: 1,
  delay: 2,
  ease: 'power1.out',
  onComplete() {
    const el = this.targets()[0];  // safer, avoids typos
    el.style.pointerEvents = "none";
    if (el) {
      el.style.zIndex = -1;
      setTimeout(() => { el.style.display = 'none'; }, 50);
    }
    // lenis?.update();
   } // recalc Lenis scroll
});
}

// main();




// universalScript.js 
// ----------------------------------------------------------  PART 1 starts here  ------------------------------------------------------- 
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

// --------------------------------------------------- PART 1 ENDS HERE ------------------------


// debug

function expand(cls) {
  gsap.to(`.${cls}`, {
    width: '950px',
    height: '400px'
  });
  
}

// Check this logic carefully

const cards = document.querySelectorAll('.options > div');

const colorMap = {
  first: '#1b8b6ffc',
  second: '#9c952dfc',
  third: '#ad2a72fc',
  fourth: '#501b8bfc',
  fifth: '#1b6f8bfc'
};

cards.forEach(card => {
  card.addEventListener("mouseenter", () => {
    const cls = card.classList[0];
    gsap.killTweensOf([card, ".main"]); // stop leftovers instantly
    gsap.to(card, { scale: 1.1, duration: 0.3 });
    if (colorMap[cls]) {
      gsap.to('.main', { '--start': colorMap[cls], duration: 1, ease: 'power2.inOut' });
      gsap.to('.goto', {
        ease: 'power2.inOut',
        duration: 1,
        backgroundColor: colorMap[cls]
      })
    }
  });
  
  
  card.addEventListener("mouseleave", () => {
    gsap.killTweensOf([card, ".main", '.goto']);
    gsap.to(card, { scale: 1, duration: 0.3 });
    gsap.to('.main', { '--start': '#2946a5', duration: 1 });
    gsap.to('.goto', { backgroundColor: '#2946a5'});
    console.log('resetting tweens') 
  });
});




const goto_arr = document.querySelectorAll('.goto')

goto_arr.forEach(goto => {
  goto.addEventListener('mouseenter', () => {
    gsap.to(goto, {
      borderRadius: '50%',
      scale: 1.2
    })
  })
  goto.addEventListener('mouseleave', () => {
    
  })
});



// const tl = gsap.timeline({ paused: true, defaults: { duration: 0.6, ease: "power2.inOut" } });

// // fade out "square with arrow" + morph their paths to the external link
// tl.to("#sq-arrow-border", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" }, 0)
//   .to("#sq-arrow-line",   { d: "M10 14 21 3" }, 0)
//   .to("#sq-arrow-head",   { opacity: 0 }, 0) // hide head
//   // fade in the external link pieces
//   .to(".ext", { opacity: 1 }, 0.2)
//   // add a little "pop" to the arrow line
//   .to("#ext-line", { scale: 1.2, transformOrigin: "center" }, "-=0.3")
//   .to("#ext-line", { scale: 1, ease: "elastic.out(1,0.4)", duration: 0.8 }, "-=0.1");

// // trigger on click for demo
// document.querySelector("svg").addEventListener("click", () => {
//   if (tl.reversed()) {
//     tl.play();
//   } else {
//     tl.reverse();
//   }
// });



// const tl = gsap.timeline({repeat: -1, yoyo: true});
// tl.to(".main", {backgroundColor: "#3b0200ff", duration: 1})
//   .to(".main", {backgroundColor: "#03233dff", duration: 1})
//   .to(".main", {backgroundColor: "#440202ff", duration: 1});

  


// //register the scroll trigger plugin before use
// gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);


// // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
// lenis.on('scroll', ScrollTrigger.update);

// // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// // This ensures Lenis's smooth scroll animation updates on each GSAP tick
// gsap.ticker.add((time) => {
//   lenis.raf(time * 1000); // Convert time from seconds to milliseconds
// });

// // Disable lag smoothing in GSAP to prevent any delay in scroll animations
// gsap.ticker.lagSmoothing(0);


  // Auto-scroll past header on load
// const header = document.querySelector('.navbar');
// window.addEventListener('load', () => {
//   gsap.to(window, { scrollTo: header.offsetHeight, duration: 0 });
// });

// console.log("Connected")

// ScrollTrigger.create({
//   trigger: ".main",
//   start: "top top",
//   end: "bottom bottom",
//   snap: {
//     snapTo: (progress) => {
//   const panels = gsap.utils.toArray(".panel");  // grab all panels
//   const closest = panels.reduce((prev, curr) => {
//     const pos = curr.offsetTop / (document.body.scrollHeight - window.innerHeight); // panel's normalized scroll position
//     return Math.abs(pos - progress) < Math.abs(prev - progress) ? pos : prev;  // pick the closest to current scroll
//   }, 0);
//   return closest;  // tell GSAP "snap here"
// },
//     duration: 0.5,
//     ease: "power1.in"
//   },
//   markers: true
// })


// console.log("Connected!")
// document.addEventListener("DOMContentLoaded", () => {
//   console.log("DOM ready, adding scroll listener");
//   window.addEventListener("scroll", () => {
//     console.log("Scroll fired!", window.scrollY);
//   });
// });

// let navBarOpen = false;
// let lastScroll = 0;
// let minScroll = -100;
// let maxScroll = 300;

// window.addEventListener("wheel", (e) => {

//   lastScroll = lastScroll + e.deltaY;
  
//   // if lastscroll is 0, then that would mean the viewport homepage is visible- if it is negative, we can say that the navbar should drop
//   console.log(lastScroll);

//   lastScroll = Math.max(minScroll, Math.min(maxScroll, lastScroll));

//   if (lastScroll < 0){
//     if (!navBarOpen){
//       openNavbar();
//     };
//     currentScroll = lastScroll
//   };

//   if (lastScroll > currentScroll){
//     if (navBarOpen){
//       closeNavbar();
//     };
//   };

// });

// function openNavbar() {
//   gsap.to('.navbar', {
//     y : 0,
//     duration: 0.5,
//     ease: "power2.in"
//   });
//   navBarOpen = true;
// };


// function closeNavbar() {
//   gsap.to(".navbar", {
//     y: "-100%",
//     duration: 0.5,
//     ease: "power2.out"
//   });
//   navBarOpen = false;
// };




// let navbarOpen = false;
// let lastScroll = 0;

// window.addEventListener("scroll", () => {
//   let currentScroll = window.scrollY;

//   if (currentScroll < lastScroll) {
//     // scrolling UP
//     if (!navbarOpen) {
//       openNavbar();
//     }
//   } else if (currentScroll > lastScroll) {
//     // scrolling DOWN
//     if (navbarOpen) {
//       closeNavbar();
//     }
//   }

//   lastScroll = currentScroll;
// });

// try{
// window.addEventListener("scroll", () => {
//     scrolled = window.scroll;
//     console.log(scrolled);
// });
// }catch(e){
//     console.log(e)
// }

// function openNavbar() {
//   gsap.to(".navbar", { y: 0, duration: 0.5, ease: "power2.out" });
//   navbarOpen = true;
// }

// function closeNavbar() {
//   gsap.to(".navbar", { y: "-100%", duration: 0.5, ease: "power2.in" });
//   navbarOpen = false;
// }
