$('main .primarySection').each(function(){
    var $this = $(this);
    var $figures = $this.find('figure');
    var $moveButons = $this.find('.primarySection-moveButton');
    var $playButton = $this.find('.primarySection-playButton');
    var $pauseButton = $this.find('.primarySection-pauseButton');
    var $nextButtons = $this.find('.primarySection-nextButton');
    var $prevButtons = $this.find('.primarySection-prevButton');
    var nFigures = $figures.length;
    var currIndex = 0;
    var nextIndex = 1;
    var prevIndex = nFigures-1;
    var timeout;
    var isAutoPlay = false;

    var currWidth = $('main').css('width');
    $('.primarySection-prevState').css({width: currWidth, right: currWidth});
    $('.primarySection-nextState').css({width: currWidth, left: currWidth})

    function next() {
        move(nextIndex);
    }

    function prev() {
        move(prevIndex);
    }

    function move(newIndex) {
        
        var currWidth = $this.css('width');
        var delay = 300;

        function update()
        {
            $figures.eq(newIndex).removeClass('primarySection-hiddenState');
            $figures.eq(newIndex).removeClass('primarySection-prevState');
            $figures.eq(newIndex).removeClass('primarySection-nextState');
            $figures.eq(newIndex).addClass('primarySection-currState');
            $figures.eq(currIndex).removeClass('primarySection-currState');
            $figures.eq(currIndex).removeClass('primarySection-prevState');
            $figures.eq(currIndex).removeClass('primarySection-nextState');
            $figures.eq(currIndex).addClass('primarySection-hiddenState');

            $moveButons.find('circle').css({fill: 'transparent'});
            $moveButons.eq(newIndex).find('circle').css({fill: 'white'});

            currIndex = newIndex;
            nextIndex = (currIndex+1)%nFigures;
            prevIndex = ((currIndex-1)%nFigures + nFigures)%nFigures;                
            
            $figures.css({right: '', left: '', width: ''});
        }

        if ($figures.eq(newIndex).is(':animated') || 
            $figures.eq(currIndex).is(':animated') ||
            newIndex == currIndex) {
                return;
            }
        else if (newIndex > currIndex) {       
            $figures.eq(newIndex).removeClass('primarySection-hiddenState');
            $figures.eq(newIndex).removeClass('primarySection-prevState');
            $figures.eq(newIndex).removeClass('primarySection-nextState');
            $figures.eq(newIndex).addClass('primarySection-nextState');
            $figures.eq(newIndex).css({left: currWidth, width: currWidth});
            $figures.eq(currIndex).animate({right: currWidth}, delay);
            $figures.eq(newIndex).animate({left: 0}, delay, update);
        } else if (newIndex < currIndex) {
            $figures.eq(newIndex).removeClass('primarySection-hiddenState');
            $figures.eq(newIndex).removeClass('primarySection-prevState');
            $figures.eq(newIndex).removeClass('primarySection-nextState');
            $figures.eq(newIndex).addClass('primarySection-prevState');
            $figures.eq(newIndex).css({right: currWidth, width: currWidth});
            $figures.eq(currIndex).animate({left: currWidth}, delay);
            $figures.eq(newIndex).animate({right: 0}, delay, update);
        }    
        
        if (isAutoPlay==true)
        {
            advance();
        }
    }

    function advance() {        
        var delay = 2000;
        clearTimeout(timeout);
        timeout = setTimeout(function(){next();}, delay); 
    }

    // setup move buttons
    $moveButons.each(function(index){
        $(this).on('click', function(){
            move(index);
        });
    });
    $moveButons.eq(currIndex).find('circle').css({fill: 'white'});

    // setup next buttons
    $nextButtons.each(function(index){
        $(this).on('click', function(){
            next();
        });
    });

    // setup prev buttons
    $prevButtons.each(function(index){
        $(this).on('click', function(){
            prev();
        });
    });

    
    function enablePlayButton() {
        $pauseButton.css({display: 'none'});
        $playButton.css({display: 'inline'});
    }

    function enablePauseButton() {
        $pauseButton.css({display: 'inline'});
        $playButton.css({display: 'none'});
    }

    function playPauseEventHandler() {
        if (isAutoPlay == true) {
            isAutoPlay = false;
            clearTimeout(timeout);
            enablePlayButton();            
        } else if(isAutoPlay == false){
            isAutoPlay = true;
            enablePauseButton();
            advance();
        }
    }
    
    // setup play/pause buttons
    if (isAutoPlay == true) {
        enablePauseButton();
    } else if (isAutoPlay == false) {
        enablePlayButton();
    }

    $playButton.each(function(){
        $(this).on('click', playPauseEventHandler)
    });

    $pauseButton.each(function(){
        $(this).on('click', playPauseEventHandler)
    });

    if (isAutoPlay == true) {
        advance();
    }

}); // each(function)