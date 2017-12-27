<?php

header("Access-Control-Allow-Origin: *");
$tone_data= "Speaker 0 : Are Speaker 1 : It Speaker 2 : It isnt Speaker 1 : It isnt. Speaker 0 : All over. Speaker 2 : With cricketers assist provocative with little but I n't still for. Speaker 0 : Technology in particular. Speaker 2 : Look you change as a senator Speaker 2 : With cricketers assist provocative with little but I n't still for technology in particular look you change as a senator. Speaker 2 : So I don't think are imported hocus on any given time Speaker 1 : They're making sure ";
$tone_data = str_replace(' ', '%20', $tone_data);
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2017-02-27&text=".$tone_data."&features=keywords,entities,sentiment");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
curl_setopt($ch, CURLOPT_USERPWD, "d3638d41-de9c-47b7-8a91-77bff4a3e1b2" . ":" . "uidJyTM1SiYa");


$result = curl_exec($ch);

echo $result;
if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
}
curl_close ($ch);














?>