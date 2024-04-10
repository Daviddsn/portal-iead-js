<?php
// Zegen Functions

//Mailchimp Config
$mailchimp_api = '4e01160ca54f6a361356f0427a221d5f-us1';
$mailchimp_list_id = '38e2b49613';

//E-mail Config
$recipient_mail = "surendar@abileweb.com";
$recipient_name = "Abile Web";

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset( $_POST['mcemail'] ) ) {

	$email = filter_var(trim($_POST["mcemail"]), FILTER_SANITIZE_EMAIL);
	$fname = isset( $_POST["fname"] ) && $_POST["fname"] != '' ? $_POST["fname"] : '';
	$lname = isset( $_POST["lname"] ) && $_POST["lname"] != '' ? $_POST["lname"] : '';
	// Check that data was sent to the mailer.
	if ( !filter_var($email, FILTER_VALIDATE_EMAIL)) {
		// Set a 400 (bad request) response code and exit.
		http_response_code(400);
		echo "Oops! There was a problem with your submission. Please complete the form and try again.";
		exit;
	}
	
	$api_key = $mailchimp_api;
	$list_id = $mailchimp_list_id;

	$memberID = md5(strtolower($email));
	
	$data = json_encode( array(
			'email_address' => $email,
			'status' => 'subscribed',
			'merge_fields'  => [
				'FNAME'     => htmlspecialchars( $fname ),
				'LNAME'     => htmlspecialchars( $lname ),
			]		
		)
	);
	
	$url = 'https://' . substr($api_key,strpos($api_key,'-')+1) . '.api.mailchimp.com/3.0/lists/'. $list_id .'/members/'. $memberID;
	$result = rudr_mailchimp_curl_connect( $url, $api_key, $data);
	
	if( isset( $response['response']['code'] ) && $response['response']['code'] == 200 ){
		echo "Already subscribed.";
	} else {
		echo "Thank you, you have been added to our mailing list.";
	}
	
}elseif ($_SERVER["REQUEST_METHOD"] == "POST" && isset( $_POST['zegen_form_submit'] ) && $_POST['zegen_form_submit'] == 'donation_form' ) {

	// Get the form fields and remove whitespace.
	$name = strip_tags($_POST["name"]);
	$name = str_replace(array("\r","\n"),array(" "," "),$name);
	$email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
	//$phone = trim($_POST["phone"]);
	$subject = trim($_POST["subject"]);
	$message = trim($_POST["message"]);

	// Check that data was sent to the mailer.
	if ( empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
		// Set a 400 (bad request) response code and exit.
		http_response_code(400);
		echo "Oops! There was a problem with your submission. Please complete the form and try again.";
		exit;
	}
	
	require_once "PHPMailer.php";

	$mail = new PHPMailer;
	
	$recipient = $recipient_mail;
	$recipient_name = $recipient_name;

	// Set the email subject.
	$subject = "Zegen contact from $name";

	// Build the email content.
	$email_content = "Name: $name\n";
	$email_content .= "Email: $email\n";
	//$email_content .= "Phone: $phone\n";
	$email_content .= "Subject: $subject\n";
	$email_content .= "Message:\n$message\n";
	
	$mail->From = $email;
	$mail->FromName = $name;
	$mail->addAddress($recipient, $recipient_name);
	
	//Provide file path and name of the attachments
	//$mail->addAttachment($user_file, $userfile_name);        
	$mail->isHTML(true);
	$mail->Subject = $subject;
	$mail->Body = nl2br( $email_content );
	//$mail->AltBody = "This is the plain text version of the email content";
	
	if(!$mail->send()){
		echo "Mailer Error: " . $mail->ErrorInfo;
	}else{
		echo "Message has been sent successfully";
	}
	exit;
	

}elseif ($_SERVER["REQUEST_METHOD"] == "POST" && isset( $_POST['services'] ) ) {

	// Get the form fields and remove whitespace.
	$name = strip_tags(trim($_POST["name"]));
	$name = str_replace(array("\r","\n"),array(" "," "),$name);
	$email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
	$message = trim($_POST["message"]);
	$services = trim($_POST["services"]);

	// Check that data was sent to the mailer.
	if ( empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
		// Set a 400 (bad request) response code and exit.
		http_response_code(400);
		echo "Oops! There was a problem with your submission. Please complete the form and try again.";
		exit;
	}
		
	require_once "PHPMailer.php";

	$mail = new PHPMailer;
	
	$recipient = $recipient_mail;
	$recipient_name = $recipient_name;

	// Set the email subject.
	$subject = "Zegen contact from $name";

	// Build the email content.
	$email_content = "Name: $name\n";
	$email_content .= "Email: $email\n";
	$email_content .= "Service: $services\n";
	$email_content .= "Message:\n$message\n";
	
	
	$mail->From = $email;
	$mail->FromName = $name;
	$mail->addAddress($recipient, $recipient_name);
	
	//Provide file path and name of the attachments
	//$mail->addAttachment($user_file, $userfile_name);        
	$mail->isHTML(true);
	$mail->Subject = $subject;
	$mail->Body = nl2br( $email_content );
	//$mail->AltBody = "This is the plain text version of the email content";
	
	if(!$mail->send()){
		echo "Mailer Error: " . $mail->ErrorInfo;
	}else{
		echo "Message has been sent successfully";
	}
	exit;
	

} elseif ($_SERVER["REQUEST_METHOD"] == "POST" && isset( $_POST['message'] ) ) {

	// Get the form fields and remove whitespace.
	$name = strip_tags(trim($_POST["name"]));
	$name = str_replace(array("\r","\n"),array(" "," "),$name);
	$email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
	//$phone = trim($_POST["phone"]);
	$subject = trim($_POST["subject"]);
	$message = trim($_POST["message"]);

	// Check that data was sent to the mailer.
	if ( empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
		// Set a 400 (bad request) response code and exit.
		http_response_code(400);
		echo "Oops! There was a problem with your submission. Please complete the form and try again.";
		exit;
	}
		
	require_once "PHPMailer.php";

	$mail = new PHPMailer;
	
	$recipient = $recipient_mail;
	$recipient_name = $recipient_name;

	// Set the email subject.
	$subject = "Zegen contact from $name";

	// Build the email content.
	$email_content = "Name: $name\n";
	$email_content .= "Email: $email\n";
	//$email_content .= "Phone: $phone\n";
	$email_content .= "Subject: $subject\n";
	$email_content .= "Message:\n$message\n";
	
	
	$mail->From = $email;
	$mail->FromName = $name;
	$mail->addAddress($recipient, $recipient_name);
	
	//Provide file path and name of the attachments
	//$mail->addAttachment($user_file, $userfile_name);        
	$mail->isHTML(true);
	$mail->Subject = $subject;
	$mail->Body = nl2br( $email_content );
	//$mail->AltBody = "This is the plain text version of the email content";
	
	if(!$mail->send()){
		echo "Mailer Error: " . $mail->ErrorInfo;
	}else{
		echo "Message has been sent successfully";
	}
	exit;
	

} else {
	// Not a POST request, set a 403 (forbidden) response code.
	http_response_code(403);
	echo "There was a problem with your submission, please try again.";
	exit;
}


function rudr_mailchimp_curl_connect( $url, $apiKey, $json = '' ) {
		
	$headers = array(
		'Content-Type: application/json'
	);
	
	$ch = curl_init($url);
	curl_setopt($ch, CURLOPT_USERPWD, 'user:' . $apiKey);
	curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_TIMEOUT, 10);
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
	$result = curl_exec($ch);
	$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	curl_close($ch);
	
	return $httpCode;
	
}