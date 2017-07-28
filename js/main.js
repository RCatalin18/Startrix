/*=================== 
LOADING SCREEN
=====================*/
$(document).ready(function(){
    setTimeout(function(){
        $('.loading').css('display', 'none'); 
    }, 350);
     
});





/* pornire de la inceputul pagini cand dai refresh 
$(window).ready(function(){
	$(window).on('beforeunload', function() {
    	$(window).scrollTop(0); 
	});	
});
/*===pornire de la inceputul pagini cand dai refresh */





/*=================== 
BARA DE NAVIGARE
=====================*/


// scroll tranzitie cand apesi pe o ancora
$(window).on('load', function() {
    // utilizare: ancora trebuie sa aiba clasa "page-scroll" si atributul href trebuie sa contina calea catre element (exemplu: catre
    // sectiunea #about-universe)

    // (!) de la un template facut cu bootstrap (link: https://startbootstrap.com/template-overviews/scrolling-nav/)
    $('a.page-scroll').on('click', function(event) {
        $('html, body').stop().animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 1000);
        event.preventDefault();
    });
});


// subliniere link cand elementul este in zona de vizualizare

$(window).on('load', function(){
    // utilizare: la fel ca la scroll tranzitie(codul de mai sus)
    

    $(window).on('scroll resize', function() {

        var scrollMid = $(window).scrollTop() + $(window).height()/2;

        $('a.page-scroll').each(function(i){

            var $element = $($(this).attr('href'));
            var element_height = $element.outerHeight();
            var element_top_position = $element.offset().top;
            var element_bottom_position = (element_top_position + element_height);

            if((element_top_position <= scrollMid) && (element_bottom_position >= scrollMid)) {
                $('nav ul li a').removeClass('selected');
                $(this).addClass('selected');
            }

        });
    });
});

// butonul toggle
$(window).on('load', function(){
    // hamburger menu 
    $('nav button').click(function(){
        $('nav button').toggleClass('active-menu');
    });


    // hamburger menu - rezolvarea unui bug cand redimensionezi latimea ecranului
    $(window).resize(function(){
        var width = $(window).width();
        if(width > 768) {
            $('nav button').removeClass('active-menu');
        }
    });


    // toggle buton
	$('nav button').click(function(){
		$('nav ul').slideToggle();
	});	


	//toggle buton - rezolvarea unui bug cand redimensionezi latimea ecranului 
	$(window).resize(function(){
	   if( $(window).width() > 768 && $('nav button').is(':hidden') ) {
	       $('nav ul').removeAttr('style');
	   }
	});

});


// schimbarea culorii bari de navigare
$(window).on('load', function(){
    // acest cod adauga si elimina clasa "nav-color" pe care o puteti gasi in style.css
    $(window).on('load scroll resize', function(){
            var window_width = $(window).width();
            var scrollTop = $(window).scrollTop();
            var nav_height = $('nav').height();
            var change_color_point = $('#about-universe').offset().top;
            if(window_width > 768) {
                if(scrollTop + nav_height >= change_color_point) {
                    $('nav').addClass('nav-color');
                } else {
                    $('nav').removeClass('nav-color');
                }
            } else {
                $('nav').addClass('nav-color');
            }
    });
});


// cand apesi o ancora link-ul url ramane neschimbat
$('a').click(function(event){
    event.preventDefault();
});





/*=================== 
SECTIUNEA BANNER
=====================*/


// butonul "sa incepem" de la banner
$(window).on('load', function(){

	$('#banner a').click(function(){
		$('html, body').animate({scrollTop : $('#about-universe').offset().top},800);
	});
});


/* parallax banner content */
$(window).on('scroll resize', function(){
    
    var scrollTop = $(window).scrollTop();
    var maxparallax = $('#about-universe').offset().top;
    var maxwidth = $(window).width();

    if(scrollTop > 0 && maxparallax > scrollTop && maxwidth > 768 ){

    var offbanner = $('#banner .inner').offset().top + $('#banner .inner').height();
    // (!) formula de la opacitate nu este realizata de mine
    var opacity = 1 - (scrollTop - offbanner + 400) / 400;

    $('#banner .inner').css({'transform': 'translateY('+ -scrollTop/3 +'px)'});
    $('#banner .inner').css({'opacity': opacity});
    } else if(maxwidth <= 768) {
       $('#banner .inner').css({'transform': 'translateY('+ 0 +'px)'});
        $('#banner .inner').css({'opacity': 1}); 
    } 
});





/*================================= 
APARITIE ANIMATIE CAND DAI SCROLL
===================================*/

$(window).on('load', function(){
    // utilizare: elementul care trebuie animat trebuie sa contina clasa "animated" si clasa "visibility-hidden".

    // data atribute:
    // data-animation-name  -  numele animatiei. Toate animatiile le gasiti in animate.css. Nu are valoare implicita.
    // data-animation-duration  -  durata animatiei (trebuie precizata unitatea de masura). Implicit este 0.
    // data-animation-delay   -  daca vreti ca animatia sa nu porneasca instant (trebuie precizata unitatea de masura). Implicit este 0.
    // data-animation-iteration-count  -  de cate ori sa se repete animatia. Implicit este 1.
    

    // (!) ideea acestui cod este preluata dintr-un articol de pe sitepoint. Ce am adaugat in plus este data atributele pentru ca
    //     algoritmul initial iti permitea sa adaugi doar un tip de animatie si acum poti adauga mai multe animatii si le poti seta
    //     durata,delay-ul si de cate ori sa se repete direct din fisierul index.html
    //     (link: sitepoint.com/scroll-based-animations-jquery-css3/)
    $(window).on('scroll resize', function(){

        var window_height = $(window).height();
        var scrollTop = $(window).scrollTop();
        var scrollBottom = (scrollTop + window_height);

        $('.animated').each(function(i){

            var $element = $(this);
            var element_height = $element.outerHeight();
            var element_top_position = $element.offset().top;
            var element_bottom_position = (element_top_position + element_height);

            var animation_name = $element.data('animation-name');
            var animation_duration = $element.data('animation-duration');
            var animation_delay = $element.data('animation-delay');
            var animation_iteration = $element.data('animation-iteration');

            $(this).css({
                'animation-duration': animation_duration,
                '-webkit-animation-duration': animation_duration
            });

            $(this).css({
                'animation-delay': animation_delay,
                '-webkit-animation-delay': animation_delay
            });

            $(this).css({
                'animation-iteration-count': animation_iteration,
                '-webkit-animation-iteration-count': animation_iteration
            });

            if((scrollTop <= element_bottom_position ) && (scrollBottom >= element_top_position)) {
                $element.addClass(animation_name).removeClass('visibility-hidden');       
            }

        });
   
    });
    
    $(window).trigger('scroll');
});


/*=================== 
MODAL BOX
=====================*/
$(window).on('load', function(){
    // utilizare: trebuie sa ii dati unui buton(sau orice altceva) clasa "more-info" si data atributul "data-modal" care trebuie sa contina  
    // clasa care diferentiaza acel modal box de celelalte. Exemplu: pentru modal box-ul cu Galaxii avem clasa "modal-box1", pentru Stele 
    // avem "modal-box2" etc..
    // NOTA: ancora care are forma de "X" din modal box trebuie sa aiba si el clasa "more-info" si data atributul "data-modal"!
    

    // se adauga un bakground transparent si se dezactiveaza scroll-ul
    $('.more-info').click(function(){
       $('.overlay-modal').toggle();
       $('html').toggleClass('disable-scroll');

    });


    // inchidere modal box cand apesi in afara lui
    // (!) aici ma ajutat un membru de pe stackoveflow pentru a o realiza.
    $(document).mouseup(function(e){
        var modal = $('.modal-box');

        if (!modal.is(e.target) && modal.has(e.target).length === 0 && e.which === 1) {

            modal.css({'display' : 'none'}).removeClass('revealbottom');
            $('.overlay-modal').css({'display' : 'none'});
            $('html').removeClass('disable-scroll');
        }
    });


    // aparitie modal box cand apesi pe elementul care contine clasa "more-info"
    $('.more-info').click(function(){
        var $element = $(this).data('modal');
        $('.' + $element).toggle().toggleClass('revealbottom');
    });
     
});



