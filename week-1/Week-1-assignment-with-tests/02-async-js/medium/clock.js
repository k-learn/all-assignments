setInterval(() => {
    console.clear();
    const date = new Date();
    console.log(date.getHours()+":"+date.getMinutes()+":"+(date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds()));
    if (date.getHours() > 12) {
        console.log(date.getHours() - 12+":"+date.getMinutes()+":"+(date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds())+" PM");
    } else {
        console.log(date.getHours()+":"+date.getMinutes()+":"+(date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds())+" AM");
    }
}, 1000);
