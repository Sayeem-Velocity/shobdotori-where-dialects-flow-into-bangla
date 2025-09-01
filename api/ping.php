<?php
require __DIR__ . '/config.php';
send_cors();
preflight_exit();

try {
    $pdo = db();              // use db() from config.php
    $pdo->query("SELECT 1");  // simple test query
    $db_status = "connected";
} catch (Exception $e) {
    $db_status = "error: " . $e->getMessage();
}

json_response([
  'status'  => 'ok',
  'storage' => STORAGE_DIR,
  'ffmpeg'  => ffmpeg_available(),
  'db'      => $db_status
]);
