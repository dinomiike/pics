<?php
require "Db.php";

$db = new Db();
$pic = $db->getPic(1);
$tags["tags"] = $db->getPicTags(4);
$tags2["tags2"] = array("dk");
var_dump($pic);
var_dump($tags);
echo "----------\n";
var_dump(array_merge($pic, $tags));
var_dump($tags2);
echo count($tags2)."\n";
