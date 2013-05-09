//간단한 css 조절
$(document).ready(function(){
  $('.timesetting').click(function(){
    $('.time').slideDown('slow');
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
