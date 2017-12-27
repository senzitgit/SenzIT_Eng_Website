<?php
header("Access-Control-Allow-Origin: *");



$text_data= $_POST['text_data'];

$text_data = str_replace(' ', '%20', $text_data);




$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://stream.watsonplatform.net/text-to-speech/api/v1/synthesize?accept=audio/wav&text=".$text_data."&voice=en-US_AllisonVoice");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");

curl_setopt($ch, CURLOPT_USERPWD, "3e70a6a7-634c-424f-a0c9-6d708f3ea60d" . ":" . "IfMyunNL3eRP");

$result = curl_exec($ch);



$milliseconds = round(microtime(true) * 1000);


$fp = fopen("ftp://watson@rebbon.com:senzit123$%^@43.225.55.182/".$milliseconds.".wav","w");
fwrite($fp,$result);
fclose($fp);


echo "http://www.rebbon.com/watson/".$milliseconds.".wav";




if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
}
curl_close ($ch);
?>