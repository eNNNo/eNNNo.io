$(document).ready(function(){
	$('.fa-volume-down').click(function(){
		var song = 	document.getElementById("music");
		song.muted = !song.muted;
		$(this).toggleClass('fa-volume-down').toggleClass('fa-volume-off');
	})
	$('.fa-dot-circle-o').click(function(){
		controls.autoRotate = !controls.autoRotate;
	})
	$('.fa-question').click(function(){
		alert("Control:\nLeft mouse button: Click & Drag\nRight mouse button: Drag\nMiddle mouse button: Zoom\n'A': Auto Rotation\nSPACE: Revolution");
	})
})
$(document.body).mousewheel(function() {
  clearTimeout($.data(this, 'timer'));
  $.data(this, 'timer', setTimeout(function() {
     alert("Haven't scrolled in 250ms!");
     //do something
  }, 250));
});