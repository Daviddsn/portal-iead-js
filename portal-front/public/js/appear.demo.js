$(function() {
	$('section h3').appear();

	$('section').on('appear', 'h3', function(e, $affected) {
	// this code is executed for each appeared element
		$affected.each(function() {
			$(this).css('background', 'green');
		});
	});

	$('section').on('disappear', 'h3', function(e, $affected) {
	// this code is executed for each disappeared element
		$affected.each(function() {
			$(this).css('background', 'red');
		});
	});
});
