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
	}).error(function() {
			alert("Something has gone wrong when finding available studies");
	});
}

function fetchStudyDetails(url, template, target) {
	$.getJSON(url, 
	  function(data) {
		 $.tmpl(template, data.study).appendTo(target);
			}).error(function() {
				alert("Something has gone wrong when finding study details");
		});
}

// Samples

function renderSampleList(url, template, target) {
	next_url = null;
	$.getJSON(url,
	  function(data) {
		$.each(data.samples, function(i,item){
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
			renderSampleList(next_url, template, target)
		}
	}).error(function() {
			alert("Something has gone wrong when finding available samples");
	});
}

function fetchSampleDetails(url, template, target) {
	$.getJSON(url, 
	  function(data) {
		 $.tmpl(template, data.sample).appendTo(target);
			}).error(function() {
				alert("Something has gone wrong when finding sample details");
		});
}

// Orders

function renderOrderList(url, template, target) {
	next_url = null;
	$.getJSON(url,
	  function(data) {
		$.each(data.submissions, function(i,item){
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
			renderOrderList(next_url, template, target)
		}
	}).error(function() {
			alert("Something has gone wrong when finding available orders");
	});
}

function fetchOrderDetails(url, template, target) {
	$.getJSON(url, 
	  function(data) {
		 $.tmpl(template, data.submission).appendTo(target);
	}).error(function() {
			alert("Something has gone wrong when finding order details");
		});
}

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}

function init() {
	$( '#indexPage').live( 'pageinit',function(event){
		renderStudyList("http://psd-dev.internal.sanger.ac.uk:6800/api/1/studies", 
		"studyListTemplate", 
		"#list");
	});

	$( '#statusPage' ).live( 'pageinit',function(event){
  	fetchStudyDetails("http://psd-dev.internal.sanger.ac.uk:6800/api/1/" + current_uuid, 
		"studyTemplate", 
		"#study");
	});

	$( '#ordersPage').live( 'pageinit',function(event){
		renderOrderList("http://psd-dev.internal.sanger.ac.uk:6800/api/1/" + current_uuid + "/submissions", 
		"orderListTemplate", 
		"#orderList");
	});

	$( '#orderPage').live( 'pageinit',function(event){
		fetchOrderDetails("http://psd-dev.internal.sanger.ac.uk:6800/api/1/" + current_uuid , 
		"orderTemplate", 
		"#order");
	});

	$( '#samplesPage').live( 'pageinit',function(event){
		renderSampleList("http://psd-dev.internal.sanger.ac.uk:6800/api/1/" + current_uuid,
		"sampleListTemplate", 
		"#sampleList");
	});

	$( '#samplePage').live( 'pageinit',function(event){
		fetchSampleDetails("http://psd-dev.internal.sanger.ac.uk:6800/api/1/" + current_uuid , 
		"sampleTemplate", 
		"#sample");
	});

};
