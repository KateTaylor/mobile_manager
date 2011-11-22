// Requires jQuery template

var current_uuid;


function renderStudyList(url, template, target) {
	next_url = null;
	$.getJSON(url,
	  function(data) {
		$.each(data.studies, function(i,item){
			$.tmpl(template, item)
			  .appendTo(target)
			  .bind('click', function() {current_uuid = item.uuid; });
		});
		if(data.actions.next != data.actions.last) {
			next_url = data.actions.next;
		}
	}).complete(function(data){
		$(target).listview('refresh');
		if(next_url) {
			renderStudyList(next_url, template, target)
		}
	});
}

function renderSampleList(url, target) {
	next_url = null;
	$.getJSON(url,
	  function(data) {
		$.each(data.samples, function(i,item){
			$('<li><a href="http://psd-dev.internal.sanger.ac.uk:6800/api/1/' + item.uuid + '"> '+item.created_at+'</a></li>').appendTo(target);
		});
		if(data.actions.next != data.actions.last) {
			next_url = data.actions.next;
		}
	}).complete(function(data){
		$(target).listview('refresh');
		if(next_url) {
			renderSampleList(next_url, template, target)
		}
	}).error(function() {
			alert("Something has gone wrong when finding Sample details");
	});
}

function renderOrderList(url, target) {
	next_url = null;
	$.getJSON(url,
	  function(data) {
		$.each(data.submissions, function(i,item){
			$('<li><a href="http://psd-dev.internal.sanger.ac.uk:6800/api/1/' + item.uuid + '"> '+item.created_at+'</a></li>').appendTo(target);
		});
		if(data.actions.next != data.actions.last) {
			next_url = data.actions.next;
		}
	}).complete(function(data){
		$(target).listview('refresh');
		if(next_url) {
			renderOrderList(next_url, template, target)
		}
	}).error(function() {
			alert("Something has gone wrong when finding Order details");
	});
}

function fetchStudyDetails(url, template, target) {
	$.getJSON(url, 
	  function(data) {
		 $.tmpl(template, data.study).appendTo(target);
		});
}

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}

function init() {
	$( '#statusPage' ).live( 'pageinit',function(event){
  	fetchStudyDetails("http://psd-dev.internal.sanger.ac.uk:6800/api/1/" + current_uuid, "studyTemplate", "#study");
	});

	$( '#indexPage').live( 'pageinit',function(event){
		renderStudyList("http://psd-dev.internal.sanger.ac.uk:6800/api/1/studies", "studyListTemplate", "#list");
	});

	$( '#ordersPage').live( 'pageinit',function(event){
		renderOrderList("http://psd-dev.internal.sanger.ac.uk:6800/api/1/" + current_uuid + "/submissions", "#orderList");
	});

	$( '#samplesPage').live( 'pageinit',function(event){
		renderSamplesList("http://psd-dev.internal.sanger.ac.uk:6800/api/1/" + current_uuid + "/samples", "#orderList");
	});

};
