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
//페이지 바뀌면 좋아요 없어짐 -> 아마 db에 저장하면 수정할 수 있겠지

//댓글 얻어오기
var commentcount = 0;

var comment = document.getElementsByName('add_comment_text');

for(var i=0; i<comment.length; i++) {
	document.getElementsByName('add_comment_text')[i].onkeydown = function(event){
	    event = event || window.event;
	    var keycode = event.charCode || event.keyCode;
		    if(keycode === 13){
		    	if(document.getElementsByName('add_comment_text')[?].value == '댓글 달기...')
		    		console.log('기록 ㄴㄴ');

		    	else if(document.getElementsByName('add_comment_text')[?].value == '')
		    		console.log("don't write");

		    	else {
		    		commentcount++;
		    		console.log(commentcount);
		    	}
	    }

	}
}

var comment_two = document.getElementsByName('add_comment_text_text');

for(var j=0; j<comment_two.length; j++) {
	document.getElementsByName('add_comment_text_text')[j].onkeydown = function(event){
	    event = event || window.event;
	    var keycode = event.charCode || event.keyCode;
	    if(keycode === 13){
	        if(document.getElementsByName('add_comment_text')[?].value == '댓글 달기...')
		    		console.log('기록 ㄴㄴ');

	    	else if(document.getElementsByName('add_comment_text')[?].value == '')
	    		console.log("don't write");

	    	else {
	    		commentcount++;
	    		console.log(commentcount);
	    	}
	    }
	}
}

port.postMessage({comment: commentcount});