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
var commentarea = document.getElementsByClassName('UFIList');
var commentarea = commentarea.offsetHeight;

console.log(commentarea);

