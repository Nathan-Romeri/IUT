<?php

class Vehicle {
    protected $idvehicle;
    protected $model;
    protected $brand;
    protected $power;
    protected $color;
    protected $energy;
    protected $price;

    public function __construct(){
    }

    public function __get($attr){
        return $this->$attr;
    }

    public function __set($attr, $value){
         //Connexion DB -> à externaliser
         $db = new PDO("pgsql:host=srv-peda.iut-acy.local;dbname=romerin;port=5433", "romerin", "xxxx");
         $db->query("SET search_path TO vrouminours;"); // SCHEMA
 
         //Modif de l'attribut en local
 
         //Modif de l'attribut dans le SGBD
         $stm = $db->prepare("update vehicle set $attr=:value where idvehicle=:id");
         $stm->bindValue(":id", $this->idvehicle);
         $stm->bindValue(":value",$value);
         $stm->execute();
    }


    public static function load($id){
        $db = new PDO("pgsql:host=srv-peda.iut-acy.local;dbname=romerin;port=5433", "romerin", "W6i4av");
        $db->query("SET search_path TO vrouminours;"); // SCHEMA
        $stm = $db->prepare("select * from vehicle where idvehicle=:id");
        $stm->bindValue(":id",$id);
        $stm->execute();

        $result = $stm->fetch(PDO::FETCH_ASSOC);

        $vehicle = new Vehicle();
        $vehicle->idvehicle = $result["idvehicle"];
        $vehicle->model = $result["model"];
        $vehicle->brand = $result["brand"];
        $vehicle->power = $result["power"];
        $vehicle->color = $result["color"];
        $vehicle->energy = $result["energy"];
        $vehicle->price = $result["price"];

        return $vehicle;
    }

}

?>