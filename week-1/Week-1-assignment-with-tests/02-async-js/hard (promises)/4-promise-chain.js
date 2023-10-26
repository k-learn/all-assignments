/*
 * Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Print out the time it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */

function waitOneSecond() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("waitOneSecond function is finished");
        }, 1000)
    });
}

function waitTwoSecond() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("waitTwoSecond function is finished");
        }, 2000)
    });
}

function waitThreeSecond() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("waitThreeSecond function is finished");
        }, 3000)
    });
}

function calculateTime() {
    const start = Date.now();

    //waitOneSecond().then(mess => {
    //    console.log(mess)
    //    waitTwoSecond().then(mess => {
    //        console.log(mess);
    //        waitThreeSecond().then(mess => {
    //            console.log(mess)
    //            console.log((Date.now() - start) / 1000);
    //        });
    //        
    //    });
    //});

    waitOneSecond().then(mess => {
            console.log(mess);
            return waitTwoSecond();
        }).then(mess => {
            console.log(mess);
            return waitThreeSecond();
        }).then(mess => {
            console.log(mess);
            console.log((Date.now() - start) / 1000);
        });
}

calculateTime();
