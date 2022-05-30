<?php

$service_url="https://vtpass.com/api/balance";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $service_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

//===========================================================================================================

$headers = [
  'Authorization: Basic '.base64_encode($vtpass_login).'',
  'Content-Type: application/json',
]

curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
$request = curl_exec($ch);
curl_close($ch);
$data=json_decode($request, true);
$adbal=$data['contents']['balance'];

if ($adbal < $amount_to_buy){

$refund=$amount_to_pay+$post_balance;
  mysqli_query($db, "UPDATE users SET us_wallets='$pre_balance' WHERE emailR='$buyer_email'");

  mysqli_query($db,"UPDATE mytransaction SET status='Unsuccessful', newbal='".$refund."' WHERE email='".$buyer_email."' AND trx='".$order_id."'");
  mysqli_query($db,"UPDATE system_recharge SET pre_balance='".$pre_balance."', post_balance='".$refund."', status='Unsuccessful' WHERE buyer_email='".$buyer_email."' AND trx='".$order_id."'");

    echo "Airtime Purchase Fail, Please Contact Admin"; // Admin Bal Low
    exit();
}

else{

  $postdata=array(
  'serviceID' => strtolower($service),
  'request_id' => $order_id,
  'amount' => $PDATA[0]+$purchase_discount,
  'phone' => $recharge_phone,
);


$url ="https://vtpass.com/api/pay";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postdata));  //Post Fields
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

//===========================================================================================================

$headers = [
    'Authorization: Basic '.base64_encode($vtpass_login).'',
    'Content-Type: application/json',
];
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
$request = curl_exec($ch);
curl_close($ch);

$rdata=json_decode($request, true);
$code=$rdata['code'];

if ($code==000){
  
mysqli_query($db,"UPDATE mytransaction SET status='Successful' WHERE email='".$buyer_email."' AND trx='".$order_id."'");
mysqli_query($db,"UPDATE system_recharge SET status='Successful' WHERE buyer_email='".$buyer_email."' AND trx='".$order_id."'");
   
echo "200";
exit();

}

else {

$descr=$service." ".$treat_amount." Airtime Purchase  Unsuccessful";

$refund=$amount_to_pay+$post_balance;
mysqli_query($db,"UPDATE users SET us_wallets='$pre_balance' WHERE emailR='$buyer_email'");

mysqli_query($db,"UPDATE mytransaction SET status='Unsuccessful', newbal='".$refund."' WHERE email='".$buyer_email."' AND trx='".$order_id."'");
mysqli_query($db,"UPDATE system_recharge SET pre_balance='".$pre_balance."', post_balance='".$refund."', status='Unsuccessful' WHERE buyer_email='".$buyer_email."' AND trx='".$order_id."'");
    
echo $descr;
    exit();
}

}

?>