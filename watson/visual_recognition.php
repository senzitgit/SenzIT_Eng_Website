<?php  

header("Access-Control-Allow-Origin: *");

   $ftp_server='43.225.55.182';
   $conn_id = ftp_connect($ftp_server); 
   
   

   $user="visual@rebbon.com"; 
   $passwd="senzit123$%^"; 
   $login_result = ftp_login($conn_id, $user, $passwd); 



$milliseconds = round(microtime(true) * 1000);
$destination_file= $milliseconds.".jpg";
$source_file= $_FILES["uploadedfile"]["tmp_name"];
$upload = ftp_put($conn_id, $destination_file, $source_file, FTP_BINARY); 
ftp_close($conn_id); 

$watsonPic = "http://www.rebbon.com/visual/".$milliseconds.".jpg";



$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classify?api_key=1459383d7412b38d443ac481638b439a7cdb363d&url=".$watsonPic."&version=2016-05-20");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");

$result = curl_exec($ch);

echo $result;

if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
}
curl_close ($ch);


?>