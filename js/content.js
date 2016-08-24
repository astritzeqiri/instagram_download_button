$.fn.appendDownloadButton = function(text, href)
{
	if (href !== undefined) {
		$downloadLink = $('<a href="'+href+'" download class="download-insta _aj7mu _r4e4p _kenyh _o0442">'+text+'<span></span></a>').css({});
		$(this).append($downloadLink);
	}
}


setInterval(function() {
	insertInModal();
	insertInSinglePost();
}, 1000);


function insertInSinglePost()
{
	var $holder = jQuery('article._ksjel');
	if (
		$holder.length > 0 &&
		$holder.find('a.download-insta').length < 1
	) {
		var href = undefined;
		var text = "";

		if ($holder.find('video').length > 0) {
			var href = $holder.find('video').attr('src');
			var text = "Download Video";
		} else if($holder.find('img._icyx7').length > 0){
			var href = $holder.find('img._icyx7').attr('src');
			var text = "Download Image";
		}
		$holder.appendDownloadButton(text, href);
	}
}

function insertInModal()
{
	var $modal = jQuery('body').find('._a1rcs._ea084');
	if (
		$modal.length > 0 &&
		$modal.find('a.download-insta').length < 1
	) {
		var href = undefined;
		var text = "";
		if (jQuery('body').find('._a1rcs._ea084').find('video').length > 0) {
			var href = jQuery('body').find('._a1rcs._ea084').find('video').attr('src');
			var text = "Download Video";
		} else if(jQuery('body').find('._a1rcs._ea084').find('img._icyx7').length > 0){
			var href = jQuery('body').find('._a1rcs._ea084').find('img._icyx7').attr('src');
			var text = "Download Image";
		}
		jQuery('body').find('._a1rcs._ea084 article').appendDownloadButton(text, href);
	}
}
var imagesCount = 0;
function sendNewImages(){
	if($('body').find("a._8mlbc").length > imagesCount) {
		var images = [];
		imagesCount = $('body').find("a._8mlbc").length;

		$('body').find("a._8mlbc").each(function(e) {
			if($(e.target).hasClass('download-insta')) {
				e.stopPropagation();
				e.preventDefault()
			}
			images.push({ link: $(this).find('img._icyx7').attr('src'), id: $(this).attr('href') });
		});
		chrome.runtime.sendMessage({type: "setImages", images: images});
	}
}
sendNewImages();
setInterval(function() {
	sendNewImages();
}, 2000);
