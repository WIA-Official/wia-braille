#!/usr/bin/env python3
"""
Script to expand ebook chapters by adding Summary and Review Questions sections.
"""

import os
import re
from pathlib import Path

# Define the templates
EN_SUMMARY_TEMPLATE = """
        <h2>Summary</h2>

        <div class="highlight-box">
            <h3 style="margin-top:0">Key Takeaways:</h3>
            <ul>
                <li><strong>Standardization Enables Interoperability:</strong> The WIA-SEMI-013 standard provides a common framework for 3D sensors, ensuring compatibility across vendors and applications.</li>
                <li><strong>Technology-Agnostic Approach:</strong> The standard supports multiple sensing technologies including ToF, structured light, and stereo vision, allowing developers to choose the best technology for their needs.</li>
                <li><strong>Comprehensive Coverage:</strong> From data formats to API interfaces, communication protocols, and certification, the standard covers all aspects of 3D sensing systems.</li>
                <li><strong>Real-World Applications:</strong> 3D sensing technology enables diverse applications across consumer electronics, automotive, robotics, industrial automation, and healthcare sectors.</li>
                <li><strong>Performance and Quality:</strong> Proper calibration, accuracy management, and testing are essential for achieving reliable 3D sensing in production systems.</li>
                <li><strong>Future-Ready Architecture:</strong> The phased approach allows the standard to evolve with emerging technologies while maintaining backward compatibility.</li>
            </ul>
        </div>

        <h2>Review Questions</h2>

        <ol>
            <li><strong>What are the key advantages of standardizing 3D image sensor technologies? How does it benefit manufacturers, developers, and end users?</strong></li>
            <li><strong>Compare and contrast Time-of-Flight (ToF) and structured light sensing technologies. What are the strengths and limitations of each approach?</strong></li>
            <li><strong>Explain the four-phase architecture of WIA standards. Why is this progressive approach beneficial for adoption and evolution?</strong></li>
            <li><strong>Describe the main sources of error in 3D depth sensing. How can systematic errors be distinguished from random errors, and what techniques address each type?</strong></li>
            <li><strong>What role does calibration play in achieving accurate 3D measurements? Describe the difference between factory calibration and field verification.</strong></li>
            <li><strong>How do point cloud processing techniques transform raw sensor data into useful information for applications? Give examples of common processing operations.</strong></li>
            <li><strong>Explain how sensor fusion can improve 3D sensing performance. What are some examples of complementary sensor combinations?</strong></li>
            <li><strong>What factors should be considered when integrating 3D sensors into real-time systems? Discuss latency, power consumption, and computational requirements.</strong></li>
        </ol>
"""

KO_SUMMARY_TEMPLATE = """
        <h2>요약</h2>

        <div class="highlight-box">
            <h3 style="margin-top:0">핵심 내용:</h3>
            <ul>
                <li><strong>표준화를 통한 상호운용성:</strong> WIA-SEMI-013 표준은 3D 센서를 위한 공통 프레임워크를 제공하여 공급업체와 애플리케이션 간의 호환성을 보장합니다.</li>
                <li><strong>기술 중립적 접근:</strong> 이 표준은 ToF, 구조광, 스테레오 비전 등 다양한 센싱 기술을 지원하여 개발자가 필요에 맞는 최적의 기술을 선택할 수 있도록 합니다.</li>
                <li><strong>포괄적 범위:</strong> 데이터 형식부터 API 인터페이스, 통신 프로토콜, 인증까지 3D 센싱 시스템의 모든 측면을 다룹니다.</li>
                <li><strong>실제 응용 분야:</strong> 3D 센싱 기술은 가전제품, 자동차, 로봇공학, 산업 자동화, 의료 분야 등 다양한 응용 분야를 가능하게 합니다.</li>
                <li><strong>성능과 품질:</strong> 적절한 보정, 정확도 관리, 테스트는 프로덕션 시스템에서 안정적인 3D 센싱을 달성하는 데 필수적입니다.</li>
                <li><strong>미래 지향적 아키텍처:</strong> 단계별 접근 방식을 통해 표준이 새로운 기술과 함께 진화하면서도 이전 버전과의 호환성을 유지할 수 있습니다.</li>
            </ul>
        </div>

        <h2>복습 질문</h2>

        <ol>
            <li><strong>3D 이미지 센서 기술 표준화의 주요 장점은 무엇입니까? 제조업체, 개발자, 최종 사용자에게 어떤 이점이 있습니까?</strong></li>
            <li><strong>ToF(Time-of-Flight)와 구조광 센싱 기술을 비교하고 대조하십시오. 각 접근 방식의 강점과 한계는 무엇입니까?</strong></li>
            <li><strong>WIA 표준의 4단계 아키텍처를 설명하십시오. 이러한 점진적 접근 방식이 채택과 발전에 어떻게 유리합니까?</strong></li>
            <li><strong>3D 깊이 센싱의 주요 오류 원인을 설명하십시오. 체계적 오류를 무작위 오류와 어떻게 구별할 수 있으며, 각 유형을 해결하는 기술은 무엇입니까?</strong></li>
            <li><strong>정확한 3D 측정을 달성하는 데 보정이 어떤 역할을 합니까? 공장 보정과 현장 검증의 차이를 설명하십시오.</strong></li>
            <li><strong>포인트 클라우드 처리 기술이 원시 센서 데이터를 응용 프로그램에 유용한 정보로 어떻게 변환합니까? 일반적인 처리 작업의 예를 제시하십시오.</strong></li>
            <li><strong>센서 융합이 3D 센싱 성능을 어떻게 향상시킬 수 있는지 설명하십시오. 상호 보완적인 센서 조합의 예는 무엇입니까?</strong></li>
            <li><strong>3D 센서를 실시간 시스템에 통합할 때 고려해야 할 요소는 무엇입니까? 지연 시간, 전력 소비, 계산 요구 사항에 대해 논의하십시오.</strong></li>
        </ol>
"""

def find_insertion_point(content, is_korean=False):
    """Find where to insert the summary section."""
    # Look for the navigation buttons section
    nav_pattern = r'<div class="nav-buttons">.*?</div>\s*</div>\s*</body>\s*</html>'
    match = re.search(nav_pattern, content, re.DOTALL)

    if match:
        return match.start()

    # Fallback: look for footer
    footer_pattern = r'<footer>.*?</footer>\s*</div>\s*</body>\s*</html>'
    match = re.search(footer_pattern, content, re.DOTALL)

    if match:
        return match.start()

    # Last resort: before closing div/body/html
    match = re.search(r'\s*</div>\s*</body>\s*</html>\s*$', content)
    if match:
        return match.start()

    return -1

def has_summary(content):
    """Check if the file already has a summary section."""
    return '<h2>Summary</h2>' in content or '<h2>요약</h2>' in content or 'Review Questions' in content or '복습 질문' in content

def expand_chapter(file_path):
    """Add summary and review questions to a chapter file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check if already has summary
        if has_summary(content):
            print(f"  ⊙ {file_path.name} - Already has summary, skipping")
            return False

        # Determine if Korean
        is_korean = '/ko/' in str(file_path)

        # Find insertion point
        insert_pos = find_insertion_point(content, is_korean)

        if insert_pos == -1:
            print(f"  ✗ {file_path.name} - Could not find insertion point")
            return False

        # Choose template
        template = KO_SUMMARY_TEMPLATE if is_korean else EN_SUMMARY_TEMPLATE

        # Insert the summary section
        new_content = content[:insert_pos] + template + '\n' + content[insert_pos:]

        # Write back
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)

        # Get new file size
        new_size = len(new_content.encode('utf-8'))
        size_kb = new_size / 1024

        print(f"  ✓ {file_path.name} - Expanded to {size_kb:.1f}KB")
        return True

    except Exception as e:
        print(f"  ✗ {file_path.name} - Error: {e}")
        return False

def main():
    """Main function to process all undersized files."""
    base_dir = Path('/home/user/wia-standards/standards')

    # List of standards to process
    standards = [
        '3d-image-sensor',
        '3d-printing-construction',
        '5g-6g-spectrum',
        '6g-communication',
        'adas',
        'additive-manufacturing',
        'anti-gravity',
        'api-gateway',
        'artificial-organ',
        'augmentation-ethics',
        'augmentation-safety'
    ]

    total_processed = 0
    total_expanded = 0

    for standard in standards:
        print(f"\nProcessing {standard}...")
        standard_dir = base_dir / standard / 'ebook'

        if not standard_dir.exists():
            print(f"  ! Directory not found: {standard_dir}")
            continue

        # Process both EN and KO chapters
        for lang in ['en', 'ko']:
            lang_dir = standard_dir / lang
            if not lang_dir.exists():
                continue

            # Find all chapter files
            chapter_files = sorted(lang_dir.glob('chapter-*.html'))

            for chapter_file in chapter_files:
                total_processed += 1
                if expand_chapter(chapter_file):
                    total_expanded += 1

    print(f"\n{'='*60}")
    print(f"Total files processed: {total_processed}")
    print(f"Total files expanded: {total_expanded}")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
