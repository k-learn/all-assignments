
let count = 0;

function Counter() {
    console.clear();
    ++count;
    console.log(count);

    return setTimeout(Counter, 1000);
}

Counter();
