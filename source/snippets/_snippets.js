

// Simple Validation script
REACTOR.simpleValidation = function() {
    var $simpleValidation = $('.submit-btn');
    if (!$simpleValidation.length) return;

    $simpleValidation.click(function(e) {
        e.preventDefault();

        var error = false;
        var fname = $('#fname').val();
        var lname = $('#lname').val();
        var email = $('#email').val();

        // Check that inputs are not empty
        if(fname.length == 0){
            var error = true;
            $('#fname').addClass('invalid');
            $('.fname').fadeIn(500);
        }else{
            $('#fname').removeClass('invalid');
            $('.fname').fadeOut(500);
        }
        if(lname.length == 0){
            var error = true;
            $('#lname').addClass('invalid');
            $('.lname').fadeIn(500);
        }else{
            $('#lname').removeClass('invalid');
            $('.lname').fadeOut(500);
        }
        if(email.length == 0 || email.indexOf('@') == '-1'){
            var error = true;
            $('#email').addClass('invalid');
            $('.email').fadeIn(500);
        }else{
            $('#email').removeClass('invalid');
            $('.email').fadeOut(500);
        }

        // If no errors show sucess message
        if(error == false){
            $('.sub-btn').hide();
            $('.success').delay(600).fadeIn();    
        }

    });
};


/*
 * Cookie handling
 */
REACTOR.cookie = {
    write: function(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    },
    read: function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)===' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
        }
        return null;    
    },
    wipe: function(name) {
        REACTOR.cookie.write(name, "", -1);
    }
};

REACTOR.selectAllBoxes = function() {

	 // SELECT ALL BOXES ON FORMS PAGE
	 $('#select-all').click(function(event) {   
	    if(this.checked) {
	        // Iterate each checkbox
	        $(':checkbox').each(function() {
	            this.checked = true;                        
	        });
	    }
	    else { // Iterate each checkbox 
	    	$(":checkbox").each(function() { 
	    	this.checked = false; }); 
	    }
	});
};

REACTOR.validationAdditional = function() {

	// TO BE USED WITH THE VALIDATION PLUGIN FOR JQUERY - ALLOWS YOU TO COMPARE TWO FIELDS TO MAKE SURE THEY ARE THE SAME
	$("#email-notification").validate({
 		rules: {
       		password: "required",  		//ID OF FIRST FIELD
        	confirm_password: {			//ID OF SECOND FIELD THAT NEEDS TO EQUAL FIRST
          		equalTo: "#password"
        	},
        	email: "required",
        	confirm_email: {
        		equalTo: "#email"
        	}
        }
    });	
 };

//  REACTOR.localStorage = function() {
//       $(document).ready(function(){
//          if (Modernizr.localstorage) {
//                 if (sessionStorage["your_name"]) {
//                     $('#your_name').val(sessionStorage["your_name"]);
//                 }
//                 if (sessionStorage["your_surname"]) {
//                     $('#your_surname').val(sessionStorage["your_surname"]);
//                 }
//               $('.localStore').blur(function () {
//                   sessionStorage[$(this).attr('id')] = $(this).val();
//               });

//               $('#localStorageTest').submit(function() {
//                 localStorage.clear();
//               });
//         }
//     });
// };


REACTOR.accordion = function() {
    var $accordion = $('.accordion');
    if (!$accordion.length) return;

    $('.accordion .sub_item').each(function(index) {
        $(this).css('height', $(this).height());
    });

    $accordion.find('ul').hide();

    $('.accordion > li > a').click(function(e){
        e.preventDefault();
        if (!$(this).hasClass('active')){
            $('.accordion li ul').slideUp();
            $(this).next().slideToggle();
            $('.accordion li a').removeClass('active');
            $(this).addClass('active');
        } else {
            $(this).next().slideUp();
        }
    });
};


REACTOR.tabs = function() {
    $tabs = $("#tabs");
    if (!$tabs.length) return;
//  When user clicks on tab, this code will be executed
    $("#tabs li").click(function() {
        //  First remove class "active" from currently active tab
        $("#tabs li").removeClass('active');
 
        //  Now add class "active" to the selected/clicked tab
        $(this).addClass("active");
 
        //  Hide all tab content
        $(".tab_content").hide();
 
        //  Here we get the href value of the selected tab
        var selected_tab = $(this).find("a").attr("href");
 
        //  Show the selected tab content
        $(selected_tab).fadeIn();
 
        //  At the end, we add return false so that the click on the link is not executed
        return false;
    });


};

REACTOR.responsive = function() {
    $('.responsive').each(function() {
        var $this = $(this);
        var fullSize = $this.data('full');
        if($this.data('bg')) {
            $this.css('background-image','url('+fullSize+')');
        } else {
            $this.attr('src', fullSize);
        }
    });
};