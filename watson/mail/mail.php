<?php


header("Access-Control-Allow-Origin: *");
$name= $_POST['fullname'];
$companyname= $_POST['company'];
$email= $_POST['email'];
$mobile= $_POST['mobile'];
$country= $_POST['country'];
$designation= $_POST['designation'];
$product= $_POST['product'];



require("class.phpmailer.php");

$mail = new PHPMailer();

$mail->IsSMTP();
$mail->Host = "mail.senzit.net";

$mail->SMTPAuth = true;
//$mail->SMTPSecure = "ssl";
$mail->Port = 25;
$mail->Username = "demo@senzit.net";
$mail->Password = "demo123$%^";

$mail->From = "demo@senzit.net";
$mail->FromName = "Product Demo";
$mail->AddAddress("sales@senzit.net");
//$mail->AddReplyTo("mail@mail.com");

$mail->IsHTML(true);



$mail->Subject = "Product Demo Request";
$mail->Body = "<h3>Demo Request For > ".$product."</h3><br>Name : <b>".$name."</b><br><br>Company Name : <b>".$companyname."</b><br><br>Designation : <b>".$designation."</b><br><br>Mobile Number: <b>".$mobile."</b><br><br>Email Address: <b>".$email."</b><br><br>Country Name: <b>".$country."</b>";


if(!$mail->Send())
{
echo "Message could not be sent. <p>";
echo "Mailer Error: " . $mail->ErrorInfo;
exit;
}

echo "Message has been sent";

?>