$('section.main-primaryFigures').each(function(){
    var $this = $(this);
    var $figures = $this.find('figure');
    var $buttons = $this.find('.main-primaryFigures-buttons button');
    var nFigures = $figures.length;
    var currIndex = 0;
    var nextIndex = 1;
    var prevIndex = nFigures-1;
    var timeout;

    var currWidth = $('main').css('width');
    $('.main-primaryFigures-prevState').css({width: currWidth, right: currWidth});
    $('.main-primaryFigures-nextState').css({width: currWidth, left: currWidth})

    // move
    function move(newIndex) {
        
        advance();

        $figures.eq(currIndex).removeClass('main-primaryFigures-currState');
        $figures.eq(currIndex).addClass('main-primaryFigures-hiddenState');
        $figures.eq(newIndex).removeClass('main-primaryFigures-hiddenState');
        $figures.eq(newIndex).addClass('main-primaryFigures-currState');
        currIndex = newIndex;
        nextIndex = (currIndex+1)%nFigures;
    }

    // auto-play
    function advance() {
        clearTimeout(timeout);
        timeout = setTimeout(function(){
            move(nextIndex);
        }, 4000);
    }

    // add buttons
    $buttons.each(function(index){
        $(this).on('click', function(){
            move(index);
        });
    });

    advance();

}); // each(function)