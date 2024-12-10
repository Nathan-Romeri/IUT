<?php

function loadMyClass($className){
    include_once $className.".php";
}
spl_autoload_register('loadMyClass');

$vehicle = Vehicle::load(1);
var_dump($vehicle);
$vehicle->model ="Polo V";
$vehicle = Vehicle::load(1);
var_dump($vehicle);
?>