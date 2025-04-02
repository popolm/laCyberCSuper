
<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Répondre aux requêtes preflight (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
$data = json_decode(file_get_contents("php://input"), true);
$file = "result.json";

// Initialiser le fichier vide
if ($data["action"] === "init") {
    file_put_contents($file, json_encode([
        "role" => $data["role"],
        "réponses" => []
    ], JSON_PRETTY_PRINT));
    exit;
}

// Ajouter ou mettre à jour une réponse
if ($data["action"] === "update") {
    if (!file_exists($file)) exit;

    $json = json_decode(file_get_contents($file), true);
    $found = false;

    foreach ($json["réponses"] as &$entry) {
        if ($entry["id"] === $data["id"]) {
            $entry["bonneréponse"] = $data["bonneréponse"];
            $found = true;
            break;
        }
    }
    if (!$found) {
        $json["réponses"][] = [
            "id" => $data["id"],
            "bonneréponse" => $data["bonneréponse"]
        ];
    }

    file_put_contents($file, json_encode($json, JSON_PRETTY_PRINT));
}
?>