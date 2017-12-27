<?php  

header("Access-Control-Allow-Origin: *");

$watsonPic = $_POST['imagedirectUrl'];



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