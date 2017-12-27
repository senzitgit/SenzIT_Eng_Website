<?php
header("Access-Control-Allow-Origin: *");
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://stream.watsonplatform.net/authorization/api/v1/token?url=https://stream.watsonplatform.net/speech-to-text/api");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");

curl_setopt($ch, CURLOPT_USERPWD, "86c47d1d-c1dc-4b4b-928c-0ad3eba16b27" . ":" . "In6SHur3mOAY");

$result = curl_exec($ch);
echo $result;
if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
}
curl_close ($ch);
?>