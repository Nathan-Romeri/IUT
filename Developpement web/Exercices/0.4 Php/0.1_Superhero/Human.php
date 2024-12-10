<?php

class Human {
    protected $identity;

    public function __construct($identity){
        $this->identity = $identity;
    }

    public function __get($attr){
        return $this->$attr;
    }

    public function __set($attr, $value){
        $this->$attr = $value;
    }

    public function __toString(){
        return "Humain : ".$this->identity."<br/>";
    }

}

?>