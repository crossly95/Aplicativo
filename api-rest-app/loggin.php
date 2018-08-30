<?php
header("Access-Control-Allow-Origin:*");
header("Content-Type: application/x-www-form-urlencoded");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    //PARAMETROS DE LA BASE DE DATOS
    include_once 'database.php';
    /*
    $dns = "mysql:host=localhost;dbname=acadspace";
    $user = "root";
    $pass = "";*/
    //RECUPERAR DATOS DEL FORMULARIO
    $data = file_get_contents("php://input");
    $objData = json_decode($data);

    // ASIGNAR LOS VALORES A LA VARIABLE
    $name = $objData->user;
    $pass = $objData->pass;

    // lIMPIAR LOS DATOS
    $name = stripslashes($name);
    $pass = stripslashes($pass);


    try {
      $database = new Database();
      $con = $database->getConnection("developer");
      //$con = new PDO($dns, $user, $pass);
      if(!$con){
        echo "No se puede conectar a la base de datos";
      }

      //$sql = " SELECT email, numbert_document ,username FROM users_udec WHERE email='".$name."' AND numbert_document='".$pass."' ";
     // $sql = " SELECT numbert_document,username,email FROM users_udec";

      $query = $con->prepare('SELECT number_document,username,email FROM users_udec');

        $query->execute();

        $registros = "[";

        while($result = $query->fetch()){
          if ($registros != "[") {
            $registros .= ",";
          }
          $registros .= '{"id": "'.$result["number_document"].'",';
          $registros .= '"name": "'.$result["username"].'",';
          $registros .= '"price": "'.$result["email"].'"}';
        }
        $registros .= "]";
        echo json_encode($registros);



    } catch (Exception $e) {
      echo "Erro: ". $e->getMessage();
    };



