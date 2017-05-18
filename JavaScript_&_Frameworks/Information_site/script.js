// Student ID: u3092649, Assignment 2, JavaScript File, Date Last Modified: 12/05/2017

/* 
-Initialises external library WOW. The purpose of this is to allow for the use of powerful animation commands. 
-This library contains all the functionality for the animation that appear when scrolling.
*/
new WOW().init();

/*
-Declares a new instance of the image slider library
-Selects the field of the slider and establish the height
-Then declares the duration at which to change image
*/
var slider = new IdealImageSlider.Slider({
	selector: '#slider',
	height: 400, // slider height
	interval: 5000, //sets the interval to change image ever 5s
    
});

//calls the slider method to start
slider.start();

/*
-Declare the following variables to be used for creatinf the dynamic section of the page
-Gets the all the sections
-Gets the navigation bar 
-Gets the navigation bar height (to exclude it at the top of the bar)
*/
var sections = $('section'),
    nav = $('nav'),
    nav_height = nav.outerHeight();

/*
-This is the Navigation Scroll effect 
-Gets the current position on page in relation to the distance from the top
-Gets top of the section which is achieved by subtracting the height of the navigation bar
-Performs a comparison operation to establish the position on the page and if there is a change in section then:
-removes the class of the section and activates it for the new section to refelect the navigation bar to the section of the page
*/
$(window).on('scroll', function () {
  var cur_pos = $(this).scrollTop();
  
  sections.each(function() {
    var top = $(this).offset().top - nav_height,
        bottom = top + $(this).outerHeight();
    
    if (cur_pos >= top && cur_pos <= bottom) {
      nav.find('a').removeClass('active');
      sections.removeClass('active');
      
      $(this).addClass('active');
      nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
    }
  });
});

/*
-This is click function for when an item is selected on the navigation bar
-Gets the item that was selected 
-gets the href link assocated with the element and checks the entire page for a matching id
-each of the section ids are numbered to match the href id that is passed through
-the page is then moved the matching section id minus the navigation bar (this means the section will perfectly align with the bottom of the navigation bar)
-An animation or 5s delay gives the illustion that the page is scrolling to that section itself
*/
nav.find('a').on('click', function () {
  var $position = $(this),
      id = $position.attr('href');
  
  $('html, body').animate({
    scrollTop: $(id).offset().top - nav_height       //removes the nav bar from section height for aligment
  },500);                                            //5 sec animation transition time 
  
  return false;
});

/*
-This function controls the types of AI tiles or cards and an onClick is assocated with each of the cards
-These tiles contain a front and a back with the front the heading and the back the contents of the heading
-When the user click the card then the onClick function is called which passes its unique number to
-The jQuery toggle function is the called to either remove or add the flipped class
-The animation of the transition is handled in the CSS
-Only one tile is to be turned a time this is achieved by: 
-having a previousSelection used to remember the last tile the user selected
-A check is then performed to establish if the previous classs does not match the recent click which will then activate the old class to be flipped(turned back to the title), while the new item is then flipped
-If the previous and new selection match then the item is toggled back and the previous item is set to 0 to prevent error on the the click
-previous item == 0 (Wont match any item) 
*/

var previousSelection = 0;
function flip(indexTypeAi) {
    if (previousSelection != indexTypeAi) {
        $('#typeAi'+previousSelection+' .card').toggleClass('flipped');
        $('#typeAi'+indexTypeAi+' .card').toggleClass('flipped');
        previousSelection = indexTypeAi;
    }else if (previousSelection == indexTypeAi) {
        $('#typeAi'+indexTypeAi+' .card').toggleClass('flipped');
        previousSelection = 0;
    }
}

/* 
-lowers the bouncig arrow opacity as user scrolls down viewport. 
*/	
$(window).scroll(function(){
    var posScroll = $(window).scrollTop();
    $('#scrollbutton').css({'opacity':( 500-$(window).scrollTop() )/300});
});

/*
-This function calls the jquery-ui library to populate an accordion div
-This div contains the contents of the differnt AI alorithms section
*/
$( function() {
    $( "#accordion" ).accordion();
} );

/*
-Morris.js is a carts library 
-for each chart a new instance is created:
-element: poulates the chart to the corrospondng element
-data: specifiy the data to be shown in the graph
-lable the x and y axis variables and the label that appears when you hover over each element. 
*/
new Morris.Line({
  // ID of the element in which to draw the chart.
  element: 'googleProjectsStats',
  // Chart data records -- each entry in this array corresponds to a point on
  // the chart.
  data: [
    { year: '2012', value: 100 },
    { year: '2013', value: 400 },
    { year: '2014', value: 1400 },
    { year: '2015', value: 2700 }
  ],
  // The name of the data record attribute that contains x-values.
  xkey: 'year',
  // A list of names of data record attributes that contain y-values.
  ykeys: ['value'],
  // Labels for the ykeys -- will be displayed when you hover over the
  // chart.
  labels: ['Projects'],
  //auto resize 
    resize: true
});

/*
-Same as above but this creates a donut chart with the contents of abount of data sold per year by CrowdFlower.com
*/
Morris.Donut({
  element: 'rowSoldStats',
  data: [
    {label: "2012", value: 2},
    {label: "2013", value: 10},
    {label: "2014", value: 20},
    {label: "2015", value: 100}
  ],
    resize: true
});
