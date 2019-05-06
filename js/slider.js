$('section.main-primaryFigures').each(function(){
    var $this = $(this);
    var $figures = $this.find('figure');
    var $buttons = $this.find('.main-primaryFigures-buttons button');
    var $nextButtons = $this.find('figure .main-primaryFigures-nextButton');
    var $prevButtons = $this.find('figure .main-primaryFigures-prevButton');
    var nFigures = $figures.length;
    var currIndex = 0;
    var nextIndex = 1;
    var prevIndex = nFigures-1;
    var timeout;
    var isAutoPlay = true;

    var currWidth = $('main').css('width');
    $('.main-primaryFigures-prevState').css({width: currWidth, right: currWidth});
    $('.main-primaryFigures-nextState').css({width: currWidth, left: currWidth})

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
            $figures.eq(newIndex).removeClass();
            $figures.eq(newIndex).addClass('main-primaryFigures-currState');
            $figures.eq(currIndex).removeClass();
            $figures.eq(currIndex).addClass('main-primaryFigures-hiddenState');

            $buttons.find('circle').css({fill: 'transparent'});
            $buttons.eq(newIndex).find('circle').css({fill: 'white'});

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
            $figures.eq(newIndex).removeClass('main-primaryFigures-hiddenState');
            $figures.eq(newIndex).addClass('main-primaryFigures-nextState');
            $figures.eq(newIndex).css({left: currWidth, width: currWidth});
            $figures.eq(currIndex).animate({right: currWidth}, delay);
            $figures.eq(newIndex).animate({left: 0}, delay, update);
        } else if (newIndex < currIndex) {
            $figures.eq(newIndex).removeClass('main-primaryFigures-hiddenState');
            $figures.eq(newIndex).addClass('main-primaryFigures-prevState');
            $figures.eq(newIndex).css({right: currWidth, width: currWidth});
            $figures.eq(currIndex).animate({left: currWidth}, delay);
            $figures.eq(newIndex).animate({right: 0}, delay, update);
        }    
        
        if (isAutoPlay == true) {
            advance();
        }
    }

    function advance() {        
        var delay = 2000;
        clearTimeout(timeout);
        timeout = setTimeout(function(){next();}, delay); 
    }

    // setup buttons
    $buttons.each(function(index){
        $(this).on('click', function(){
            move(index);
        });
    });
    $buttons.eq(currIndex).find('circle').css({fill: 'white'});

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

    if (isAutoPlay == true) {
        advance();
    }

}); // each(function)