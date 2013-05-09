//var storage = chrome.storage.local;
var all, collecttime, starttime, fintime;

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
if(setting.value == collecttime) {
	if(nowtime > starttime) {
		var starthour = (starthour + 24) - (hour - starthour);
		var settime = (starthour * 60) + startmin;
		var init_interval = settime - nowtime;

		var endhour = (endhour + 24) - (hour - endhour);
		var fintime = (endhour * 60) + endmin;
		//var fintime = fintime * 60000;
		var interval = fintime - nowtime;
	}

	else {
		var settime = starttime;
		var init_interval = settime - nowtime;
		var interval = fintime - nowtime;
	}

	block(init_interval, interval);
}

else {
	changecss();
}

function block(init_interval, interval) {
	setInterval(function(){changecss()},init_interval); //init_interval 시간 후에 block 설정
	setInterval(function(){initcss()},interval); //interval 시간 후에 block 해제
}

function changecss() {
	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  		console.log(tab);
		if(tab.url.search('facebook.com') != -1) {
			chrome.tabs.insertCSS(null, {file: "change.css"});
		}
	});
}

function initcss() {
	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  		console.log(tab);
		if(tab.url.search('facebook.com') != -1) {
			chrome.tabs.insertCSS(tab, {file: "init.css"});
		}
	});
}
//일단 object 제거해보도록 하자;ㅁ;

//좋아요 측정
/*
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

//업데이트 횟수 측정(글 남기는 모든 활동 포함)
//https://www.facebook.com/ahsa17/allactivity?privacy_source=activity_log&log_filter=cluster_11
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if(tab.url.search('업데이트했습니다.') != -1) {
		
	}

	else if(tab.url.search('글을 남겼습니다.') != -1) {
		
	}

	else if(tab.url.search('공유했습니다.') != -1) {
		
	}

	else if(tab.url.search('게시했습니다.') != -1) {
		
	}
});
*/
