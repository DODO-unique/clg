console.log("Connected!")
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM ready, adding scroll listener");
  window.addEventListener("scroll", () => {
    console.log("Scroll fired!", window.scrollY);
  });
});

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
