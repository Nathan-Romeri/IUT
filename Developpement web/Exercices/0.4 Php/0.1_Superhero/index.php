<?php
function loadMyClass($className){
    include_once $className.".php";
}
spl_autoload_register('loadMyClass');

/*
$batman = new SuperHero("Batman","Bruce Wayne", [ "black" ]);
//echo $batman->name;
//echo $batman->identity;
//var_dump($batman);
echo $batman;

$denis = new SuperHero("Denisgaming","Denis Mineur", [ "purple" ]);
echo $denis;

$anes = new Human("RoiBourdon");
echo $anes;
*/

$list = 
    [
        ["name"     => "Batman", 
              "identity" => "Bruce Wayne", 
              "colors"   => ["black" ] ],
        ["name"     => "Superman", 
              "identity" => "clark Kent", 
              "colors"   => ["red","blue" ] ],
        ["name"     => "Flash", 
              "identity" => "Barry Allen", 
              "colors"   => ["Red","Yellow" ] ]
    ];
$superheroes = SuperHero::import($list);
echo "<table>";
foreach( $superheroes as $superhero) {
    echo $superhero;
}
echo "</table>";
?>