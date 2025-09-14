const pageHead = document.querySelector('.bac-link')
// const cursor_halo = document.querySelector(".cursor");
// const cursor = document.querySelector(".cursor-dot");

pageHead.addEventListener('mouseenter', () => {
    cursor.style.setProperty("visibility", "hidden");
    cursor_halo.style.setProperty("border", "none");
    cursor_halo.style.setProperty("backdrop-filter", "blur(10px) brightness(99%)");
});

pageHead.addEventListener('mouseleave', () => {
    cursor.style.removeProperty("visibility", "hidden");
    cursor_halo.style.removeProperty("border", "none");
    cursor_halo.style.removeProperty("backdrop-filter", "blur(10px)");
});

const plot = document.getElementById('graph')

plot.addEventListener('mouseenter', () => {
    gsap.to(cursor, {scale: 4});
    gsap.to(cursor_halo, {scale: 0, opacity: 0});
})

plot.addEventListener('mouseleave', () => {
    gsap.to(cursor, {scale: 1});
    gsap.to(cursor_halo, {scale: 1, opacity: 1});
})

// we give it context
const ctx = document.getElementById('graph').getContext('2d')

// This is the graph:

new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['earlier (no records)', '2022', '2023', '2024'], // this is for x-axis
        datasets: [{
            label: 'new CVEs',
            data: [0, 4004 , 5498, 7182],  // this shows on y-axis
            // backgroundColor: "#3a506bff",
            // fill: true,
            borderColor: "#5bc0beff",
            borderWidth: 3,  //this is the line joining the points- so it looks like a 'line' graph, y'know
        }]
    },
    options: {
        responsive: true,
        plugins: { 
            legend: { display: false },
            chartArea: {
                backgroundColor: 'white'
            }},
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'New BAC-Related CVEs',
                        color: 'white',
                        font: {
                            size: 16,
                            weight: 'bold'
                        },
                    padding: {top: 10, bottom: 10}
                    }
                }
            }
    }   
})

// plot.addEventListener("mousedown", (e) => {
//     console.log(e)
//   let dot = document.createElement("div");
//   dot.className = "dot";
//   dot.style.left = e.pageX + "px";
//   dot.style.top = e.pageY + "px";
//   document.body.appendChild(dot);

//   gsap.fromTo(dot,
//     { scale: 0, opacity: 1 },
//     { scale: 1, duration: 0.2, ease: "back.out(2)" }
//   );

//   // fade + remove
//   gsap.to(dot, {
//     opacity: 0,
//     delay: 1, // how long it stays
//     duration: 0.5,
//     onComplete: () => dot.remove()
//   });
// });

plot.addEventListener("mousedown", (e) => {
    console.log(e)
    let dot = document.createElement("div");
    dot.className = "dot";
    dot.style.left = e.pageX + 'px';
    dot.style.top = e.pageY + 'px';
    
})


// This is the pie chart:

