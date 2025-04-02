<?php
// Vérifie que la méthode est POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupère les données JSON envoyées par le client
    $data = file_get_contents("php://input");
    $newResult = json_decode($data, true);

    // Chemin vers le fichier result.json
    $filePath = __DIR__ . '/result.json';

    // Lit les données existantes dans result.json
    if (file_exists($filePath)) {
        $existingData = json_decode(file_get_contents($filePath), true);
        if (!is_array($existingData)) {
            $existingData = [];
        }
    } else {
        $existingData = [];
    }

    // Ajoute les nouvelles données
    $existingData[] = $newResult;

    // Écrit les données mises à jour dans result.json
    if (file_put_contents($filePath, json_encode($existingData, JSON_PRETTY_PRINT))) {
        echo json_encode(["success" => true, "message" => "Données sauvegardées avec succès"]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Erreur lors de l'écriture dans le fichier"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Méthode non autorisée"]);
}
?>
