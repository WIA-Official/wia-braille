#!/usr/bin/env python3
"""
Generate index.html files for all WIA Standards ebooks
"""

import os

PRIMARY_COLOR = "#8B5CF6"  # Purple

STANDARDS = {
    "serverless-architecture": {
        "id": "WIA-COMP-008",
        "title": "Serverless Architecture",
        "chapters": [
            "Introduction to Serverless Architecture",
            "Function-as-a-Service (FaaS) Platforms",
            "Event-Driven Architecture Patterns",
            "Serverless Storage and Databases",
            "API Gateway and Integration",
            "Performance and Cost Optimization",
            "Security and Best Practices",
            "Future of Serverless Computing",
        ]
    },
    "software-documentation": {
        "id": "WIA-COMP-017",
        "title": "Software Documentation",
        "chapters": [
            "Introduction to Software Documentation",
            "API Documentation Standards",
            "User Documentation and Guides",
            "Technical Documentation",
            "Documentation Tools and Generators",
            "Version Control and Collaboration",
            "Documentation Best Practices",
            "Future of Documentation",
        ]
    },
    "software-license": {
        "id": "WIA-COMP-016",
        "title": "Software License",
        "chapters": [
            "Introduction to Software Licensing",
            "Open Source Licenses",
            "SPDX and License Standards",
            "License Compatibility",
            "Commercial and Dual Licensing",
            "Dependency Management",
            "Compliance and Auditing",
            "Future of Software Licensing",
        ]
    },
    "software-testing": {
        "id": "WIA-COMP-013",
        "title": "Software Testing",
        "chapters": [
            "Introduction to Software Testing",
            "Unit Testing",
            "Integration Testing",
            "End-to-End Testing",
            "Test Automation",
            "Performance and Load Testing",
            "Security Testing",
            "Future of Software Testing",
        ]
    },
    "supercomputing": {
        "id": "WIA-COMP-001",
        "title": "Supercomputing",
        "chapters": [
            "Introduction to Supercomputing",
            "System Architecture",
            "Parallel Programming Models",
            "High-Performance Networks",
            "Storage Systems",
            "Performance Optimization",
            "Resource Management",
            "Future of Supercomputing",
        ]
    },
    "virtualization": {
        "id": "WIA-COMP-007",
        "title": "Virtualization",
        "chapters": [
            "Introduction to Virtualization",
            "Hypervisor Technologies",
            "CPU and Memory Virtualization",
            "Storage and Network Virtualization",
            "Live Migration and High Availability",
            "Container vs VM",
            "Security and Performance",
            "Future of Virtualization",
        ]
    },
    "vpn-protocol": {
        "id": "WIA-COMM-016",
        "title": "VPN Protocol",
        "chapters": [
            "Introduction to VPN Technology",
            "IPsec Protocol Suite",
            "SSL/TLS VPN",
            "WireGuard Modern VPN",
            "VPN Architecture Patterns",
            "Key Exchange and PFS",
            "Performance and Optimization",
            "Security and Future Trends",
        ]
    },
}

def generate_index_html(standard_key, lang="en"):
    """Generate index.html for a standard"""

    standard = STANDARDS[standard_key]

    if lang == "ko":
        title = f"{standard['title']} 전자책"
        toc_title = "목차"
        about_title = "이 전자책에 대하여"
        about_text = f"""이 전자책은 {standard['id']} ({standard['title']}) 표준에 대한 포괄적인 가이드를 제공합니다.
        각 장에서는 핵심 개념, 기술 사양, 구현 가이드라인 및 실제 사용 사례를 다룹니다. 이 표준은 弘益人間 (홍익인간)의 철학을 구현하여
        인류에게 이로운 접근 가능하고 상호 운용 가능한 솔루션을 촉진합니다."""
        chapter_prefix = "제"
        chapter_suffix = "장"
    else:
        title = f"{standard['title']} Ebook"
        toc_title = "Table of Contents"
        about_title = "About This Ebook"
        about_text = f"""This ebook provides comprehensive coverage of the {standard['id']} ({standard['title']}) standard.
        Each chapter explores key concepts, technical specifications, implementation guidelines, and real-world use cases.
        This standard embodies the philosophy of 弘益人間 (Benefit All Humanity) by promoting accessible and interoperable
        solutions that serve the global community."""
        chapter_prefix = "Chapter "
        chapter_suffix = ""

    html = f'''<!DOCTYPE html>
<html lang="{lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} - {standard['id']}</title>
    <style>
        :root {{
            --bg: #0f172a;
            --surface: #1e293b;
            --primary: {PRIMARY_COLOR};
            --text: #f1f5f9;
            --text-dim: #94a3b8;
            --border: #334155;
        }}
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{
            font-family: Georgia, 'Times New Roman', serif;
            background: var(--bg);
            color: var(--text);
            line-height: 1.8;
            padding: 2rem;
        }}
        .container {{
            max-width: 900px;
            margin: 0 auto;
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 3rem;
        }}
        h1 {{
            color: var(--primary);
            font-size: 2.5rem;
            margin-bottom: 1rem;
            border-bottom: 3px solid var(--primary);
            padding-bottom: 1rem;
            text-align: center;
        }}
        h2 {{
            color: var(--primary);
            font-size: 1.8rem;
            margin: 2rem 0 1rem 0;
        }}
        .subtitle {{
            text-align: center;
            color: var(--text-dim);
            margin-bottom: 2rem;
            font-size: 1.2rem;
        }}
        p {{
            margin-bottom: 1rem;
            text-align: justify;
        }}
        .toc {{
            list-style: none;
            padding: 0;
        }}
        .toc li {{
            margin-bottom: 1rem;
            border-left: 3px solid var(--primary);
            padding-left: 1rem;
            transition: all 0.3s;
        }}
        .toc li:hover {{
            border-left-width: 5px;
            background: rgba(139, 92, 246, 0.1);
        }}
        .toc a {{
            color: var(--text);
            text-decoration: none;
            display: block;
            padding: 0.5rem;
            font-size: 1.1rem;
        }}
        .toc a:hover {{
            color: var(--primary);
        }}
        .chapter-number {{
            display: inline-block;
            width: 120px;
            color: var(--primary);
            font-weight: 600;
        }}
        .about {{
            background: var(--bg);
            border-left: 4px solid var(--primary);
            padding: 1.5rem;
            margin: 2rem 0;
        }}
        .philosophy {{
            text-align: center;
            padding: 2rem;
            margin: 2rem 0;
            background: var(--bg);
            border-radius: 8px;
        }}
        .philosophy-text {{
            font-size: 2rem;
            color: var(--primary);
            letter-spacing: 8px;
            margin-bottom: 0.5rem;
        }}
        .footer {{
            text-align: center;
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 1px solid var(--border);
            color: var(--text-dim);
        }}
    </style>
</head>
<body>
    <div class="container">
        <h1>{title}</h1>
        <div class="subtitle">{standard['id']} Specification v1.0</div>

        <div class="philosophy">
            <div class="philosophy-text">弘益人間</div>
            <p style="color: var(--text-dim);">Benefit All Humanity</p>
        </div>

        <div class="about">
            <h2>{about_title}</h2>
            <p>{about_text}</p>
        </div>

        <h2>{toc_title}</h2>
        <ul class="toc">'''

    for i, chapter_title in enumerate(standard['chapters'], 1):
        html += f'''
            <li>
                <a href="chapter-{i:02d}.html">
                    <span class="chapter-number">{chapter_prefix}{i}{chapter_suffix}</span>
                    {chapter_title}
                </a>
            </li>'''

    html += f'''
        </ul>

        <div class="footer">
            <p><strong>WIA (World Industry Association) Standards</strong></p>
            <p>© 2025 SmileStory Inc. / WIA</p>
            <p>Published: 2025-12-27 | Version: 1.0.0</p>
            <p style="margin-top: 1rem;">
                <a href="../../spec/{standard['id']}-v1.0.md" style="color: var(--primary); text-decoration: none;">
                    View Full Specification →
                </a>
            </p>
        </div>
    </div>
</body>
</html>'''

    return html

# Generate index files for all standards
for standard_key in STANDARDS:
    base_path = f"/home/user/wia-standards/standards/{standard_key}/ebook"

    # English index
    en_content = generate_index_html(standard_key, "en")
    en_filepath = f"{base_path}/en/index.html"
    with open(en_filepath, 'w', encoding='utf-8') as f:
        f.write(en_content)
    print(f"Created {en_filepath} ({len(en_content.encode('utf-8'))} bytes)")

    # Korean index
    ko_content = generate_index_html(standard_key, "ko")
    ko_filepath = f"{base_path}/ko/index.html"
    with open(ko_filepath, 'w', encoding='utf-8') as f:
        f.write(ko_content)
    print(f"Created {ko_filepath} ({len(ko_content.encode('utf-8'))} bytes)")

print("\nAll index files generated successfully!")
