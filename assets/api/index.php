<?php
require "Slim/Slim.php";
require "Db/Db.php";

$app = new Slim();

# GET route
$app->get("/getPic/:refid", function($refid) {
	#echo "Hello, $name<br>";
	$db = new Db();
	$pic = $db->getPic($refid);
	echo json_encode($pic);
});

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

$app->run();
