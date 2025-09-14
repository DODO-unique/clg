import {CountUp} from 'https://cdnjs.cloudflare.com/ajax/libs/countup.js/2.8.0/countUp.min.js';
import {Odometer} from 'https://cdn.jsdelivr.net/npm/odometer_countup@1.0.4/dist/odometer.min.js'
// window.onload = function() {
//   var countUp = new CountUp('counter', 2000);
//   countUp.start();
// }
const total_incidents = new CountUp('total-incidents-counter', 318487 , {
    plugin: new Odometer({duration: 1, lastDigitDelay: 0}),
    duration: 2,
    useEasing: true
});

const total_CVE = new CountUp('total-CVE', 19013, {
    plugin: new Odometer({duration: 1, lastDigitDelay: 0}),
    duration: 2,
    useEasing: true
});
function startRoll() {
    total_incidents.start();
    total_CVE.start();
} 

const averageFinancialLoss = new CountUp('avg-loss-per-breach', 4.88, {
    plugin: new Odometer({duration: 1, lastDigitDelay: 0}),
    duration: 2,
    useEasing: true,
    decimalPlaces: 2
})
averageFinancialLoss.start()

if (!total_incidents.error){
    total_incidents.start()
} else{
    console.log(total_incidents.error)
}
if (!total_CVE.error){
    total_CVE.start()
} else{
    console.log(total_CVE.error)
}

