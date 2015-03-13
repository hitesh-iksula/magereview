$(document).ready( function() {

	var adjustHeight = function() {
		var minus = $('#explorer .directory_input_container').outerHeight() + $('#explorer h2').outerHeight();
		$('#explorer .print').height($(window).height() - minus);

		var minus = $('#response .selected_path_container').outerHeight() + $('#response h2').outerHeight();
		$('#response .print').height($(window).height() - minus);
	};

	adjustHeight();

	$(window).resize(function() {
		adjustHeight();
	});

	var initFolderStructure = function() {
		$(".php-file-tree").find("UL").hide();

		$(".pft-directory > A").die("click").live('click', function(e) {
			e.preventDefault();
			$(this).parent().find("UL:first").slideToggle("fast");
			if( $(this).parent().attr('className') == "pft-directory" ) return false;
		});
	};

	var initReview = function(path, mode) {
		$('#response .preloader').show();
		$('#response .print').empty();
		$('.selected_path').html(path);

		$.ajax({
			method: "GET",
			url: 'exec.php',
			data: {
				'path': path,
				'mode': mode
			},
			success: function(response) {
				$('#response .preloader').hide();
				$('#response .print').html(response);
			}
		});
	};

	window.initFileReview = function(path) {
		if(path) {
			initReview(path, 'file');
		}
	};

	window.initFolderReview = function(path) {
		if(path) {
			initReview(path, 'folder');
		}
	};

	window.initExplorer = function() {
		var project_path = $('#project_path').val();

		if(project_path.length > 0) {
			$('#explorer .preloader').show();
			$('#explorer .print').empty();

			$.ajax({
				method: "GET",
				url: 'dir.php',
				data: {
					'project_path': project_path,
				},
				success: function(response) {
					$('#explorer .preloader').hide();
					$('#explorer .print').html(response);
					initFolderStructure();
				},
				error: function() {
					alert("Try again with narrower results.");
					$('#explorer .preloader').hide();
				}
			});
		}
	};

	$('.search').live('click', function() {
		initExplorer();
	});

	$('#explorer_form').submit(function(e) {
		initExplorer();
		e.preventDefault();
		return false;
	});

});
