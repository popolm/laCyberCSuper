<?php
// Get the raw POST data
$data = file_get_contents("php://input");

// Decode the JSON data
$newResult = json_decode($data, true);

// Path to the result.json file
$filePath = __DIR__ . '/result.json';

// Read the existing data from result.json
if (file_exists($filePath)) {
    $existingData = json_decode(file_get_contents($filePath), true);
    if (!is_array($existingData)) {
        $existingData = [];
    }
} else {
    $existingData = [];
}

// Append the new result
$existingData[] = $newResult;

// Save the updated data back to result.json
if (file_put_contents($filePath, json_encode($existingData, JSON_PRETTY_PRINT))) {
    echo json_encode(["success" => true, "message" => "Result saved successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Failed to save result"]);
}
?>
