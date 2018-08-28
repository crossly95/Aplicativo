<?php
class Product{

    // database connection and table name
    private $conn;
    private $table_name = "tbl_espacios";

    // object properties
    public $id;
    public $name;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
    // read products
function read(){

  // select all query
  $query = "SELECT ESP_Nombre_Espacio, PK_ESP_id_Espacio FROM tbl_espacios";

  // prepare query statement
  $stmt = $this->conn->prepare($query);

  // execute query
  $stmt->execute();

  return $stmt;
}
}
