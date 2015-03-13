<?php

function listFolderFiles($dir) {
    global $fileArray;
    $ffs = scandir($dir);
    foreach($ffs as $ff) {
        if($ff != '.' && $ff != '..') {
            if(is_dir($dir.'/'.$ff)) {
            	listFolderFiles($dir.'/'.$ff);
            } else {
            	$fileArray[] = $dir.'/'.$ff;
            }
        }
    }
}

function performReview($path) {
	global $response;
	global $default;

	$command = $default . " " . $path;
	$output = shell_exec($command);

	if(strlen($output) > 0) {
		$response .= "<div class='file_envelope'>";
			$response .= "<h4>$path</h4>";
			$response .= "<pre>$output</pre>";
		$response .= "</div>";
	}
}

$path = $_GET['path'];
$mode = $_GET['mode'];
$standards = $_GET['standards'];
$warnings = $_GET['warnings'];

$default = "phpcs";

if($warnings == 0) {
	$default .= ' -n';
}

if($standards == 1) {
	if (version_compare(phpversion(), '5.4.0', '<') === true) {
		$default .= ' --standard=lib/Ecg-5.3/Ecg';
	} else {
		$default .= ' --standard=lib/Ecg';
	}
}

$pathArray = explode(";", $path);
$path = trim($pathArray[0]);

$response = '';

if($mode == 'folder') {
	$fileArray = array();
	listFolderFiles($path);

	foreach($fileArray as $path) {
		performReview($path);
	}
} else {
	performReview($path);
}

echo $response;
