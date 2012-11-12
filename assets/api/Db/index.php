<?php
require "Db.php";

$searchTerm = "iceland";

$db = new Db();
#var_dump($db->searchFor($searchTerm));
#$combinedData = $db->searchFor($searchTerm);
#var_dump($combinedData);

$tags["tags"] = $db->searchTagsFor($searchTerm);
var_dump($tags);

echo "\n";

$pics["pics"] = $db->searchPicsFor($searchTerm);
var_dump($pics);

/*
usort($combinedData, "relevanceSort");
function relevanceSort($a, $b) {
	return $a["relevance"] > $b["relevance"];
}
*/

echo "\n";
