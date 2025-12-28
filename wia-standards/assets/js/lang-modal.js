/**
 * WIA Standards - 211 Languages Modal
 * 독립형 다크 테마 언어 선택 모달
 */

const LANGUAGE_LIST = [
    // Major Languages
    { code: 'en', name: 'English', native: 'English', flag: '🇬🇧' },
    { code: 'ko', name: 'Korean', native: '한국어', flag: '🇰🇷' },
    { code: 'ja', name: 'Japanese', native: '日本語', flag: '🇯🇵' },
    { code: 'zh-CN', name: 'Chinese (Simplified)', native: '简体中文', flag: '🇨🇳' },
    { code: 'zh-TW', name: 'Chinese (Traditional)', native: '繁體中文', flag: '🇹🇼' },
    { code: 'zh-HK', name: 'Chinese (Hong Kong)', native: '香港中文', flag: '🇭🇰' },
    
    // Spanish variants
    { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸' },
    { code: 'es-MX', name: 'Spanish (Mexico)', native: 'Español (México)', flag: '🇲🇽' },
    { code: 'es-AR', name: 'Spanish (Argentina)', native: 'Español (Argentina)', flag: '🇦🇷' },
    { code: 'es-CO', name: 'Spanish (Colombia)', native: 'Español (Colombia)', flag: '🇨🇴' },
    { code: 'es-CL', name: 'Spanish (Chile)', native: 'Español (Chile)', flag: '🇨🇱' },
    { code: 'es-PE', name: 'Spanish (Peru)', native: 'Español (Perú)', flag: '🇵🇪' },
    
    // French & German
    { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷' },
    { code: 'fr-CA', name: 'French (Canada)', native: 'Français (Canada)', flag: '🇨🇦' },
    { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', native: 'Italiano', flag: '🇮🇹' },
    
    // Portuguese
    { code: 'pt', name: 'Portuguese', native: 'Português', flag: '🇵🇹' },
    { code: 'pt-BR', name: 'Portuguese (Brazil)', native: 'Português (Brasil)', flag: '🇧🇷' },
    
    // Major world languages
    { code: 'ru', name: 'Russian', native: 'Русский', flag: '🇷🇺' },
    { code: 'ar', name: 'Arabic', native: 'العربية', flag: '🇸🇦' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা', flag: '🇧🇩' },
    { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
    { code: 'mr', name: 'Marathi', native: 'मराठी', flag: '🇮🇳' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
    { code: 'ur', name: 'Urdu', native: 'اردو', flag: '🇵🇰' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳' },
    { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
    { code: 'as', name: 'Assamese', native: 'অসমীয়া', flag: '🇮🇳' },
    
    // European
    { code: 'nl', name: 'Dutch', native: 'Nederlands', flag: '🇳🇱' },
    { code: 'pl', name: 'Polish', native: 'Polski', flag: '🇵🇱' },
    { code: 'tr', name: 'Turkish', native: 'Türkçe', flag: '🇹🇷' },
    { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'th', name: 'Thai', native: 'ไทย', flag: '🇹🇭' },
    { code: 'id', name: 'Indonesian', native: 'Bahasa Indonesia', flag: '🇮🇩' },
    { code: 'ms', name: 'Malay', native: 'Bahasa Melayu', flag: '🇲🇾' },
    { code: 'tl', name: 'Tagalog', native: 'Tagalog', flag: '🇵🇭' },
    { code: 'fil', name: 'Filipino', native: 'Filipino', flag: '🇵🇭' },
    
    // Nordic
    { code: 'sv', name: 'Swedish', native: 'Svenska', flag: '🇸🇪' },
    { code: 'no', name: 'Norwegian', native: 'Norsk', flag: '🇳🇴' },
    { code: 'da', name: 'Danish', native: 'Dansk', flag: '🇩🇰' },
    { code: 'fi', name: 'Finnish', native: 'Suomi', flag: '🇫🇮' },
    
    // Eastern European
    { code: 'uk', name: 'Ukrainian', native: 'Українська', flag: '🇺🇦' },
    { code: 'el', name: 'Greek', native: 'Ελληνικά', flag: '🇬🇷' },
    { code: 'he', name: 'Hebrew', native: 'עברית', flag: '🇮🇱' },
    { code: 'fa', name: 'Persian', native: 'فارسی', flag: '🇮🇷' },
    { code: 'cs', name: 'Czech', native: 'Čeština', flag: '🇨🇿' },
    { code: 'sk', name: 'Slovak', native: 'Slovenčina', flag: '🇸🇰' },
    { code: 'ro', name: 'Romanian', native: 'Română', flag: '🇷🇴' },
    { code: 'hu', name: 'Hungarian', native: 'Magyar', flag: '🇭🇺' },
    { code: 'bg', name: 'Bulgarian', native: 'Български', flag: '🇧🇬' },
    { code: 'hr', name: 'Croatian', native: 'Hrvatski', flag: '🇭🇷' },
    { code: 'sr', name: 'Serbian', native: 'Српски', flag: '🇷🇸' },
    { code: 'sl', name: 'Slovenian', native: 'Slovenščina', flag: '🇸🇮' },
    { code: 'lt', name: 'Lithuanian', native: 'Lietuvių', flag: '🇱🇹' },
    { code: 'lv', name: 'Latvian', native: 'Latviešu', flag: '🇱🇻' },
    { code: 'et', name: 'Estonian', native: 'Eesti', flag: '🇪🇪' },
    
    // Caucasus & Central Asia
    { code: 'ka', name: 'Georgian', native: 'ქართული', flag: '🇬🇪' },
    { code: 'hy', name: 'Armenian', native: 'Հայերdelays', flag: '🇦🇲' },
    { code: 'az', name: 'Azerbaijani', native: 'Azərbaycan', flag: '🇦🇿' },
    { code: 'uz', name: 'Uzbek', native: 'Oʻzbekcha', flag: '🇺🇿' },
    { code: 'kk', name: 'Kazakh', native: 'Қазақша', flag: '🇰🇿' },
    { code: 'ky', name: 'Kyrgyz', native: 'Кыргызча', flag: '🇰🇬' },
    { code: 'tg', name: 'Tajik', native: 'Тоҷикӣ', flag: '🇹🇯' },
    { code: 'mn', name: 'Mongolian', native: 'Монгол', flag: '🇲🇳' },
    
    // Southeast Asian
    { code: 'km', name: 'Khmer', native: 'ភាសាខ្មែរ', flag: '🇰🇭' },
    { code: 'lo', name: 'Lao', native: 'ລາວ', flag: '🇱🇦' },
    { code: 'my', name: 'Myanmar', native: 'မြန်မာ', flag: '🇲🇲' },
    { code: 'si', name: 'Sinhala', native: 'සිංහල', flag: '🇱🇰' },
    { code: 'ne', name: 'Nepali', native: 'नेपाली', flag: '🇳🇵' },
    
    // African
    { code: 'sw', name: 'Swahili', native: 'Kiswahili', flag: '🇰🇪' },
    { code: 'am', name: 'Amharic', native: 'አማርኛ', flag: '🇪🇹' },
    { code: 'ti', name: 'Tigrinya', native: 'ትግርኛ', flag: '🇪🇷' },
    { code: 'om', name: 'Oromo', native: 'Oromoo', flag: '🇪🇹' },
    { code: 'so', name: 'Somali', native: 'Soomaali', flag: '🇸🇴' },
    { code: 'ha', name: 'Hausa', native: 'Hausa', flag: '🇳🇬' },
    { code: 'ig', name: 'Igbo', native: 'Igbo', flag: '🇳🇬' },
    { code: 'yo', name: 'Yoruba', native: 'Yorùbá', flag: '🇳🇬' },
    { code: 'zu', name: 'Zulu', native: 'isiZulu', flag: '🇿🇦' },
    { code: 'xh', name: 'Xhosa', native: 'isiXhosa', flag: '🇿🇦' },
    { code: 'af', name: 'Afrikaans', native: 'Afrikaans', flag: '🇿🇦' },
    { code: 'mg', name: 'Malagasy', native: 'Malagasy', flag: '🇲🇬' },
    { code: 'rw', name: 'Kinyarwanda', native: 'Ikinyarwanda', flag: '🇷🇼' },
    { code: 'ny', name: 'Chichewa', native: 'Chichewa', flag: '🇲🇼' },
    { code: 'sn', name: 'Shona', native: 'chiShona', flag: '🇿🇼' },
    { code: 'st', name: 'Sesotho', native: 'Sesotho', flag: '🇱🇸' },
    { code: 'tn', name: 'Setswana', native: 'Setswana', flag: '🇧🇼' },
    { code: 'ts', name: 'Tsonga', native: 'Xitsonga', flag: '🇿🇦' },
    { code: 'ss', name: 'Swati', native: 'SiSwati', flag: '🇸🇿' },
    { code: 've', name: 'Venda', native: 'Tshivenḓa', flag: '🇿🇦' },
    { code: 'nr', name: 'South Ndebele', native: 'isiNdebele', flag: '🇿🇦' },
    { code: 'nso', name: 'Northern Sotho', native: 'Sesotho sa Leboa', flag: '🇿🇦' },
    { code: 'wo', name: 'Wolof', native: 'Wolof', flag: '🇸🇳' },
    { code: 'ff', name: 'Fulah', native: 'Fulfulde', flag: '🇸🇳' },
    { code: 'ln', name: 'Lingala', native: 'Lingála', flag: '🇨🇩' },
    { code: 'kg', name: 'Kongo', native: 'Kikongo', flag: '🇨🇩' },
    { code: 'sg', name: 'Sango', native: 'Sängö', flag: '🇨🇫' },
    { code: 'rn', name: 'Kirundi', native: 'Ikirundi', flag: '🇧🇮' },
    { code: 'lg', name: 'Luganda', native: 'Luganda', flag: '🇺🇬' },
    { code: 'ak', name: 'Akan', native: 'Akan', flag: '🇬🇭' },
    { code: 'tw', name: 'Twi', native: 'Twi', flag: '🇬🇭' },
    { code: 'ee', name: 'Ewe', native: 'Eʋegbe', flag: '🇬🇭' },
    { code: 'bm', name: 'Bambara', native: 'Bamanankan', flag: '🇲🇱' },
    
    // Pacific
    { code: 'fj', name: 'Fijian', native: 'Na Vosa Vakaviti', flag: '🇫🇯' },
    { code: 'sm', name: 'Samoan', native: 'Gagana Samoa', flag: '🇼🇸' },
    { code: 'to', name: 'Tongan', native: 'Lea faka-Tonga', flag: '🇹🇴' },
    { code: 'ty', name: 'Tahitian', native: 'Reo Tahiti', flag: '🇵🇫' },
    { code: 'mi', name: 'Maori', native: 'Te Reo Māori', flag: '🇳🇿' },
    { code: 'haw', name: 'Hawaiian', native: 'ʻŌlelo Hawaiʻi', flag: '🇺🇸' },
    { code: 'rar', name: 'Cook Islands Māori', native: 'Māori Kūki ʻĀirani', flag: '🇨🇰' },
    { code: 'gil', name: 'Gilbertese', native: 'Taetae ni Kiribati', flag: '🇰🇮' },
    { code: 'mh', name: 'Marshallese', native: 'Kajin M̧ajeļ', flag: '🇲🇭' },
    { code: 'chk', name: 'Chuukese', native: 'Chuukese', flag: '🇫🇲' },
    { code: 'pon', name: 'Pohnpeian', native: 'Pohnpeian', flag: '🇫🇲' },
    { code: 'kos', name: 'Kosraean', native: 'Kosraean', flag: '🇫🇲' },
    { code: 'yap', name: 'Yapese', native: 'Yapese', flag: '🇫🇲' },
    { code: 'pau', name: 'Palauan', native: 'Tekoi ra Belau', flag: '🇵🇼' },
    { code: 'niu', name: 'Niuean', native: 'Vagahau Niuē', flag: '🇳🇺' },
    { code: 'tkl', name: 'Tokelauan', native: 'Tokelau', flag: '🇹🇰' },
    { code: 'tvl', name: 'Tuvaluan', native: 'Te Ggana Tuuvalu', flag: '🇹🇻' },
    { code: 'nau', name: 'Nauruan', native: 'Dorerin Naoero', flag: '🇳🇷' },
    
    // European minority
    { code: 'sq', name: 'Albanian', native: 'Shqip', flag: '🇦🇱' },
    { code: 'eu', name: 'Basque', native: 'Euskara', flag: '🇪🇸' },
    { code: 'ca', name: 'Catalan', native: 'Català', flag: '🇪🇸' },
    { code: 'gl', name: 'Galician', native: 'Galego', flag: '🇪🇸' },
    { code: 'is', name: 'Icelandic', native: 'Íslenska', flag: '🇮🇸' },
    { code: 'fo', name: 'Faroese', native: 'Føroyskt', flag: '🇫🇴' },
    { code: 'ga', name: 'Irish', native: 'Gaeilge', flag: '🇮🇪' },
    { code: 'gd', name: 'Scottish Gaelic', native: 'Gàidhlig', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
    { code: 'cy', name: 'Welsh', native: 'Cymraeg', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿' },
    { code: 'br', name: 'Breton', native: 'Brezhoneg', flag: '🇫🇷' },
    { code: 'gv', name: 'Manx', native: 'Gaelg', flag: '🇮🇲' },
    { code: 'kw', name: 'Cornish', native: 'Kernewek', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    
    // Constructed & Classical
    { code: 'eo', name: 'Esperanto', native: 'Esperanto', flag: '🌍' },
    { code: 'ia', name: 'Interlingua', native: 'Interlingua', flag: '🌐' },
    { code: 'vo', name: 'Volapük', native: 'Volapük', flag: '🌐' },
    { code: 'jbo', name: 'Lojban', native: 'Lojban', flag: '🌐' },
    { code: 'tok', name: 'Toki Pona', native: 'toki pona', flag: '🌐' },
    { code: 'la', name: 'Latin', native: 'Latina', flag: '🏛️' },
    
    // Kurdish & related
    { code: 'ckb', name: 'Kurdish (Sorani)', native: 'کوردی', flag: '🇮🇶' },
    { code: 'ku', name: 'Kurdish (Kurmanji)', native: 'Kurdî', flag: '🇹🇷' },
    { code: 'ps', name: 'Pashto', native: 'پښتو', flag: '🇦🇫' },
    { code: 'sd', name: 'Sindhi', native: 'سنڌي', flag: '🇵🇰' },
    { code: 'ks', name: 'Kashmiri', native: 'कॉशुर', flag: '🇮🇳' },
    
    // Himalayan
    { code: 'dz', name: 'Dzongkha', native: 'རྫོང་ཁ', flag: '🇧🇹' },
    { code: 'bo', name: 'Tibetan', native: 'བོད་སྐད', flag: '🇨🇳' },
    
    // Indigenous Americas
    { code: 'iu', name: 'Inuktitut', native: 'ᐃᓄᒃᑎᑐᑦ', flag: '🇨🇦' },
    { code: 'chr', name: 'Cherokee', native: 'ᏣᎳᎩ', flag: '🇺🇸' },
    { code: 'arn', name: 'Mapudungun', native: 'Mapudungun', flag: '🇨🇱' },
    { code: 'qu', name: 'Quechua', native: 'Runasimi', flag: '🇵🇪' },
    { code: 'ay', name: 'Aymara', native: 'Aymar aru', flag: '🇧🇴' },
    { code: 'gn', name: 'Guarani', native: 'Avañeʼẽ', flag: '🇵🇾' },
    { code: 'nah', name: 'Nahuatl', native: 'Nāhuatl', flag: '🇲🇽' },
    
    // Caribbean Creoles
    { code: 'ht', name: 'Haitian Creole', native: 'Kreyòl ayisyen', flag: '🇭🇹' },
    { code: 'pap', name: 'Papiamento', native: 'Papiamentu', flag: '🇨🇼' },
    { code: 'srn', name: 'Sranan Tongo', native: 'Sranan', flag: '🇸🇷' },
    { code: 'djk', name: 'Eastern Maroon Creole', native: 'Nenge', flag: '🇸🇷' },
    
    // Slavic
    { code: 'be', name: 'Belarusian', native: 'Беларуская', flag: '🇧🇾' },
    { code: 'bs', name: 'Bosnian', native: 'Bosanski', flag: '🇧🇦' },
    { code: 'me', name: 'Montenegrin', native: 'Crnogorski', flag: '🇲🇪' },
    { code: 'mk', name: 'Macedonian', native: 'Македонски', flag: '🇲🇰' },
    
    // Other European
    { code: 'mt', name: 'Maltese', native: 'Malti', flag: '🇲🇹' },
    { code: 'lb', name: 'Luxembourgish', native: 'Lëtzebuergesch', flag: '🇱🇺' },
    { code: 'rm', name: 'Romansh', native: 'Rumantsch', flag: '🇨🇭' },
    { code: 'co', name: 'Corsican', native: 'Corsu', flag: '🇫🇷' },
    { code: 'sc', name: 'Sardinian', native: 'Sardu', flag: '🇮🇹' },
    { code: 'scn', name: 'Sicilian', native: 'Sicilianu', flag: '🇮🇹' },
    { code: 'nap', name: 'Neapolitan', native: 'Napulitano', flag: '🇮🇹' },
    { code: 'lmo', name: 'Lombard', native: 'Lombard', flag: '🇮🇹' },
    { code: 'pms', name: 'Piedmontese', native: 'Piemontèis', flag: '🇮🇹' },
    { code: 'vec', name: 'Venetian', native: 'Vèneto', flag: '🇮🇹' },
    { code: 'lij', name: 'Ligurian', native: 'Ligure', flag: '🇮🇹' },
    { code: 'fur', name: 'Friulian', native: 'Furlan', flag: '🇮🇹' },
    { code: 'eml', name: 'Emilian-Romagnol', native: 'Emiliàn-Rumagnòl', flag: '🇮🇹' },
    { code: 'rgn', name: 'Romagnol', native: 'Rumagnòl', flag: '🇮🇹' },
    { code: 'srd', name: 'Sardinian', native: 'Sardu', flag: '🇮🇹' },
    { code: 'ext', name: 'Extremaduran', native: 'Estremeñu', flag: '🇪🇸' },
    { code: 'ast', name: 'Asturian', native: 'Asturianu', flag: '🇪🇸' },
    { code: 'an', name: 'Aragonese', native: 'Aragonés', flag: '🇪🇸' },
    { code: 'oc', name: 'Occitan', native: 'Occitan', flag: '🇫🇷' },
    { code: 'gsw', name: 'Swiss German', native: 'Schwyzerdütsch', flag: '🇨🇭' },
    { code: 'pgl', name: 'Primitive Irish', native: 'Primitive Irish', flag: '🇮🇪' },
    { code: 'lad', name: 'Ladino', native: 'Judeo-Español', flag: '🇮🇱' },
    { code: 'wa', name: 'Walloon', native: 'Walon', flag: '🇧🇪' },
    
    // Finno-Ugric
    { code: 'vro', name: 'Võro', native: 'Võro', flag: '🇪🇪' },
    { code: 'liv', name: 'Livonian', native: 'Līvõ kēļ', flag: '🇱🇻' },
    { code: 'vot', name: 'Votic', native: 'Vaďďa', flag: '🇷🇺' },
    { code: 'izh', name: 'Ingrian', native: 'Ižoran keel', flag: '🇷🇺' },
    { code: 'krl', name: 'Karelian', native: 'Karjala', flag: '🇷🇺' },
    
    // Chinese dialects
    { code: 'nan', name: 'Min Nan', native: '閩南語', flag: '🇹🇼' },
    { code: 'yue', name: 'Cantonese', native: '粵語', flag: '🇭🇰' },
    { code: 'hak', name: 'Hakka', native: '客家話', flag: '🇹🇼' },
    { code: 'gan', name: 'Gan Chinese', native: '贛語', flag: '🇨🇳' },
    { code: 'wuu', name: 'Wu Chinese', native: '吳語', flag: '🇨🇳' },
    { code: 'hsn', name: 'Xiang Chinese', native: '湘語', flag: '🇨🇳' },
    { code: 'cdo', name: 'Min Dong', native: '閩東語', flag: '🇨🇳' },
    
    // Other
    { code: 'mwl', name: 'Mirandese', native: 'Mirandés', flag: '🇵🇹' },
    { code: 'aue', name: 'Ambonese', native: 'Bahasa Ambon', flag: '🇮🇩' }
];

let wiaCurrentLang = localStorage.getItem('wiaLang') || 'en';

function openLanguageModal() {
    let modal = document.getElementById('wiaLangModal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'wiaLangModal';
        modal.className = 'wia-lang-modal';
        modal.innerHTML = `
            <div class="wia-lang-modal-content">
                <div class="wia-lang-modal-header">
                    <h2>🌐 Select Language</h2>
                    <p>${LANGUAGE_LIST.length} languages available</p>
                    <button class="wia-lang-modal-close" onclick="closeLanguageModal()">×</button>
                </div>
                <div class="wia-lang-search">
                    <input type="text" id="wiaLangSearch" placeholder="🔍 Search languages..." oninput="filterLanguages(this.value)">
                </div>
                <div class="wia-lang-grid" id="wiaLangGrid">
                    ${LANGUAGE_LIST.map(lang => `
                        <button class="wia-lang-item ${lang.code === wiaCurrentLang ? 'active' : ''}" 
                                onclick="selectLanguage('${lang.code}')"
                                data-search="${lang.name.toLowerCase()} ${lang.native.toLowerCase()} ${lang.code}">
                            <span class="wia-lang-flag">${lang.flag}</span>
                            <span class="wia-lang-native">${lang.native}</span>
                            <span class="wia-lang-name">${lang.name}</span>
                        </button>
                    `).join('')}
                </div>
                <div class="wia-lang-footer">
                    <p>弘益人間 · Benefit All Humanity</p>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        injectModalStyles();
    }
    
    modal.classList.add('show');
    setTimeout(() => document.getElementById('wiaLangSearch').focus(), 100);
}

function closeLanguageModal() {
    const modal = document.getElementById('wiaLangModal');
    if (modal) modal.classList.remove('show');
}

function filterLanguages(query) {
    const items = document.querySelectorAll('.wia-lang-item');
    const q = query.toLowerCase();
    items.forEach(item => {
        const match = item.dataset.search.includes(q);
        item.style.display = match ? '' : 'none';
    });
}

function selectLanguage(code) {
    wiaCurrentLang = code;
    localStorage.setItem('wiaLang', code);
    const display = document.getElementById('currentLangDisplay');
    if (display) display.textContent = code.toUpperCase();
    
    document.querySelectorAll('.wia-lang-item').forEach(item => item.classList.remove('active'));
    if (event && event.target) {
        const item = event.target.closest('.wia-lang-item');
        if (item) item.classList.add('active');
    }
    
    // i18n 번역 적용
    if (typeof WIA_I18N !== "undefined" && WIA_I18N.setLanguage) {
        WIA_I18N.setLanguage(code);
    }
    closeLanguageModal();
}

function injectModalStyles() {
    if (document.getElementById('wiaLangModalStyles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'wiaLangModalStyles';
    styles.textContent = `
        .wia-lang-modal {
            display: none;
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.85);
            z-index: 9999;
            justify-content: center;
            align-items: center;
        }
        .wia-lang-modal.show { display: flex; }
        
        .wia-lang-modal-content {
            background: #1a1a2e;
            border-radius: 20px;
            max-width: 850px;
            width: 95%;
            max-height: 85vh;
            overflow: hidden;
            border: 1px solid #30363d;
            box-shadow: 0 25px 80px rgba(0,212,255,0.2);
        }
        
        .wia-lang-modal-header {
            background: linear-gradient(135deg, #00d4ff, #7b2cbf);
            color: white;
            padding: 25px;
            text-align: center;
            position: relative;
        }
        .wia-lang-modal-header h2 { margin: 0 0 5px 0; font-size: 1.8rem; }
        .wia-lang-modal-header p { margin: 0; opacity: 0.9; font-size: 1rem; }
        
        .wia-lang-modal-close {
            position: absolute;
            top: 15px; right: 20px;
            background: none;
            border: none;
            color: white;
            font-size: 30px;
            cursor: pointer;
            transition: transform 0.2s;
        }
        .wia-lang-modal-close:hover { transform: scale(1.2); }
        
        .wia-lang-search {
            padding: 15px 25px;
            background: #16213e;
        }
        .wia-lang-search input {
            width: 100%;
            padding: 14px 18px;
            border: 2px solid #30363d;
            border-radius: 12px;
            font-size: 16px;
            background: #1a1a2e;
            color: white;
        }
        .wia-lang-search input::placeholder { color: #666; }
        .wia-lang-search input:focus {
            outline: none;
            border-color: #00d4ff;
        }
        
        .wia-lang-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 10px;
            padding: 20px;
            max-height: 55vh;
            overflow-y: auto;
        }
        .wia-lang-grid::-webkit-scrollbar { width: 8px; }
        .wia-lang-grid::-webkit-scrollbar-track { background: #16213e; }
        .wia-lang-grid::-webkit-scrollbar-thumb { background: #30363d; border-radius: 4px; }
        
        .wia-lang-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 12px 8px;
            background: #16213e;
            border: 2px solid transparent;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.2s;
            color: white;
        }
        .wia-lang-item:hover {
            background: #1e2d4a;
            border-color: #00d4ff;
            transform: translateY(-3px);
        }
        .wia-lang-item.active {
            background: linear-gradient(135deg, #00d4ff, #7b2cbf);
            border-color: transparent;
        }
        
        .wia-lang-flag { font-size: 28px; margin-bottom: 6px; }
        .wia-lang-native { font-weight: 600; font-size: 12px; text-align: center; }
        .wia-lang-name { font-size: 10px; opacity: 0.7; text-align: center; }
        
        .wia-lang-footer {
            padding: 15px;
            text-align: center;
            background: #16213e;
            border-top: 1px solid #30363d;
            color: #ffd700;
            font-size: 1rem;
        }
        
        @media (max-width: 768px) {
            .wia-lang-grid { grid-template-columns: repeat(3, 1fr); }
            .wia-lang-item { padding: 10px 6px; }
            .wia-lang-flag { font-size: 24px; }
            .wia-lang-modal-content { max-height: 90vh; }
        }
        
        @media (max-width: 480px) {
            .wia-lang-grid { grid-template-columns: repeat(2, 1fr); }
        }
    `;
    document.head.appendChild(styles);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('wiaLang') || 'en';
    const display = document.getElementById('currentLangDisplay');
    if (display) display.textContent = savedLang.toUpperCase();
});

// Close on overlay click
document.addEventListener('click', function(e) {
    if (e.target.id === 'wiaLangModal') closeLanguageModal();
});

// Close on ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeLanguageModal();
});
