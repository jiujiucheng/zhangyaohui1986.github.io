$(function() {
	var tag = window.location.search.split('=')[1];

	if( tags_selected = edwin_all_tags[tag]){
		var tmpl = $("#edwin-tag").html();
		tmpl = Mustache.render(tmpl,{'posts': tags_selected})
	} else{

		var tmpl = $("#edwin-no-tag").html();
		tmpl = Mustache.render(tmpl,{'posts': tag});
	}

	console.log(tmpl);

	$(".edwin-post-content").html(tmpl)

})