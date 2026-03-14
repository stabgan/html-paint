<?php
$img = $_POST['basedata'];

$img = str_replace('data:image/png;base64,','',$img);
$img = str_replace(' ','+',$img);

$data = base64_decode($img);

$imagepath = 'image/new'.rand(1,1000000).'.png';
file_put_contents($imagepath, $data);
echo $imagepath;
?>