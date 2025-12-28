#!/bin/bash

# WIA Live Standards Group 2 Press Kit Generator
# Creates press kits for 100 standards (data-quality to inter-korean-data-exchange)

STANDARDS=(
    "data-quality"
    "data-visualization"
    "data-warehouse"
    "ddos-protection"
    "deep-sea-aquaculture"
    "defi"
    "delivery-robot"
    "desert-agriculture"
    "desertification-prevention"
    "digital-asset-inheritance"
    "digital-citizenship"
    "digital-content"
    "digital-credential"
    "digital-currency"
    "digital-erasure"
    "digital-executor"
    "digital-funeral"
    "digital-id"
    "digital-identity-after-death"
    "digital-identity-fin"
    "digital-memorial"
    "digital-pathology"
    "digital-textbook"
    "digital-time-capsule"
    "digital-twin-city"
    "digital-wallet"
    "digital-will"
    "direct-air-capture"
    "disaster-management-system"
    "distributed-energy"
    "dpki"
    "drone-uav"
    "e-government"
    "e-learning"
    "economic-integration"
    "ecosystem-restoration"
    "edge-ai"
    "edible-algae"
    "edu"
    "education-integration"
    "educational-ai"
    "educational-metaverse"
    "educational-robot"
    "elderly-care-device"
    "electricity-grid"
    "emergency-medical-data"
    "emergency-response"
    "emotion-ai"
    "energy-cloud"
    "energy-storage"
    "entertainment-robot"
    "esg-finance"
    "esports"
    "evtol"
    "exoskeleton"
    "explainable-ai"
    "eye-gaze"
    "family-reunion-data"
    "federated-learning"
    "financial-data-exchange"
    "financial-inclusion"
    "fintech"
    "food-allergy-passport"
    "food-crisis-response"
    "food-safety"
    "food-security"
    "food-traceability"
    "food-waste-reduction"
    "fuel-cell"
    "fusion-energy"
    "game"
    "game-based-learning"
    "gas-supply"
    "gdpr-compliance"
    "generative-ai"
    "glacier-preservation"
    "global-health-data"
    "graph-database"
    "green-infrastructure"
    "greenhouse-gas-monitoring"
    "haptic"
    "hardware-security-module"
    "health"
    "health-insurance-data"
    "healthcare-blockchain"
    "healthcare-insurance"
    "healthcare-integration"
    "home"
    "homomorphic-encryption"
    "hospital-info-system"
    "hydrogen-energy"
    "hydroponics"
    "identity-management"
    "immersive-media"
    "industrial-robot"
    "infrastructure-integration"
    "insect-protein"
    "insurtech"
    "intent-lang"
    "inter-korean-data-exchange"
)

# Function to convert kebab-case to Title Case
to_title_case() {
    echo "$1" | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) tolower(substr($i,2))}1'
}

# Function to get Korean name (simplified mapping)
get_korean_name() {
    case "$1" in
        "data-quality") echo "데이터 품질" ;;
        "data-visualization") echo "데이터 시각화" ;;
        "data-warehouse") echo "데이터 웨어하우스" ;;
        "ddos-protection") echo "DDoS 보호" ;;
        "deep-sea-aquaculture") echo "심해 양식" ;;
        "defi") echo "탈중앙화 금융" ;;
        "delivery-robot") echo "배달 로봇" ;;
        "desert-agriculture") echo "사막 농업" ;;
        "desertification-prevention") echo "사막화 방지" ;;
        "digital-asset-inheritance") echo "디지털 자산 상속" ;;
        "digital-citizenship") echo "디지털 시민권" ;;
        "digital-content") echo "디지털 콘텐츠" ;;
        "digital-credential") echo "디지털 자격증명" ;;
        "digital-currency") echo "디지털 화폐" ;;
        "digital-erasure") echo "디지털 삭제권" ;;
        "digital-executor") echo "디지털 유언집행자" ;;
        "digital-funeral") echo "디지털 장례" ;;
        "digital-id") echo "디지털 신원증명" ;;
        "digital-identity-after-death") echo "사후 디지털 신원" ;;
        "digital-identity-fin") echo "금융 디지털 신원" ;;
        "digital-memorial") echo "디지털 추모" ;;
        "digital-pathology") echo "디지털 병리학" ;;
        "digital-textbook") echo "디지털 교과서" ;;
        "digital-time-capsule") echo "디지털 타임캡슐" ;;
        "digital-twin-city") echo "디지털 트윈 도시" ;;
        "digital-wallet") echo "디지털 지갑" ;;
        "digital-will") echo "디지털 유언장" ;;
        "direct-air-capture") echo "직접 공기 포집" ;;
        "disaster-management-system") echo "재난 관리 시스템" ;;
        "distributed-energy") echo "분산 에너지" ;;
        "dpki") echo "분산 공개키 인프라" ;;
        "drone-uav") echo "드론/무인항공기" ;;
        "e-government") echo "전자정부" ;;
        "e-learning") echo "전자학습" ;;
        "economic-integration") echo "경제 통합" ;;
        "ecosystem-restoration") echo "생태계 복원" ;;
        "edge-ai") echo "엣지 AI" ;;
        "edible-algae") echo "식용 조류" ;;
        "edu") echo "교육" ;;
        "education-integration") echo "교육 통합" ;;
        "educational-ai") echo "교육용 AI" ;;
        "educational-metaverse") echo "교육 메타버스" ;;
        "educational-robot") echo "교육용 로봇" ;;
        "elderly-care-device") echo "노인 돌봄 기기" ;;
        "electricity-grid") echo "전력망" ;;
        "emergency-medical-data") echo "응급 의료 데이터" ;;
        "emergency-response") echo "긴급 대응" ;;
        "emotion-ai") echo "감정 AI" ;;
        "energy-cloud") echo "에너지 클라우드" ;;
        "energy-storage") echo "에너지 저장" ;;
        "entertainment-robot") echo "엔터테인먼트 로봇" ;;
        "esg-finance") echo "ESG 금융" ;;
        "esports") echo "e스포츠" ;;
        "evtol") echo "전기 수직이착륙기" ;;
        "exoskeleton") echo "외골격" ;;
        "explainable-ai") echo "설명 가능 AI" ;;
        "eye-gaze") echo "시선 추적" ;;
        "family-reunion-data") echo "이산가족 상봉 데이터" ;;
        "federated-learning") echo "연합 학습" ;;
        "financial-data-exchange") echo "금융 데이터 교환" ;;
        "financial-inclusion") echo "금융 포용" ;;
        "fintech") echo "핀테크" ;;
        "food-allergy-passport") echo "식품 알레르기 여권" ;;
        "food-crisis-response") echo "식량 위기 대응" ;;
        "food-safety") echo "식품 안전" ;;
        "food-security") echo "식량 안보" ;;
        "food-traceability") echo "식품 추적" ;;
        "food-waste-reduction") echo "음식물 쓰레기 감소" ;;
        "fuel-cell") echo "연료전지" ;;
        "fusion-energy") echo "핵융합 에너지" ;;
        "game") echo "게임" ;;
        "game-based-learning") echo "게임 기반 학습" ;;
        "gas-supply") echo "가스 공급" ;;
        "gdpr-compliance") echo "GDPR 준수" ;;
        "generative-ai") echo "생성형 AI" ;;
        "glacier-preservation") echo "빙하 보존" ;;
        "global-health-data") echo "글로벌 건강 데이터" ;;
        "graph-database") echo "그래프 데이터베이스" ;;
        "green-infrastructure") echo "녹색 인프라" ;;
        "greenhouse-gas-monitoring") echo "온실가스 모니터링" ;;
        "haptic") echo "햅틱" ;;
        "hardware-security-module") echo "하드웨어 보안 모듈" ;;
        "health") echo "건강" ;;
        "health-insurance-data") echo "건강보험 데이터" ;;
        "healthcare-blockchain") echo "헬스케어 블록체인" ;;
        "healthcare-insurance") echo "헬스케어 보험" ;;
        "healthcare-integration") echo "헬스케어 통합" ;;
        "home") echo "홈" ;;
        "homomorphic-encryption") echo "동형 암호화" ;;
        "hospital-info-system") echo "병원 정보 시스템" ;;
        "hydrogen-energy") echo "수소 에너지" ;;
        "hydroponics") echo "수경재배" ;;
        "identity-management") echo "신원 관리" ;;
        "immersive-media") echo "몰입형 미디어" ;;
        "industrial-robot") echo "산업용 로봇" ;;
        "infrastructure-integration") echo "인프라 통합" ;;
        "insect-protein") echo "곤충 단백질" ;;
        "insurtech") echo "인슈어테크" ;;
        "intent-lang") echo "의도 언어" ;;
        "inter-korean-data-exchange") echo "남북 데이터 교환" ;;
        *) echo "$(to_title_case $1)" ;;
    esac
}

# Function to get category and description
get_category_info() {
    case "$1" in
        data-*|graph-database) echo "DATA|데이터|Data & Analytics" ;;
        ddos-*|dpki|hardware-security-module|homomorphic-encryption|gdpr-compliance) echo "SECURITY|보안|Cybersecurity & Privacy" ;;
        deep-sea-*|desert-*|desertification-*|ecosystem-*|edible-algae|glacier-*|green-*|greenhouse-*) echo "CLIMATE|환경|Climate & Environment" ;;
        defi|digital-currency|digital-wallet|esg-finance|financial-*|fintech|insurtech) echo "FINANCE|금융|Finance & Economy" ;;
        delivery-robot|drone-uav|entertainment-robot|industrial-robot|educational-robot|exoskeleton) echo "ROBOTICS|로봇|Robotics & Automation" ;;
        digital-asset-inheritance|digital-erasure|digital-executor|digital-funeral|digital-identity-after-death|digital-memorial|digital-will|digital-time-capsule) echo "DIGITAL-LEGACY|디지털 유산|Digital Legacy & Rights" ;;
        digital-citizenship|digital-content|digital-credential|digital-id|digital-identity-fin|identity-management) echo "IDENTITY|신원|Digital Identity" ;;
        disaster-*|emergency-*) echo "EMERGENCY|재난|Emergency & Disaster" ;;
        distributed-energy|energy-*|electricity-grid|fuel-cell|fusion-energy|hydrogen-energy|gas-supply) echo "ENERGY|에너지|Energy & Power" ;;
        e-government|e-learning|edu|education-*|digital-textbook|game-based-learning) echo "EDUCATION|교육|Education & Government" ;;
        edge-ai|emotion-ai|explainable-ai|generative-ai|federated-learning) echo "AI|인공지능|Artificial Intelligence" ;;
        elderly-care-*|health*|hospital-*|medical-*|digital-pathology) echo "HEALTH|건강|Healthcare & Wellness" ;;
        food-*|insect-protein|hydroponics) echo "FOOD|식품|Food & Agriculture" ;;
        evtol) echo "MOBILITY|모빌리티|Future Mobility" ;;
        eye-gaze|haptic|immersive-media) echo "XR|확장현실|Extended Reality" ;;
        game|esports) echo "GAMING|게임|Gaming & Entertainment" ;;
        family-reunion-data|inter-korean-data-exchange|economic-integration|infrastructure-integration) echo "PEACE|평화|Peace & Unification" ;;
        digital-twin-city) echo "SMART-CITY|스마트시티|Smart City" ;;
        *) echo "TECH|기술|Technology" ;;
    esac
}

echo "Creating press kits for 100 WIA Live Standards (Group 2)..."
echo "================================================"

for standard in "${STANDARDS[@]}"; do
    UPPER=$(echo "$standard" | tr '[:lower:]' '[:upper:]' | tr '-' '_')
    TITLE=$(to_title_case "$standard")
    KOREAN=$(get_korean_name "$standard")
    INFO=$(get_category_info "$standard")
    CATEGORY=$(echo "$INFO" | cut -d'|' -f1)
    CATEGORY_KO=$(echo "$INFO" | cut -d'|' -f2)
    CATEGORY_EN=$(echo "$INFO" | cut -d'|' -f3)

    DIR="/home/user/wia-standards/standards/WIA-${UPPER}/press"
    mkdir -p "$DIR"

    echo "Creating press kit for WIA-${UPPER} (${KOREAN})..."

    # 1. Create dalle-prompts.md
    cat > "$DIR/dalle-prompts.md" << 'PROMPT_EOF'
# WIA-${UPPER} DALL-E Prompts

## 1. Hero Image
A professional, futuristic visualization representing ${TITLE} technology. Clean corporate style with subtle gradients in blue and silver tones. Feature a holographic interface showing ${TITLE} concepts with geometric patterns and data flows. Include subtle WIA certification badge in corner. High-tech, minimalist aesthetic, 16:9 aspect ratio, photorealistic rendering.

## 2. Problem Image
A split-screen visualization showing the current challenges in ${TITLE}. Left side: fragmented, chaotic systems with warning indicators and disconnected elements in red/orange tones. Right side: question marks and uncertainty symbols. Corporate infographic style, professional business setting, clean and modern aesthetic.

## 3. Solution Image
A triumphant visualization showing WIA-${UPPER} certification solving ${TITLE} challenges. Centered: large golden WIA certification badge with holographic glow. Surrounding: connected nodes forming a perfect network, green checkmarks, shield icons, and flowing data streams. Peaceful blue-green gradient background. People of diverse backgrounds celebrating in background. Professional, optimistic, enterprise-grade visualization, 16:9 format.
PROMPT_EOF

    # Replace variables in dalle-prompts.md
    sed -i "s/\${UPPER}/${UPPER}/g" "$DIR/dalle-prompts.md"
    sed -i "s/\${TITLE}/${TITLE}/g" "$DIR/dalle-prompts.md"

    # 2. Create article-ko.html
    cat > "$DIR/article-ko.html" << 'KO_EOF'
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WIA, ${KOREAN} 국제 표준 발표</title>
    <style>
        body {
            font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.8;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
            color: #333;
        }
        .header {
            border-bottom: 3px solid #0066cc;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        h1 {
            font-size: 2.2em;
            color: #000;
            margin-bottom: 10px;
            line-height: 1.3;
        }
        .meta {
            color: #666;
            font-size: 0.95em;
            margin-top: 15px;
        }
        .lead {
            font-size: 1.15em;
            font-weight: 500;
            color: #444;
            margin: 25px 0;
            padding: 20px;
            background: #f8f9fa;
            border-left: 4px solid #0066cc;
        }
        .content {
            font-size: 1.05em;
        }
        .content p {
            margin: 20px 0;
        }
        .quote {
            background: #f5f5f5;
            border-left: 4px solid #0066cc;
            padding: 20px 25px;
            margin: 30px 0;
            font-style: italic;
        }
        .simulator-box {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 25px;
            border-radius: 10px;
            margin: 30px 0;
            text-align: center;
        }
        .simulator-box h3 {
            margin-top: 0;
            font-size: 1.3em;
        }
        .simulator-link {
            display: inline-block;
            background: white;
            color: #667eea;
            padding: 12px 30px;
            border-radius: 25px;
            text-decoration: none;
            font-weight: bold;
            margin-top: 15px;
            transition: transform 0.2s;
        }
        .simulator-link:hover {
            transform: scale(1.05);
        }
        .philosophy {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
            padding: 30px;
            border-radius: 10px;
            margin: 40px 0;
            text-align: center;
        }
        .philosophy h2 {
            margin-top: 0;
            font-size: 2em;
        }
        .footer {
            margin-top: 50px;
            padding-top: 30px;
            border-top: 2px solid #eee;
            color: #666;
            font-size: 0.95em;
        }
        .company-info {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 30px 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>WIA, ${KOREAN} 국제 표준 발표</h1>
        <div class="meta">
            <strong>WIA-${UPPER} v1.0</strong> | ${CATEGORY_KO} 분야 | 2025년 12월 27일
        </div>
    </div>

    <div class="lead">
        대한민국 스마일스토리 주식회사 산하 국제 인증 산업 협회 WIA(World Certification Industry Association)가 ${KOREAN} 분야의 국제 표준 'WIA-${UPPER}'를 정식 발표했다.
    </div>

    <div class="content">
        <p>
            WIA는 ${KOREAN} 기술의 글로벌 상호운용성과 보안을 보장하기 위한 포괄적인 표준을 제정했다.
            이번 표준은 ${CATEGORY_KO} 분야의 혁신을 가속화하고, 전 세계적으로 일관된 품질과 신뢰성을 제공하는 것을 목표로 한다.
        </p>

        <p>
            WIA-${UPPER} 표준은 데이터 구조, API 인터페이스, 보안 프로토콜, 인증 절차 등을 포함한 종합적인 기술 사양을 제공한다.
            이를 통해 기업과 개발자들은 글로벌 시장에서 인정받는 ${KOREAN} 솔루션을 구축할 수 있다.
        </p>

        <div class="quote">
            <p>
                "WIA-${UPPER} 표준은 ${KOREAN} 기술의 미래를 정의하는 중요한 이정표입니다.
                이 표준을 통해 전 세계 기업들이 안전하고 효율적인 ${KOREAN} 서비스를 제공할 수 있게 될 것입니다."
            </p>
            <p style="text-align: right; margin-top: 15px;">
                <strong>- 연삼흠 대표이사, 스마일스토리 주식회사 / WIA</strong>
            </p>
        </div>

        <p>
            표준의 주요 특징은 다음과 같다:
        </p>

        <ul style="line-height: 2;">
            <li><strong>개방형 아키텍처:</strong> 다양한 플랫폼과 시스템 간 원활한 통합 지원</li>
            <li><strong>강화된 보안:</strong> 최신 암호화 및 인증 메커니즘 적용</li>
            <li><strong>확장성:</strong> 소규모부터 대규모 엔터프라이즈까지 유연한 확장 가능</li>
            <li><strong>글로벌 호환성:</strong> 국제 표준과의 완벽한 호환성 보장</li>
        </ul>

        <div class="simulator-box">
            <h3>🚀 WIA-${UPPER} 라이브 시뮬레이터</h3>
            <p>지금 바로 WIA-${UPPER} 표준을 체험해보세요!</p>
            <a href="https://wia.network/${standard}/simulator" class="simulator-link">
                시뮬레이터 실행하기 →
            </a>
        </div>

        <p>
            WIA는 본 표준과 함께 오픈소스 SDK, API 문서, 참조 구현체를 공개하여
            개발자 커뮤니티의 빠른 도입을 지원한다. 또한 인증 프로그램을 통해
            표준 준수 제품에 대한 공식 인증을 제공할 예정이다.
        </p>

        <div class="philosophy">
            <h2>弘益人間 (홍익인간)</h2>
            <p style="font-size: 1.2em; margin: 15px 0;">
                "널리 인간을 이롭게 하라"
            </p>
            <p>
                WIA의 모든 표준은 인류의 보편적 이익을 최우선으로 합니다.
                ${KOREAN} 기술이 모든 사람에게 공평하게 혜택을 제공하고,
                더 나은 미래를 만드는 데 기여하도록 설계되었습니다.
            </p>
        </div>

        <div class="company-info">
            <h3>WIA (World Certification Industry Association) 소개</h3>
            <p>
                WIA는 대한민국 스마일스토리 주식회사가 설립한 국제 인증 산업 협회로,
                차세대 기술 표준의 제정과 인증을 주도하고 있습니다.
                "弘益人間(홍익인간)" 정신을 바탕으로 인류에게 이로운 기술 표준을 만들어가고 있습니다.
            </p>
        </div>
    </div>

    <div class="footer">
        <p><strong>보도자료 문의:</strong></p>
        <p>
            스마일스토리 주식회사 / WIA<br>
            대표이사: 연삼흠 (Yeon Sam-heum)<br>
            웹사이트: <a href="https://wia.network">https://wia.network</a><br>
            이메일: contact@wia.network
        </p>
        <p style="margin-top: 30px; text-align: center; color: #999;">
            © 2025 SmileStory Inc. / WIA. All rights reserved.<br>
            弘益人間 · Benefit All Humanity
        </p>
    </div>
</body>
</html>
KO_EOF

    # Replace variables in article-ko.html
    sed -i "s/\${UPPER}/${UPPER}/g" "$DIR/article-ko.html"
    sed -i "s/\${KOREAN}/${KOREAN}/g" "$DIR/article-ko.html"
    sed -i "s/\${CATEGORY_KO}/${CATEGORY_KO}/g" "$DIR/article-ko.html"
    sed -i "s|\${standard}|${standard}|g" "$DIR/article-ko.html"

    # 3. Create article-en.html
    cat > "$DIR/article-en.html" << 'EN_EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WIA Announces ${TITLE} International Standard</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            line-height: 1.8;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
            color: #333;
        }
        .header {
            border-bottom: 3px solid #0066cc;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        h1 {
            font-size: 2.2em;
            color: #000;
            margin-bottom: 10px;
            line-height: 1.3;
        }
        .meta {
            color: #666;
            font-size: 0.95em;
            margin-top: 15px;
        }
        .lead {
            font-size: 1.15em;
            font-weight: 500;
            color: #444;
            margin: 25px 0;
            padding: 20px;
            background: #f8f9fa;
            border-left: 4px solid #0066cc;
        }
        .content {
            font-size: 1.05em;
        }
        .content p {
            margin: 20px 0;
        }
        .quote {
            background: #f5f5f5;
            border-left: 4px solid #0066cc;
            padding: 20px 25px;
            margin: 30px 0;
            font-style: italic;
        }
        .simulator-box {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 25px;
            border-radius: 10px;
            margin: 30px 0;
            text-align: center;
        }
        .simulator-box h3 {
            margin-top: 0;
            font-size: 1.3em;
        }
        .simulator-link {
            display: inline-block;
            background: white;
            color: #667eea;
            padding: 12px 30px;
            border-radius: 25px;
            text-decoration: none;
            font-weight: bold;
            margin-top: 15px;
            transition: transform 0.2s;
        }
        .simulator-link:hover {
            transform: scale(1.05);
        }
        .philosophy {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
            padding: 30px;
            border-radius: 10px;
            margin: 40px 0;
            text-align: center;
        }
        .philosophy h2 {
            margin-top: 0;
            font-size: 2em;
        }
        .footer {
            margin-top: 50px;
            padding-top: 30px;
            border-top: 2px solid #eee;
            color: #666;
            font-size: 0.95em;
        }
        .company-info {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 30px 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>WIA Announces ${TITLE} International Standard</h1>
        <div class="meta">
            <strong>WIA-${UPPER} v1.0</strong> | ${CATEGORY_EN} Sector | December 27, 2025
        </div>
    </div>

    <div class="lead">
        The World Certification Industry Association (WIA), under SmileStory Inc. of the Republic of Korea, has officially announced the international standard 'WIA-${UPPER}' for ${TITLE}.
    </div>

    <div class="content">
        <p>
            WIA has established a comprehensive standard to ensure global interoperability and security for ${TITLE} technology.
            This standard aims to accelerate innovation in the ${CATEGORY_EN} sector and provide consistent quality and reliability worldwide.
        </p>

        <p>
            The WIA-${UPPER} standard provides comprehensive technical specifications including data structures, API interfaces, security protocols, and certification procedures.
            This enables businesses and developers to build ${TITLE} solutions that are recognized in the global market.
        </p>

        <div class="quote">
            <p>
                "The WIA-${UPPER} standard marks a crucial milestone in defining the future of ${TITLE} technology.
                Through this standard, companies worldwide will be able to provide safe and efficient ${TITLE} services."
            </p>
            <p style="text-align: right; margin-top: 15px;">
                <strong>- Yeon Sam-heum, CEO, SmileStory Inc. / WIA</strong>
            </p>
        </div>

        <p>
            Key features of the standard include:
        </p>

        <ul style="line-height: 2;">
            <li><strong>Open Architecture:</strong> Seamless integration across various platforms and systems</li>
            <li><strong>Enhanced Security:</strong> Latest encryption and authentication mechanisms</li>
            <li><strong>Scalability:</strong> Flexible scaling from small to large enterprise deployments</li>
            <li><strong>Global Compatibility:</strong> Perfect compatibility with international standards</li>
        </ul>

        <div class="simulator-box">
            <h3>🚀 WIA-${UPPER} Live Simulator</h3>
            <p>Experience the WIA-${UPPER} standard right now!</p>
            <a href="https://wia.network/${standard}/simulator" class="simulator-link">
                Launch Simulator →
            </a>
        </div>

        <p>
            Alongside this standard, WIA is releasing open-source SDKs, API documentation, and reference implementations
            to support rapid adoption by the developer community. An official certification program will also be provided
            for products that comply with the standard.
        </p>

        <div class="philosophy">
            <h2>弘益人間 (Hongik Ingan)</h2>
            <p style="font-size: 1.2em; margin: 15px 0;">
                "Benefit All Humanity"
            </p>
            <p>
                All WIA standards prioritize the universal benefit of humanity.
                ${TITLE} technology is designed to provide equitable benefits to all people
                and contribute to creating a better future.
            </p>
        </div>

        <div class="company-info">
            <h3>About WIA (World Certification Industry Association)</h3>
            <p>
                WIA is an international certification industry association established by SmileStory Inc. of the Republic of Korea,
                leading the development and certification of next-generation technology standards.
                Based on the spirit of "弘益人間 (Hongik Ingan)," WIA creates technology standards that benefit humanity.
            </p>
        </div>
    </div>

    <div class="footer">
        <p><strong>Press Contact:</strong></p>
        <p>
            SmileStory Inc. / WIA<br>
            CEO: Yeon Sam-heum<br>
            Website: <a href="https://wia.network">https://wia.network</a><br>
            Email: contact@wia.network
        </p>
        <p style="margin-top: 30px; text-align: center; color: #999;">
            © 2025 SmileStory Inc. / WIA. All rights reserved.<br>
            弘益人間 · Benefit All Humanity
        </p>
    </div>
</body>
</html>
EN_EOF

    # Replace variables in article-en.html
    sed -i "s/\${UPPER}/${UPPER}/g" "$DIR/article-en.html"
    sed -i "s/\${TITLE}/${TITLE}/g" "$DIR/article-en.html"
    sed -i "s/\${CATEGORY_EN}/${CATEGORY_EN}/g" "$DIR/article-en.html"
    sed -i "s|\${standard}|${standard}|g" "$DIR/article-en.html"

    echo "  ✓ Created ${DIR}/dalle-prompts.md"
    echo "  ✓ Created ${DIR}/article-ko.html"
    echo "  ✓ Created ${DIR}/article-en.html"
done

echo ""
echo "================================================"
echo "Press kit generation complete!"
echo "Total: 300 files created (100 standards × 3 files)"
echo "================================================"
