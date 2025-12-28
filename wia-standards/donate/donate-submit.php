<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// PHPMailer 로드
require_once '/var/www/wiaacademy/wia-auth/PHPMailer/PHPMailer.php';
require_once '/var/www/wiaacademy/wia-auth/PHPMailer/SMTP.php';
require_once '/var/www/wiaacademy/wia-auth/PHPMailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// POST 데이터 받기 (JSON)
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data) {
    $data = $_POST;
}

// 필수 항목 확인
if (empty($data['name']) || empty($data['email'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Name and Email are required.']);
    exit;
}

// 이메일 내용 구성
$subject = '[WIA Donate] New Donation - ' . $data['name'] . ' ($' . ($data['amount'] ?: 'Custom') . ')';

$message = "■ WIA Standards Donation\n\n";
$message .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
$message .= "Donor Information\n";
$message .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
$message .= "Name: " . $data['name'] . "\n";
$message .= "Affiliation: " . ($data['affiliation'] ?: '(Not provided)') . "\n";
$message .= "Email: " . $data['email'] . "\n";
$message .= "Amount: $" . ($data['amount'] ?: 'Custom') . "\n";
$message .= "Display Option: " . ($data['displayOption'] === 'show' ? 'Show in Hall of Fame' : 'Anonymous') . "\n\n";

$message .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
$message .= "Preferences\n";
$message .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
$message .= "Digital Badge: " . ($data['badgeDownload'] ? 'Yes' : 'No') . "\n";
$message .= "Newsletter: " . ($data['newsletter'] ? 'Yes' : 'No') . "\n\n";

$message .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
$message .= "Submitted: " . date('Y-m-d H:i:s') . " (UTC)\n";
$message .= "IP: " . $_SERVER['REMOTE_ADDR'] . "\n";
$message .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";

// PHPMailer 설정
$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'kbcia.or.kr@gmail.com';
    $mail->Password   = 'izwrhxvryttxpluu';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
    $mail->CharSet    = 'UTF-8';

    $mail->setFrom('kbcia.or.kr@gmail.com', 'WIA Donate');
    $mail->addAddress('kbcia.or.kr@gmail.com');  // 수신자
    $mail->addReplyTo($data['email'], $data['name']);

    $mail->isHTML(false);
    $mail->Subject = $subject;
    $mail->Body    = $message;

    $mail->send();
    
    echo json_encode([
        'success' => true, 
        'message' => 'Thank you for your donation! We have received your information.'
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Failed to send email. Please try again later.',
        'error' => $mail->ErrorInfo
    ]);
}
?>
