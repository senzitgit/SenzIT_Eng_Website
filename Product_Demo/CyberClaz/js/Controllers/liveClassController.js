attentionModeFlag = 0;
switchVideoFlag = 0;
var textToSpeechdata = "";
var clazDuration = "";
document.getElementById("picturePanelNav").innerHTML ='<img src="'+sessionStorage.getItem("proPic")+'">';

document.getElementById("namePanelNav").innerHTML ='<b>'+sessionStorage.getItem("firstName")+'</b>';




var secz = 0;
var minsz = 0;
var hourz = 0;

var raiseTextArray=[];

var TeacherName = sessionStorage.getItem("TeacherName");
var StartTime = sessionStorage.getItem("StartTime");
var Chaptername = sessionStorage.getItem("Chaptername");
var Topicname = sessionStorage.getItem("Topicname");
var ProfilePicURL = sessionStorage.getItem("ProfilePicURL");
var userId = sessionStorage.getItem("loguser");
var ClazEventDetailId = sessionStorage.getItem("ClazEventDetailId");

sessionStorage.setItem("classEventId",ClazEventDetailId);

var userPic = sessionStorage.getItem("proPic");
var raiseHandListFlag = 1;
var attachmentListFlag = 1;



$(function () {
    $('#toGDiv').click(function () {
        $('#box-body').slideToggle();
      
    });
    
  
    
});


$(function () {
    $('#toGDivButton').click(function () {
        $('#box-body').slideToggle();
      
    });
    

});








start_websocket();
show();










function openPopup(attachmentListFlag) {



    var liveAttachmentsJson = sessionStorage.getItem("liveClassAttachment");



    obj = JSON.parse(liveAttachmentsJson);

    var arrayLength = liveAttachments.liveClassAttachment.length;

    var filename = '';
    var filelink = '';
    var filetype = '';


    for (var i = 0; i < arrayLength; i++) {
        var cur = obj.liveClassAttachment[i];
        if (cur.index == attachmentListFlag) {

            filename = cur.name;
            filelink = cur.link;
            filetype = cur.type;




        }
    }

    if (filetype == 'pdf') {
        $.fancybox({
            type: 'html',
            autoSize: false,
            content: '<embed src="' + filelink + '#nameddest=self&page=1&view=FitH,0&zoom=80,0,0" type="application/pdf" height="99%" width="100%" />',
            beforeClose: function() {
                $(".fancybox-inner").unwrap();
            },
            helpers: {
                overlay: {
                    opacity: 0.3
                }
            }
        });

    } else {


        $.fancybox([{
            href: filelink,
            title: '01'
        }], {
            //			href: this.href,
            helpers: {
                overlay: {
                    opacity: 0.3
                } // overlay
                //, buttons: {}
            } // helpers
        }); // fancybox


    }




}


var liveAttachments = {
    "liveClassAttachment": [


    ]

};


var liveraiseHands = {
    "liveClassRaiseHand": [


    ]

};


logs = {
    "classNotes": [



    ]

};

var liveSessionFlag = sessionStorage.getItem("liveSessionFlag");



/*

var notzPic = document.getElementById("notzPic");
notzPic.innerHTML = '<img src="' + userPic + '" class="img-circle">';

var doubtPic = document.getElementById("doubtPic");
doubtPic.innerHTML = '<img src="' + userPic + '" class="img-circle">';*/


function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var m = date.getMonth() + 1;
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    var strTime = hours + ':' + minutes + ':' + seconds;
    return date.getDate() + "/" + m + "/" + date.getFullYear() + "  " + strTime;
}



function start_websocket() {

    websocket = new WebSocket("wss://" + webSocketIp + "/socket/" + userId);

    websocket.onopen = function() {
        websocket.send("Claz Portal");
        console.log("Message Send");

    };

    websocket.onmessage = function(evt) {

        var result = evt.data;
        console.log("websocket message");
        console.log(result);

        parseResult(result);

    };

    startClass();

}





function startClass(){
	   if (liveSessionFlag == '1') {


           attendClass();
           sessionStorage.setItem("liveSessionFlag", "1");
       } else {

           startSession();
           sessionStorage.setItem("liveSessionFlag", "1");
       }
}



function parseResult(result) {
    var Teachimage = "";
    var obj = JSON.parse(result);
    var origin = obj.origin;

    if (origin == "shareAttachment") {


       // document.getElementById('attachmentButton').style['-webkit-animation'] = 'pulse-border 1s infinite';

        var obj = JSON.parse(result);
        var cur = obj.response.shareAttachmentResult;


        liveAttachments.liveClassAttachment.push({
            "link": cur.link,
            "name": cur.name,
            "type": cur.type,
            "index": attachmentListFlag

        });

        //alert(JSON.stringify(liveAttachments));

        sessionStorage.setItem("liveClassAttachment", JSON.stringify(liveAttachments));

        var addAttach = document.getElementById('addAttach');

       addAttach.innerHTML = '<article id="chat-id-1" class="chat-item right"> <a href="javascript:void(0)" class="pull-right thumb-sm avatar"><img src="' + ProfilePicURL + '" class="img-circle"></a> <section class="chat-body" > <div class="panel bg bg-success text-sm m-b-none"  style="background-color:#00c6c1"> <div class="panel-body" style="height:30px;padding: 5px;"> <span class="arrow right" style="border-left-color:#00c6c1"></span>' + cur.name + '<a href="javascript:void(0)" onclick="openPopup(' + attachmentListFlag + ')"><div class="fa fa-eye" Style="font-size:15px;float:right;color:#fff"></div> </a>    <a href="' + cur.link + '" download><div class="fa fa-download" Style="font-size:15px;float:right;margin-right:20px;color:#fff"></div></a></div>  </div> <small class="text-muted"><i class="fa fa-paperclip"></i>&nbsp;&nbsp;Type : ' + cur.type + '</small> </section> </article>' + addAttach.innerHTML;
        
        
        
        
        attachmentListFlag++;
        
        
        
        
        
        var addLogs = document.getElementById('addLogs');
        addLogs.innerHTML = '<article style="margin-right:10px;" id="chat-id-1" class="chat-item left"> <a href="javascript:void(0)" class="pull-left thumb-sm avatar"><img src="' + ProfilePicURL + '" class="img-circle"></a> <section class="chat-body"> <div class="panel text-sm m-b-none"> <div class="panel-body" style=" height: 35px;padding: 5px;background-color:#00c6c1;color:#fff; "> <span class="arrow left" style="border-right-color:#00c6c1;"></span><span style="font-size:12px; margin-top:-30px;">' + cur.name + ' File shared</span> </div> </div> <small class="text-muted"><i class="fa fa-check text-success"></i>' + cur.timestamp + '</small> </section> </article>' + addLogs.innerHTML;

        
	  textToSpeechdata = textToSpeechdata + TeacherName +" shared a file with filename "+filename+" at"+cur.timestamp+". ";

        
        
        
        
        
        

        


    } else if (origin == "generalLog") {




       // document.getElementById('logButton').style['-webkit-animation'] = 'pulse-border 1s infinite';


        var obj = JSON.parse(result);
        var cur = obj.response.generalLogResult;

        if (cur.raiseHandText == "0") {
            var addLogs = document.getElementById('addLogs');
            addLogs.innerHTML = '<article style="margin-right:10px;" id="chat-id-1" class="chat-item left"> <a href="javascript:void(0)" class="pull-left thumb-sm avatar"><img src="' + cur.profilePic + '" class="img-circle"></a> <section class="chat-body"> <div class="panel text-sm m-b-none"> <div class="panel-body" style=" height: 35px; padding: 5px;background-color:#00c6c1;color:#fff; "> <span class="arrow left" style="border-right-color:#00c6c1;"></span><span style="font-size:12px; margin-top:-30px;">' + cur.logText + '</span> </div> </div> <small class="text-muted"><i class="fa fa-check text-success"></i>' + cur.timestamp + '</small> </section> </article>' + addLogs.innerHTML;
       
            
        
        } else {

            var question = cur.raiseHandText;
            var answer = cur.raiseHandAnswer;
            var user = cur.logText;
            user = user.replace(/(\w+).*/, "$1");
            var pic = cur.profilePic;


            liveraiseHands.liveClassRaiseHand.push({
                "question": question,
                "answer": answer,
                "user": user,
                "pic": pic,
                "index": raiseHandListFlag

            });

            //alert(JSON.stringify(liveraiseHands));
            sessionStorage.setItem("liveClassRaiseHand", JSON.stringify(liveraiseHands));

            var addLogs = document.getElementById('addLogs');
            addLogs.innerHTML = '<article style="margin-right:10px;" id="chat-id-1" class="chat-item left"> <a href="javascript:void(0)" class="pull-left thumb-sm avatar"><img src="' + cur.profilePic + '" class="img-circle"></a> <section class="chat-body"> <div class="panel text-sm m-b-none"> <div class="panel-body" style=" height: 35px; padding: 5px;background-color:#00c6c1;color:#fff; "> <span class="arrow left" style="border-right-color:#00c6c1;"></span><span style="font-size:12px; margin-top:-30px;">' + cur.logText + '</span> <a href="javascript:void(0)" onclick="RHModal(' + raiseHandListFlag + ')" style="float:right;"><div style="color:#fff;font-size:15px;" class="fa fa-comment"></div></a></div> </div> <small class="text-muted"><i class="fa fa-check text-success"></i>' + cur.timestamp + '</small> </section> </article>' + addLogs.innerHTML;

            raiseHandListFlag++;
            


            var raiseHandDoubts = document.getElementById(cur.raiseHandText);
            raiseHandDoubts.innerHTML = '<article id="' + cur.raiseHandText + '" style="" id="chat-id-1" class="chat-item left"> <a href="javascript:void(0)" class="pull-left thumb-sm avatar"><img src="' + cur.profilePic + '" class="img-circle"></a> <section class="chat-body"> <div class="panel text-sm m-b-none">    <div class="panel-body" style=" padding: 5px;background-color:#00c6c1;color:#fff; "> <span class="arrow left" style="border-right-color:#00c6c1"></span>' + cur.raiseHandText + ' <br>Answer : ' + cur.raiseHandAnswer + ' </div></div> <small class="text-muted"><i class="fa fa-circle text-success text-xs"></i> </small> &nbsp;Answered </section> </article>';



        }




    } else if (origin == "raiseHandQueueNotification") {

    	
    	var obj = JSON.parse(result);
    	
        var Teachimage = userPic;
        var raiseText = obj.response.queueNotificationResult.queuedQuestion;
          
        var raiseHandDoubts = document.getElementById(raiseText);
        raiseHandDoubts.innerHTML = '<article id="' + raiseText + '" style="" id="chat-id-1" class="chat-item left"> <a href="javascript:void(0)" class="pull-left thumb-sm avatar"><img src="' + Teachimage + '" class="img-circle"></a> <section class="chat-body"> <div class="panel text-sm m-b-none"> <div class="panel-body" style=" padding: 5px;background-color:#FF4747;color:#fff; "> <span class="arrow left" style="border-right-color:#FF4747;"></span>' + raiseText + '</div> </div> <small class="text-muted"><i class="fa fa-circle text-danger text-xs"></i> </small> &nbsp;Added In Queue </section> </article>';



    } else if (origin == "stopRecord") {


        sessionStorage.setItem("liveSessionFlag", "0");
       
		   	 $("#stopModal").modal('show');
			 
		    	
	    	  var controlPanelLiveClass = document.getElementById('controlPanelLiveClass');

	    	  controlPanelLiveClass.innerHTML ='<div style="margin-top:45%"></div><center>'+
	    	        '<img id="stopDown" style="height:100px"><br>'+
	    	         '<b>The class has ended. You will be re-directed to the Dashboard now..</b>'+ 
	    	        '</center>'+
	    	        '</div>' ;
	    	
	    	
	    	
	    	
	    	
	    	$('#stopDown').attr("src",'images/giphy.gif');
	   
	    
	    		 
	    	 setTimeout(function () {  
	    		 
	    		 
	    		 
	    		 
	    		 
	    		 
	    	 }, 5000);
	    	
	    	
	   
			 
			 
			 
			 
			 
			 
			 
			 
	    				 
			 $.ajax({
		    url: webServerUrl,
		    data: 'request=exitSession&clazNotes=' + sessionStorage.getItem("clazNotes") + '&ClazEventDetailId=' + ClazEventDetailId,
		    type: 'post',
		    success: function(msg) {
		
		        setTimeout(function() {
		
		            var url = "student_dashboard.html";
		              $(location).attr('href', url);
		
		
		        }, 5000);
		
		
		    }
		
		});


    } else if (origin == "attentionMode") {


        if (attentionModeFlag == '0') {

            $("#smallModal").modal('show');

            attentionModeFlag = 1;

        } else  {

             $("#smallModal").modal('hide');

            attentionModeFlag = 0;

        } 




    } else if (origin == "switchVideo") {

     
        var video2 = sessionStorage.getItem("vidFeed2");
        var video4 = sessionStorage.getItem("vidFeed4");


        if (switchVideoFlag == '0') {

        	
        	
        	var playerInstance = jwplayer("liveVid2");
        	playerInstance.setup({
        	 autostart: true,
        	 image: "images.jpg",
        	 file: video4,
        	 height: "350",
             width: "100%",
             logo: {
                 file: "images/logo_jw.png"
             },
             repeat:'always',
             'stretching': 'exactfit',
        	 title: "My Cool Trailer"
        	});

        	
        	
        	
        	
        	
        	
        	
        	
        	
        	
        	


            switchVideoFlag = 1;

        } else if (switchVideoFlag == '1') {
        	
        	
        	
        	
        	
        	
        	
        	
        	var playerInstance = jwplayer("liveVid2");
        	playerInstance.setup({
        	 autostart: true,
        	 image: "images.jpg",
        	 file: video2,
        	 height: "350",
             width: "100%",
             logo: {
                 file: "images/logo_jw.png"
             },
             repeat:'always',
             'stretching': 'exactfit',
        	 title: "My Cool Trailer"
        	});
        	
        	
        	
        	
        	
        	
        	
        	
        	
        	

          /*  jwplayer("liveVid2").setup({
                autostart: true,
                file: video2,

                rtmp: {
                    bufferlength: 6
                },


                height: "350",
                width: "602",
                primary: "flash",
                'stretching': 'exactfit',
                logo: {
                    file: "images/logo_jw.png"
                },
                repeat:'always'


            });
*/
        	
        	
        	
        	
        	


            switchVideoFlag = 0;

        }


    }

}






















































function startSession() {

    sessionStorage.setItem("liveSessionFlag", "0");

    $.ajax({
        url: webServerUrl,
        data: 'request=startSession',
        type: 'post',
        success: function(msg) {
            var loginJson = msg.trim();
            obj = JSON.parse(loginJson);
            var resultCode = obj.response.resultcode;
            var message = obj.response.message;

            if (resultCode == 1) {


                var liveSessionDetails = sessionStorage.getItem("liveSessionDetails");
                var liveJson = liveSessionDetails.trim();
                obj = JSON.parse(liveJson);

                var timestamp = obj.response.startRecordResult.timestamp;
                
                
                
              
                
                
                
                
                var video1 = obj.response.startRecordResult.liveCamDetails.CAM1.Url;
                var video2 = obj.response.startRecordResult.liveCamDetails.CAM2.Url;
                var video3 = obj.response.startRecordResult.liveCamDetails.CAM3.Url;
                var video4 = obj.response.startRecordResult.liveCamDetails.CAM4.Url; 

                var audio1 = obj.response.startRecordResult.liveCamDetails.CAM1.Aud;
                var audio2 = obj.response.startRecordResult.liveCamDetails.CAM2.Aud;
                var audio3 = obj.response.startRecordResult.liveCamDetails.CAM3.Aud;
                var audio4 = obj.response.startRecordResult.liveCamDetails.CAM4.Aud;




                sessionStorage.setItem("vidFeed1", video1);
                sessionStorage.setItem("vidFeed2", video2);
                sessionStorage.setItem("vidFeed3", video3);
                sessionStorage.setItem("vidFeed4", video4);

                sessionStorage.setItem("audFeed1", audio1);
                sessionStorage.setItem("audFeed2", audio2);
                
                
                
                
                
                
                
                
                
    /*            var Chapter = document.getElementById("Chapter");
                Chapter.innerHTML = Chaptername;

                var Topic = document.getElementById("Topic");
                Topic.innerHTML = Topicname;

                var Teacher = document.getElementById("Teacher");
                Teacher.innerHTML = TeacherName;


                var sTime = document.getElementById("sTime");
                sTime.innerHTML = StartTime;
*/
                
                
                
            	var ClassInfo = document.getElementById("ClassInfo"); 
		   		ClassInfo.innerHTML = '<small class="text-uc text-xs text-muted">Chapter</small>'+
                   ' <p>'+Chaptername+'</p>'+
                   ' <small class="text-uc text-xs text-muted">Topic</small> '+
                    '<p>'+Topicname+'</p>'+
                    '<div class="line"></div>'+
                    '<small class="text-uc text-xs text-muted">download</small>  ';
            
                
                
                
                
                
                
                
                
                
                




                $.ajax({
                    url: webServerUrl,
                    data: 'request=inClass',
                    type: 'post',
                    success: function(msg) {
                        var loginJson = msg.trim();
                        obj = JSON.parse(loginJson);
                        var resultCode = obj.response.resultcode;
                        var message = obj.response.message;

                        if (resultCode == 1) {


                        }
                    }

                });



               /* var addLogs = document.getElementById('addLogs');
                addLogs.innerHTML = '<article style="margin-right:10px;" id="chat-id-1" class="chat-item left"> <a href="javascript:void(0)" class="pull-left thumb-sm avatar"><img src="' + userPic + '" class="img-circle"></a> <section class="chat-body"> <div class="panel text-sm m-b-none"> <div class="panel-body" style=" padding: 5px;background-color:#00c6c1;color:#fff; "> <span class="arrow left" style="border-right-color:#00c6c1;"></span><span style="font-size:12px; margin-top:-30px;"> Recording Started.</span> </div> </div> <small class="text-muted"><i class="fa fa-check text-success"></i>' + timestamp + '</small> </section> </article>';
*/

                
                
                
                var playerInstance1 = jwplayer("liveVid1");
            	playerInstance1.setup({
            	 autostart: true,
            	 image: "images.jpg",
            	 file: video1,
            	 height: "214",
                 width: "100%",
                 logo: {
                     file: "images/logo_jw.png"
                 },
                 repeat:'always',
                 'stretching': 'exactfit',
            	 title: "My Cool Trailer"
            	});
                
                
                
                
                
                
                
                
                
                
                
                
             
                
                
                
                var playerInstance2 = jwplayer("liveVid2");
            	playerInstance2.setup({
            	 autostart: true,
            	 image: "images.jpg",
            	 file: video2,
            	 height: "350",
                 width: "100%",
                 logo: {
                     file: "images/logo_jw.png"
                 },
                 repeat:'always',
                 'stretching': 'exactfit',
            	 title: "My Cool Trailer"
            	});
                
                
                
                
                
           
                
                
                
                
                
                var playerInstance3 = jwplayer("liveVid3");
            	playerInstance3.setup({
            	 autostart: true,
            	 image: "images.jpg",
            	 file: video3,
            	 height: "214",
                 width: "100%",
                 logo: {
                     file: "images/logo_jw.png"
                 },
                 repeat:'always',
                 'stretching': 'exactfit',
            	 title: "My Cool Trailer"
            	});
                
           	

               
                
                
                
                jwplayer("liveAud1").setup({
                    autostart: true,
                    file: audio1,

                    rtmp: {
                        bufferlength: 0
                    },


                    height: "0",
                    width: "0",
                    primary: "flash",
                    'stretching': 'exactfit',
                    logo: {
                        file: "images/logo_jw.png"
                    },
					mute:"false"

                });
                
                
                
                
                jwplayer("liveAud2").setup({
                    autostart: true,
                    file: audio2,

                    rtmp: {
                        bufferlength: 0
                    },


                    height: "0",
                    width: "0",
                    primary: "flash",
                    'stretching': 'exactfit',
                    logo: {
                        file: "images/logo_jw.png"
                    },
					mute:"false"


                });
                
                





            }

        }

    });
}












































function attendClass() {
	


    sessionStorage.setItem("liveSessionFlag", "0");

    $.ajax({
        url: webServerUrl,
        data: 'request=attendClass&userId=' + userId + '&classEventDetailIdRec=' + ClazEventDetailId,
        type: 'post',
        success: function(msg) {
            var loginJson = msg.trim();
            obj = JSON.parse(loginJson);
            var resultCode = obj.response.resultcode;
            var message = obj.response.message;

            if (resultCode == 1) {

                //return false;

             $.ajax({
                    url: webServerUrl,
                    data: 'request=inClass',
                    type: 'post',
                    success: function(msg) {
                        var loginJson = msg.trim();
                        obj = JSON.parse(loginJson);
                        var resultCode = obj.response.resultcode;
                        var message = obj.response.message;

                        if (resultCode == 1) {


                        }
                    }

                });




                var generalLog = obj.response.attendClassResult.generalLog;
                var arrayLength = generalLog.length;

                var attachmentList = obj.response.attendClassResult.attachmentList;
                var attentionMode = obj.response.attendClassResult.attentionMode;
                var switchVideo = obj.response.attendClassResult.switchVideo;


                var attachmentListarrayLength = attachmentList.length;



                
                
                var video1 = obj.response.attendClassResult.liveCamDetails.CAM1.Url;
                var video2 = obj.response.attendClassResult.liveCamDetails.CAM2.Url;
                var video3 = obj.response.attendClassResult.liveCamDetails.CAM3.Url;
                var video4 = obj.response.attendClassResult.liveCamDetails.CAM4.Url;

     
                
                var audio1 = obj.response.attendClassResult.liveCamDetails.CAM1.Aud;
                var audio2 = obj.response.attendClassResult.liveCamDetails.CAM2.Aud;
                var audio3 = obj.response.attendClassResult.liveCamDetails.CAM3.Aud;
                var audio4 = obj.response.attendClassResult.liveCamDetails.CAM4.Aud;
            



                sessionStorage.setItem("vidFeed1", video1);
                sessionStorage.setItem("vidFeed2", video2);
                sessionStorage.setItem("vidFeed3", video3);
                sessionStorage.setItem("vidFeed4", video4);

                sessionStorage.setItem("audFeed1", audio1);
                sessionStorage.setItem("audFeed2", audio2);


                
                
                
            	var ClassInfo = document.getElementById("ClassInfo"); 
		   		ClassInfo.innerHTML = '<small class="text-uc text-xs text-muted">Chapter</small>'+
                   ' <p>'+Chaptername+'</p>'+
                   ' <small class="text-uc text-xs text-muted">Topic</small> '+
                    '<p>'+Topicname+'</p>'+
                    '<div class="line"></div> ';
		   		
		   		
		   		
		   		

		   		var Tpic = document.getElementById("Tpic"); 
		   		Tpic.innerHTML = '<img src="'+ProfilePicURL+'" class="img-circle">';
		   		
		   	
		   		
		   		

	   			var teachPanel = document.getElementById("teachPanel"); 
	   		teachPanel.innerHTML = '<div class="h4 m-t-xs m-b-xs">'+TeacherName+'</div>'+
                '<small class="text-muted">Class Started @ '+StartTime+'</small>';
     
                
                
                
                
                
                
                
                
                

                
                if(attentionMode==1){
                	
                	 $("#smallModal").modal('show');

                     attentionModeFlag = 1;
                	
                	
                	
                }
                
                
                
				if(switchVideo==1){
					
					
					
					
					var playerInstance = jwplayer("liveVid2");
	            	playerInstance.setup({
	            	 autostart: true,
	            	 image: "images.jpg",
	            	 file: video4,
	            	 height: "350",
	                 width: "100%",
	                 logo: {
	                     file: "images/logo_jw.png"
	                 },
	                 repeat:'always',
	                 'stretching': 'exactfit'
	            	});
					
					
					
					
					
					
					
					
					
					
					
					
					
					
				                	
				    	
				                	
					 switchVideoFlag=1;   	
				                	
				        }else {
				                	
				                	
				        	var playerInstance = jwplayer("liveVid2");
			            	playerInstance.setup({
			            	 autostart: true,
			            	 image: "images.jpg",
			            	 file: video2,
			            	 height: "350",
			                 width: "100%",
			                 logo: {
			                     file: "images/logo_jw.png"
			                 },
			                 repeat:'always',
			                 'stretching': 'exactfit'
			            	});
				                	
				                	 switchVideoFlag=0;	
				                }
                
                

                
                

                jwplayer("liveVid1").setup({
                    autostart: true,
                    file: video1,

                    rtmp: {
                        bufferlength: 0
                    },


                    height: "214",
                    width: "100%",
                    primary: "flash",
                    'stretching': 'exactfit',
                    logo: {
                        file: "images/logo_jw.png"
                    }


                });

    
                jwplayer("liveVid3").setup({
                    autostart: true,
                    file: video3,

                    rtmp: {
                        bufferlength: 0
                    },

                    height: "214",
                    width: "100%",
                  
                    primary: "flash",
                    'stretching': 'exactfit',
                    logo: {
                    	file: "images/logo_jw.png"
                    }


                });
           	
                
                
                jwplayer("liveAud1").setup({
                    autostart: true,
                    file: audio1,

                    rtmp: {
                        bufferlength: 0
                    },


                    height: "0",
                    width: "0",
                    primary: "flash",
                    'stretching': 'exactfit',
                    logo: {
                        file: "images/logo_jw.png"
                    },
					mute:"false"

                });
                
                
                
                
                jwplayer("liveAud2").setup({
                    autostart: true,
                    file: audio2,

                    rtmp: {
                        bufferlength: 0
                    },


                    height: "0",
                    width: "0",
                    primary: "flash",
                    'stretching': 'exactfit',
                    logo: {
                        file: "images/logo_jw.png"
                    },
					mute:"false"


                });
                
                




                /*General Log*/




                if (arrayLength > 0) {
                    for (var i = 0; i < arrayLength; i++) {
                        var cur = generalLog[i];

                        if (cur.raiseHandText == "0") {
                        	
                                  	
                           var addLogs = document.getElementById('addLogs');
                            addLogs.innerHTML = '<article style="margin-right:10px;" id="chat-id-1" class="chat-item left"> <a href="javascript:void(0)" class="pull-left thumb-sm avatar"><img src="' + cur.profilePic + '" class="img-circle"></a> <section class="chat-body"> <div class="panel text-sm m-b-none"> <div class="panel-body" style="height: 35px; padding: 5px;background-color:#00c6c1;color:#fff; "> <span class="arrow left" style="border-right-color:#00c6c1;"></span><span style="font-size:12px; margin-top:-30px;">' + cur.logText + '</span> </div> </div> <small class="text-muted"><i class="fa fa-check text-success"></i>' + cur.timestamp + '</small> </section> </article>' + addLogs.innerHTML;
                       } else {

                            var question = cur.raiseHandText;
                            var answer = cur.raiseHandAnswer;
                            var user = cur.logTex;
                            user = user.replace(/(\w+).*/, "$1");
                            var pic = cur.profilePic;


                            liveraiseHands.liveClassRaiseHand.push({
                                "question": question,
                                "answer": answer,
                                "user": user,
                                "pic": pic,
                                "index": raiseHandListFlag

                            });

                            // alert(JSON.stringify(liveraiseHands));
                            sessionStorage.setItem("liveClassRaiseHand", JSON.stringify(liveraiseHands));

                           var addLogs = document.getElementById('addLogs');
                            addLogs.innerHTML = '<article style="margin-right:10px;" id="chat-id-1" class="chat-item left"> <a href="javascript:void(0)" class="pull-left thumb-sm avatar"><img src="' + propic + '" class="img-circle"></a> <section class="chat-body"> <div class="panel text-sm m-b-none"> <div class="panel-body" style="height: 35px; padding: 5px;background-color:#00c6c1;color:#fff; "> <span class="arrow left" style="border-right-color:#00c6c1;"></span><span style="font-size:12px; margin-top:-30px;">' + logtex + '</span> <a href="javascript:void(0)" onclick="RHModal(' + raiseHandListFlag + ')" style="float:right;"><div style="color:#fff;font-size:15px;" class="fa fa-comment"></div></a></div> </div> <small class="text-muted"><i class="fa fa-check text-success"></i>' + ts + '</small> </section> </article>' + addLogs.innerHTML;

                            raiseHandListFlag++;

                            var raiseHandDoubts = document.getElementById(raiseHandText);
                            raiseHandDoubts.innerHTML = '<article id="' + raiseHandText + '" style="" id="chat-id-1" class="chat-item left"> <a href="javascript:void(0)" class="pull-left thumb-sm avatar"><img src="' + Teachimage + '" class="img-circle"></a> <section class="chat-body"> <div class="panel text-sm m-b-none">    <div class="panel-body" style=" height: 35px;padding: 5px;background-color:#00c6c1;color:#fff; "> <span class="arrow left" style="border-right-color:#00c6c1"></span>' + raiseHandText + ' <br>Answer : ' + raiseHandAnswer + ' </div></div> <small class="text-muted"><i class="fa fa-circle text-success text-xs"></i> </small> &nbsp;Answered </section> </article>';



                        }


                    }
                }



                /*Attachment*/


                if (attachmentListarrayLength > 0) {
                    for (var i = 0; i < attachmentListarrayLength; i++) {
                        var cur = attachmentList[i];

                        liveAttachments.liveClassAttachment.push({
                            "link": cur.attachmentLink,
                            "name": cur.attachmentName,
                            "type": cur.documentType,
                            "index": attachmentListFlag

                        });

                        //alert(JSON.stringify(liveAttachments));

                        sessionStorage.setItem("liveClassAttachment", JSON.stringify(liveAttachments));

                        var addAttach = document.getElementById('addAttach');

                        addAttach.innerHTML = '<article id="chat-id-1" class="chat-item right"> <a href="javascript:void(0)" class="pull-right thumb-sm avatar"><img src="' + ProfilePicURL + '" class="img-circle"></a> <section class="chat-body" > <div class="panel bg bg-success text-sm m-b-none"  style="background-color:#00c6c1"> <div class="panel-body" style="height:30px;padding: 5px;"> <span class="arrow right" style="border-left-color:#00c6c1"></span>' + cur.attachmentName + '<a href="javascript:void(0)" onclick="openPopup(' + attachmentListFlag + ')"><div class="fa fa-eye" Style="font-size:15px;float:right;color:#fff"></div> </a>    <a href="' + cur.attachmentLink + '" download><div class="fa fa-download" Style="font-size:15px;float:right;margin-right:20px;color:#fff"></div></a></div>  </div> <small class="text-muted"><i class="fa fa-paperclip"></i>&nbsp;&nbsp;Type : ' + cur.documentType + '</small> </section> </article>' + addAttach.innerHTML;
                        attachmentListFlag++;


                    }
                }




            }

        }

    });
}




$(document).ready(function() {


    $("#clazNoteButton").click(function() {


        document.getElementById("logArea").style.display = "none";
        document.getElementById("attachmentArea").style.display = "none";
        document.getElementById("raiseArea").style.display = "none";
        document.getElementById("noteArea").style.display = "block";



    });


    $("#logButton").click(function() {

        document.getElementById('logButton').style['-webkit-animation'] = '';
        document.getElementById("logArea").style.display = "block";
        document.getElementById("attachmentArea").style.display = "none";
        document.getElementById("raiseArea").style.display = "none";
        document.getElementById("noteArea").style.display = "none";



    });




    $("#raiseButton").click(function() {



        document.getElementById("logArea").style.display = "none";
        document.getElementById("attachmentArea").style.display = "none";
        document.getElementById("raiseArea").style.display = "block";
        document.getElementById("noteArea").style.display = "none";




    });


    $("#attachmentButton").click(function() {
        document.getElementById('attachmentButton').style['-webkit-animation'] = '';


        document.getElementById("logArea").style.display = "none";
        document.getElementById("attachmentArea").style.display = "block";
        document.getElementById("raiseArea").style.display = "none";
        document.getElementById("noteArea").style.display = "none";


    });





  



    $("#raise_form_doubtNew").submit(function() {
    	
    	
    	
    	
    	var form = $(this);
	    form.parsley().validate();
		if (form.parsley().isValid()){

    	
    	
    	 //  document.getElementById("raiseSendButton").disabled = true;

        	var raiseValue = document.getElementById('raiseValue').value;
        	
        	
        	
        	if(raiseValue==''){
        		document.getElementById('raiseValue').placeholder = 'Value cannot be empty!!';
        		return false;
        	}
        	
        	 if(raiseTextArray.indexOf(raiseValue)==-1){
        		
        		raiseTextArray.push(raiseValue);
            	
            	var duration = sessionStorage.getItem('localDuration').trim();

                var d = new Date();
                var e = formatDate(d);


                sessionStorage.setItem("raiseText", raiseValue);
                sessionStorage.setItem("raiseTime", e);
                sessionStorage.setItem("raiseDuration", duration);




                $.ajax({
                    url: webServerUrl,
                    data: 'raiseHandText=' + raiseValue + '&request=raiseHand&duration=' + duration+'&classEventDetailId='+ClazEventDetailId,
                    type: 'post',
                    success: function(msg) {

                        var raiseHandDoubts = document.getElementById('raiseHandDoubts');
                        raiseHandDoubts.innerHTML = raiseHandDoubts.innerHTML + '<article id="' + raiseValue + '" style="margin-right:10px;font-size:10px;" id="chat-id-1" class="chat-item left"> <a href="javascript:void(0)" class="pull-left thumb-sm avatar"><img src="' + userPic + '" class="img-circle"></a> <section class="chat-body"> <div class="panel text-sm m-b-none"> <div class="panel-body" style=" padding: 5px;background-color:#ffbc5a;color:#fff; "> <span class="arrow left" style="border-right-color:#ffbc5a;"></span>' + raiseValue + '</div> </div> <small class="text-muted"><i class="fa fa-circle text-danger text-xs" style="color:#ffbc5a;"></i> </small> &nbsp;Added In Queue... </section> </article><br><br>';
                        document.getElementById('raiseValue').value = '';

                        return false;
                    }

                });
        		
        		
        		
        	}else {
        		
        		  var raiseHandDoubts = document.getElementById('raiseHandDoubts');
                  raiseHandDoubts.innerHTML = raiseHandDoubts.innerHTML + '<article  style="margin-right:10px;font-size:10px;" id="chat-id-1" class="chat-item left"> <a href="javascript:void(0)" class="pull-left thumb-sm avatar"><img src="' + userPic + '" class="img-circle"></a> <section class="chat-body"> <div class="panel text-sm m-b-none"> <div class="panel-body" style=" padding: 5px;background-color:#999999;color:#fff; "> <span class="arrow left" style="border-right-color:#999999;"></span>' + raiseValue + '</div> </div> <small class="text-muted"><i class="fa fa-circle text-danger text-xs" style="color:#999999;"></i> </small> &nbsp;You Already Asked This Question..</section> </article><br><br>';
                  
        		
        	}
        	
        	
        	
        

            return false;

		}

		return false;
    });


    
    

    $('#raiseValue').keyup(function() {

        var emptyRaiseValue = false;
        $('#raiseValue').each(function() {
            if ($(this).val().length == 0) {
            	emptyRaiseValue = true;
            }
        });

        if (emptyRaiseValue) {
            $('#raiseSendButton').attr('disabled', 'disabled');
        } else {
            $('#raiseSendButton').attr('disabled', false);
        }
    });
    
    
    
    

    $('#notes').keyup(function() {

        var emptyNotes = false;
        $('#notes').each(function() {
            if ($(this).val().length == 0) {
            	emptyNotes = true;
            }
        });

        if (emptyNotes) {
            $('#notzButton').attr('disabled', 'disabled');
        } else {
            $('#notzButton').attr('disabled', false);
        }
    });
    
    
    
    
    
    
    
    
    


});




function show() {


    var currentTimeForDisplay = sessionStorage.getItem('currentTimeForDisplay');


    var curHour = currentTimeForDisplay.substring(0, 2);
    var curMin = currentTimeForDisplay.substring(3, 5);

    /* console.log(curMin);
    console.log(curHour);
     */

    var Digital = new Date()
        /* var hours=Digital.getHours()
        var minutes=Digital.getMinutes() */
    var hours = parseInt(curHour);;
    var minutes = parseInt(curMin);

    /* console.log(hours);
    console.log(minutes); */
    var seconds = Digital.getSeconds();

    if (minutes <= 9)
        minutes = "0" + minutes;
    if (hours <= 9)
        hours = "0" + hours;
    if (seconds <= 9)
        seconds = "0" + seconds;
    document.Tick.Clock.value = hours + ":" + minutes + ":" + seconds + " Hrs";
    setTimeout("show()", 1000);

    if (seconds == '59') {
        minutes = parseInt(minutes);
        minutes = minutes + 1;
    }



    if (minutes > '59') {
        minutes = parseInt(minutes);
        minutes = 0;
        hours = parseInt(hours);
        hours = hours + 1;
    }


    if (hours > '23') {

        hours = parseInt(hours);
        hours = 00;
        minutes = parseInt(minutes);
        minutes = 00;

    }


    var timeNow = hours + ':' + minutes;
    sessionStorage.setItem('currentTimeForDisplay', timeNow);

}

changestat();



function changestat() {
    stopwatch();
}

function stopwatch() {


    var x = document.getElementById('butn').value;
    if (x == 'Pause') {
        secz++;
        if (secz == 60) {
            secz = 0;
            minsz = minsz + 1;
        } else {
            minsz = minsz;
        }
        if (minsz == 60) {
            minsz = 0;
            hourz += 1;
        }
        if (secz <= 9) {
            secz = "0" + secz;
        }
        var stwa = document.getElementById('stwa');

        stwa.value = ((hourz <= 9) ? "0" + hourz : hourz) + " : " + ((minsz <= 9) ? "0" + minsz : minsz) + " : " + secz;

        duration = ((hourz <= 9) ? "0" + hourz : houzr) + " : " + ((minsz <= 9) ? "0" + minsz : minsz) + " : " + secz;

        sessionStorage.setItem('localDuration', duration);


        SD = window.setTimeout("stopwatch();", 1000);
    }
}


function RHModal(index) {

    var question = '';
    var answer = '';
    var user = '';
    var pic = '';



    var arrayLength = liveraiseHands.liveClassRaiseHand.length;

    for (var i = 0; i < arrayLength; i++) {
        var cur = liveraiseHands.liveClassRaiseHand[i];
        if (cur.index == index) {

            question = cur.question;
            answer = cur.answer;
            user = cur.user;
            pic = cur.pic;



        }
    }



    var Panel1 = document.getElementById("Panel1");
    var Panel2 = document.getElementById("Panel2");


    Panel1.innerHTML = '<center><img src="' + pic + '" class="img-circle" height="50px;"><br><b><font color="#00c6c1">' + user + '</b><br><br><br><br></font>';
    Panel2.innerHTML = '<font color="#000"><b>' + question + '</b></font><br><br><font color="#00c6c1"><b>Answer : ' + answer + '</b></font>';


    $("#RHModal").modal('show');




}



function runScript(e) {
    if (e.keyCode == 13) {
        var tb = document.getElementById("classnote");
        content = tb.value;
        
        var lastLine = content.substr(content.lastIndexOf("\n")+1);
        
        
        
 if(lastLine==""){
        	
        	return false;
        	
        }
       	
    

       

        var d = new Date();
        var e = formatDate(d);

          logs.classNotes.push({
            "time": e,
            "notes": lastLine

        });

      
        sessionStorage.setItem("clazNotes", JSON.stringify(logs));

        //alert(JSON.stringify(logs));
        
     
       
    }
}



