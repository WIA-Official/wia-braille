# WIA ISBN Manager Plugin Data

이 폴더는 wiabooks.store ISBN Manager 플러그인의 데이터입니다.

## 파일 설명

- `class-wia-isbn-data.php`: 75개 완성 표준의 메타데이터
  - 제목 (bundle/ko/en)
  - 부제목 (bundle/ko/en)
  - cover_prompt (DALL-E 3용)

## 용도

Claude Code가 이 파일을 참고하여:
1. 기존 93개 완성 표준의 패턴 학습
2. 580개 예정 표준의 메타데이터 생성
3. 동일한 품질/형식 유지

## 표준 형식

```php
'표준명' => [
    'emoji' => '🎨',
    'name_en' => 'English Name',
    'name_ko' => '한글 이름',
    'bundle_title' => 'WIA {Name} Standard Guide Set (KO/EN)',
    'bundle_subtitle' => 'Feature1, Feature2, Feature3, Feature4, Feature5 & Feature6',
    'ko_title' => 'WIA {이름} 표준화 가이드',
    'ko_subtitle' => '기능1, 기능2, 기능3, 기능4, 기능5 및 기능6',
    'en_title' => 'WIA {Name} Standard Guide',
    'en_subtitle' => '{bundle_subtitle과 동일}',
    'cover_prompt' => 'Reserve top 20% with pure black (#000000) background for title text area, {이미지 설명 200-300자}, dark navy background (#0f172a), no text, no letters, no words, professional book cover, 4K quality. Generate this professional book cover image.'
],
```
