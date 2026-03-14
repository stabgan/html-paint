<?php
/**
 * save.php — Server-side image save (optional, requires PHP).
 *
 * Accepts a base64-encoded PNG via POST and writes it to the image/ directory.
 * NOTE: The front-end now saves images client-side by default.
 *       This file is kept for reference / server-side workflows.
 */

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Validate input exists
if (empty($_POST['basedata'])) {
    http_response_code(400);
    echo json_encode(['error' => 'No image data provided']);
    exit;
}

$img = $_POST['basedata'];

// Validate that it looks like a data-URI PNG
if (strpos($img, 'data:image/png;base64,') !== 0) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid image format — expected PNG data URI']);
    exit;
}

$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img, true);

if ($data === false) {
    http_response_code(400);
    echo json_encode(['error' => 'Base64 decode failed']);
    exit;
}

// Ensure target directory exists
$dir = __DIR__ . '/image';
if (!is_dir($dir)) {
    mkdir($dir, 0755, true);
}

// Use a unique filename to avoid collisions
$filename = 'image/paint_' . bin2hex(random_bytes(8)) . '.png';
$filepath = __DIR__ . '/' . $filename;

if (file_put_contents($filepath, $data) === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to write file']);
    exit;
}

header('Content-Type: application/json');
echo json_encode(['path' => $filename]);
