<?php
header("Access-Control-Allow-Origin: *");
$tone_data= $_POST['tone_data'];
$tone_data = str_replace(' ', '%20', $tone_data);

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21&text=".$tone_data);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");

curl_setopt($ch, CURLOPT_USERPWD, "868ee5e0-b0e4-43ae-b673-5a14607b7e1c" . ":" . "Kl8ZUduoNzji");

$result = curl_exec($ch);

echo $result;
if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
}
curl_close ($ch);
?>