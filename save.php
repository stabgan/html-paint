<?php
// Security headers
header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');

// Input validation
if (!isset($_POST['basedata']) || empty($_POST['basedata'])) {
    http_response_code(400);
    echo json_encode(['error' => 'No image data provided']);
    exit;
}

$img = $_POST['basedata'];

// Validate base64 image format
if (!preg_match('/^data:image\/png;base64,/', $img)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid image format']);
    exit;
}

// Clean and decode
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);

$data = base64_decode($img, true);
if ($data === false) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid base64 data']);
    exit;
}

// Ensure image directory exists
$imageDir = 'image';
if (!is_dir($imageDir)) {
    mkdir($imageDir, 0755, true);
}

// Generate secure filename
$filename = 'paint_' . date('Y-m-d_H-i-s') . '_' . uniqid() . '.png';
$imagepath = $imageDir . '/' . $filename;

// Save file with error handling
if (file_put_contents($imagepath, $data) === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save image']);
    exit;
}

echo json_encode(['success' => true, 'path' => $imagepath]);
?>