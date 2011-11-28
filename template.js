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

// samples

$.template( "sampleTemplate", 
'<h2>${sanger.name}</h2> <p> This sample was created at ${created_at}<br> GC_content: ${supplier.measurements.gc_content}.<br><br>There are ${size} samples tubes for this sample.</p>'
);

$.template( "sampleListTemplate",
'<li><a href="sample.html" data-transition="slide">${sanger.name}</a></li>');

// assets

$.template( "assetTemplate", 
'<h2>${barcode.ean13} ${barcode.prefix}.${barcode.number}</h2> <p> This asset was created at ${created_at} for sample ${name}<br>Last updated at ${updated_at}</p>');

$.template( "assetListTemplate", 
'<li><a href="asset.html" data-transition="slide">${name} ${barcode.ean13}</a></li>');

// requests

$.template( "requestTemplate", 
'<h2>${type}</h2> <p> This request was created at ${created_at}.<br>Last updated at ${updated_at} <br>Current state: ${state} <br>Fragment from ${fragment_size.from} to ${fragment_size.to}</p>');

$.template( "requestListTemplate", 
'<li><a href="request.html" data-transition="slide">${name} ${type}</a></li>');

// reports

$.template( "reportListTemplate",
'<li><a href="reports.html" data-transition="slide">${name}</a></li>');
