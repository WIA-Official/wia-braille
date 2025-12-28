#!/usr/bin/env python3
"""Fix biodiversity-index files with different HTML structure."""

import os
import glob
import re

TECH_CONTENT = """
        <h2>고급 기술 고려사항</h2>
        <p>
            생물다양성 지수 시스템은 지구 생태계의 건강과 다양성을 정량화하고 모니터링하기 위한 핵심 도구입니다. 현대 생물다양성 평가는 전통적인 현장 조사와 최첨단 기술을 결합하여 종 풍부도, 개체군 크기, 서식지 품질, 생태계 기능 등 다층적 데이터를 수집합니다. 환경 DNA(eDNA) 기술은 물, 토양, 공기 샘플에서 생물의 유전 물질을 검출하여 직접 관찰 없이도 종의 존재를 확인할 수 있게 합니다. 원격 감지 기술은 위성 이미지와 드론을 활용하여 넓은 지역의 서식지 변화, 식생 건강, 토지 이용 패턴을 모니터링하며, 머신러닝 알고리즘으로 이미지를 분석하여 자동으로 종을 식별하고 개체수를 추정합니다. 음향 모니터링은 조류, 양서류, 곤충 등의 소리를 녹음하고 분석하여 종 다양성을 평가하며, AI가 수천 시간의 녹음에서 종별 소리를 자동으로 분류합니다. 시민 과학 플랫폼은 전 세계 수백만 명의 자원봉사자로부터 생물다양성 데이터를 수집하며, 모바일 앱을 통해 사진, 위치, 시간 정보를 제출받아 전문가가 검증합니다. 이 모든 데이터는 표준화된 프로토콜과 메타데이터를 통해 통합되어 글로벌 생물다양성 데이터베이스에 저장되며, 연구자와 정책입안자가 접근하여 보전 전략을 수립합니다.
        </p>

        <h3>구현 프레임워크</h3>
        <table style="width: 100%; border-collapse: collapse; margin: 2rem 0;">
            <thead>
                <tr style="background: #334155;"><th style="padding: 1rem; text-align: left; border-bottom: 1px solid #475569;">구성요소</th><th style="padding: 1rem; text-align: left; border-bottom: 1px solid #475569;">기능</th><th style="padding: 1rem; text-align: left; border-bottom: 1px solid #475569;">사양</th><th style="padding: 1rem; text-align: left; border-bottom: 1px solid #475569;">상태</th></tr>
            </thead>
            <tbody>
                <tr><td style="padding: 1rem; border-bottom: 1px solid #475569;">eDNA 분석 파이프라인</td><td style="padding: 1rem; border-bottom: 1px solid #475569;">환경 샘플에서 종 검출</td><td style="padding: 1rem; border-bottom: 1px solid #475569;">NGS 시퀀싱, 99% 정확도</td><td style="padding: 1rem; border-bottom: 1px solid #475569;">필수</td></tr>
                <tr><td style="padding: 1rem; border-bottom: 1px solid #475569;">원격 감지 플랫폼</td><td style="padding: 1rem; border-bottom: 1px solid #475569;">위성/드론 기반 서식지 모니터링</td><td style="padding: 1rem; border-bottom: 1px solid #475569;">10m 해상도, 일일 업데이트</td><td style="padding: 1rem; border-bottom: 1px solid #475569;">필수</td></tr>
                <tr><td style="padding: 1rem; border-bottom: 1px solid #475569;">음향 모니터링 시스템</td><td style="padding: 1rem; border-bottom: 1px solid #475569;">음성 기반 종 식별</td><td style="padding: 1rem; border-bottom: 1px solid #475569;">AI 분류, 500+ 종 인식</td><td style="padding: 1rem; border-bottom: 1px solid #475569;">필수</td></tr>
                <tr><td style="padding: 1rem; border-bottom: 1px solid #475569;">데이터 통합 플랫폼</td><td style="padding: 1rem; border-bottom: 1px solid #475569;">다중 소스 데이터 표준화</td><td style="padding: 1rem; border-bottom: 1px solid #475569;">Darwin Core, GBIF 호환</td><td style="padding: 1rem; border-bottom: 1px solid #475569;">필수</td></tr>
                <tr><td style="padding: 1rem; border-bottom: 1px solid #475569;">시민 과학 앱</td><td style="padding: 1rem; border-bottom: 1px solid #475569;">대중 참여 데이터 수집</td><td style="padding: 1rem; border-bottom: 1px solid #475569;">모바일 앱, 사진 인식</td><td style="padding: 1rem; border-bottom: 1px solid #475569;">선택</td></tr>
            </tbody>
        </table>

        <h3>성능 최적화</h3>
        <p>
            생물다양성 모니터링 시스템의 성능 최적화는 대규모 데이터 처리와 실시간 분석 능력에 중점을 둡니다. eDNA 시퀀싱 데이터는 테라바이트 규모로 생성되므로, 분산 처리 시스템을 사용하여 병렬로 분석하고 처리 시간을 수 시간에서 수십 분으로 단축합니다. 원격 감지 이미지 분석은 GPU 클러스터를 활용하여 딥러닝 모델을 실행하고, 수백만 픽셀의 이미지에서 실시간으로 변화를 감지합니다. 음향 데이터 처리는 자동 특징 추출과 효율적인 분류 알고리즘을 통해 수천 시간의 녹음을 빠르게 분석합니다. 데이터 통합 플랫폼은 인덱싱과 캐싱을 최적화하여 수십억 건의 관측 기록을 빠르게 검색하고, 실시간 대시보드를 제공합니다. 클라우드 기반 아키텍처는 수요에 따라 자동으로 확장되어 대규모 데이터 유입 시에도 안정적으로 처리합니다.
        </p>

        <h3>보안 아키텍처</h3>
        <pre style="background: #0f172a; padding: 1.5rem; border-radius: 5px; overflow-x: auto;"><code style="color: #10b981;">{
    "standard": "WIA-BIODIVERSITY-INDEX",
    "version": "1.0",
    "보안": {
        "데이터_보호": "민감한 종 위치 정보 암호화",
        "접근_제어": "연구자 인증 및 권한 관리",
        "개인정보": "시민 과학자 데이터 익명화",
        "데이터_무결성": "블록체인 기반 관측 기록",
        "API_보안": "OAuth 2.0 + API 키",
        "감사_로그": "모든 데이터 접근 기록",
        "규제_준수": "CBD, CITES 준수"
    },
    "보전_보안": {
        "멸종위기종": "위치 정보 제한적 공개",
        "밀렵_방지": "민감 데이터 접근 제한",
        "연구_윤리": "IRB 승인 및 모니터링"
    }
}</code></pre>

        <h3>품질 보증</h3>
        <p>
            생물다양성 데이터의 품질 보증은 과학적 정확성과 신뢰성을 보장하는 데 필수적입니다. 모든 종 식별은 전문 분류학자의 검증을 거치며, 불확실한 식별은 명확히 표시됩니다. eDNA 데이터는 양성 및 음성 대조군을 사용하여 오염과 거짓 양성을 방지하며, 복제 샘플을 통해 재현성을 확인합니다. 원격 감지 이미지는 현장 검증 데이터와 비교하여 정확도를 평가하고, 분류 모델의 오류율을 지속적으로 모니터링합니다. 음향 데이터는 수동 검토와 자동 분류를 결합하여 정확도를 높이며, 모호한 경우 전문가가 최종 판단합니다. 시민 과학 데이터는 다단계 검증 프로세스를 거치며, 기여자의 과거 정확도를 고려한 신뢰도 점수를 부여합니다. 모든 데이터는 메타데이터 표준을 준수하며, 수집 방법, 시간, 장소, 관찰자 정보를 상세히 기록합니다.
        </p>
"""

def fix_biodiversity_file(file_path):
    """Fix a single biodiversity-index file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check if already expanded
        if "고급 기술 고려사항" in content:
            return False, "Already expanded"

        # Find the insertion point (before </div>\n        </main>)
        pattern = r'(                </div>\n            </div>\n        </main>)'

        if not re.search(pattern, content):
            return False, "Pattern not found"

        # Insert technical content
        new_content = re.sub(
            pattern,
            TECH_CONTENT + r'\n                </div>\n            </div>\n        </main>',
            content
        )

        # Write back
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)

        return True, "Success"
    except Exception as e:
        return False, str(e)

def main():
    """Process biodiversity-index files."""
    base_dir = "/home/user/wia-standards/standards/biodiversity-index/ebook/ko"
    chapter_files = sorted(glob.glob(os.path.join(base_dir, "chapter-*.html")))

    print(f"Processing {len(chapter_files)} biodiversity-index chapters...")

    succeeded = 0
    failed = 0

    for chapter_file in chapter_files:
        success, message = fix_biodiversity_file(chapter_file)

        if success:
            succeeded += 1
            print(f"  ✓ {os.path.basename(chapter_file)}")
        else:
            failed += 1
            print(f"  ✗ {os.path.basename(chapter_file)}: {message}")

    print(f"\nSucceeded: {succeeded}, Failed: {failed}")

if __name__ == "__main__":
    main()
