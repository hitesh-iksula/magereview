<?php

include("lib/php_file_tree.php");

$projectPath = $_GET['project_path'];
echo php_file_tree($projectPath, "javascript:initFileReview('[link]');");
