
import { BigNumber } from 'ethers'

//2000 = 20% we add in already estimated value
export function calculateGasMargin(value) {
    return value.mul(BigNumber.from(10000 + 2000)).div(BigNumber.from(10000));
}

export function calculateGasApprove(value) {
    return value.mul(BigNumber.from(10000 + 2000)).div(BigNumber.from(10000));
}

export function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours().toString().padStart(2, "0");
    var min = a.getMinutes().toString().padStart(2, "0");
    var sec = a.getSeconds().toString().padStart(2, "0");
    var time =
      date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    return time;
}

export function printCountdown(id, endDate) {
    // Set the date we're counting down to
    var countDownDate = new Date(endDate).getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;
        var el = document.getElementById(id);
        if (now <= countDownDate) {

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, "0");
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, "0");
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, "0");
            var seconds = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, "0");

            if (el) {
                el.disabled = true;
                el.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
            }
        }

    }, 1000);
}


export function printCountdownOther(id, endDate) {
    // Set the date we're counting down to
    var countDownDate = new Date(endDate).getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;
        var el = document.getElementById(id);
        if (now <= countDownDate) {

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, "0");
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, "0");
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, "0");
            var seconds = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, "0");

            if (el) {
                el.disabled = true;
                el.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
            }
        }

    }, 1000);
}

