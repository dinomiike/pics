<?php
require "Slim/Slim.php";
require "Db/Db.php";

$app = new Slim();

# GET route
$app->get("/getPic/:id", function($id) {
	$db = new Db();
	$pic = $db->getPic($id);
	$tags["tags"] = $db->getPicTags($id);
	echo json_encode(array_merge($pic, $tags));
});

$app->get("/getPicsTagged/:name", function($name) {
	$db = new Db();
	$pics["taggedPics"] = $db->getPicsTagged($name);
	echo json_encode($pics);
});

/*
$app->get("/getAllTags", function() {
	$db = new Db();
	$tags["tags"] = $db->getAllTags();
	echo json_encode($tags);
});
*/

/*
# POST route
$app->post("/person", function($id) {
	# Create new Person
});

# PUT route
$app->put("/person/:id", function($id) {
	# Update person identified by $id
});

# DELETE route
$app->delete("/person/:id", function($id) {
	# Delete person identified by $id
});
*/

$app->run();
