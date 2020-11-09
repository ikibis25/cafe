<?php
$un=$_POST['username'];
$em=$_POST['useremail'];
$ad=$_POST['address'];
$ph=$_POST['phone'];
$meesg=$_POST['message'];
if(trim($un)!="" && trim($em)!=""  && trim($ph)!="" && trim($ad)!="" && trim($meesg)!="")
{
	if(filter_var($em, FILTER_VALIDATE_EMAIL)){
			if(preg_match("/^[0-9]*$/", $ph) && strlen($ph)>6) {
				$message="Hi Admin..<p>".$un." has sent a query having subject ".$su." and Phone No ".$phone." email id as ".$em."</p><p>Query is : ".$msg."</p>";
				$headers = "MIME-Version: 1.0" . "\r\n";
				$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
				$headers .= 'From: <support@cafe.com>' . "\r\n";

				if(mail('support@templatebundle.net','Query for cafe',$message,$headers )){
					echo '1#<p style="color:green;">Mail has been sent successfully.</p>';
				}else{
					echo '2#<p style="color:red;">Please, Try Again.</p>';
				}
			}
			else{
				echo '2#<p style="color:red">Please, provide valid Phone no </p>';
			}
		}else{
			echo '2#<p style="color:red">Please, provide valid Email.</p>';
		}
}else{
	echo '2#<p style="color:red">Please, fill all the details.</p>';
}?>