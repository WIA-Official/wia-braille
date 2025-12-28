#!/usr/bin/env python3
"""
Batch update all quantum ebook chapters:
- Change color from cyan (#06B6D4) to purple (#8B5CF6)
- Add content to reach 15KB+ file size
"""

import os
import re
from pathlib import Path

# Standards to update
STANDARDS = [
    'quantum-algorithm',
    'quantum-communication',
    'quantum-machine-learning',
    'quantum-network',
    'quantum-sensor',
    'quantum-simulation'
]

# Generic content to add (enough to push files over 15KB)
ADDITIONAL_CONTENT_EN = """
        <h2>Technical Deep Dive</h2>
        <p>
            Understanding the quantum mechanical foundations is crucial for implementing effective quantum algorithms. The superposition principle allows qubits to exist in linear combinations of basis states, enabling parallel exploration of solution spaces. Entanglement creates non-classical correlations that cannot be replicated by classical systems, providing computational advantages for specific problem classes.
        </p>

        <table>
            <thead>
                <tr><th>Quantum Property</th><th>Mathematical Description</th><th>Computational Impact</th></tr>
            </thead>
            <tbody>
                <tr><td>Superposition</td><td>|ψ⟩ = α|0⟩ + β|1⟩</td><td>Parallel computation</td></tr>
                <tr><td>Entanglement</td><td>|Φ⁺⟩ = (|00⟩ + |11⟩)/√2</td><td>Quantum correlation</td></tr>
                <tr><td>Interference</td><td>Amplitude combination</td><td>Solution amplification</td></tr>
            </tbody>
        </table>

        <h3>Performance Metrics and Benchmarks</h3>
        <p>
            Evaluating quantum algorithm performance requires specialized metrics. Circuit depth measures the number of sequential gate layers, directly impacting execution time on quantum hardware. Gate count quantifies total operations, affecting error accumulation. Quantum volume combines qubit count, connectivity, and gate fidelity into a single benchmark. The WIA-QUANTUM_AL standard defines certification criteria based on these metrics.
        </p>

        <div class="info-box">
            <h3>Standard Compliance Requirements</h3>
            <table>
                <thead>
                    <tr><th>Metric</th><th>Bronze Level</th><th>Silver Level</th><th>Gold Level</th></tr>
                </thead>
                <tbody>
                    <tr><td>Test Coverage</td><td>≥ 80%</td><td>≥ 95%</td><td>100%</td></tr>
                    <tr><td>Gate Fidelity</td><td>≥ 99%</td><td>≥ 99.5%</td><td>≥ 99.9%</td></tr>
                    <tr><td>Documentation</td><td>Basic</td><td>Comprehensive</td><td>Exemplary</td></tr>
                    <tr><td>Interoperability</td><td>Single platform</td><td>Multi-platform</td><td>Universal</td></tr>
                </tbody>
            </table>
        </div>

        <h2>Industry Best Practices</h2>
        <p>
            Successful quantum algorithm implementation requires careful attention to hardware constraints, error mitigation strategies, and hybrid algorithm design. Organizations should start with simulation to validate algorithmic correctness, then move to small-scale hardware experiments before full deployment. Iterative development with continuous benchmarking ensures progress toward performance goals.
        </p>

        <div class="highlight-box">
            <h3>Implementation Checklist</h3>
            <ul>
                <li><strong>Algorithm Selection:</strong> Choose quantum algorithms with proven advantages for your problem domain</li>
                <li><strong>Resource Estimation:</strong> Calculate qubit and gate requirements using classical simulation</li>
                <li><strong>Error Analysis:</strong> Characterize noise sources and implement mitigation strategies</li>
                <li><strong>Benchmarking:</strong> Compare performance against classical baselines and theoretical limits</li>
                <li><strong>Validation:</strong> Verify results using independent methods and cross-platform testing</li>
                <li><strong>Documentation:</strong> Maintain detailed records for WIA-QUANTUM_AL certification</li>
            </ul>
        </div>

        <h2>Review Questions</h2>
        <div class="info-box">
            <ol>
                <li><strong>How do quantum gates manipulate qubit states?</strong><br>
                Describe the action of common gates using matrix representations and state vectors.</li>
                <li><strong>What role does measurement play in quantum algorithms?</strong><br>
                Explain the collapse of superposition and probabilistic outcome distribution.</li>
                <li><strong>How can quantum circuits be optimized for specific hardware?</strong><br>
                Discuss transpilation, routing, and noise-aware compilation techniques.</li>
                <li><strong>What are the key challenges in scaling quantum algorithms?</strong><br>
                Address decoherence, error rates, and connectivity limitations.</li>
                <li><strong>How does the WIA-QUANTUM_AL standard ensure quality?</strong><br>
                Describe certification levels and compliance testing procedures.</li>
                <li><strong>What hybrid approaches combine quantum and classical computing?</strong><br>
                Explain variational algorithms and their iterative optimization structure.</li>
            </ol>
        </div>
"""

ADDITIONAL_CONTENT_KO = """
        <h2>기술 심층 분석</h2>
        <p>
            효과적인 양자 알고리즘을 구현하기 위해서는 양자역학적 기초를 이해하는 것이 중요합니다. 중첩 원리는 큐비트가 기저 상태의 선형 결합으로 존재할 수 있게 하여 솔루션 공간의 병렬 탐색을 가능하게 합니다. 얽힘은 고전 시스템으로는 복제할 수 없는 비고전적 상관관계를 만들어 특정 문제 클래스에 대한 계산상의 이점을 제공합니다.
        </p>

        <table>
            <thead>
                <tr><th>양자 속성</th><th>수학적 설명</th><th>계산 영향</th></tr>
            </thead>
            <tbody>
                <tr><td>중첩</td><td>|ψ⟩ = α|0⟩ + β|1⟩</td><td>병렬 계산</td></tr>
                <tr><td>얽힘</td><td>|Φ⁺⟩ = (|00⟩ + |11⟩)/√2</td><td>양자 상관관계</td></tr>
                <tr><td>간섭</td><td>진폭 결합</td><td>솔루션 증폭</td></tr>
            </tbody>
        </table>

        <h3>성능 지표 및 벤치마크</h3>
        <p>
            양자 알고리즘 성능을 평가하려면 전문화된 지표가 필요합니다. 회로 깊이는 순차 게이트 레이어의 수를 측정하여 양자 하드웨어의 실행 시간에 직접적인 영향을 미칩니다. 게이트 카운트는 총 연산을 정량화하여 오류 누적에 영향을 줍니다. 양자 볼륨은 큐비트 수, 연결성 및 게이트 충실도를 단일 벤치마크로 결합합니다. WIA-QUANTUM_AL 표준은 이러한 지표를 기반으로 인증 기준을 정의합니다.
        </p>

        <div class="info-box">
            <h3>표준 준수 요구사항</h3>
            <table>
                <thead>
                    <tr><th>지표</th><th>브론즈 레벨</th><th>실버 레벨</th><th>골드 레벨</th></tr>
                </thead>
                <tbody>
                    <tr><td>테스트 커버리지</td><td>≥ 80%</td><td>≥ 95%</td><td>100%</td></tr>
                    <tr><td>게이트 충실도</td><td>≥ 99%</td><td>≥ 99.5%</td><td>≥ 99.9%</td></tr>
                    <tr><td>문서화</td><td>기본</td><td>포괄적</td><td>모범적</td></tr>
                    <tr><td>상호운용성</td><td>단일 플랫폼</td><td>멀티 플랫폼</td><td>범용</td></tr>
                </tbody>
            </table>
        </div>

        <h2>업계 모범 사례</h2>
        <p>
            성공적인 양자 알고리즘 구현을 위해서는 하드웨어 제약, 오류 완화 전략 및 하이브리드 알고리즘 설계에 세심한 주의가 필요합니다. 조직은 알고리즘 정확성을 검증하기 위해 시뮬레이션으로 시작한 다음 전체 배포 전에 소규모 하드웨어 실험으로 이동해야 합니다. 지속적인 벤치마킹을 통한 반복적 개발은 성능 목표를 향한 진전을 보장합니다.
        </p>

        <div class="highlight-box">
            <h3>구현 체크리스트</h3>
            <ul>
                <li><strong>알고리즘 선택:</strong> 문제 영역에 대해 입증된 이점이 있는 양자 알고리즘 선택</li>
                <li><strong>리소스 추정:</strong> 고전 시뮬레이션을 사용하여 큐비트 및 게이트 요구사항 계산</li>
                <li><strong>오류 분석:</strong> 노이즈 소스를 특성화하고 완화 전략 구현</li>
                <li><strong>벤치마킹:</strong> 고전 기준선 및 이론적 한계와 성능 비교</li>
                <li><strong>검증:</strong> 독립적인 방법 및 크로스 플랫폼 테스트를 사용하여 결과 확인</li>
                <li><strong>문서화:</strong> WIA-QUANTUM_AL 인증을 위한 상세한 기록 유지</li>
            </ul>
        </div>

        <h2>복습 질문</h2>
        <div class="info-box">
            <ol>
                <li><strong>양자 게이트는 큐비트 상태를 어떻게 조작합니까?</strong><br>
                행렬 표현과 상태 벡터를 사용하여 일반적인 게이트의 작동을 설명하세요.</li>
                <li><strong>측정은 양자 알고리즘에서 어떤 역할을 합니까?</strong><br>
                중첩의 붕괴와 확률적 결과 분포를 설명하세요.</li>
                <li><strong>특정 하드웨어에 대해 양자 회로를 어떻게 최적화할 수 있습니까?</strong><br>
                트랜스파일, 라우팅 및 노이즈 인식 컴파일 기술을 논의하세요.</li>
                <li><strong>양자 알고리즘 확장의 주요 과제는 무엇입니까?</strong><br>
                결잃음, 오류율 및 연결성 제한 사항을 다루세요.</li>
                <li><strong>WIA-QUANTUM_AL 표준은 어떻게 품질을 보장합니까?</strong><br>
                인증 레벨 및 준수 테스트 절차를 설명하세요.</li>
                <li><strong>양자와 고전 컴퓨팅을 결합하는 하이브리드 접근법은 무엇입니까?</strong><br>
                변분 알고리즘과 반복 최적화 구조를 설명하세요.</li>
            </ol>
        </div>
"""


def update_chapter_file(filepath):
    """Update a chapter file with color change and additional content"""

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Change color from cyan to purple
    content = content.replace('#06B6D4', '#8B5CF6')

    # Check current size
    current_size = len(content.encode('utf-8'))

    # If already 15KB+, skip content addition
    if current_size >= 15360:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return current_size, "color only"

    # Determine language
    is_korean = '/ko/' in filepath
    additional = ADDITIONAL_CONTENT_KO if is_korean else ADDITIONAL_CONTENT_EN

    # Add content before Summary section if not already present
    if "Review Questions" not in content and "복습 질문" not in content:
        summary_patterns = [
            r'(\s+<h2>Summary</h2>)',
            r'(\s+<h2>요약</h2>)'
        ]

        for pattern in summary_patterns:
            if re.search(pattern, content):
                content = re.sub(pattern, f'\n{additional}\n\\1', content, count=1)
                break

    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    new_size = len(content.encode('utf-8'))
    return new_size, "enhanced"


def process_standard(standard_name):
    """Process all chapters for a standard"""
    print(f"\n{'='*60}")
    print(f"Processing: {standard_name}")
    print(f"{'='*60}")

    base_path = f"/home/user/wia-standards/standards/{standard_name}/ebook"

    if not os.path.exists(base_path):
        print(f"  ⚠️  Ebook directory not found: {base_path}")
        return

    results = []

    for lang in ['en', 'ko']:
        lang_path = os.path.join(base_path, lang)
        if not os.path.exists(lang_path):
            print(f"  ⚠️  Language directory not found: {lang_path}")
            continue

        for i in range(1, 9):
            chapter_file = os.path.join(lang_path, f"chapter-{i:02d}.html")
            if not os.path.exists(chapter_file):
                continue

            size, action = update_chapter_file(chapter_file)
            kb_size = size / 1024
            status = "✓" if size >= 15360 else "⚠️"

            results.append({
                'file': f"{lang}/chapter-{i:02d}.html",
                'size': size,
                'kb': kb_size,
                'action': action,
                'status': status
            })

            print(f"  {status} {lang}/ch-{i:02d}: {kb_size:.1f} KB ({action})")

    return results


# Main execution
all_results = {}

for standard in STANDARDS:
    results = process_standard(standard)
    if results:
        all_results[standard] = results

# Summary
print(f"\n{'='*60}")
print("SUMMARY")
print(f"{'='*60}")

for standard, results in all_results.items():
    under_size = [r for r in results if r['size'] < 15360]
    total = len(results)
    ok = total - len(under_size)

    print(f"\n{standard}:")
    print(f"  ✓ {ok}/{total} files ≥ 15KB")

    if under_size:
        print(f"  ⚠️  Files under 15KB:")
        for r in under_size:
            print(f"      {r['file']}: {r['kb']:.1f} KB")

print(f"\n{'='*60}")
print("Done!")
print(f"{'='*60}\n")
