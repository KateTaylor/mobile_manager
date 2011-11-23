$.template( "studyTemplate", 
'<h2>${name} (${abbreviation})</h2> <p> This is an ${state} study created at ${created_at} Sac sponsor: ${sac_sponsor} <br> ${description}</p>'
);

$.template( "studyListTemplate",
'<li><a href="status.html" data-transition="slide">${name}</a></li>');

$.template( "orderTemplate", 
'<h2>${name}</h2> <p> This order is ${state} - Created at ${created_at} ${sac_sponsor} owned by ${owner} : ${scope}</p>'
);

$.template( "orderListTemplate",
'<li><a href="orders.html" data-transition="slide">${name}</a></li>');

$.template( "sampleTemplate", 
'<h2>${sanger.name}</h2> <p> This sample was created at ${created_at}<br> GC_content: ${supplier.measurements.gc_content}</p>'
);

$.template( "sampleListTemplate",
'<li><a href="sample.html" data-transition="slide">${sanger.name}</a></li>');

$.template( "reportListTemplate",
'<li><a href="reports.html" data-transition="slide">${name}</a></li>');
