var scaling = 1.50;
// count
var currentSliderCount = 0;
// var videoCount = $(".slider-container").children().length;
var videoCount = 1300;
// var videoCount = $(".slider-container").children().length;
var showCount = 4;
var sliderCount = videoCount / showCount;
var controlsWidth = 40;
var scollWidth = 0;
var videoWidth = 0;
var videoHeight = 0;
var videoWidthDiff = 0;
var videoHeightDiff = 0;
    
// alert("videoCount: "+videoCount);


  $(document).ready(function(){ 
  // $('.slider-container .slide:nth-last-child(-n+4)').prependTo('.slider-container'); 
	initSlider();
  });
 
$( window ).resize(function() {
    initSlider();
});
function initSlider(){
    // elements
    var win = $(window);
    var sliderFrame = $(".slider-frame");
    var sliderContainer = $(".slider-container");
    var slide = $(".slide");
    
    // counts
    var scollWidth = 0;
 
    
    // sizes
    var windowWidth = win.width();
    var frameWidth = win.width() - 80;
     if(windowWidth >= 0 && windowWidth <= 430){
       showCount = 2;
   }else if(windowWidth >= 430 &&  windowWidth <= 768){
       showCount = 3;
   }else if(windowWidth >= 769 &&  windowWidth <= 992){
	   showCount = 4;
   }
   
    videoWidth = ((windowWidth - controlsWidth * 2) / showCount );
    videoHeight = Math.round(videoWidth / (16/9));
    
    // console.log("videoWidth: "+videoWidth);
    
    videoWidthDiff = (videoWidth * scaling) - videoWidth;
    videoHeightDiff = (videoHeight * scaling) - videoHeight;
    
    // console.log("windowWidth: "+windowWidth);
  
    
    // set sizes
    sliderFrame.width(windowWidth);
    sliderFrame.height(videoHeight * scaling);
    
    
    // sliderFrame.css("top", (videoHeightDiff / 2));
    
    sliderContainer.height(videoHeight * scaling);
    // sliderContainer.width((videoWidth * videoCount) + videoWidthDiff);
    sliderContainer.width(80000);
    // console.log("sliderContainer: width: "+sliderContainer.width());
   // sliderContainer.width(4160);
    
    sliderContainer.css("top", (videoHeightDiff / 2));
    sliderContainer.css("margin-left", (controlsWidth));
    
    slide.height(videoHeight);
    slide.width(videoWidth);
    $(".slide").css("margin", 2);
    // hover effect
    $(".slide").mouseover(function() {
    	
    	 
    	
        $(this).css("width", videoWidth * scaling);
        $(this).css("height", videoHeight * scaling);
        $(this).css("top", -(videoHeightDiff / 2));
		$(this).css("margin", 2);
		var current_id = $(this).parent().attr('id');
		 
		$("#"+current_id).width($("#"+current_id).width()+250);
		
		// console.log("current_id: "+current_id);
		// console.log("indexxx: "+$("#"+current_id+" >
		// .slide").index($(this)));
        if($("#"+current_id+" > .slide").index($(this)) == 0 || ($("#"+current_id+" > .slide").index($(this)))% 4 == 0){
          // do nothing
        }
        else if(($("#"+current_id+" > .slide").index($(this)) + 1) % 4 == 0 && $("#"+current_id+" > .slide").index($(this)) != 0){
            $(this).parent().css("margin-left", -(videoWidthDiff - controlsWidth));
        }
        else{
            $(this).parent().css("margin-left", - (videoWidthDiff / 2));
        }
    }).mouseout(function() {
        $(this).css("width", videoWidth * 1);
        $(this).css("height", videoHeight * 1);
		$(this).css("margin", 2);
        $(this).css("top", 0);
        $(this).parent().css("margin-left", controlsWidth);
    });
    
    // controls
    // console.log("in controlls: frameWidth: "+frameWidth);
    // console.log("in controlls: scollWidth: "+scollWidth);
    controls(frameWidth, scollWidth);
}
function controls(frameWidth, scollWidth){
    var prev = $(".prev");
    var next = $(".next");
    
    prev.on("click", function(){
		// console.dir($(this));
        // console.log("currentSliderCount: "+currentSliderCount);
        // console.log("sliderCount: "+sliderCount);
		// console.log("frameWidth: "+frameWidth);
		
		
		
		
		
		var CurrentslideContantner = $(this).next().next().attr("id");
        // console.log("slide-contentner: "+ CurrentslideContantner );
        
        var currentSlideElements =  $("#"+CurrentslideContantner).children().length;
        // console.log("currentSlideElements ---- : "+currentSlideElements);
        var currentSliderWidth = $("#"+CurrentslideContantner);
       
        
        $("#"+CurrentslideContantner).width((videoWidth * currentSlideElements) + videoWidthDiff);
         // console.log("after width changed: "+currentSliderWidth.width());
		
     
         scollWidth = scollWidth + frameWidth;
 		// console.log("scollWidth: aftr: "+scollWidth);
 		
 		if(scollWidth >= currentSliderWidth.width() || scollWidth <=0 || currentSlideElements == 4){
 			scollWidth = 0;
 		}
 		
 		
          
         
		if(currentSliderCount <0){
			currentSliderCount = 0;
		}
		
		$("#"+CurrentslideContantner).animate({
            left: - scollWidth
        }, 10, function(){ 
            // console.log("currentSliderCount: "+currentSliderCount +" And
			// sliderCount: "+sliderCount);
			if(currentSliderCount >= sliderCount-1){
			
				$("#"+CurrentslideContantner).css("left", 0);
                currentSliderCount = 0;
                scollWidth = 0;
            }else{
                currentSliderCount++;
            }
        });        
    });
    next.on("click", function(){
    	
        
    	scollWidth = scollWidth - frameWidth;
		 console.log("scollWidth: b4: "+scollWidth);
		 var CurrentslideContantner = $(this).next().attr("id");
		 
		 // console.log("CurrentslideContantner: "+CurrentslideContantner);
		 
		 var currentSlideElements =  $("#"+CurrentslideContantner).children().length;
	         console.log("currentSlideElements ---- : "+currentSlideElements);
	     var currentSliderWidth = $("#"+CurrentslideContantner);
		 
		 $("#"+CurrentslideContantner).width((videoWidth * currentSlideElements) + videoWidthDiff);
          console.log("after width changed: "+currentSliderWidth.width());
         
         if(Math.abs(scollWidth) >= currentSliderWidth.width() || currentSlideElements == 4){
  			scollWidth = 0;
  		}
         
          console.log("scollWidth: after: "+scollWidth);
          console.log("currentSliderCount: : "+currentSliderCount);
         
         if(Math.abs(currentSliderCount) ==2 && currentSlideElements >8){
        	 scollWidth = scollWidth-1278;
         }
         if(Math.abs(currentSliderCount) ==3 && currentSlideElements >8){
  			 //console.log("inside if");
  			scollWidth = 0;
 		}
		 
		 
        $('#'+CurrentslideContantner).animate({
            left: + scollWidth
        }, 10, function(){ 
			// console.log("currentSliderCount:B4 "+currentSliderCount);
			 //console.log("sliderCount: "+sliderCount);
        
			  //console.log("currentSliderCount: "+currentSliderCount +" And sliderCount: "+sliderCount);
			if(Math.abs(currentSliderCount) >= sliderCount-1){
			
				$('#'+CurrentslideContantner).css("left", 0);
                currentSliderCount = 0;
                scollWidth = 0;
				
                
            }else{
                
				currentSliderCount--;
            }
			
        });
		 
       // $("#trending-items").css("left", scollWidth);
    });
};
 