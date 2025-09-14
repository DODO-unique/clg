//gsap animation

const stats = document.getElementById('stats')

let statBoxTL = gsap.timeline({
    scrollTrigger: {
        trigger: stats,
        start: "-20% center",
        end: "10% center",
        scrub: true,
        markers: false
    }
})

statBoxTL.to(stats, {
    opacity: 1,
    ease: 'sine.inOut',
    // duration: 1 duration makes no sense 
})

// Initialize Lenis
const lenis = new Lenis({
autoRaf: true,
});

// Listen for the scroll event and log the event data
lenis.on('scroll', (e) => {
// console.log(e);
});

// Above is the basic Lenis setup

