//저장소에서 불러오기
var setting = localStorage.getItem('setting', setting);
var starthour = localStorage.getItem('starthour', starthour);
var startmin = localStorage.getItem('startmin', startmin);
var endhour = localStorage.getItem('endhour', endhour);
var endmin = localStorage.getItem('endmin', endmin);

//현재 시간 얻어 오기
var date = new Date();
var hour = date.getHours();
var min = date.getMinutes();

var nowtime = (hour * 60) + min;

//int형으로 변환
var starthour = parseInt(starthour);
var startmin = parseInt(startmin);
var endhour = parseInt(endhour);
var endmin = parseInt(endmin);

//시간 계산
var starttime = (starthour * 60) + startmin;
var fintime = (endhour * 60) + endmin;

//시간대별 block
if(setting == 'collecttime') {
	/*if(nowtime > starttime) {
		var starthour = (starthour + 24) - (hour - starthour);
		var settime = (starthour * 60) + startmin;
		var init_interval = settime - nowtime;
		var init_interval = init_interval * 60000;
		var endhour = (endhour + 24) - (hour - endhour);
		var fintime = (endhour * 60) + endmin;
		var interval = fintime - nowtime;
		var interval = interval * 60000;

		block(init_interval, interval);
	}*/
	if(nowtime > starttime) {
		var init_interval = 0;
		var interval = fintime - nowtime;
		var interval = interval * 60000;

		block(init_interval, interval);
	}

	else {
		var settime = starttime;
		var init_interval = settime - nowtime;
		var init_interval = init_interval * 60000;
		var interval = fintime - nowtime;
		var interval = interval * 60000;

		if(interval < 0) {
			initcss();
		}

		block(init_interval, interval);
	}
}

else {
	changecss();
}

function block(init_interval, interval) {
	setTimeout(function(){changecss()},init_interval); //init_interval 시간 후에 block 설정
	setTimeout(function(){initcss()},interval); //interval 시간 후에 block 해제
}

function changecss() {
	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
		if(tab.url.search('facebook.com') != -1) {
			chrome.tabs.insertCSS(tabId, {file: "change.css"});
			//chrome.tabs.executeScript(tabId, {file:"script.js"});
		}
	});
}

function initcss() {
	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
		if(tab.url.search('facebook.com') != -1) {
			chrome.tabs.insertCSS(tabId, {file: "init.css"});
			//chrome.tabs.executeScript(tabId, {file:"delete.js"});
		}
	});
}
/*
//좋아요 측정
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	chrome.tabs.move(tabId, moveProperties, function() {
		if(tab.url.search('좋아합니다.') != -1) {
			window.location.assign("https://www.facebook.com/ahsa17/allactivity?privacy_source=activity_log&log_filter=likedposts") {
			
			}	
		}
	});
});

//댓글 수 측정
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if(tab.url.search('댓글을 남겼습니다.') != -1) {
		//https://www.facebook.com/ahsa17/allactivity?privacy_source=activity_log&log_filter=cluster_116
	}
});
*/
/*
//페이스북 좋아요, 댓글, 업데이트 횟수
//업데이트 횟수
window.fbAsyncInit = function() {
	FB.init({
		appId: "387137241401615",  // 앱 생성후 발급 받은 앱ID
		status: true,
		cookie: true,
		xfbml: true
	});


	function facebookStats(){
		FB.getLoginStatus(function(response) {   // FB API 를 이용한 로그인 상태 체크
			if (response.status === 'connected') {   // FaceBook 에 로그인 되어 있다면
				var uid = response.authResponse.userID;  // 로그인 되어 있는 유저에게 권한이 있는지 체크
				var accessToken = response.authResponse.accessToken;
				
				FB.api(   // FB API 를 이용한 FQL 쿼리 사용
					{
						method: 'fql.query',
						query: 'SELECT uid, message, time FROM status WHERE uid=' + uid + 'AND time>=1367366400' //user id 갖고 옴
					},

					function(response) {
						var user = response[0]; // user 에 결과값을 담는다.
						alert(user);
					}
				);  
			} else if (response.status === 'not_authorized') { // 앱 ID 에 대한 권한이 없을시 처리
				alert("권한이 없음");
			} else {  // 로그인이 안되어 있다면 로그인 페이지로 보내며 로그인후 리턴되는 url
				location.href = "https://graph.facebook.com/oauth/authorize?client_id=136868733080921&redirect_uri=//리턴 URL";
			}
		});
	}
}
*/
//oauth 인증하여 페이스북 로그인
var facebook = new OAuth2('facebook', {
	client_id: '387137241401615',
	client_secret: '1b4a7e6580e49ff2fd21eb1f35aaf331',
	api_scope: 'read_stream,user_likes,xmpp_login,publish_actions'
//뉴스피드 접근, 좋아요 누르기, 페이스북 대화, 댓글 달기, 글작성
});

facebook.authorize(function() {
	//code

});

