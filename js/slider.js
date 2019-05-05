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
        
        advance();

        $figures.eq(currIndex).removeClass('main-primaryFigures-currState');
        $figures.eq(currIndex).addClass('main-primaryFigures-hiddenState');
        $figures.eq(newIndex).removeClass('main-primaryFigures-hiddenState');
        $figures.eq(newIndex).addClass('main-primaryFigures-currState');

        $buttons.find('circle').css({fill: 'transparent'});
        $buttons.eq(newIndex).find('circle').css({fill: 'white'});

        currIndex = newIndex;
        nextIndex = (currIndex+1)%nFigures;
        prevIndex = (currIndex-1)%nFigures;        
    }

    function advance() {
        clearTimeout(timeout);
        timeout = setTimeout(function(){
            next();
        }, 4000);
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

    // setup next buttons
    $prevButtons.each(function(index){
        $(this).on('click', function(){
            prev();
        });
    });

    advance();

}); // each(function)