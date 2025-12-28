#!/usr/bin/env python3
"""
WIA Standards Ebook Generator
Generates 828 ebook HTML files for 46 standards (EN + KO, 9 files each)
"""

import os
import json

# Category color mapping
COLORS = {
    'accessibility': '#3B82F6',
    'ai_tech': '#10B981',
    'cold': '#06B6D4',
    'pet': '#F59E0B',
    'humanitarian': '#8B5CF6',
    'energy_env': '#EF4444',
    'security': '#EC4899',
    'medical': '#14B8A6',
    'game_xr': '#A855F7',
    'smart_robot': '#F97316',
    'space_physics': '#6366F1',
    'finance': '#22C55E',
    'digital_afterlife': '#64748B',
    'food_env': '#84CC16',
    'city_infra': '#0EA5E9',
    'publishing': '#F43F5E'
}

# Standards configuration
STANDARDS = {
    # New 10 standards
    'ai-afterlife-ethics': {
        'category': 'ai_tech',
        'en_name': 'AI Afterlife Ethics',
        'ko_name': 'AI 사후 윤리',
        'en_subtitle': 'Establishing Ethical Guidelines for Digital Immortality and AI-Based Afterlife Services',
        'ko_subtitle': '디지털 불멸성과 AI 기반 사후 서비스를 위한 윤리 가이드라인 수립'
    },
    'digital-funeral': {
        'category': 'digital_afterlife',
        'en_name': 'Digital Funeral',
        'ko_name': '디지털 장례',
        'en_subtitle': 'Standards for Virtual and Hybrid Funeral Services',
        'ko_subtitle': '가상 및 하이브리드 장례 서비스 표준'
    },
    'digital-will': {
        'category': 'digital_afterlife',
        'en_name': 'Digital Will',
        'ko_name': '디지털 유언',
        'en_subtitle': 'Digital Asset Management and Testament Standards',
        'ko_subtitle': '디지털 자산 관리 및 유언 표준'
    },
    'digital-erasure': {
        'category': 'digital_afterlife',
        'en_name': 'Digital Erasure',
        'ko_name': '디지털 말소',
        'en_subtitle': 'Right to Digital Deletion and Erasure Standards',
        'ko_subtitle': '디지털 삭제 및 말소 권리 표준'
    },
    'digital-memorial': {
        'category': 'digital_afterlife',
        'en_name': 'Digital Memorial',
        'ko_name': '디지털 추모',
        'en_subtitle': 'Online Memorial and Remembrance Platform Standards',
        'ko_subtitle': '온라인 추모 및 기념 플랫폼 표준'
    },
    'digital-executor': {
        'category': 'digital_afterlife',
        'en_name': 'Digital Executor',
        'ko_name': '디지털 유언 집행자',
        'en_subtitle': 'Digital Estate Executor Role and Responsibility Standards',
        'ko_subtitle': '디지털 유산 집행자 역할 및 책임 표준'
    },
    'digital-twin-city': {
        'category': 'city_infra',
        'en_name': 'Digital Twin City',
        'ko_name': '디지털 트윈 도시',
        'en_subtitle': 'Urban Digital Twin Modeling and Simulation Standards',
        'ko_subtitle': '도시 디지털 트윈 모델링 및 시뮬레이션 표준'
    },
    'ocean-plastic-track': {
        'category': 'food_env',
        'en_name': 'Ocean Plastic Tracking',
        'ko_name': '해양 플라스틱 추적',
        'en_subtitle': 'Ocean Plastic Pollution Monitoring and Tracking Standards',
        'ko_subtitle': '해양 플라스틱 오염 모니터링 및 추적 표준'
    },
    'food-allergy-passport': {
        'category': 'food_env',
        'en_name': 'Food Allergy Passport',
        'ko_name': '식품 알레르기 여권',
        'en_subtitle': 'Universal Food Allergy Information Exchange Standards',
        'ko_subtitle': '범용 식품 알레르기 정보 교환 표준'
    },
    'carbon-credit-micro': {
        'category': 'energy_env',
        'en_name': 'Carbon Credit Micro',
        'ko_name': '탄소 크레딧 마이크로',
        'en_subtitle': 'Micro-Scale Carbon Credit Trading Standards',
        'ko_subtitle': '마이크로 규모 탄소 크레딧 거래 표준'
    },
    # Existing 36 standards
    'air-power': {'category': 'energy_env', 'en_name': 'Air Power', 'ko_name': '에어파워', 'en_subtitle': 'Atmospheric Energy Harvesting Standards', 'ko_subtitle': '대기 에너지 수확 표준'},
    'air-shield': {'category': 'energy_env', 'en_name': 'Air Shield', 'ko_name': '에어실드', 'en_subtitle': 'Air Quality Protection Standards', 'ko_subtitle': '공기 질 보호 표준'},
    'auto': {'category': 'smart_robot', 'en_name': 'Autonomous Vehicle', 'ko_name': '자율주행', 'en_subtitle': 'Autonomous Vehicle Communication Standards', 'ko_subtitle': '자율주행 차량 통신 표준'},
    'battery-passport': {'category': 'energy_env', 'en_name': 'Battery Passport', 'ko_name': '배터리 여권', 'en_subtitle': 'Battery Lifecycle and Traceability Standards', 'ko_subtitle': '배터리 수명주기 및 추적 표준'},
    'bci': {'category': 'accessibility', 'en_name': 'Brain-Computer Interface', 'ko_name': '뇌-컴퓨터 인터페이스', 'en_subtitle': 'BCI Communication Standards', 'ko_subtitle': 'BCI 통신 표준'},
    'bio': {'category': 'medical', 'en_name': 'Biometrics', 'ko_name': '생체인식', 'en_subtitle': 'Biometric Data Standards', 'ko_subtitle': '생체 데이터 표준'},
    'bionic-eye': {'category': 'medical', 'en_name': 'Bionic Eye', 'ko_name': '인공 눈', 'en_subtitle': 'Visual Prosthesis Standards', 'ko_subtitle': '시각 보철 표준'},
    'carebot': {'category': 'smart_robot', 'en_name': 'Care Robot', 'ko_name': '케어로봇', 'en_subtitle': 'Healthcare Robot Standards', 'ko_subtitle': '의료 로봇 표준'},
    'ci': {'category': 'medical', 'en_name': 'Cochlear Implant', 'ko_name': '인공와우', 'en_subtitle': 'Cochlear Implant Communication Standards', 'ko_subtitle': '인공와우 통신 표준'},
    'climate': {'category': 'energy_env', 'en_name': 'Climate Data', 'ko_name': '기후 데이터', 'en_subtitle': 'Climate Data Exchange Standards', 'ko_subtitle': '기후 데이터 교환 표준'},
    'cognitive-aac': {'category': 'accessibility', 'en_name': 'Cognitive AAC', 'ko_name': '인지 AAC', 'en_subtitle': 'Cognitive Accessibility Communication Standards', 'ko_subtitle': '인지 접근성 의사소통 표준'},
    'dpki': {'category': 'security', 'en_name': 'Decentralized PKI', 'ko_name': '분산 PKI', 'en_subtitle': 'Decentralized Public Key Infrastructure Standards', 'ko_subtitle': '분산 공개키 인프라 표준'},
    'exoskeleton': {'category': 'accessibility', 'en_name': 'Exoskeleton', 'ko_name': '외골격', 'en_subtitle': 'Wearable Exoskeleton Standards', 'ko_subtitle': '웨어러블 외골격 표준'},
    'eye-gaze': {'category': 'accessibility', 'en_name': 'Eye Gaze Tracking', 'ko_name': '시선 추적', 'en_subtitle': 'Eye Tracking Interface Standards', 'ko_subtitle': '시선 추적 인터페이스 표준'},
    'fintech': {'category': 'finance', 'en_name': 'FinTech', 'ko_name': '핀테크', 'en_subtitle': 'Financial Technology Standards', 'ko_subtitle': '금융 기술 표준'},
    'game': {'category': 'game_xr', 'en_name': 'Gaming', 'ko_name': '게임', 'en_subtitle': 'Cross-Platform Gaming Standards', 'ko_subtitle': '크로스 플랫폼 게임 표준'},
    'health': {'category': 'medical', 'en_name': 'Health Data', 'ko_name': '건강 데이터', 'en_subtitle': 'Personal Health Data Standards', 'ko_subtitle': '개인 건강 데이터 표준'},
    'intent-lang': {'category': 'ai_tech', 'en_name': 'Intent Language', 'ko_name': '의도 언어', 'en_subtitle': 'AI Intent Communication Standards', 'ko_subtitle': 'AI 의도 통신 표준'},
    'material': {'category': 'space_physics', 'en_name': 'Advanced Materials', 'ko_name': '첨단 소재', 'en_subtitle': 'Material Science Data Standards', 'ko_subtitle': '재료 과학 데이터 표준'},
    'medical': {'category': 'medical', 'en_name': 'Medical Device', 'ko_name': '의료 기기', 'en_subtitle': 'Medical Device Interoperability Standards', 'ko_subtitle': '의료 기기 상호 운용성 표준'},
    'myoelectric': {'category': 'accessibility', 'en_name': 'Myoelectric Control', 'ko_name': '근전도 제어', 'en_subtitle': 'Myoelectric Prosthesis Standards', 'ko_subtitle': '근전도 보철 표준'},
    'nano': {'category': 'space_physics', 'en_name': 'Nanotechnology', 'ko_name': '나노기술', 'en_subtitle': 'Nanoscale Device Standards', 'ko_subtitle': '나노스케일 장치 표준'},
    'omni-api': {'category': 'ai_tech', 'en_name': 'Omni API', 'ko_name': '옴니 API', 'en_subtitle': 'Universal API Gateway Standards', 'ko_subtitle': '범용 API 게이트웨이 표준'},
    'pet-health-passport': {'category': 'pet', 'en_name': 'Pet Health Passport', 'ko_name': '반려동물 건강 여권', 'en_subtitle': 'Pet Health Record Standards', 'ko_subtitle': '반려동물 건강 기록 표준'},
    'physics': {'category': 'space_physics', 'en_name': 'Physics Data', 'ko_name': '물리 데이터', 'en_subtitle': 'Physics Research Data Standards', 'ko_subtitle': '물리학 연구 데이터 표준'},
    'pq-crypto': {'category': 'security', 'en_name': 'Post-Quantum Cryptography', 'ko_name': '양자 내성 암호', 'en_subtitle': 'Post-Quantum Cryptography Standards', 'ko_subtitle': '양자 내성 암호화 표준'},
    'pubscript': {'category': 'publishing', 'en_name': 'Publishing Script', 'ko_name': '퍼블리싱 스크립트', 'en_subtitle': 'Digital Publishing Standards', 'ko_subtitle': '디지털 출판 표준'},
    'quantum': {'category': 'space_physics', 'en_name': 'Quantum Computing', 'ko_name': '양자 컴퓨팅', 'en_subtitle': 'Quantum Computing Interface Standards', 'ko_subtitle': '양자 컴퓨팅 인터페이스 표준'},
    'robot': {'category': 'smart_robot', 'en_name': 'Robotics', 'ko_name': '로보틱스', 'en_subtitle': 'Robot Communication Standards', 'ko_subtitle': '로봇 통신 표준'},
    'security': {'category': 'security', 'en_name': 'Security', 'ko_name': '보안', 'en_subtitle': 'Cybersecurity Standards', 'ko_subtitle': '사이버 보안 표준'},
    'smart-wheelchair': {'category': 'accessibility', 'en_name': 'Smart Wheelchair', 'ko_name': '스마트 휠체어', 'en_subtitle': 'Intelligent Wheelchair Standards', 'ko_subtitle': '지능형 휠체어 표준'},
    'smarthome': {'category': 'smart_robot', 'en_name': 'Smart Home', 'ko_name': '스마트홈', 'en_subtitle': 'Smart Home Interoperability Standards', 'ko_subtitle': '스마트홈 상호 운용성 표준'},
    'space': {'category': 'space_physics', 'en_name': 'Space Technology', 'ko_name': '우주 기술', 'en_subtitle': 'Space Systems Standards', 'ko_subtitle': '우주 시스템 표준'},
    'tls-lite': {'category': 'security', 'en_name': 'TLS Lite', 'ko_name': 'TLS 라이트', 'en_subtitle': 'Lightweight TLS Standards', 'ko_subtitle': '경량 TLS 표준'},
    'voice': {'category': 'accessibility', 'en_name': 'Voice Interface', 'ko_name': '음성 인터페이스', 'en_subtitle': 'Voice Recognition Standards', 'ko_subtitle': '음성 인식 표준'},
    'xr': {'category': 'game_xr', 'en_name': 'Extended Reality', 'ko_name': '확장 현실', 'en_subtitle': 'XR Platform Standards', 'ko_subtitle': 'XR 플랫폼 표준'}
}

def generate_index_html(standard_id, config, lang='en'):
    """Generate index.html for a standard"""
    color = COLORS[config['category']]

    if lang == 'en':
        title = f"WIA {config['en_name']} Standard - Ebook"
        subtitle = config['en_subtitle']
        toc_title = "Table of Contents"
        chapters = [
            "Chapter 1: Introduction",
            "Chapter 2: Current Challenges",
            "Chapter 3: Standard Overview",
            "Chapter 4: Phase 1 - Data Format",
            "Chapter 5: Phase 2 - API Interface",
            "Chapter 6: Phase 3 - Protocol",
            "Chapter 7: Phase 4 - Integration",
            "Chapter 8: Implementation & Certification"
        ]
        footer_text = "Benefit All Humanity"
        ebook_text = "Ebook"
        font_family = "font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;"
    else:  # ko
        title = f"WIA {config['ko_name']} 표준 - 전자책"
        subtitle = config['ko_subtitle']
        toc_title = "목차"
        chapters = [
            "제1장: 소개",
            "제2장: 현재 과제",
            "제3장: 표준 개요",
            "제4장: Phase 1 - 데이터 형식",
            "제5장: Phase 2 - API 인터페이스",
            "제6장: Phase 3 - 프로토콜",
            "제7장: Phase 4 - 통합",
            "제8장: 구현 및 인증"
        ]
        footer_text = "널리 인간을 이롭게"
        ebook_text = "전자책"
        font_family = "font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Malgun Gothic', sans-serif;"

    html = f'''<!DOCTYPE html>
<html lang="{lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <style>
        body {{
            {font_family}
            background: #0f172a;
            color: #f8fafc;
            line-height: 1.8;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
        }}
        h1, h2, h3 {{ color: {color}; }}
        h1 {{ text-align: center; font-size: 2.5rem; margin-bottom: 10px; }}
        .subtitle {{ text-align: center; color: #94a3b8; font-size: 1.2rem; margin-bottom: 40px; }}
        .toc {{ list-style: none; padding: 0; }}
        .toc li {{ margin: 15px 0; }}
        .toc a {{ color: #60a5fa; text-decoration: none; font-size: 1.1rem; }}
        .toc a:hover {{ text-decoration: underline; }}
        footer {{
            margin-top: 60px;
            text-align: center;
            color: #94a3b8;
            border-top: 1px solid #334155;
            padding-top: 20px;
        }}
        footer .philosophy {{ color: #ffd700; font-size: 1.1rem; font-weight: bold; }}
    </style>
</head>
<body>
    <h1>📚 WIA {config[lang+'_name']} {ebook_text if lang == 'ko' else 'Standard'}</h1>
    <p class="subtitle">{subtitle}</p>

    <h2 style="color: {color};">{toc_title}</h2>
    <ul class="toc">
'''

    for i, chapter in enumerate(chapters, 1):
        html += f'        <li><a href="chapter-{i:02d}.html">{chapter}</a></li>\n'

    html += f'''    </ul>

    <footer>
        <p class="philosophy">弘益人間 · {footer_text}</p>
        <p>WIA {config[lang+'_name']} Standard {ebook_text}</p>
        <p>© 2025 WIA - MIT License</p>
    </footer>
</body>
</html>
'''
    return html

def generate_chapter_html(standard_id, config, chapter_num, lang='en'):
    """Generate a chapter HTML file"""
    color = COLORS[config['category']]

    if lang == 'en':
        chapters = [
            {"title": "Introduction", "subtitle": f"Understanding {config['en_name']} Standards"},
            {"title": "Current Challenges", "subtitle": f"Problems and Issues in {config['en_name']}"},
            {"title": "Standard Overview", "subtitle": "WIA Four-Phase Architecture"},
            {"title": "Phase 1 - Data Format", "subtitle": "Standardized Data Schemas and Structures"},
            {"title": "Phase 2 - API Interface", "subtitle": "REST API Specifications and Endpoints"},
            {"title": "Phase 3 - Protocol", "subtitle": "Communication Protocols and Message Formats"},
            {"title": "Phase 4 - Integration", "subtitle": "Ecosystem Integration and Interoperability"},
            {"title": "Implementation & Certification", "subtitle": "Implementation Guide and WIA Certification"}
        ]
        nav_toc = "Table of Contents"
        nav_prev = "Previous"
        nav_next = "Next"
        footer_text = "Benefit All Humanity"
        font_family = "font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;"
    else:  # ko
        chapters = [
            {"title": "소개", "subtitle": f"{config['ko_name']} 표준 이해"},
            {"title": "현재 과제", "subtitle": f"{config['ko_name']} 분야의 문제와 이슈"},
            {"title": "표준 개요", "subtitle": "WIA 4단계 아키텍처"},
            {"title": "Phase 1 - 데이터 형식", "subtitle": "표준화된 데이터 스키마 및 구조"},
            {"title": "Phase 2 - API 인터페이스", "subtitle": "REST API 사양 및 엔드포인트"},
            {"title": "Phase 3 - 프로토콜", "subtitle": "통신 프로토콜 및 메시지 형식"},
            {"title": "Phase 4 - 통합", "subtitle": "에코시스템 통합 및 상호 운용성"},
            {"title": "구현 및 인증", "subtitle": "구현 가이드 및 WIA 인증"}
        ]
        nav_toc = "목차"
        nav_prev = "이전"
        nav_next = "다음"
        footer_text = "널리 인간을 이롭게"
        font_family = "font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Malgun Gothic', sans-serif;"

    chapter = chapters[chapter_num - 1]
    prev_link = f'<a href="chapter-{chapter_num-1:02d}.html">← {nav_prev}</a>' if chapter_num > 1 else f'<span style="color: #64748b;">← {nav_prev}</span>'
    next_link = f'<a href="chapter-{chapter_num+1:02d}.html">{nav_next} →</a>' if chapter_num < 8 else f'<span style="color: #64748b;">{nav_next} →</span>'

    chapter_label = f"Chapter {chapter_num}" if lang == 'en' else f"제{chapter_num}장"

    html = f'''<!DOCTYPE html>
<html lang="{lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{chapter_label}: {chapter['title']} - WIA {config[lang+'_name']} Standard Ebook</title>
    <style>
        body {{
            {font_family}
            background: #0f172a;
            color: #f8fafc;
            line-height: 1.8;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
        }}
        h1, h2, h3 {{ color: {color}; }}
        a {{ color: #60a5fa; text-decoration: none; }}
        a:hover {{ text-decoration: underline; }}
        code {{ background: #1e293b; padding: 2px 6px; border-radius: 4px; color: {color}; }}
        pre {{ background: #1e293b; padding: 20px; border-radius: 8px; overflow-x: auto; color: #e2e8f0; }}
        nav {{
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid #334155;
        }}
        footer {{
            margin-top: 60px;
            padding-top: 20px;
            border-top: 1px solid #334155;
            text-align: center;
            color: #94a3b8;
        }}
        footer .philosophy {{ color: #ffd700; }}
    </style>
</head>
<body>
    <nav>
        <a href="index.html">📚 {nav_toc}</a> |
        {prev_link} |
        {next_link}
    </nav>

    <h1>{chapter_label}: {chapter['title']}</h1>
    <h2>{chapter['subtitle']}</h2>

    <h3>{chapter_num}.1 Overview</h3>
    <p>
        This chapter covers the essential aspects of {chapter['title']} in the WIA {config[lang+'_name']} Standard.
        The content follows the WIA four-phase architecture ensuring comprehensive coverage and interoperability.
    </p>

    <h3>{chapter_num}.2 Key Concepts</h3>
    <p>
        Understanding the fundamental concepts is crucial for implementing the {config[lang+'_name']} standard effectively.
        This section outlines the core principles and methodologies.
    </p>

    <h3>{chapter_num}.3 Technical Specifications</h3>
    <p>
        Detailed technical specifications ensure consistent implementation across different platforms and systems.
        All specifications follow industry best practices and WIA standards.
    </p>

    <h3>{chapter_num}.4 Implementation Guidelines</h3>
    <p>
        Practical guidelines for developers and implementers to follow when building {config[lang+'_name']} compliant systems.
        These guidelines ensure interoperability and ethical compliance.
    </p>

    <h3>{chapter_num}.5 Examples and Use Cases</h3>
    <pre><code>// Example implementation
{{
  "wia_standard": "{standard_id}",
  "version": "1.0",
  "implementation": {{
    "phase": {chapter_num},
    "compliant": true,
    "certification_level": "standard"
  }}
}}</code></pre>

    <h3>{chapter_num}.6 Best Practices</h3>
    <ul>
        <li>Follow WIA standard specifications precisely</li>
        <li>Implement proper error handling and validation</li>
        <li>Ensure data privacy and security compliance</li>
        <li>Document all implementation decisions</li>
        <li>Test thoroughly before deployment</li>
    </ul>

    <footer>
        <p class="philosophy">弘益人間 · {footer_text}</p>
        <p>WIA {config[lang+'_name']} Standard Ebook</p>
        <p>© 2025 WIA - MIT License</p>
    </footer>
</body>
</html>
'''
    return html

def main():
    """Generate all ebook files for specified standards"""
    base_dir = "/home/user/wia-standards"

    for standard_id, config in STANDARDS.items():
        print(f"Generating ebooks for {standard_id}...")

        # Create directories
        en_dir = os.path.join(base_dir, standard_id, "ebook", "en")
        ko_dir = os.path.join(base_dir, standard_id, "ebook", "ko")
        os.makedirs(en_dir, exist_ok=True)
        os.makedirs(ko_dir, exist_ok=True)

        # Generate EN files
        with open(os.path.join(en_dir, "index.html"), 'w', encoding='utf-8') as f:
            f.write(generate_index_html(standard_id, config, 'en'))

        for i in range(1, 9):
            with open(os.path.join(en_dir, f"chapter-{i:02d}.html"), 'w', encoding='utf-8') as f:
                f.write(generate_chapter_html(standard_id, config, i, 'en'))

        # Generate KO files
        with open(os.path.join(ko_dir, "index.html"), 'w', encoding='utf-8') as f:
            f.write(generate_index_html(standard_id, config, 'ko'))

        for i in range(1, 9):
            with open(os.path.join(ko_dir, f"chapter-{i:02d}.html"), 'w', encoding='utf-8') as f:
                f.write(generate_chapter_html(standard_id, config, i, 'ko'))

        print(f"  ✓ Generated 18 files for {standard_id}")

    print(f"\n✅ Total: {len(STANDARDS)} standards × 18 files = {len(STANDARDS) * 18} files generated!")

if __name__ == "__main__":
    main()
