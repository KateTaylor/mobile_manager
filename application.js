// Requires jQuery template

var current_uuid;
var url_root = 'http://psd-dev.internal.sanger.ac.uk:6800/api/1/';

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
			alert("Something has gone wrong when finding available studies: have you logged on yet?");
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

//Assets 

function renderAssetList(url, template, target) {
	next_url = null;
	$.getJSON(url,
	  function(data) {
		$.each(data.sample_tubes, function(i,item){
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
			renderAssetList(next_url, template, target)
		}
	}).error(function() {
			alert("Something has gone wrong when finding available assets");
	});
}

function fetchAssetDetails(url, template, target) {
	$.getJSON(url, 
	  function(data) {
		 $.tmpl(template, data.sample_tube).appendTo(target);
			}).error(function() {
				alert("Something has gone wrong when finding asset details");
		});
}


//Requests 

function renderRequestList(url, template, target) {
	next_url = null;
	$.getJSON(url,
	  function(data) {
		$.each(data.requests, function(i,item){
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
			renderAssetList(next_url, template, target)
		}
	}).error(function() {
			alert("Something has gone wrong when finding available requests");
	});
}

function fetchRequestDetails(url, template, target) {
	$.getJSON(url, 
	  function(data) {
		 $.tmpl(template, data.requests).appendTo(target);
			}).error(function() {
				alert("Something has gone wrong when finding request details");
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
		renderStudyList(url_root + "studies", 
		"studyListTemplate", 
		"#list");
	});

	$( '#statusPage' ).live( 'pageinit',function(event){
  	fetchStudyDetails(url_root + current_uuid, 
		"studyTemplate", 
		"#study");
	});

	$( '#ordersPage').live( 'pageinit',function(event){
		renderOrderList(url_root + current_uuid + "/submissions", 
		"orderListTemplate", 
		"#orderList");
	});

	$( '#orderPage').live( 'pageinit',function(event){
		fetchOrderDetails(url_root + current_uuid, 
		"orderTemplate", 
		"#order");
	});

	$( '#samplesPage').live( 'pageinit',function(event){
		renderSampleList(url_root + current_uuid + "/samples",
		"sampleListTemplate", 
		"#sampleList");
	});

	$( '#samplePage').live( 'pageinit',function(event){
		fetchSampleDetails(url_root + current_uuid , 
		"sampleTemplate", 
		"#sample");
	});

	$( '#assetsPage').live( 'pageinit',function(event){
		renderAssetList(url_root + current_uuid + "/sample_tubes",
		"assetListTemplate", 
		"#assetList");
	});

	$( '#assetPage').live( 'pageinit',function(event){
		fetchAssetDetails(url_root + current_uuid, 
		"assetTemplate", 
		"#asset");
	});

	$( '#requestsPage').live( 'pageinit',function(event){
		renderRequestList(url_root + current_uuid + "/requests",
		"requestListTemplate", 
		"#requestList");
	});

	$( '#requestPage').live( 'pageinit',function(event){
		fetchRequestDetails(url_root + current_uuid, 
		"requestTemplate", 
		"#request");
	});

};
