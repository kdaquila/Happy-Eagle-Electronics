// define the CSS selectors
var imageSliderSelector = ".primaryFigureSection";
var imageSetSelector = ".primaryFigureSection-figureSet";
var imageItemSelector = ".primaryFigureSection-figure";
var moveButtonSelector = ".primaryFigureSection-moveButton";
var playButtonSelector = ".primaryFigureSection-playButton";
var pauseButtonSelector = ".primaryFigureSection-pauseButton";
var nextButtonSelector = ".primaryFigureSection-nextButton";
var prevButtonSelector = ".primaryFigureSection-prevButton";
var nextClass = "next";
var prevClass = "prev";
var hiddenClass = "hidden";
var markedClass = "marked";

// setup image slider functionality on each image slider
$(imageSliderSelector).each(function(){

    // store the reference
    var $slider = $(this);

    // find all the components
    var $imageSet = $slider.find(imageSetSelector);
    var $imageItems = $slider.find(imageItemSelector);
    var $moveButons = $slider.find(moveButtonSelector);
    var $playButton = $slider.find(playButtonSelector);
    var $pauseButton = $slider.find(pauseButtonSelector);
    var $nextButtons = $slider.find(nextButtonSelector);
    var $prevButtons = $slider.find(prevButtonSelector);

    // number of image items
    var nImageItems = $imageItems.length;

    // define indices
    var currIndex = 0;
    var nextIndex = 1;
    var prevIndex = nImageItems-1;

    // timeout object
    var timeout;

    // auto play
    var isAutoPlay = false;
    var autoPlayDelay_ms = 2000;

    // slide duration
    var slideDuration_ms = 300;

    function next() {
        move(nextIndex);
    }

    function prev() {
        move(prevIndex);
    }

    function advance() {        
        clearTimeout(timeout);
        timeout = setTimeout(function(){next();}, autoPlayDelay_ms); 
    }

    function enablePlayButton() {
        $pauseButton.addClass(hiddenClass);
        $playButton.removeClass(hiddenClass);
    }

    function enablePauseButton() {
        $pauseButton.removeClass(hiddenClass);
        $playButton.addClass(hiddenClass);
    }

    function toggleAutoPlay() {
        // turn off auto play
        if (isAutoPlay) {
            isAutoPlay = false;
            clearTimeout(timeout);
            enablePlayButton();   
            
        // turn on auto play         
        } else {
            isAutoPlay = true;
            enablePauseButton();
            advance();
        }
    }

    function move(newIndex) {

        if ($imageSet.is(':animated') || newIndex == currIndex) {
            return;
        }
        else if (newIndex > currIndex) {       
            $imageItems.eq(newIndex).removeClass(hiddenClass);
            $imageItems.eq(newIndex).addClass(nextClass);
            $imageSet.animate({right: '100%'}, slideDuration_ms, function(){
                $imageSet.css({right: '', left: ''}); 
                $imageItems.eq(newIndex).removeClass(nextClass);
                $imageItems.eq(currIndex).addClass(hiddenClass);
                $moveButons.eq(currIndex).removeClass(markedClass);
                $moveButons.eq(newIndex).addClass(markedClass);
                currIndex = newIndex;
                nextIndex = (currIndex+1)%nImageItems;
                prevIndex = ((currIndex-1)%nImageItems + nImageItems)%nImageItems;
            });
        } else if (newIndex < currIndex) {
            $imageItems.eq(newIndex).removeClass(hiddenClass);
            $imageItems.eq(newIndex).addClass(prevClass);
            $imageSet.animate({left: '100%'}, slideDuration_ms, function(){
                $imageSet.css({right: '', left: ''}); 
                $imageItems.eq(newIndex).removeClass(prevClass);
                $imageItems.eq(currIndex).addClass(hiddenClass);
                $moveButons.eq(currIndex).removeClass(markedClass);
                $moveButons.eq(newIndex).addClass(markedClass);
                currIndex = newIndex;
                nextIndex = (currIndex+1)%nImageItems;
                prevIndex = ((currIndex-1)%nImageItems + nImageItems)%nImageItems;
            });
        }  
        
        if (isAutoPlay)
        {
            advance();
        }
    }

    // setup inital move button marked state
    $moveButons.eq(currIndex).addClass(markedClass);

    //setup initial image visibility
    $imageItems.filter(':not(:eq(' + currIndex + '))').addClass(hiddenClass);
    
    // setup each move button
    $moveButons.each(function(index){
        $(this).on('click', function(){move(index);});
    });

    // setup button call backs
    $nextButtons.each(function(){$(this).on('click', next);});
    $prevButtons.each(function(){$(this).on('click', prev);});  
    $playButton.on('click', toggleAutoPlay);
    $pauseButton.on('click', toggleAutoPlay);

    // setup initial play/pause button visibility
    if (isAutoPlay == true) {
        enablePauseButton();
    } else if (isAutoPlay == false) {
        enablePlayButton();
    }

    // being auto play
    if (isAutoPlay == true) {
        advance();
    }

}); // each(function)