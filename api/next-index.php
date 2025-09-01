<?php
require __DIR__ . '/config.php';
send_cors();
preflight_exit();

$dialect = isset($_GET['dialect']) ? sanitize_dialect($_GET['dialect']) : '';
if ($dialect === '') json_response(['error'=>'dialect required'], 400);

// Ensure dialect folder exists (returns 0 if newly created)
$dir = rtrim(STORAGE_DIR, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . $dialect;
ensure_dir($dir);

$next = next_index_for($dialect);
json_response(['dialect' => $dialect, 'next_index' => $next]);
