/*******************************************

1.  ACTIVE MENU LINK

********************************************/
jQuery.noConflict()(function($){
    function calculateScroll() {
        var topRange = 400;
        var contentTop      =   [];
        var contentBottom   =   [];
        var winTop      =   $(window).scrollTop();
        var rangeTop    =   200;
        var rangeBottom =   500;
        $('.navmenu').find('a').each(function(){
            contentTop.push( $( $(this).attr('href') ).offset().top );
            contentBottom.push( $( $(this).attr('href') ).offset().top + $( $(this).attr('href') ).height() );
        })
        $.each( contentTop, function(i){
            if ( winTop > contentTop[i] - rangeTop && winTop < contentBottom[i] - rangeBottom ){
                $('.navmenu li')
                .removeClass('active')
                .eq(i).addClass('active');
            }
        })
    }
    $(document).ready(function() {
        calculateScroll()
        $(window).scroll(function(event) {
            calculateScroll();
        });
        $('.navmenu ul li a').click(function() {  
            $('html, body').animate({scrollTop: $(this.hash).offset().top - 80}, 1000);
            return false;
        });
    });   
});
/*******************************************

2.  MENU FOR THE PHONES

********************************************/
jQuery.noConflict()(function($){
    $(document).ready(function() {
        /*Menu displaying only on the phone*/
        // Create the dropdown base
        $("<select />").appendTo("nav.navmenu");

        // Create default option "Go to..."
        $("<option />", {
            "selected": "selected",
            "value"   : "",
            "text"    : "Go to..."
        }).appendTo("nav.navmenu select");

        // Populate dropdown with menu items
        $("nav.navmenu a").each(function() {
                var el = $(this);
                var menu_url = el.attr("href");
                var menu_text = el.text();

                if (el.parents("li").length == 2) { menu_text = '- ' + menu_text; }
                if (el.parents("li").length > 3) { menu_text = "-- " + menu_text; }
                $("<option />", {"value": menu_url, "text": menu_text}).appendTo("nav.navmenu select")
        });
        // To make dropdown actually work
        // To make more unobtrusive: http://css-tricks.com/4064-unobtrusive-page-changer/
        $("nav.navmenu select").change(function() {
            window.location = $(this).find("option:selected").val();
        });
    });    
});
/*******************************************

3.  SLIDER ABOUT US

********************************************/
jQuery.noConflict()(function($){
    $(document).ready(function() {
		$('#slider-id').liquidSlider();
    });    
});


/*******************************************

4.  TABS ABOUT US

********************************************/
jQuery.noConflict()(function($){
	jQuery(document).ready(function ($) {
		$('#myTab').tab();
		
	});
});

/*******************************************

5.  ISOTOP

********************************************/
jQuery.noConflict()(function($){
    $(window).load(function(){
        // cache container
        var $container = $('#portfolio_container');
        // initialize isotope
        $container.isotope({
            // options...
            itemSelector : ' .box',
            layoutMode : 'fitRows'
        });
        // filter items when filter link is clicked
        $('div.portfolio_filters ul li a').click(function(){
            var selector = $(this).attr('data-filter');
            $container.isotope({ filter: selector });
            return false;
        });
    });

});

/*******************************************

6.  prettyPhoto

********************************************/

jQuery.noConflict()(function($){
    $("a[rel^='prettyPhoto']").prettyPhoto({animation_speed:'normal',slideshow:6000});
	$(".contactDetails a[rel^='prettyPhoto']:first").prettyPhoto({
		custom_markup: '<div id="map_canvas" style="width:500px; height:500px"></div>',
		changepicturecallback: function(){ initialize(); }
	});
	
	$(document).ready(function() {
			/*
			var defaults = {
	  			containerID: 'toTop', // fading element id
				containerHoverID: 'toTopHover', // fading element hover id
				scrollSpeed: 1200,
				easingType: 'linear' 
	 		};
			*/
			
			$().UItoTop({ easingType: 'easeOutQuart' });
			
		});
});

/*******************************************

7.  contact form

********************************************/

jQuery.noConflict()(function($){
	$(document).ready(function(){
		$("#ajax-contact-form").submit(function() {
			var str = $(this).serialize();		
			$.ajax({
				type: "POST",
				url: "contact_form/contact_process.php",
				data: str,
				success: function(msg) {
					// Message Sent - Show the 'Thank You' message and hide the form
					if(msg == 'OK') {
						result = '<div class="notification_ok">Your message has been sent. Thank you!</div>';
						$("#fields").hide();
					} else {
						result = msg;
					}
					$('#note').html(result);
				}
			});
			return false;
		});
		
		//Input and Textarea Focus
		$('input[type=text]').focus(function() {
			if($(this).attr('readonly') || $(this).attr('readonly') == 'readonly') return false;
			if ($(this).val() === $(this).attr('title')) {
					$(this).val('');
			}   
			}).blur(function() {
			if($(this).attr('readonly') || $(this).attr('readonly') == 'readonly') return false;
			if ($(this).val().length === 0) {
				$(this).val($(this).attr('title'));
			}                        
		});	
		$('textarea').focus(function() {
			if ($(this).text() === $(this).attr('title')) {
					$(this).text('');
				}        
			}).blur(function() {
			if ($(this).text().length === 0) {
				$(this).text($(this).attr('title'));
			}                        
		});	
	});
});

