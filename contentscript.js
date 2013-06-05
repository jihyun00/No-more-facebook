//좋아요 class 얻어오기
var like = 0;

var likebutton = document.getElementsByClassName('UFILikeLink');
console.log(likebutton);

for(var i=0; i<likebutton.length; i++) {
	likebutton[i].onclick = function() {
			console.log('click');
			like++;
			console.log(like);

			var port = chrome.runtime.connect({name: "nofacebook"});
			port.postMessage({like: like});
	}
}
//좋아요 취소 누를 때 없어지는 걸로 오류 수정할 것

//댓글 얻어오기
var comment = 0;
var commentarea = document.getElementsByClassName('innerWrap');

var extractor = new Array();

for(var j=0; j<commentarea.length; j++) {
	extractor[j] = commentarea[j].getElementsByTagName('textarea');
}

function keypress(e) {
	if(window.keyCode==13) {
		console.log('hi');
		alert('hi');
	}
}
/*
document.onkeydown = checkKeycode
function checkKeycode(e) {
var keycode;
if (window.event) keycode = window.event.keyCode;
else if (e) keycode = e.which;
alert("keycode: " + keycode);
}

*/

//console.log(commentarea);

/*
for(var j=0; j<commentarea.length; j++) {
	var port = chrome.runtime.connect({name: "nofacebook"});
	port.postMessage({comment: commentarea});
}*/