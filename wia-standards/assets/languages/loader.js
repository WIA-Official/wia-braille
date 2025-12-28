/**
 * WIA Simulator Translation Loader
 * 동적으로 언어 파일을 로드하고 UI를 번역하는 시스템
 * Version: 2.0.0 - 10 languages support
 */

const SimulatorTranslation = {
    currentLang: 'en',
    translations: {},
    loadedLanguages: new Set(),
    basePath: './languages/',
    
    /**
     * 초기화
     */
    async init() {
        // 미리 로드된 언어 등록 (HTML에서 이미 로드됨)
        const languageMap = {
            'en': window.translations_en,
            'ko': window.translations_ko,
            'ja': window.translations_ja,
            'zh': window.translations_zh,
            'zh-TW': window.translations_zh_TW,
            'es': window.translations_es,
            'fr': window.translations_fr,
            'de': window.translations_de,
            'ar': window.translations_ar,
            'hi': window.translations_hi
        };
        
        for (const [code, translations] of Object.entries(languageMap)) {
            if (translations) {
                this.translations[code] = translations;
                this.loadedLanguages.add(code);
            }
        }
        
        // 저장된 언어 불러오기
        this.currentLang = localStorage.getItem('simulator_language') || 
                          localStorage.getItem('wiabooks_language') || 'en';
        
        // 현재 언어 로드 및 적용
        await this.loadLanguage(this.currentLang);
        this.translatePage();
        
        // 언어 버튼 표시 업데이트
        this.updateLanguageDisplay();
        
        // RTL 지원
        this.handleRTL();
        
        console.log(`🌐 Translation initialized: ${this.currentLang}`);
        console.log(`📚 Loaded languages: ${Array.from(this.loadedLanguages).join(', ')}`);
    },
    
    /**
     * RTL 언어 처리
     */
    handleRTL() {
        const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
        if (rtlLanguages.includes(this.currentLang)) {
            document.documentElement.setAttribute('dir', 'rtl');
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
        }
    },
    
    /**
     * 언어 디스플레이 업데이트
     */
    updateLanguageDisplay() {
        const langDisplay = document.getElementById('currentLangDisplay');
        if (langDisplay) {
            const displayNames = {
                'en': 'EN', 'ko': '한국어', 'ja': '日本語',
                'zh': '简中', 'zh-TW': '繁中', 'es': 'ES',
                'fr': 'FR', 'de': 'DE', 'ar': 'العربية', 'hi': 'हिन्दी'
            };
            langDisplay.textContent = displayNames[this.currentLang] || this.currentLang.toUpperCase();
        }
    },
    
    /**
     * 언어 파일 로드
     */
    async loadLanguage(langCode) {
        // 이미 로드된 경우
        if (this.loadedLanguages.has(langCode)) {
            this.currentLang = langCode;
            return this.translations[langCode];
        }
        
        // 동적 로드 시도
        try {
            const script = document.createElement('script');
            script.src = `${this.basePath}${langCode}.js`;
            
            await new Promise((resolve, reject) => {
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
            
            const varName = `translations_${langCode.replace('-', '_')}`;
            if (window[varName]) {
                this.translations[langCode] = window[varName];
                this.loadedLanguages.add(langCode);
                this.currentLang = langCode;
                return this.translations[langCode];
            }
        } catch (error) {
            console.warn(`Failed to load language: ${langCode}, falling back to English`);
        }
        
        // Fallback to English
        this.currentLang = 'en';
        return this.translations['en'];
    },
    
    /**
     * 번역 키 가져오기
     */
    t(key) {
        const translation = this.translations[this.currentLang];
        if (translation && translation[key]) {
            return translation[key];
        }
        // Fallback to English
        if (this.translations['en'] && this.translations['en'][key]) {
            return this.translations['en'][key];
        }
        return key;
    },
    
    /**
     * 페이지 전체 번역
     */
    translatePage() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            if (translation !== key) {
                element.textContent = translation;
            }
        });
        
        // placeholder 번역
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const translation = this.t(key);
            if (translation !== key) {
                element.placeholder = translation;
            }
        });
        
        // title 속성 번역
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            const translation = this.t(key);
            if (translation !== key) {
                element.title = translation;
            }
        });
    },
    
    /**
     * 언어 변경
     */
    async changeLanguage(langCode) {
        await this.loadLanguage(langCode);
        localStorage.setItem('simulator_language', langCode);
        localStorage.setItem('wiabooks_language', langCode);
        this.translatePage();
        this.updateLanguageDisplay();
        this.handleRTL();
        
        // Canvas 다시 그리기 (필요한 경우)
        if (typeof window.redrawCanvas === 'function') {
            window.redrawCanvas();
        }
        
        console.log(`🌐 Language changed to: ${langCode}`);
    }
};

// Global functions
function openLanguageModal() {
    if (window.wiaLanguageModal) {
        window.wiaLanguageModal.show();
    }
}

function closeLanguageModal() {
    if (window.wiaLanguageModal) {
        window.wiaLanguageModal.hide();
    }
}

function changeLanguage(langCode) {
    SimulatorTranslation.changeLanguage(langCode);
}

// Listen for language change events from WIA Language Modal
document.addEventListener('wia-language-changed', (e) => {
    if (e.detail && e.detail.language) {
        SimulatorTranslation.changeLanguage(e.detail.language);
    }
});

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    SimulatorTranslation.init();
});

// Export
if (typeof window !== 'undefined') {
    window.SimulatorTranslation = SimulatorTranslation;
}
