<?php
header("Access-Control-Allow-Origin: *");
$speech_data= "you+are+the+one";


   




$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://gateway.watsonplatform.net/language-translator/api/v2/translate?source=en&target=es&text=".$speech_data);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");

curl_setopt($ch, CURLOPT_USERPWD, "7fd8eb9d-b535-4f4e-9143-16e854b0a372" . ":" . "OVR0M6cbQkkU");

$result = curl_exec($ch);
echo $result ;
if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
}
curl_close ($ch);















?>