$('body').on('click', function(){
    $('.headerTertiaryNav').each(closeNavMenu);
});
$('.headerSecondaryNav button').on('click', toggleNavMenu);
$('.headerSecondaryNav button').on('click', function(e){e.stopPropagation();});


function toggleNavMenu()
{
    var displaySetting = $('.headerTertiaryNav').css("display");
    if(displaySetting != "none")
    {
        closeNavMenu();
    }
    else
    {
        openNavMenu();
    }
}

function openNavMenu() {
    $('.headerTertiaryNav').css({display: "flex", right: "0"});    
    var $menuButton = $('.headerSecondaryNav button');
    $menuButton.css({backgroundColor:"rgb(240,240,240)"});
    $menuButton.css({"border":"dashed rgb(100,100,100) 2px"});
    $menuButton.css({zIndex:"10"});
}

function closeNavMenu() {
    $('.headerTertiaryNav').css({display: "none"});
    var $menuButton = $('.headerSecondaryNav button');
    $menuButton.css({backgroundColor:"white"});
    $menuButton.css({"border":"dashed transparent 2px"});
}