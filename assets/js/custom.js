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
				'mode': mode,
				'warnings': document.getElementById('warnings').checked ? 1 : 0,
				'standards': document.getElementById('standards').checked ? 1 : 0
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
					$('#project_path').blur();
					initFolderStructure();
					storeLocationInStorage(project_path);
				},
				error: function() {
					alert("Try again with narrower results.");
					$('#explorer .preloader').hide();
				}
			});
		}
	};

	$('#project_path').focus();

	$('.search').live('click', function() {
		initExplorer();
	});

	$('#explorer_form').submit(function(e) {
		initExplorer();
		e.preventDefault();
		return false;
	});

	window.clearLocalStorage = function() {
		localStorage.clear();
	};

	window.getStoredLocations = function() {
		if(typeof(Storage) !== "undefined") {
			return JSON.parse(localStorage.getItem("stored_locations"));
		}
	};

	window.storeLocationInStorage = function(location) {
		if(typeof(Storage) !== "undefined") {
			var storedLocations = getStoredLocations();
			if(storedLocations) {
				if($.inArray(location, storedLocations) == -1) {
					storedLocations.push(location);
					storedLocations = JSON.stringify(storedLocations);
					localStorage.setItem("stored_locations", storedLocations);
					addLocationToDisplay(location);
					$('.history_icon').css('visibility', 'visible');
				}
			} else {
				var locations = [];
				locations.push(location);
				storedLocations = JSON.stringify(locations);
				localStorage.setItem("stored_locations", storedLocations);
				addLocationToDisplay(location);
				$('.history_icon').css('visibility', 'visible');
			}
		}
	};

	window.addLocationToDisplay = function(location) {
		var div = $('<div>', { class: 'location' });
		div.text(location);
		$('.history_container').append(div);
	};

	window.initStoredLocations = function() {
		var storedLocations = getStoredLocations();
		if(storedLocations) {
			$.each(storedLocations, function(index, location) {
				addLocationToDisplay(location);
			});
		} else {
			$('.history_icon').css('visibility', 'hidden');
		}
	};

	initStoredLocations();

	$('.history_icon').click(function() {
		$('.history_container').toggle();
	});

	$(document).mouseup(function(e) {
		var container = $(".history_container");
		var preventer = $('.history_icon');

		if (!preventer.is(e.target) && preventer.has(e.target).length === 0 &&
			!container.is(e.target) && container.has(e.target).length === 0) {
			container.hide();
		}
	});

	$('.location').die("click").live('click', function() {
		$('#project_path').val($(this).text());
		$('#explorer_form').submit();
		$('.history_container').toggle();
	});

	window.warningsSetting = (localStorage.getItem("setting_warnings") === 'true');
	if(localStorage.getItem("setting_warnings") != null) {
		$('#warnings').prop("checked", warningsSetting);
	}

	window.standardsSetting = (localStorage.getItem("setting_standards") === 'true');
	if(localStorage.getItem("setting_standards") != null) {
		$('#standards').prop("checked", standardsSetting);
	}

	$('#warnings').change(function() {
		localStorage.setItem("setting_warnings", this.checked);
	});

	$('#standards').change(function() {
		localStorage.setItem("setting_standards", this.checked);
	});

	$('#clear_data').click(function() {
		if(confirm("Are you sure?")) {
			clearLocalStorage();
			initStoredLocations();
			settingsModal.close();
		}
	});

	/**
	 * This function simulates a modal
	 * Call this on the element which should open modal
	 * Pass element to be shown as the modal as argument
	 */
	$.fn.modal = function(target, externalFunctions) {
		var source = $(this);
		var target = target || source.src;
		target = $(target);
		target.hide();
		var overlay = $('.overlay');
		var duration = 300;
		var modalActive = false;
		var me = this;

		var functions = {
			allowedToOpen: function() {
				return true;
			}
		};
		$.extend(functions, externalFunctions);

		this.allowedToOpen = function() {
			return !source.hasClass('not_allowed') && functions.allowedToOpen();
		};

		this.open = function() {
			if(!modalActive && this.allowedToOpen()) {
				overlay.fadeIn(duration);
				target.css('opacity', 0).show().animate({
					opacity: 1,
					top: 160
				}, duration);
				modalActive = true;
			}
			return this;
		};

		this.close = function() {
			if(modalActive) {
				overlay.fadeOut(duration);
				target.animate({
					opacity: 0,
					top: 150
				}, duration, function() {
					target.hide();
				});
				modalActive = false;
			}
			return this;
		};

		source.click(function() {
			me.open();
		});

		overlay.click(function() {
			me.close();
		});

		$('.close', target).click(function() {
			me.close();
		});

		return this;
	};

	window.settingsModal = $('.settings_icon').modal('.modal');

});
