$('body').on('click', function(){
    var menu = document.getElementById("header-navmenu");
    closeNavMenu(menu);
});
$('.headerSecondaryNav button').on('click', toggleNavMenu);
$('.headerSecondaryNav button').on('click', function(e){e.stopPropagation();});


function toggleNavMenu()
{
    var menu = document.getElementById("header-navmenu");
    var styles = getComputedStyle(menu);
    if(styles.display != "none")
    {
        closeNavMenu(menu);
    }
    else
    {
        openNavMenu(menu);
    }
}

function openNavMenu(menu) {
    menu.style.display = "flex"; 
    menu.style.right = 0;
    
    var $menuButton = $('.headerSecondaryNav button');
    $menuButton.css({backgroundColor:"rgb(240,240,240)"});
    $menuButton.css({"border":"dashed rgb(100,100,100) 2px"});
    $menuButton.css({zIndex:"10"});
}

function closeNavMenu(menu) {
    menu.style.display = "none";
    var $menuButton = $('.headerSecondaryNav button');
    $menuButton.css({backgroundColor:"white"});
    $menuButton.css({"border":"dashed transparent 2px"});
}