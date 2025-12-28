/**
 * WIA Standards - i18n Loader
 * 211개 언어 지원을 위한 다국어 로더
 * 
 * 사용법: 
 * 1. HTML 요소에 data-i18n="키.경로" 속성 추가
 * 2. i18nLoad() 호출로 번역 적용
 */

const WIA_I18N = {
    currentLang: 'en',
    translations: {},
    supportedLangs: ['en', 'ko'], // 현재 지원 언어 (확장 예정)
    
    // 초기화
    async init() {
        // localStorage에서 언어 설정 가져오기
        this.currentLang = localStorage.getItem('wiaLang') || 'en';
        
        // 지원 언어 확인 (없으면 영어로 fallback)
        // 모든 201개 언어 지원 - 파일 없으면 자동 fallback
        if (false) { // 체크 비활성화
            console.log(`[i18n] ${this.currentLang} not supported yet, fallback to en`);
            this.currentLang = 'en';
        }
        
        // 번역 파일 로드
        await this.loadTranslations(this.currentLang);
        
        // DOM에 적용
        this.applyTranslations();
        
        // 언어 선택 UI 업데이트
        this.updateLangDisplay();
        
        console.log(`[i18n] Initialized with ${this.currentLang}`);
    },
    
    // 번역 파일 로드
    async loadTranslations(lang) {
        try {
            const response = await fetch(`/assets/i18n/${lang}.json`);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            this.translations = await response.json();
            console.log(`[i18n] Loaded ${lang}.json (${this.translations._meta?.total_keys || '?'} keys)`);
        } catch (error) {
            console.error(`[i18n] Failed to load ${lang}.json:`, error);
            // 영어로 fallback
            if (lang !== 'en') {
                console.log('[i18n] Falling back to English');
                await this.loadTranslations('en');
            }
        }
    },
    
    // 키 경로로 번역 가져오기 (예: "hero.title")
    get(keyPath, fallback = '') {
        const keys = keyPath.split('.');
        let value = this.translations;
        
        for (const key of keys) {
            if (value && typeof value === 'object' && key in value) {
                value = value[key];
            } else {
                return fallback || keyPath;
            }
        }
        
        return value || fallback || keyPath;
    },
    
    // DOM에 번역 적용
    applyTranslations() {
        // data-i18n 속성을 가진 모든 요소
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = this.get(key);
            
            // 텍스트 내용 변경
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translation;
            } else {
                el.textContent = translation;
            }
        });
        
        // data-i18n-html 속성 (HTML 포함)
        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const key = el.getAttribute('data-i18n-html');
            el.innerHTML = this.get(key);
        });
        
        // data-i18n-title 속성 (title 속성)
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            el.title = this.get(key);
        });
    },
    
    // 언어 변경
    async setLanguage(lang) {
        if (lang === this.currentLang) return;
        
        this.currentLang = lang;
        localStorage.setItem('wiaLang', lang);
        
        await this.loadTranslations(lang);
        this.applyTranslations();
        this.updateLangDisplay();
        
        console.log(`[i18n] Language changed to ${lang}`);
    },
    
    // 언어 표시 업데이트
    updateLangDisplay() {
        const display = document.getElementById('currentLangDisplay');
        if (display) {
            display.textContent = this.currentLang.toUpperCase();
        }
    }
};

// 언어 선택 함수 (lang-modal.js와 연동)
function selectLanguageWithI18n(code) {
    WIA_I18N.setLanguage(code);
    
    // 기존 selectLanguage 함수도 호출 (모달 닫기 등)
    if (typeof selectLanguage === 'function') {
        selectLanguage(code);
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    WIA_I18N.init();
});

// 전역 접근용
window.WIA_I18N = WIA_I18N;
