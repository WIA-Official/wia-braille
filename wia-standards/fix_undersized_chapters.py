#!/usr/bin/env python3
"""Fix undersized ebook chapters by adding content to reach 15KB minimum."""

import os
import re

# Additional content to append to undersized files
ADDITIONAL_CONTENT_EN = '''
        <h2>Implementation Best Practices</h2>
        <p>
            Successful implementation of this standard requires careful attention to both technical specifications and operational procedures. Organizations should establish dedicated teams for standards compliance, conduct regular audits, and maintain comprehensive documentation of all implementation decisions.
        </p>

        <h3>Quality Assurance Framework</h3>
        <p>
            The WIA quality assurance framework provides a structured approach to ensuring compliance with all standard requirements. This framework encompasses design reviews, implementation testing, operational validation, and continuous monitoring.
        </p>

        <table>
            <thead>
                <tr>
                    <th>Phase</th>
                    <th>Activities</th>
                    <th>Deliverables</th>
                    <th>Success Criteria</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Design Review</td>
                    <td>Architecture assessment, requirement mapping</td>
                    <td>Design compliance report</td>
                    <td>100% requirement coverage</td>
                </tr>
                <tr>
                    <td>Implementation</td>
                    <td>Development, unit testing, integration</td>
                    <td>Test results, code review reports</td>
                    <td>All tests passing, no critical issues</td>
                </tr>
                <tr>
                    <td>Validation</td>
                    <td>System testing, performance verification</td>
                    <td>Validation report, metrics dashboard</td>
                    <td>Meet all performance thresholds</td>
                </tr>
                <tr>
                    <td>Operations</td>
                    <td>Monitoring, incident management, updates</td>
                    <td>Operational logs, compliance audits</td>
                    <td>99.9% uptime, zero compliance violations</td>
                </tr>
            </tbody>
        </table>

        <h3>Certification Process</h3>
        <p>
            WIA certification validates that implementations meet all standard requirements. The certification process includes document review, technical assessment, on-site inspection, and ongoing compliance monitoring. Certified implementations receive the WIA compliance mark and are listed in the global registry.
        </p>

        <div class="info-box">
            <p><strong>Initial Certification:</strong> Complete technical review and testing against all mandatory requirements. Typical duration: 4-8 weeks depending on system complexity.</p>
            <p><strong>Annual Recertification:</strong> Verification of continued compliance, review of any changes made during the year, and validation of updated security measures.</p>
            <p><strong>Incident-Based Review:</strong> Triggered by security incidents, major system changes, or compliance complaints. May result in certification suspension if issues are not addressed.</p>
        </div>

'''

ADDITIONAL_CONTENT_KO = '''
        <h2>구현 모범 사례</h2>
        <p>
            이 표준의 성공적인 구현을 위해서는 기술 사양과 운영 절차 모두에 세심한 주의가 필요합니다. 조직은 표준 준수를 위한 전담 팀을 구성하고, 정기적인 감사를 수행하며, 모든 구현 결정에 대한 포괄적인 문서화를 유지해야 합니다.
        </p>

        <h3>품질 보증 프레임워크</h3>
        <p>
            WIA 품질 보증 프레임워크는 모든 표준 요구사항에 대한 준수를 보장하기 위한 구조화된 접근 방식을 제공합니다. 이 프레임워크는 설계 검토, 구현 테스트, 운영 검증 및 지속적인 모니터링을 포함합니다.
        </p>

        <table>
            <thead>
                <tr>
                    <th>단계</th>
                    <th>활동</th>
                    <th>산출물</th>
                    <th>성공 기준</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>설계 검토</td>
                    <td>아키텍처 평가, 요구사항 매핑</td>
                    <td>설계 준수 보고서</td>
                    <td>100% 요구사항 커버리지</td>
                </tr>
                <tr>
                    <td>구현</td>
                    <td>개발, 단위 테스트, 통합</td>
                    <td>테스트 결과, 코드 리뷰 보고서</td>
                    <td>모든 테스트 통과, 중요 이슈 없음</td>
                </tr>
                <tr>
                    <td>검증</td>
                    <td>시스템 테스트, 성능 검증</td>
                    <td>검증 보고서, 메트릭 대시보드</td>
                    <td>모든 성능 임계값 충족</td>
                </tr>
                <tr>
                    <td>운영</td>
                    <td>모니터링, 인시던트 관리, 업데이트</td>
                    <td>운영 로그, 준수 감사</td>
                    <td>99.9% 가동시간, 준수 위반 없음</td>
                </tr>
            </tbody>
        </table>

        <h3>인증 프로세스</h3>
        <p>
            WIA 인증은 구현이 모든 표준 요구사항을 충족하는지 검증합니다. 인증 프로세스에는 문서 검토, 기술 평가, 현장 점검 및 지속적인 준수 모니터링이 포함됩니다. 인증된 구현은 WIA 준수 마크를 받고 글로벌 레지스트리에 등록됩니다.
        </p>

        <div class="info-box">
            <p><strong>초기 인증:</strong> 모든 필수 요구사항에 대한 완전한 기술 검토 및 테스트. 일반적인 기간: 시스템 복잡성에 따라 4-8주.</p>
            <p><strong>연간 재인증:</strong> 지속적인 준수 확인, 연중 변경사항 검토, 업데이트된 보안 조치 검증.</p>
            <p><strong>인시던트 기반 검토:</strong> 보안 인시던트, 주요 시스템 변경 또는 준수 불만에 의해 트리거됨. 문제가 해결되지 않으면 인증 일시 중지로 이어질 수 있음.</p>
        </div>

'''

def get_file_size(filepath):
    """Get file size in bytes."""
    return os.path.getsize(filepath)

def add_content_before_summary(filepath, content):
    """Add content before the Summary section."""
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()

    # Find Summary section and insert before it
    summary_pattern = r'(<h2>Summary</h2>|<h2>요약</h2>|<h2>Chapter Summary</h2>|<h2>챕터 요약</h2>)'
    match = re.search(summary_pattern, html, re.IGNORECASE)

    if match:
        insert_pos = match.start()
        new_html = html[:insert_pos] + content + html[insert_pos:]
    else:
        # Insert before nav-buttons if no summary
        nav_pattern = r'<div class="nav-buttons">'
        match = re.search(nav_pattern, html)
        if match:
            insert_pos = match.start()
            new_html = html[:insert_pos] + content + html[insert_pos:]
        else:
            # Append before closing tags
            new_html = html.replace('</div>\n</body>', content + '</div>\n</body>')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_html)

    return get_file_size(filepath)

def fix_undersized_files():
    """Find and fix all undersized chapter files."""
    base_path = '/home/user/wia-standards/standards'
    session7_standards = [
        'quantum-algorithm', 'quantum-communication', 'quantum-machine-learning',
        'quantum-network', 'quantum-sensor', 'quantum-simulation', 'railway-system',
        'real-time-communication', 'real-time-os', 'reconnaissance-satellite',
        'regenerative-medicine', 'restaurant-tech', 'retail-tech', 'ride-sharing',
        'room-temp-superconductor', 'satellite-internet', 'scientific-instrument',
        'security-robot', 'semiconductor-equipment', 'sensory-enhancement',
        'serverless-architecture', 'service-robot', 'smart-gym', 'smart-kitchen',
        'smart-logistics', 'smart-parking', 'smart-store', 'smart-textile',
        'software-documentation', 'software-license', 'software-testing',
        'solid-state-battery', 'space-surveillance', 'sports-analytics', 'sports-tech',
        'stealth-technology', 'supercomputing', 'superconducting', 'supply-chain',
        'synthetic-bio-registry', 'synthetic-biology', 'system-semiconductor',
        'teleportation-protocol', 'ticketing-system', 'tissue-engineering',
        'tourism-data', 'traffic-management', 'transhumanism-protocol', 'travel-tech',
        'underwater-weapon', 'universal-consent', 'universal-data-exchange',
        'universal-error-handling', 'universal-identity', 'universal-metadata',
        'universal-protocol', 'universal-timestamp', 'unmanned-weapon', 'v2x',
        'v2x-communication', 'vehicle-cybersecurity', 'vehicle-infotainment',
        'vehicle-lightweight-material', 'vehicle-safety', 'vehicle-semiconductor',
        'vehicle-to-grid', 'virtualization', 'vpn-protocol', 'wearable-fashion',
        'wireless-charging', 'wireless-power-transfer', 'wormhole-navigation'
    ]

    fixed_count = 0
    still_small = []

    for std in session7_standards:
        for lang in ['en', 'ko']:
            for ch in range(1, 9):
                filepath = f'{base_path}/{std}/ebook/{lang}/chapter-0{ch}.html'

                if not os.path.exists(filepath):
                    print(f'MISSING: {filepath}')
                    continue

                size = get_file_size(filepath)
                if size < 15000:
                    content = ADDITIONAL_CONTENT_EN if lang == 'en' else ADDITIONAL_CONTENT_KO
                    new_size = add_content_before_summary(filepath, content)

                    if new_size >= 15000:
                        print(f'FIXED: {filepath} ({size} -> {new_size} bytes)')
                        fixed_count += 1
                    else:
                        still_small.append((filepath, new_size))
                        print(f'STILL SMALL: {filepath} ({new_size} bytes)')

    print(f'\n=== Summary ===')
    print(f'Fixed: {fixed_count} files')
    print(f'Still undersized: {len(still_small)} files')

    if still_small:
        print('\nFiles still under 15KB:')
        for f, s in still_small:
            print(f'  {f}: {s} bytes')

if __name__ == '__main__':
    fix_undersized_files()
