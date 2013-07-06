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
		}
	});
}

function initcss() {
	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
		if(tab.url.search('facebook.com') != -1) {
			chrome.tabs.insertCSS(tabId, {file: "init.css"});
		}
	});
}

//좋아요, 커맨트 count
var like = 0;
var comment = 0;

var oauth = localStorage.getItem('oauth2_facebook');
var oauth = JSON.parse(oauth);

//identifier 얻어오기
function identifier(data) {
	var id;
	$.ajax({
		type : 'get',
		async: false,
		datatype: 'json',
		url: 'https://graph.facebook.com/me?fields=posts.fields(actions)&access_token=' + oauth.accessToken,
		success: function(data) {
			id = data.id;
		}
	});
	return id;
}

//좋아요 갯수, 댓글 측정
chrome.runtime.onConnect.addListener(function(port) {
	console.assert(port.name == "nofacebook");
	port.onMessage.addListener(function(msg) {

	alert(msg.action);

	if(msg.action == 'like') {
		console.log('like : ' +like);
		data = {'kind':'like', 'identifier':identifier()}
    like = JSON.stringify(data);
    $.ajax({
      type:'get',
      data: like, 
      url: 'http://jihyun.nslinkle.com:9000/update',
      success: function(data) {
        console.log('Like Upload Success')
      },
      error: function(request, status, error) {
        console.log("code:"+request.status +" message:"+request.responseText);
      }
    });
	}

	else if(msg.action == 'Comment') {
		//comment++;
		console.log('comment : ' + comment);
		data = {'kind':'comment', 'identifier':identifier()};
    comment = JSON.stringify(data);
    $.ajax({
      type:'get',
      data: comment,
      url: 'http://jihyun.nslinkle.com:9000/update',
      success: function(data) {
        console.log('Comment Upload Success')
      },
      error: function(request, status, error) {
        console.log("code:"+request.status +" message:"+request.responseText + "error: " + error);
      }
    });
	}

	localStorage.setItem('like', like);
	localStorage.setItem('comment', comment);
	});
});
