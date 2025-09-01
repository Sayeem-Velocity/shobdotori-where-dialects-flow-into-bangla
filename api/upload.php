<?php
require __DIR__ . '/config.php';
send_cors();
preflight_exit();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  json_response(['error' => 'POST only'], 405);
}
if (!isset($_FILES['file'])) {
  json_response(['error' => 'file missing'], 400);
}

$dialect = sanitize_dialect($_POST['dialect'] ?? '');
if (!$dialect) json_response(['error'=>'dialect required'],400);

$index = isset($_POST['index']) ? (int)$_POST['index'] : next_index_for($dialect);
$sentence_no = isset($_POST['sentence_no']) ? (int)$_POST['sentence_no'] : null;

$base = STORAGE_DIR . DIRECTORY_SEPARATOR . $dialect;
ensure_dir($base);

$tmp   = $_FILES['file']['tmp_name'];
$final = $base . DIRECTORY_SEPARATOR . $dialect . "_train ($index).wav";

convert_to_wav($tmp, $final, 16000, true);

$size = filesize($final);
$rel  = $dialect . '/' . basename($final);

// Save to DB
$pdo = db();
$stmt = $pdo->prepare("INSERT INTO recordings (dialect,index_no,sentence_no,filename,rel_path,absolute_path,mime,bytes) 
                       VALUES (?,?,?,?,?,?,?,?)");
$stmt->execute([
  $dialect, $index, $sentence_no, basename($final),
  $rel, $final, $_FILES['file']['type'] ?? '', $size
]);

json_response([
  'status'=>'ok',
  'dialect'=>$dialect,
  'index'=>$index,
  'filename'=>basename($final),
  'path'=>$final
]);
