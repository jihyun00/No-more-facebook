//간단한 css 조절
$(document).ready(function(){
  $('.timesetting').click(function(){
    $('.time').slideDown('slow');
  });

  $("#initSetUp").click(function(e) {
    console.log("here");
    window['facebook'] = new OAuth2('facebook', {
      client_id: '387137241401615',
      client_secret: '1b4a7e6580e49ff2fd21eb1f35aaf331',
      api_scope: 'read_stream,user_about_me,user_actions.news,user_activities,user_photos,user_status',
      redirect_uri: 'http://localhost'
    //뉴스피드 접근, 좋아요 누르기, 페이스북 대화, 댓글 달기, 글작성
    });

    window.facebook.authorize(function() {

    })
  });
});

$(function(){
  $('#alltime').click(function(){
    $('.time').slideUp('slow');
  });
});

//설정해 준 내역 저장
function save_options() {
  var setting = $(':input[name=time]:checked').val();
  var starthour = $('select[name=starthour]').val();
  var startmin = $('select[name=startmin]').val();
  var endhour = $('select[name=endhour]').val();
  var endmin = $('select[name=endmin]').val();

  localStorage.setItem('setting', setting);
  localStorage.setItem('starthour', starthour);
  localStorage.setItem('startmin', startmin);
  localStorage.setItem('endhour', endhour);
  localStorage.setItem('endmin', endmin);

  console.log('setting saved');
}

//설정 저장
$(function() {
  $('#setting').click(function() {
    save_options();
  });
});

//설정 초기화
$(function() {
  $('#reset').click(function() {
    window.localStorage.clear();
    console.log('reset success');
  });
});

//facebook 이미 연결했다면
var oauth2_facebook = localStorage.getItem('oauth2_facebook');

if(oauth2_facebook.search('accessToken') != -1) {
  $(document).ready(function(){
    $(".init").css("display","none");
    $(".second").css("display","block");
  });
}

//accessToken 얻어오기
var oauth = oauth2_facebook;
var oauth = JSON.parse(oauth);
console.log(oauth.accessToken);

//게시글 횟수
var bulletin = function(callback) {
  $.ajax({
    type : 'get',
    datatype : 'json',
    url : 'https://graph.facebook.com/me?fields=posts.fields(actions)&access_token=' + oauth.accessToken,
    success : function(data) {
      console.log(data);
      console.log(data.posts.data);
      var count = 0;

      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var date = date.getDate();

      if(month/10 != 1) {
        month = '0'+ month;
      }

      var time = year + '-' + month + '-' + date;

      console.log(time);
      
      for(i=0; i<25; i++) {
        if(data.posts.data[i].created_time.search(time) != -1) {
          count++;
        }
        console.log(count);
      }
    }
  });
}

/*
//댓글 횟수
var comments = function(callback) {
  $.ajax({
    type : 'get',
    datatype : 'json',
    url : 'https://graph.facebook.com/me?fields=posts.fields(actions)&access_token=' + oauth.accessToken, //url만 바꾸면 돼!!!
    success : function(data) {
      console.log(data);
      var count = 0;

      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var date = date.getDate();

      if(month/10 != 1) {
        month = '0'+ month;
      }

      var time = year + '-' + month + '-' + date;

      console.log(time);
      
      for(i=0; i<25; i++) {
        if(data.posts.data[i].created_time.search(time) != -1) {
          count++;
        }
        console.log(count);
      }
    }
  });
}

//좋아요 횟수
var like = function(callback) {
  $.ajax({
    type : 'get',
    datatype : 'json',
    url : 'https://graph.facebook.com/me?fields=posts.fields(actions)&access_token=' + oauth.accessToken,
    success : function(data) {
      console.log(data);
      var count = 0;

      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var date = date.getDate();

      if(month/10 != 1) {
        month = '0'+ month;
      }

      var time = year + '-' + month + '-' + date;

      console.log(time);
      
      for(i=0; i<25; i++) {
        if(data.posts.data[i].created_time.search(time) != -1) {
          count++;
        }
        console.log(count);
      }
    }
  });
}*/