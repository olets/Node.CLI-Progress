var _progress = require('./main');
var color = require('colors');

// run the example sequentially! otherwise both will write to stdout/stderr simultaneous !
Example1(function(){
    Example2(function(){
        console.log('\nDemo finished!');
    });
});

function Example1(onComplete){
    // EXAMPLE 1 ---------------------------------------------
    console.log('\nExample 1 - Standard configuration');
    // create new progress bar using default values
    var b1 = new _progress.Bar();
    b1.start(200, 0);

    // the bar value - will be linear incremented
    var value = 0;

    // 20ms update rate
    var timer = setInterval(function(){
        // increment value
        value++;

        // update the bar value
        b1.update(value)

        // set limit
        if (value >= b1.getTotal()){
            // stop timer
            clearInterval(timer);

            b1.stop();

            // run complete callback
            onComplete.apply(this);
        }
    }, 20);
}


function Example2(onComplete){
    // EXAMPLE 2 ---------------------------------------------
    console.log('\nExample 2 - Custom configuration & colorized');

    // create new progress bar using default values
    var b2 = new _progress.Bar({
        barCompleteChar: '#',
        barIncompleteChar: '.',
        format: color.yellow(' |- Current Upload Progress: {percentage}%') + ' - ' + color.grey('||{bar}||'),
        fps: 5,
        stream: process.stdout,
        barsize: 65
    });
    b2.start(100, 0);

    // the bar value - will be linear incremented
    var value = 0;

    // 50ms update rate
    var timer = setInterval(function(){
        // increment value
        value++;

        // update the bar value
        b2.update(value)

        // set limit
        if (value >= b2.getTotal()){
            // stop timer
            clearInterval(timer);

            b2.stop();

            // run complete callback
            onComplete.apply(this);
        }
    }, 50);
};
