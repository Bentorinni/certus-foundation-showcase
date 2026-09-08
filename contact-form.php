<?php
/**
 * FUNDUS CERTUS - Contact Form Handler
 * Wysyła maile kontaktowe na fundcerttech@gmail.com
 */

// Nagłówki CORS - dostosuj do swojej domeny
$allowed_origins = [
    'https://funduscertus.eu',
    'https://www.funduscertus.eu',
    'http://localhost:5173',
    'http://localhost:8080'
];

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Odbierz dane JSON
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON']);
    exit;
}

// Honeypot - ukryte pole, boty je wypełniają
if (!empty($input['website'])) {
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Message sent']);
    exit;
}

// Pobierz i wyczyść dane
$name = isset($input['name']) ? trim($input['name']) : '';
$email = isset($input['email']) ? trim($input['email']) : '';
$phone = isset($input['phone']) ? trim($input['phone']) : '';
$message = isset($input['message']) ? trim($input['message']) : '';
$consent = isset($input['consent']) ? (bool)$input['consent'] : false;
$language = isset($input['language']) ? trim($input['language']) : 'pl';

// Walidacja
$errors = [];

if (empty($name) || strlen($name) < 2) {
    $errors[] = 'Imię i nazwisko jest wymagane';
}
if (strlen($name) > 100) {
    $errors[] = 'Imię i nazwisko jest za długie';
}
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Podaj poprawny adres e-mail';
}
if (strlen($email) > 255) {
    $errors[] = 'Adres e-mail jest za długi';
}
if (!empty($phone) && strlen($phone) > 30) {
    $errors[] = 'Numer telefonu jest za długi';
}
if (empty($message) || strlen($message) < 10) {
    $errors[] = 'Wiadomość jest za krótka';
}
if (strlen($message) > 5000) {
    $errors[] = 'Wiadomość jest za długa';
}
if (!$consent) {
    $errors[] = 'Wymagana zgoda na przetwarzanie danych';
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

// Rate limiting - max 3 wiadomości z IP na 10 minut
$ip = $_SERVER['REMOTE_ADDR'];
$rateLimitDir = __DIR__ . '/rate_limit';
$rateLimitFile = $rateLimitDir . '/' . preg_replace('/[^a-zA-Z0-9.-]/', '_', $ip) . '.txt';

if (!is_dir($rateLimitDir)) {
    mkdir($rateLimitDir, 0700, true);
}

$now = time();
$maxAttempts = 3;
$windowSeconds = 600; // 10 minut

$attempts = [];
if (file_exists($rateLimitFile)) {
    $attempts = array_filter(array_map('intval', file($rateLimitFile)), function($t) use ($now, $windowSeconds) {
        return ($now - $t) < $windowSeconds;
    });
}

if (count($attempts) >= $maxAttempts) {
    http_response_code(429);
    echo json_encode(['success' => false, 'message' => 'Too many messages. Please try again later.']);
    exit;
}

$attempts[] = $now;
file_put_contents($rateLimitFile, implode("\n", $attempts) . "\n", LOCK_EX);

// Dane odbiorcy
$recipient_email = 'fundcerttech@gmail.com';
$subject = 'Nowa wiadomość z formularza kontaktowego - FUNDUS CERTUS';

// Sanitacja do maila
$safe_name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$safe_email = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$safe_phone = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
$safe_message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');
$safe_language = htmlspecialchars($language, ENT_QUOTES, 'UTF-8');
$safe_ip = htmlspecialchars($ip, ENT_QUOTES, 'UTF-8');
$safe_date = date('Y-m-d H:i:s');

// Treść HTML maila
$html_message = <<<HTML
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nowa wiadomość - FUNDUS CERTUS</title>
</head>
<body style="margin:0; padding:0; background-color:#0a0a0a; font-family: Arial, Helvetica, sans-serif; color:#ffffff;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#0a0a0a; padding:40px 0;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color:#111111; border-radius:16px; overflow:hidden; border:1px solid #1a1a1a;">
                    <tr>
                        <td style="background: linear-gradient(135deg, #00ff66 0%, #00cc52 100%); padding:30px; text-align:center;">
                            <h1 style="margin:0; font-size:24px; font-weight:bold; color:#000000; text-transform:uppercase; letter-spacing:2px;">FUNDUS CERTUS</h1>
                            <p style="margin:8px 0 0 0; color:#000000; font-size:14px; font-weight:600;">Nowa wiadomość z formularza kontaktowego</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:30px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="color:#ffffff;">
                                <tr>
                                    <td style="padding:12px 0; border-bottom:1px solid #222222;">
                                        <p style="margin:0; color:#00ff66; font-size:12px; text-transform:uppercase; letter-spacing:1px; font-weight:bold;">Imię i nazwisko</p>
                                        <p style="margin:4px 0 0 0; font-size:16px;">{$safe_name}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:12px 0; border-bottom:1px solid #222222;">
                                        <p style="margin:0; color:#00ff66; font-size:12px; text-transform:uppercase; letter-spacing:1px; font-weight:bold;">E-mail</p>
                                        <p style="margin:4px 0 0 0; font-size:16px;"><a href="mailto:{$safe_email}" style="color:#ffffff; text-decoration:none;">{$safe_email}</a></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:12px 0; border-bottom:1px solid #222222;">
                                        <p style="margin:0; color:#00ff66; font-size:12px; text-transform:uppercase; letter-spacing:1px; font-weight:bold;">Telefon</p>
                                        <p style="margin:4px 0 0 0; font-size:16px;">{$safe_phone}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:12px 0; border-bottom:1px solid #222222;">
                                        <p style="margin:0; color:#00ff66; font-size:12px; text-transform:uppercase; letter-spacing:1px; font-weight:bold;">Język strony</p>
                                        <p style="margin:4px 0 0 0; font-size:16px; text-transform:uppercase;">{$safe_language}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:12px 0;">
                                        <p style="margin:0; color:#00ff66; font-size:12px; text-transform:uppercase; letter-spacing:1px; font-weight:bold;">Wiadomość</p>
                                        <p style="margin:4px 0 0 0; font-size:16px; line-height:1.6; white-space:pre-wrap;">{$safe_message}</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color:#0a0a0a; padding:20px 30px; text-align:center; border-top:1px solid #222222;">
                            <p style="margin:0; color:#888888; font-size:12px;">Wiadomość wysłana: {$safe_date} | IP: {$safe_ip}</p>
                            <p style="margin:12px 0 0 0;">
                                <a href="mailto:{$safe_email}" style="display:inline-block; background: linear-gradient(135deg, #00ff66 0%, #00cc52 100%); color:#000000; text-decoration:none; padding:12px 30px; border-radius:8px; font-weight:bold; text-transform:uppercase; font-size:12px; letter-spacing:1px;">Odpowiedz</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
HTML;

// Plain text fallback
$plain_message = "FUNDUS CERTUS - Nowa wiadomość z formularza kontaktowego\n\n";
$plain_message .= "Imię i nazwisko: {$name}\n";
$plain_message .= "E-mail: {$email}\n";
$plain_message .= "Telefon: {$phone}\n";
$plain_message .= "Język: {$language}\n";
$plain_message .= "IP: {$ip}\n";
$plain_message .= "Data: {$safe_date}\n\n";
$plain_message .= "Wiadomość:\n{$message}\n";

// Nagłówki maila
$boundary = md5(time());
$headers = "From: FUNDUS CERTUS <no-reply@funduscertus.eu>\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/alternative; boundary=\"{$boundary}\"\r\n";

$body = "--{$boundary}\r\n";
$body .= "Content-Type: text/plain; charset=UTF-8\r\n";
$body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$body .= $plain_message . "\r\n\r\n";
$body .= "--{$boundary}\r\n";
$body .= "Content-Type: text/html; charset=UTF-8\r\n";
$body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$body .= $html_message . "\r\n\r\n";
$body .= "--{$boundary}--";

// Wyślij maila
$mail_sent = mail($recipient_email, $subject, $body, $headers);

if ($mail_sent) {
    echo json_encode(['success' => true, 'message' => 'Message sent successfully']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send email']);
}
