$(document).ready(function() {

    var timeMin, timeMax
    var days, hours, minutes, seconds
    var sceneDuration
    var countdownTrue
    var minutes, seconds
    var inputMin, inputMax
    var countdownTrue
    var sound = new Audio("horn.wav");
    var state = 'new'

    var findDuration = function() {
        timeMin = parseInt(inputMin, 10);
        timeMax = parseInt(inputMax, 10);
        sceneDuration = parseInt((Math.floor(Math.random() * (timeMax - timeMin + 1)) + timeMin), 10);
        startCountdown();
    };

    var startCountdown = function() {
    	state = 'running';
        countdownTrue = setInterval(function() {
            loopCountdown()
        }, 1000);
    };

    var loopCountdown = function() {
        sceneDuration--;
        minutes = parseInt(sceneDuration / 60);
        seconds = parseInt(sceneDuration % 60);
        $('#clock').html('<span class="minutes">' + minutes + ' <b>min</b></span> <span class="seconds">' + seconds + ' <b>sec</b></span>');
        if (sceneDuration === 0) {
            clearInterval(countdownTrue);
            sound.play();
            findDuration();
        }
    };

    var pauseCountdown = function() {
        if (state === 'resume') {
            $('#pauseText').html('Pause');
            state = 'running';
            startCountdown();
        } else if (state === 'running') {
            $('#pauseText').html('Resume');
            state = 'resume';
            clearInterval(countdownTrue);
        };
    };

    var stopCountdown = function() {
        clearInterval(countdownTrue);
        sceneDuration = 0;
        timeMin = 0;
        timeMax = 0;
        minutes = 0;
        seconds = 0;
        $('#clock').html('<span class="minutes">' + minutes + ' <b>min</b></span> <span class="seconds">' + seconds + ' <b>sec</b></span>');
        $('#runText').html('Run');
        $('#pauseText').html('Pause');
        state = 'new';
        sound.play();
    };

    var inputChecker = function() {
        inputMin = $('#timeMinSeconds').val();
        inputMax = $('#timeMaxSeconds').val();
        if ((isNaN(inputMin)) || (isNaN(inputMax))) {
            alert("Enter a number, my dude!");
        } else if ((parseInt(inputMin, 10) < 1) || (parseInt(inputMax, 10) < parseInt(inputMin, 10))||(inputMin === "")||(inputMax === "")) {
            alert("Enter numbers that make sense, broski!");
        } else {
        	$('#runText').html('New time');
            findDuration();
        };
    };

    $('#doIt').click(function() {
        sceneDuration === 0;
        clearInterval(countdownTrue);
        inputChecker();
        if (state === 'running') {
        	$('#pauseText').html('Pause');
        	};
    });

    $('#pauseIt').click(pauseCountdown);

    $('#stopIt').click(stopCountdown);

});