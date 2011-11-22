$.template( "studyTemplate", 
'<h2>${name}</h2>This study is ${state} - Created at ${created_at}<p>Sac sponsor: ${sac_sponsor}</p>'
);

$.template( "studyListTemplate",
'<li><a href="status.html" data-transition="slide">${name}</a></li>');

$.template( "orderListTemplate",
'<li><a href="orders.html" data-transition="slide">${name}</a></li>');

$.template( "reportListTemplate",
'<li><a href="reports.html" data-transition="slide">${name}</a></li>');
