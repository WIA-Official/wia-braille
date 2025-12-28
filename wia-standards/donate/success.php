<?php
require_once 'stripe-config.php';

$sessionId = isset($_GET['session_id']) ? $_GET['session_id'] : '';

// Default values
$name = 'Supporter';
$email = '';
$amount = 0;
$tier = 'supporter';

// Get session info from Stripe
if ($sessionId) {
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => 'https://api.stripe.com/v1/checkout/sessions/' . $sessionId . '?expand[]=customer_details',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_USERPWD => STRIPE_SECRET_KEY . ':',
    ]);
    $response = curl_exec($ch);
    curl_close($ch);
    
    $session = json_decode($response, true);
    
    if (isset($session['customer_details'])) {
        $name = $session['customer_details']['name'] ?? 'Supporter';
        $email = $session['customer_details']['email'] ?? '';
    }
    if (isset($session['amount_total'])) {
        $amount = $session['amount_total'] / 100;
    }
    if (isset($session['metadata']['tier'])) {
        $tier = $session['metadata']['tier'];
    }
    
    // Send notification email to admin
    $to = 'kbcia.or.kr@gmail.com';
    $subject = '💝 New WIA Donation: $' . $amount . ' from ' . $name;
    $message = "New donation received!\n\n";
    $message .= "Name: $name\n";
    $message .= "Email: $email\n";
    $message .= "Amount: $$amount\n";
    $message .= "Tier: $tier\n";
    $message .= "Session ID: $sessionId\n";
    $message .= "\nTime: " . date('Y-m-d H:i:s') . " UTC";
    
    $headers = "From: WIA Donate <noreply@wiastandards.com>\r\n";
    @mail($to, $subject, $message, $headers);
}

// Tier display names
$tierDisplay = [
    'supporter' => 'Supporter',
    'bronze' => 'Bronze',
    'silver' => 'Silver',
    'gold' => 'Gold',
    'diamond' => 'Diamond'
];
$tierName = isset($tierDisplay[$tier]) ? $tierDisplay[$tier] : 'Supporter';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You! - WIA Donation</title>
    <link rel="icon" type="image/x-icon" href="/donate/favicon.ico">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .success-card {
            background: white;
            border-radius: 20px;
            padding: 40px;
            max-width: 550px;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        .success-icon {
            font-size: 80px;
            margin-bottom: 20px;
            animation: bounce 1s ease infinite;
        }
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        h1 { color: #10b981; font-size: 2.5rem; margin-bottom: 10px; }
        .amount { font-size: 3rem; font-weight: 700; color: #1e293b; margin-bottom: 10px; }
        .tier-badge {
            display: inline-block;
            padding: 8px 20px;
            background: linear-gradient(135deg, #ffd700, #ffaa00);
            color: #1e293b;
            border-radius: 20px;
            font-weight: 600;
            margin-bottom: 20px;
        }
        .badge-preview { margin: 20px 0; }
        .badge-preview canvas {
            max-width: 220px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .name-edit {
            margin: 20px 0;
            padding: 20px;
            background: #f8fafc;
            border-radius: 12px;
        }
        .name-edit label {
            display: block;
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 8px;
        }
        .name-edit input {
            width: 100%;
            padding: 12px;
            font-size: 18px;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            text-align: center;
        }
        .name-edit input:focus {
            border-color: #3b82f6;
            outline: none;
        }
        .name-edit small {
            display: block;
            color: #64748b;
            margin-top: 8px;
        }
        .download-btn {
            display: inline-block;
            padding: 18px 50px;
            background: linear-gradient(135deg, #3b82f6, #2563eb);
            color: white;
            text-decoration: none;
            border-radius: 30px;
            font-size: 1.2rem;
            font-weight: 600;
            cursor: pointer;
            border: none;
            margin: 10px;
            transition: all 0.3s ease;
        }
        .download-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4);
        }
        .back-links { margin-top: 20px; }
        .back-btn {
            display: inline-block;
            padding: 12px 25px;
            background: #f1f5f9;
            color: #64748b;
            text-decoration: none;
            border-radius: 25px;
            font-weight: 500;
            margin: 5px;
            transition: all 0.3s;
        }
        .back-btn:hover { background: #e2e8f0; }
        .message {
            color: #64748b;
            margin-top: 20px;
            line-height: 1.6;
        }
        .hongik { color: #ffd700; font-size: 1.2rem; margin-top: 20px; font-weight: 600; }
    </style>
</head>
<body>
    <div class="success-card">
        <div class="success-icon">🎉</div>
        <h1>Thank You!</h1>
        <div class="amount">$<?php echo number_format($amount); ?></div>
        <div class="tier-badge">🏆 <?php echo $tierName; ?> Tier</div>
        
        <div class="badge-preview">
            <canvas id="badgeCanvas" width="400" height="400"></canvas>
        </div>
        
        <div class="name-edit">
            <label for="badgeName">📝 Name on Badge</label>
            <input type="text" id="badgeName" value="<?php echo htmlspecialchars($name); ?>" placeholder="Your name">
            <small>Edit your name as you want it to appear on the badge</small>
        </div>
        
        <button class="download-btn" onclick="downloadBadge()">
            <i class="fas fa-download"></i> Download Your Badge
        </button>
        
        <div class="back-links">
            <a href="/donate/" class="back-btn">
                <i class="fas fa-heart"></i> Donate Again
            </a>
            <a href="/" class="back-btn">
                <i class="fas fa-home"></i> WIA Standards
            </a>
        </div>
        
        <p class="message">
            Your support helps us build standards that benefit all humanity.<br>
            Use your badge proudly on your website, email signature, or social media!
        </p>
        
        <p class="hongik">弘益人間 · Benefit All Humanity</p>
    </div>
    
    <script>
        const tier = '<?php echo $tier; ?>';
        const year = new Date().getFullYear();
        
        const canvas = document.getElementById('badgeCanvas');
        const ctx = canvas.getContext('2d');
        const nameInput = document.getElementById('badgeName');
        
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = function() {
            renderBadge();
        };
        img.src = '/donate/badges/wia-' + tier + '.png';
        
        // Re-render badge when name changes
        nameInput.addEventListener('input', renderBadge);
        
        function renderBadge() {
            const name = nameInput.value || 'Supporter';
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            
            // Add name
            const displayName = name.length > 15 ? name.substring(0, 15) + '...' : name;
            ctx.font = 'bold 28px Georgia, serif';
            ctx.fillStyle = '#1a1a2e';
            ctx.textAlign = 'center';
            ctx.shadowColor = 'rgba(255,255,255,0.8)';
            ctx.shadowBlur = 4;
            ctx.fillText(displayName, canvas.width / 2, canvas.height * 0.78);
            
            // Add year
            ctx.font = 'bold 20px Georgia, serif';
            ctx.fillStyle = '#4a5568';
            ctx.fillText(year.toString(), canvas.width / 2, canvas.height * 0.88);
            ctx.shadowBlur = 0;
        }
        
        function downloadBadge() {
            const name = nameInput.value || 'Supporter';
            const tierCap = tier.charAt(0).toUpperCase() + tier.slice(1);
            const filename = 'WIA-' + tierCap + '-' + name.replace(/[^a-zA-Z0-9]/g, '-') + '-' + year + '.png';
            
            const link = document.createElement('a');
            link.download = filename;
            link.href = canvas.toDataURL('image/png');
            link.click();
        }
    </script>
</body>
</html>
