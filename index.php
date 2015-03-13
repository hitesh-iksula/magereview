<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>Magento Code Review Tool</title>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />

		<link href='http://fonts.googleapis.com/css?family=Roboto:100,400,300,500' rel='stylesheet' type='text/css'>
		<link href='http://fonts.googleapis.com/css?family=Roboto+Slab:400,300' rel='stylesheet' type='text/css'>
		<link href='http://fonts.googleapis.com/css?family=Ubuntu+Mono' rel='stylesheet' type='text/css'>

		<link href="assets/css/default.css" rel="stylesheet" type="text/css" media="screen" />
		<link href="assets/css/custom.css" rel="stylesheet" type="text/css" media="screen" />

		<script type="text/javascript" src="//code.jquery.com/jquery-1.7.2.min.js"></script>
		<script src="assets/js/custom.js" type="text/javascript"></script>
	</head>

	<body>
		<div id="explorer">
			<h2>Directory</h2>

			<div class="directory_input_container">
				<div class="history_icon">
					<img src="assets/images/clock.png"/>
				</div>

				<form action="#" id="explorer_form" name="explorer_form">
					<input type="text" placeholder="Full path to directory" id="project_path" name="project_path"/>
				</form>

				<div class="search">
					<img src="assets/images/search.png"/>
				</div>

				<div class="settings_icon">
					<img src="assets/images/settings.png"/>
				</div>
			</div>

			<div class="history_container"></div>

			<div class="print">
				<div class="intro">1. Type a directory path above to get started.</div>
			</div>

			<div class="preloader"></div>
		</div>

		<div id="response">
			<h2>Code Review</h2>

			<div class="selected_path_container">
				<div class="selected_path">&nbsp;</div>
			</div>

			<div class="print">
				<div class="intro">2. Click on a file or folder to review it.</div>
			</div>

			<div class="preloader"></div>
		</div>

		<div class="modal">
			<div class="modal_inner">
				<h2>Settings</h2>

				<div class="content">
					<div class="parameters">
						<div class="parameter">
							<input type="checkbox" class="settings_checkbox" id="warnings" name="warnings" value="1" checked="checked"/>
							<label for="warnings">Show warnings</label>
						</div>

						<div class="parameter">
							<input type="checkbox" class="settings_checkbox" id="standards" name="standards" value="1" checked="checked"/>
							<label for="standards">Use Magento standards (uncheck for PHP standards)</label>
						</div>

						<div class="parameter action">
							<label id="clear_data">Clear saved data</label>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="overlay"></div>
	</body>
</html>
