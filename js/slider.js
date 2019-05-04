const mySiema = new Siema({
    selector: '.main-primaryFigures',
    duration: 200,
    easing: 'ease-out',
    perPage: 1,
    startIndex: 0,
    draggable: true,
    multipleDrag: true,
    threshold: 20,
    loop: true,
    rtl: false,
    onInit: () => {},
    onChange: () => {},
});

// Add triggers for next buttons
var buttons = document.getElementsByClassName("main-primaryFigures-nextButton");
for (var i = 0; i < buttons.length; i++) {
    buttons.item(i).addEventListener('click', () => mySiema.next(1));
}

// Add triggers for prev buttons
var buttons = document.getElementsByClassName("main-primaryFigures-prevButton");
for (var i = 0; i < buttons.length; i++) {
    buttons.item(i).addEventListener('click', () => mySiema.next(1));
}