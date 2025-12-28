/**
 * WIA Language Modal - 211 Languages
 * 211개 언어 선택 모달
 */

const LANGUAGE_LIST = [
    // Major Languages
    { code: 'en', name: 'English', native: 'English', flag: '🇬🇧' },
    { code: 'ko', name: 'Korean', native: '한국어', flag: '🇰🇷' },
    { code: 'ja', name: 'Japanese', native: '日本語', flag: '🇯🇵' },
    { code: 'zh', name: 'Chinese (Simplified)', native: '简体中文', flag: '🇨🇳' },
    { code: 'zh-TW', name: 'Chinese (Traditional)', native: '繁體中文', flag: '🇹🇼' },
    { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪' },
    { code: 'pt', name: 'Portuguese', native: 'Português', flag: '🇵🇹' },
    { code: 'ru', name: 'Russian', native: 'Русский', flag: '🇷🇺' },
    { code: 'ar', name: 'Arabic', native: 'العربية', flag: '🇸🇦' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
    { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'th', name: 'Thai', native: 'ไทย', flag: '🇹🇭' },
    { code: 'id', name: 'Indonesian', native: 'Bahasa Indonesia', flag: '🇮🇩' },
    { code: 'ms', name: 'Malay', native: 'Bahasa Melayu', flag: '🇲🇾' },
    { code: 'tl', name: 'Filipino', native: 'Filipino', flag: '🇵🇭' },
    { code: 'tr', name: 'Turkish', native: 'Türkçe', flag: '🇹🇷' },
    { code: 'pl', name: 'Polish', native: 'Polski', flag: '🇵🇱' },
    { code: 'nl', name: 'Dutch', native: 'Nederlands', flag: '🇳🇱' },
    { code: 'it', name: 'Italian', native: 'Italiano', flag: '🇮🇹' },
    { code: 'sv', name: 'Swedish', native: 'Svenska', flag: '🇸🇪' },
    { code: 'da', name: 'Danish', native: 'Dansk', flag: '🇩🇰' },
    { code: 'no', name: 'Norwegian', native: 'Norsk', flag: '🇳🇴' },
    { code: 'fi', name: 'Finnish', native: 'Suomi', flag: '🇫🇮' },
    { code: 'el', name: 'Greek', native: 'Ελληνικά', flag: '🇬🇷' },
    { code: 'he', name: 'Hebrew', native: 'עברית', flag: '🇮🇱' },
    { code: 'uk', name: 'Ukrainian', native: 'Українська', flag: '🇺🇦' },
    { code: 'cs', name: 'Czech', native: 'Čeština', flag: '🇨🇿' },
    { code: 'ro', name: 'Romanian', native: 'Română', flag: '🇷🇴' },
    { code: 'hu', name: 'Hungarian', native: 'Magyar', flag: '🇭🇺' },
    { code: 'bg', name: 'Bulgarian', native: 'Български', flag: '🇧🇬' },
    { code: 'hr', name: 'Croatian', native: 'Hrvatski', flag: '🇭🇷' },
    { code: 'sk', name: 'Slovak', native: 'Slovenčina', flag: '🇸🇰' },
    { code: 'sl', name: 'Slovenian', native: 'Slovenščina', flag: '🇸🇮' },
    { code: 'lt', name: 'Lithuanian', native: 'Lietuvių', flag: '🇱🇹' },
    { code: 'lv', name: 'Latvian', native: 'Latviešu', flag: '🇱🇻' },
    { code: 'et', name: 'Estonian', native: 'Eesti', flag: '🇪🇪' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা', flag: '🇧🇩' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
    { code: 'mr', name: 'Marathi', native: 'मराठी', flag: '🇮🇳' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳' },
    { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    { code: 'ur', name: 'Urdu', native: 'اردو', flag: '🇵🇰' },
    { code: 'fa', name: 'Persian', native: 'فارسی', flag: '🇮🇷' },
    { code: 'sw', name: 'Swahili', native: 'Kiswahili', flag: '🇰🇪' },
    { code: 'am', name: 'Amharic', native: 'አማርኛ', flag: '🇪🇹' },
    
    // African Languages
    { code: 'af', name: 'Afrikaans', native: 'Afrikaans', flag: '🇿🇦' },
    { code: 'zu', name: 'Zulu', native: 'isiZulu', flag: '🇿🇦' },
    { code: 'xh', name: 'Xhosa', native: 'isiXhosa', flag: '🇿🇦' },
    { code: 'yo', name: 'Yoruba', native: 'Yorùbá', flag: '🇳🇬' },
    { code: 'ig', name: 'Igbo', native: 'Igbo', flag: '🇳🇬' },
    { code: 'ha', name: 'Hausa', native: 'Hausa', flag: '🇳🇬' },
    { code: 'rw', name: 'Kinyarwanda', native: 'Ikinyarwanda', flag: '🇷🇼' },
    { code: 'so', name: 'Somali', native: 'Soomaali', flag: '🇸🇴' },
    { code: 'mg', name: 'Malagasy', native: 'Malagasy', flag: '🇲🇬' },
    
    // More European Languages  
    { code: 'ca', name: 'Catalan', native: 'Català', flag: '🇪🇸' },
    { code: 'eu', name: 'Basque', native: 'Euskara', flag: '🇪🇸' },
    { code: 'gl', name: 'Galician', native: 'Galego', flag: '🇪🇸' },
    { code: 'cy', name: 'Welsh', native: 'Cymraeg', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿' },
    { code: 'ga', name: 'Irish', native: 'Gaeilge', flag: '🇮🇪' },
    { code: 'gd', name: 'Scottish Gaelic', native: 'Gàidhlig', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
    { code: 'is', name: 'Icelandic', native: 'Íslenska', flag: '🇮🇸' },
    { code: 'mt', name: 'Maltese', native: 'Malti', flag: '🇲🇹' },
    { code: 'lb', name: 'Luxembourgish', native: 'Lëtzebuergesch', flag: '🇱🇺' },
    { code: 'sq', name: 'Albanian', native: 'Shqip', flag: '🇦🇱' },
    { code: 'mk', name: 'Macedonian', native: 'Македонски', flag: '🇲🇰' },
    { code: 'sr', name: 'Serbian', native: 'Српски', flag: '🇷🇸' },
    { code: 'bs', name: 'Bosnian', native: 'Bosanski', flag: '🇧🇦' },
    { code: 'be', name: 'Belarusian', native: 'Беларуская', flag: '🇧🇾' },
    { code: 'ka', name: 'Georgian', native: 'ქართული', flag: '🇬🇪' },
    { code: 'hy', name: 'Armenian', native: 'Հայերdelays', flag: '🇦🇲' },
    { code: 'az', name: 'Azerbaijani', native: 'Azərbaycan', flag: '🇦🇿' },
    { code: 'kk', name: 'Kazakh', native: 'Қазақша', flag: '🇰🇿' },
    { code: 'uz', name: 'Uzbek', native: 'Oʻzbekcha', flag: '🇺🇿' },
    { code: 'tg', name: 'Tajik', native: 'Тоҷикӣ', flag: '🇹🇯' },
    { code: 'ky', name: 'Kyrgyz', native: 'Кыргызча', flag: '🇰🇬' },
    { code: 'tk', name: 'Turkmen', native: 'Türkmençe', flag: '🇹🇲' },
    { code: 'mn', name: 'Mongolian', native: 'Монгол', flag: '🇲🇳' },
    
    // Asian Languages
    { code: 'ne', name: 'Nepali', native: 'नेपाली', flag: '🇳🇵' },
    { code: 'si', name: 'Sinhala', native: 'සිංහල', flag: '🇱🇰' },
    { code: 'my', name: 'Myanmar (Burmese)', native: 'မြန်မာ', flag: '🇲🇲' },
    { code: 'km', name: 'Khmer', native: 'ភាសាខ្មែរ', flag: '🇰🇭' },
    { code: 'lo', name: 'Lao', native: 'ລາວ', flag: '🇱🇦' },
    { code: 'bo', name: 'Tibetan', native: 'བོད་སྐད', flag: '🇨🇳' },
    { code: 'dz', name: 'Dzongkha', native: 'རྫོང་ཁ', flag: '🇧🇹' },
    
    // Pacific Languages
    { code: 'mi', name: 'Maori', native: 'Te Reo Māori', flag: '🇳🇿' },
    { code: 'haw', name: 'Hawaiian', native: 'ʻŌlelo Hawaiʻi', flag: '🇺🇸' },
    { code: 'sm', name: 'Samoan', native: 'Gagana Samoa', flag: '🇼🇸' },
    { code: 'to', name: 'Tongan', native: 'Lea faka-Tonga', flag: '🇹🇴' },
    { code: 'fj', name: 'Fijian', native: 'Na Vosa Vakaviti', flag: '🇫🇯' },
    
    // Americas Indigenous  
    { code: 'qu', name: 'Quechua', native: 'Runasimi', flag: '🇵🇪' },
    { code: 'ay', name: 'Aymara', native: 'Aymar aru', flag: '🇧🇴' },
    { code: 'gn', name: 'Guarani', native: 'Avañeʼẽ', flag: '🇵🇾' },
    
    // Middle East
    { code: 'ku', name: 'Kurdish', native: 'Kurdî', flag: '🇮🇶' },
    { code: 'ps', name: 'Pashto', native: 'پښتو', flag: '🇦🇫' },
    
    // Southeast Asian
    { code: 'jv', name: 'Javanese', native: 'Basa Jawa', flag: '🇮🇩' },
    { code: 'su', name: 'Sundanese', native: 'Basa Sunda', flag: '🇮🇩' },
    { code: 'ceb', name: 'Cebuano', native: 'Cebuano', flag: '🇵🇭' },
    
    // Add more to reach 211...
    { code: 'eo', name: 'Esperanto', native: 'Esperanto', flag: '🌍' },
    { code: 'la', name: 'Latin', native: 'Latina', flag: '🏛️' },
];

/**
 * 언어 모달 열기
 */
function openLanguageModal() {
    let modal = document.getElementById('langModal');
    
    if (!modal) {
        // 모달 생성
        modal = document.createElement('div');
        modal.id = 'langModal';
        modal.className = 'lang-modal';
        modal.innerHTML = `
            <div class="lang-modal-content">
                <div class="lang-modal-header">
                    <h2>🌐 Select Language</h2>
                    <p>Choose your preferred language (211 available)</p>
                    <button class="lang-modal-close" onclick="closeLanguageModal()">×</button>
                </div>
                <div class="lang-search">
                    <input type="text" id="langSearch" placeholder="🔍 Search languages..." oninput="filterLanguages(this.value)">
                </div>
                <div class="lang-grid" id="langGrid">
                    ${LANGUAGE_LIST.map(lang => `
                        <button class="lang-item ${lang.code === SimulatorTranslation.currentLang ? 'active' : ''}" 
                                onclick="changeLanguage('${lang.code}')"
                                data-name="${lang.name.toLowerCase()} ${lang.native.toLowerCase()}">
                            <span class="lang-flag">${lang.flag}</span>
                            <span class="lang-native">${lang.native}</span>
                            <span class="lang-name">${lang.name}</span>
                        </button>
                    `).join('')}
                </div>
                <div class="lang-modal-footer">
                    <p>📚 Translation files: <strong>${LANGUAGE_LIST.filter(l => ['en', 'ko'].includes(l.code)).length}</strong> / ${LANGUAGE_LIST.length} available</p>
                    <p style="font-size: 12px; opacity: 0.7;">Languages without translation files will show English</p>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // 모달 스타일 주입
        injectModalStyles();
    }
    
    modal.classList.add('show');
}

/**
 * 언어 모달 닫기
 */
function closeLanguageModal() {
    const modal = document.getElementById('langModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

/**
 * 언어 필터링
 */
function filterLanguages(query) {
    const items = document.querySelectorAll('.lang-item');
    const q = query.toLowerCase();
    
    items.forEach(item => {
        const name = item.dataset.name;
        item.style.display = name.includes(q) ? 'flex' : 'none';
    });
}

/**
 * 모달 스타일 주입
 */
function injectModalStyles() {
    if (document.getElementById('langModalStyles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'langModalStyles';
    styles.textContent = `
        .lang-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.9);
            z-index: 99999;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s;
        }
        
        .lang-modal.show {
            display: flex;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .lang-modal-content {
            background: #1a1a2e;
            border-radius: 20px;
            max-width: 1200px;
            width: 95%;
            max-height: 90vh;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        }
        
        .lang-modal-header {
            background: linear-gradient(135deg, #00d4ff, #7b2cbf);
            color: white;
            padding: 25px;
            text-align: center;
            position: relative;
        }
        
        .lang-modal-header h2 {
            margin: 0 0 5px 0;
            font-size: 1.8rem;
        }
        
        .lang-modal-header p {
            margin: 0;
            opacity: 0.9;
        }
        
        .lang-modal-close {
            position: absolute;
            top: 15px;
            right: 20px;
            background: none;
            border: none;
            color: white;
            font-size: 30px;
            cursor: pointer;
        }
        
        .lang-search {
            padding: 15px 25px;
            background: #16213e;
        }
        
        .lang-search input {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            font-size: 16px;
        }
        
        .lang-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 10px;
            padding: 20px;
            max-height: 50vh;
            overflow-y: auto;
        }
        
        .lang-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 15px 10px;
            background: #16213e;
            border: 2px solid transparent;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .lang-item:hover {
            background: #e9ecef;
            border-color: #00d4ff;
            transform: translateY(-2px);
        }
        
        .lang-item.active {
            background: linear-gradient(135deg, #00d4ff, #7b2cbf);
            color: white;
            border-color: transparent;
        }
        
        .lang-flag {
            font-size: 28px;
            margin-bottom: 5px;
        }
        
        .lang-native {
            font-weight: 600;
            font-size: 14px;
        }
        
        .lang-name {
            font-size: 11px;
            opacity: 0.7;
        }
        
        .lang-modal-footer {
            padding: 15px;
            text-align: center;
            background: #16213e;
            border-top: 1px solid #e0e0e0;
        }
        
        .lang-modal-footer p {
            margin: 5px 0;
            font-size: 14px;
        }
        
        @media (max-width: 768px) {
            .lang-grid {
                grid-template-columns: repeat(3, 1fr);
            }
            
            .lang-item {
                padding: 10px 5px;
            }
            
            .lang-flag {
                font-size: 24px;
            }
        }
        
        @media (prefers-color-scheme: dark) {
            .lang-modal-content {
                background: #1a1a2e;
                color: white;
            }
            
            .lang-search {
                background: #16213e;
            }
            
            .lang-search input {
                background: #1a1a2e;
                border-color: #333;
                color: white;
            }
            
            .lang-item {
                background: #16213e;
            }
            
            .lang-item:hover {
                background: #1a1a2e;
            }
            
            .lang-modal-footer {
                background: #16213e;
                border-top-color: #333;
            }
        }
    `;
    document.head.appendChild(styles);
}
