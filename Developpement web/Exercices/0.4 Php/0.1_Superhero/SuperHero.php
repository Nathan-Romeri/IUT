<?php
class SuperHero extends Human {
    protected $name;
    protected $colors;

    public function __construct($name, $identity, $colors){
        parent::__construct($identity);
        $this->name = $name;
        $this->colors = $colors;
    }

    public function __toString(){
        $html = "<tr>";
        $html .= "<td>".$this->name."</td>";
        $html .= "<td>".$this->identity."</td>";
        $html .= "<td>";
        //foreach($this->colors as $color){
        //    $html .= $color . ", ";
        //}
        // $html = substr($html, 0, strlen($html) - 2);
        // VERSION STYLE
        $html .= implode(", ", $this->colors);
        $html .= "</td>";
        $html .= "</tr>";
        return $html;
    }

    public static function import($list){
        $listOfInstances = [];
        foreach( $list as $arraySuperHero ) {
             $SuperHero = new SuperHero($arraySuperHero["name"],
                                        $arraySuperHero["identity"],
                                        $arraySuperHero["colors"]
                                ); 
             $listOfInstances[] =  $SuperHero;
        }
        return $listOfInstances;
    }

}

?>