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

$default = "phpcs --standard=lib/Ecg";
$path = $_GET['path'];
$mode = $_GET['mode'];

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
