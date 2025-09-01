<?php
declare(strict_types=1);

/* ========== BASIC SETTINGS ========== */

// where audio files will be stored (outside htdocs is best)
define('STORAGE_DIR', 'D:/BanglaSpeechUI/audio');

// ffmpeg binary path (leave as 'ffmpeg' if it's in PATH)
define('FFMPEG_PATH', 'ffmpeg');

/* ========== DATABASE SETTINGS ========== */
define('DB_HOST', '127.0.0.1');   // MySQL host
define('DB_NAME', 'shobdotori');  // database name
define('DB_USER', 'root');        // database user
define('DB_PASS', '');            // database password (set if your root has a password)

/* ========== ALLOWED ORIGINS (CORS) ========== */
$ALLOWED_ORIGINS = [
  'http://localhost',
  'http://127.0.0.1',
  'http://localhost:5500', // VS Code Live Server
  'http://127.0.0.1:5500',
  'https://your-netlify-site.netlify.app', // replace with your actual Netlify domain
];

/* ========== HELPERS ========== */

// Database connection (PDO)
function db() {
  static $pdo;
  if (!$pdo) {
    try {
      $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
      $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
      ]);
    } catch (PDOException $e) {
      json_response(['error' => 'DB connection failed', 'details' => $e->getMessage()], 500);
    }
  }
  return $pdo;
}

// Handle CORS headers
function send_cors(): void {
  global $ALLOWED_ORIGINS;
  $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
  if ($origin && in_array($origin, $ALLOWED_ORIGINS, true)) {
    header("Access-Control-Allow-Origin: $origin");
  } else {
    header("Access-Control-Allow-Origin: *");
  }
  header('Vary: Origin');
  header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
}

// Handle OPTIONS preflight
function preflight_exit(): void {
  if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
    send_cors();
    http_response_code(204);
    exit;
  }
}

// JSON response helper
function json_response($data, int $status = 200): void {
  if (!headers_sent()) {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
  }
  echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  exit;
}

// Sanitize dialect name (only letters, numbers, underscore, hyphen)
function sanitize_dialect(string $d): string {
  $d = strtolower(trim(str_replace(' ', '_', $d)));
  if (!preg_match('/^[a-z0-9_\-]+$/', $d)) {
    json_response(['error' => 'invalid dialect'], 400);
  }
  return $d;
}

// Ensure folder exists
function ensure_dir(string $path): void {
  if (!is_dir($path)) {
    if (!@mkdir($path, 0777, true) && !is_dir($path)) {
      json_response(['error' => "cannot create folder: $path"], 500);
    }
  }
}

// Get next available index for a dialect
function next_index_for(string $dialect): int {
  $pdo = db();
  $stmt = $pdo->prepare("SELECT COALESCE(MAX(index_no)+1,0) AS next_index FROM recordings WHERE dialect=?");
  $stmt->execute([$dialect]);
  return (int)($stmt->fetch()['next_index'] ?? 0);
}

// Check ffmpeg availability
function ffmpeg_available(): bool {
  $cmd = escapeshellcmd(FFMPEG_PATH) . ' -version';
  $out = [];
  $ret = null;
  @exec($cmd, $out, $ret);
  return ($ret === 0);
}

// Convert audio to wav
function convert_to_wav(string $src, string $dst, int $sr = 16000, bool $mono = true): void {
  if (!ffmpeg_available()) {
    json_response(['error' => 'ffmpeg not found on server.'], 500);
  }
  $parts = [escapeshellcmd(FFMPEG_PATH), '-y', '-i', escapeshellarg($src)];
  if ($mono) { $parts[] = '-ac'; $parts[] = '1'; }
  if ($sr > 0) { $parts[] = '-ar'; $parts[] = (string)$sr; }
  $parts[] = escapeshellarg($dst);

  $cmd = implode(' ', $parts) . ' 2>&1';
  $out = [];
  $ret = null;
  @exec($cmd, $out, $ret);

  if ($ret !== 0 || !file_exists($dst)) {
    json_response(['error' => 'ffmpeg failed', 'details' => $out], 500);
  }
}

/* Ensure storage dir exists */
ensure_dir(STORAGE_DIR);
