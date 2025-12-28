<?php
header('Content-Type: application/json');
require_once 'stripe-config.php';

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

$amount = isset($data['amount']) ? intval($data['amount']) : 0;
$tier = isset($data['tier']) ? $data['tier'] : 'supporter';

if ($amount < 1) {
    echo json_encode(['error' => 'Invalid amount']);
    exit;
}

// Determine product name based on tier
$tierNames = [
    'supporter' => 'WIA Supporter',
    'bronze' => 'WIA Bronze Supporter', 
    'silver' => 'WIA Silver Supporter',
    'gold' => 'WIA Gold Supporter',
    'diamond' => 'WIA Diamond Supporter'
];
$productName = isset($tierNames[$tier]) ? $tierNames[$tier] : 'WIA Donation';

// Create Stripe Checkout Session using cURL
$ch = curl_init();

$sessionData = [
    'payment_method_types' => ['card'],
    'submit_type' => 'donate',
    'billing_address_collection' => 'auto',
    'line_items' => [[
        'price_data' => [
            'currency' => 'usd',
            'product_data' => [
                'name' => $productName . ' ($' . $amount . ')',
                'description' => 'Thank you for supporting WIA Standards! 弘益人間 · Benefit All Humanity',
                'images' => ['https://wiastandards.com/donate/badges/wia-' . $tier . '.png']
            ],
            'unit_amount' => $amount * 100
        ],
        'quantity' => 1
    ]],
    'mode' => 'payment',
    'success_url' => SITE_URL . '/success.php?session_id={CHECKOUT_SESSION_ID}',
    'cancel_url' => SITE_URL . '/?cancelled=true',
    'metadata' => [
        'tier' => $tier,
        'amount' => $amount,
        'source' => 'wiastandards_donate'
    ]
];

curl_setopt_array($ch, [
    CURLOPT_URL => 'https://api.stripe.com/v1/checkout/sessions',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => http_build_query($sessionData),
    CURLOPT_USERPWD => STRIPE_SECRET_KEY . ':',
    CURLOPT_HTTPHEADER => ['Content-Type: application/x-www-form-urlencoded']
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$result = json_decode($response, true);

if ($httpCode === 200 && isset($result['url'])) {
    echo json_encode(['url' => $result['url']]);
} else {
    echo json_encode(['error' => 'Failed to create checkout session', 'details' => $result]);
}
