$(document).ready(function() {



    $('#apply_now').on('submit', function() {




        var full_name_apply = $("#full_name_apply").val();
        var email_apply = $("#email_apply").val();
		var mobile_apply = $("#mobile_apply").val();
		var country_apply = $("#country_apply").val();
		var amount_apply = $("#amount_apply").val();
		 

            this.timer = setTimeout(function() {

                $.ajax({
                    url: 'mail_apply.php',
                    data: 'fullN=' + full_name_apply + '&emailA=' + email_apply + '&mobileA=' + mobile_apply+'&countryA=' + country_apply+ '&amountA=' + amount_apply,
                    type: 'post',
                    success: function(msg) {

                       



  var maninArea = document.getElementById("apply_form_modal");

apply_form.innerHTML = '<center>'+
'<img src="https://cdn0.iconfinder.com/data/icons/round-ui-icons/512/tick_green.png" style="height:100px;">'+
'<h2 class="modal-title title title--md" style="font-size:18px;">Thank You!! Your application has been received. <br>Our representative will reach you shortly.</h2></center>';



setTimeout(function(){ 



}, 2000);





                    }

                });
            }, 200);
            return false;




        

    });
	
	
	
	
	
	
	
	
	
	
	$('#let_us_call_you').on('submit', function() {




        var full_name = $("#full-name").val();
        var email = $("#email").val();
		var mobile_no = $("#mobile-no").val();
		 alert(full_name);
		 alert(email);
		  alert(mobile_no);
		  
		  
		  
            this.timer = setTimeout(function() {

                $.ajax({
                    url: 'index.php',
                    data: 'request=contact&full_name=' + full_name + '&email=' + email + '&mobile_no =' + mobile_no ,
                    type: 'post',
                    success: function(msg) {

                       
                    }

                });
            }, 200);
            return false;




        

    });
	
	
	
	
	
	
	
	
	
	
	
	
});