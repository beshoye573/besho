/* مرجع تعليمي محدود بأمثلة محلية أو وصفية غير موجهة لأنظمة خارجية. */
window.hackingCategories = [
    {
        id: 'linux', title: 'Linux الأساسية', icon: 'fa-brands fa-linux', items: [
            { name: 'عرض الملفات', description: 'استعرض ملفات مجلدك الحالي مع تفاصيل الصلاحيات والملفات المخفية.', code: 'ls -lah', level: 'مبتدئ', tone: 'beginner', example: 'مفيد لمراجعة ملفات مشروعك المحلي.' },
            { name: 'تغيير المجلد', description: 'انتقل بين مجلدات المستخدم، واستخدم مسارات مطلقة عند الحاجة.', code: 'cd ~/projects', level: 'مبتدئ', tone: 'beginner', example: 'انتقال إلى مجلد مشاريع المستخدم.' },
            { name: 'صلاحيات الملفات', description: 'افحص الصلاحيات أولًا، وامنح أقل قدر لازم من الوصول.', code: 'chmod 640 notes.txt', level: 'مبتدئ', tone: 'beginner', example: 'المالك قراءة وكتابة، والمجموعة قراءة فقط.' },
            { name: 'البحث داخل ملف', description: 'ابحث عن نص في سجل محلي تملكه، وتجنب مشاركة البيانات الحساسة.', code: 'grep -n "ERROR" app.log', level: 'مبتدئ', tone: 'beginner', example: 'يعرض أرقام الأسطر التي تحتوي ERROR.' },
            { name: 'البحث عن ملفات', description: 'حدد ملفاتك بحسب الاسم داخل مجلد مشروعك فقط.', code: 'find ./project -type f -name "*.conf"', level: 'مبتدئ', tone: 'beginner', example: 'بحث محلي عن ملفات إعداد ضمن المشروع.' },
            { name: 'العمليات المحلية', description: 'راجع العمليات التي تعمل على جهازك لتشخيص الموارد.', code: 'ps aux', level: 'مبتدئ', tone: 'beginner', example: 'يعرض العمليات المحلية ومعلوماتها.' }
        ]
    },
    {
        id: 'network', title: 'الشبكات محليًا', icon: 'fa-solid fa-network-wired', items: [
            { name: 'اختبار loopback', description: 'تحقق من أن مكدس الشبكة المحلي يعمل على جهازك.', code: 'ping -c 4 127.0.0.1', level: 'مبتدئ', tone: 'beginner', example: 'يرسل أربع حزم إلى عنوان loopback الخاص بجهازك.' },
            { name: 'مسار الاتصال', description: 'تعرّف على أداة تتبع المسار؛ استخدمها فقط على وجهة تملكها أو مصرح بها.', code: 'traceroute 127.0.0.1', level: 'مبتدئ', tone: 'beginner', example: 'المسار المحلي لا يتصل بهدف خارجي.' },
            { name: 'فحص خدمة محلية', description: 'استخدم Nmap على loopback فقط للتعرف إلى خدمة محلية بدأتَها بنفسك.', code: 'nmap -sT -p 8000 127.0.0.1', level: 'متوسط', tone: 'intermediate', example: 'تحقق من منفذ خادم تطوير محلي على جهازك.' },
            { name: 'معلومات الاتصال', description: 'اعرض المقابس المفتوحة على جهازك من دون الاتصال بأجهزة أخرى.', code: 'ss -lnt', level: 'مبتدئ', tone: 'beginner', example: 'يعرض منافذ TCP التي تستمع محليًا.' }
        ]
    },
    {
        id: 'nmap', title: 'Nmap', icon: 'fa-solid fa-magnifying-glass-chart', items: [
            { name: 'فحص loopback المحدود', description: 'تعرّف إلى نتيجة فحص TCP على عنوان loopback لجهازك فقط.', code: 'nmap -sT -p 8000 127.0.0.1', level: 'متوسط', tone: 'intermediate', example: 'شغّل خادمًا محليًا تملكه على المنفذ 8000 قبل الفحص.' },
            { name: 'قراءة المساعدة', description: 'راجع الخيارات الرسمية محليًا بدل نسخ أوامر لا تفهم أثرها.', code: 'nmap --help', level: 'مبتدئ', tone: 'beginner', example: 'يعرض ملخص خيارات الأداة المثبتة.' },
            { name: 'متى نستخدم الفحص؟', description: 'ضمن تقييم مصرح به، وثّق العناوين والمنافذ المسموحة ومعدل الطلبات.', code: 'النطاق المكتوب → فحص محدود → توثيق النتيجة', level: 'مفاهيم', tone: 'intermediate', example: 'لا تفحص شبكات عامة أو عناوين لا تملك تصريحًا بشأنها.' }
        ]
    },
    {
        id: 'metasploit', title: 'Metasploit', icon: 'fa-solid fa-bug-slash', items: [
            { name: 'واجهة المساعدة', description: 'تصفح أوامر إطار العمل للتعلم من دون تشغيل وحدات ضد هدف.', code: 'msfconsole -q', level: 'متوسط', tone: 'intermediate', example: 'ابدأ الواجهة التفاعلية في مختبر محلي؛ اكتفِ بالمساعدة والاستكشاف.' },
            { name: 'البحث في التوثيق المحلي', description: 'تعرف إلى أسماء الوحدات وبياناتها الوصفية. لا تشغّل استغلالًا.', code: 'help', level: 'مبتدئ', tone: 'beginner', example: 'داخل وحدة التحكم، اطلب قائمة الأوامر المتاحة.' },
            { name: 'منهجية المختبر', description: 'استخدم صورة تدريبية معزولة مصممة عمدًا للاختبار، وخذ لقطة استعادة.', code: 'مختبر معزول + تصريح + نسخة احتياطية', level: 'مفاهيم', tone: 'advanced', example: 'لا توجّه وحدات الاستغلال إلى أجهزة حقيقية أو عامة.' }
        ]
    },
    {
        id: 'passwords', title: 'Hydra / John the Ripper', icon: 'fa-solid fa-key', items: [
            { name: 'مبادئ التحقق', description: 'اختبر سياساتك على بيانات اصطناعية تملكها. لا تجمع كلمات مرور أشخاص أو تعِد استخدامها.', code: 'طول كافٍ + مدير كلمات مرور + MFA', level: 'مبتدئ', tone: 'beginner', example: 'فعّل المصادقة متعددة العوامل للحسابات المهمة.' },
            { name: 'John the Ripper', description: 'أداة تدقيق اعتماديات حساسة. اقتصر على تجزئات اختبار اصطناعية وبموافقة صريحة؛ لا نقدّم أوامر كسر أو قوائم تخمين.', code: 'التدقيق الدفاعي: سياسة مكتوبة + بيانات اصطناعية + حذف آمن', level: 'حساس', tone: 'advanced', example: 'تعلّم تخزين كلمات المرور بتجزئة مملحة وبطيئة مثل Argon2id.' },
            { name: 'Hydra', description: 'أداة قد تُستخدم لإساءة محاولة تسجيل الدخول؛ لا تستخدمها ضد خدمات حقيقية. ركّز على ضوابط الحد من المحاولات.', code: 'دفاع: MFA + تحديد المعدل + تنبيه المحاولات الفاشلة', level: 'حساس', tone: 'advanced', example: 'تحقق من إعدادات تطبيقك محليًا عبر اختبارات الوحدة.' }
        ]
    },
    {
        id: 'hashcat', title: 'Hashcat', icon: 'fa-solid fa-fingerprint', items: [
            { name: 'تدقيق التجزئات بأمان', description: 'أداة تدقيق حساسة؛ استخدم بيانات اصطناعية تملكها وموافقة موثقة. لا نقدّم أوامر كسر أو قوائم تخمين.', code: 'بيانات وهمية + موافقة مكتوبة + حذف آمن', level: 'حساس', tone: 'advanced', example: 'ركّز على تخزين كلمات المرور بتجزئة مملحة وبطيئة مثل Argon2id.' },
            { name: 'تقوية تخزين كلمات المرور', description: 'استخدم مكتبة موثوقة وخوارزمية مخصصة لكلمات المرور مع salt فريد لكل حساب.', code: 'Argon2id أو scrypt + salt فريد لكل مستخدم', level: 'دفاع', tone: 'beginner', example: 'راجع توصيات OWASP لتخزين كلمات المرور.' }
        ]
    },
    {
        id: 'burp', title: 'Burp Suite', icon: 'fa-solid fa-spider', items: [
            { name: 'وكيل اعتراض محلي', description: 'تعرّف إلى وسيط HTTP مع تطبيق تدريبي محلي أو PortSwigger Web Security Academy.', code: 'المتصفح → Proxy محلي → تطبيق تدريبي', level: 'متوسط', tone: 'intermediate', example: 'استخدم نطاقًا تدريبيًا مصرحًا به، ولا تعترض حركة مستخدمين آخرين.' },
            { name: 'مراجعة الطلبات', description: 'افهم الطرق والرؤوس والكوكيز، واحجب الرموز السرية قبل حفظ أي طلب.', code: 'مراجعة يدوية → ملاحظة → إصلاح → إعادة تحقق', level: 'مفاهيم', tone: 'intermediate', example: 'لا تشارك ملفات الجلسات أو بيانات الدخول.' }
        ]
    },
    {
        id: 'sqli', title: 'حقن SQL والدفاع', icon: 'fa-solid fa-database', items: [
            { name: 'المشكلة: بناء الاستعلام بالنص', description: 'دمج مدخل المستخدم داخل SQL قد يغير معنى الاستعلام ويكشف بيانات.', code: 'خطر: "SELECT ... WHERE name = \'" + input + "\'"', level: 'مفاهيم', tone: 'advanced', example: 'تجنب بناء الاستعلام من نصوص غير موثوقة.' },
            { name: 'الحل: استعلام معلّم', description: 'استخدم معاملات مربوطة عبر مكتبة قاعدة البيانات؛ لا تضع مدخل المستخدم في صيغة SQL.', code: 'cursor.execute("SELECT id FROM users WHERE name = ?", (name,))', level: 'دفاع', tone: 'beginner', example: 'صيغة placeholder تختلف حسب محرك قاعدة البيانات ومكتبته.' },
            { name: 'اختبار آمن', description: 'اكتب اختبار وحدة بمدخلات اصطناعية وتحقق أن التطبيق يعاملها بيانات لا تعليمات.', code: 'اختبار محلي + قاعدة بيانات تجريبية + بيانات وهمية', level: 'دفاع', tone: 'intermediate', example: 'لا تختبر قاعدة بيانات إنتاجية دون خطة وتصريح.' }
        ]
    },
    {
        id: 'xss', title: 'XSS والدفاع', icon: 'fa-solid fa-code', items: [
            { name: 'السياق مهم', description: 'ينشأ XSS عندما يُعرض محتوى غير موثوق كتعليمات في سياق HTML أو JavaScript.', code: 'مدخل غير موثوق → ترميز ملائم للسياق → عرض آمن', level: 'مفاهيم', tone: 'intermediate', example: 'الترميز يختلف بين نص HTML وخصائص HTML وJavaScript.' },
            { name: 'الترميز الآمن', description: 'استخدم قوالب وإطارات عمل تقوم بترميز النص افتراضيًا، ولا تستخدم إدراج HTML الخام.', code: 'element.textContent = untrustedValue;', level: 'دفاع', tone: 'beginner', example: 'textContent يعرض القيمة كنص لا كعنصر HTML.' },
            { name: 'طبقات حماية إضافية', description: 'استخدم سياسة CSP مناسبة، وراجع نقاط إدراج HTML يدويًا داخل تطبيقك.', code: 'ترميز المخرجات + CSP + مراجعة DOM', level: 'دفاع', tone: 'intermediate', example: 'السياسة طبقة إضافية وليست بديلًا للترميز.' }
        ]
    },
    {
        id: 'wireshark', title: 'Wireshark', icon: 'fa-solid fa-water', items: [
            { name: 'حركة loopback', description: 'التقط حركة تطبيق محلي تملكه فقط؛ انتبه إلى البيانات الشخصية والرموز السرية.', code: 'واجهة loopback / lo ثم فلتر dns', level: 'مبتدئ', tone: 'beginner', example: 'اختبر التقاط طلب DNS تجريبي داخل جهازك.' },
            { name: 'فلاتر عرض آمنة', description: 'فلاتر للتعلم من ملف التقاط اصطناعي أو اتصال جهازك المحلي.', code: 'dns  |  tcp.port == 8000  |  ip.addr == 127.0.0.1', level: 'متوسط', tone: 'intermediate', example: 'فلاتر عرض فقط؛ اختر ملفًا تملكه ولا تلتقط شبكة عامة.' }
        ]
    },
    {
        id: 'wireless', title: 'أمان Wi-Fi', icon: 'fa-solid fa-wifi', items: [
            { name: 'Aircrack-ng: سياق الاستخدام', description: 'أدوات لاسلكية مزدوجة الاستخدام؛ لا نقدّم خطوات التقاط أو كسر مفاتيح. تدرب فقط على نقطة وصول مختبرية تملكها.', code: 'دفاع: WPA2-AES أو WPA3 + كلمة مرور فريدة + تحديث الراوتر', level: 'حساس', tone: 'advanced', example: 'عطّل WPS عند عدم الحاجة إليه وراجع الأجهزة المتصلة.' },
            { name: 'مراجعة إعداد الراوتر', description: 'قلّل سطح الهجوم بتحديث البرنامج الثابت واستخدام شبكة ضيوف للأجهزة غير الموثوقة.', code: 'Firmware حديث + WPA3 + شبكة ضيوف', level: 'دفاع', tone: 'beginner', example: 'راجع دليل الشركة المصنّعة لإعداد جهازك.' }
        ]
    },
    {
        id: 'osint', title: 'OSINT والاستطلاع المسؤول', icon: 'fa-solid fa-binoculars', items: [
            { name: 'theHarvester / Maltego', description: 'منصات لاستكشاف بيانات عامة؛ الاستخدام مقيد بنطاق مصرح به مع مراعاة شروط الخدمة والخصوصية.', code: 'مصادر عامة + نطاق مكتوب + تقليل البيانات', level: 'حساس', tone: 'intermediate', example: 'استخدم نطاقًا تدريبيًا تملكه ولا تجمع معلومات شخصية للأفراد.' },
            { name: 'Sherlock', description: 'قد يبحث عن أسماء مستخدمين عبر منصات عامة، ما يثير مخاطر الخصوصية. لا تستخدمه لتتبع أشخاص.', code: 'تعلّم التحقق من المصدر دون بناء ملفات شخصية', level: 'حساس', tone: 'advanced', example: 'استخدم بيانات وهمية ضمن درس عن الخصوصية والمخاطر.' },
            { name: 'قائمة تحقق للنطاق', description: 'حدد الجهة المالكة والهدف والغرض والاحتفاظ بالبيانات قبل أي جمع للمعلومات.', code: 'موافقة مكتوبة → نطاق محدد → أقل بيانات لازمة', level: 'دفاع', tone: 'beginner', example: 'أوقف العمل واحذف البيانات إذا تجاوز الجمع ما تسمح به الموافقة.' }
        ]
    }
];

(() => {
    const nav = document.querySelector('[data-hack-nav]');
    const content = document.querySelector('[data-hack-content]');
    if (!nav || !content) return;
    const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
    const idSlug = (value) => value.replace(/[^a-z0-9-]/gi, '-');
    window.hackingCategories.forEach((category, categoryIndex) => {
        const sectionId = `category-${category.id}`;
        const navButton = document.createElement('button');
        navButton.type = 'button';
        navButton.dataset.categoryTarget = sectionId;
        navButton.classList.toggle('active', categoryIndex === 0);
        navButton.innerHTML = `<i class="${escapeHtml(category.icon)}" aria-hidden="true"></i><span>${escapeHtml(category.title)}</span>`;
        nav.append(navButton);
        const section = document.createElement('section');
        section.className = 'hack-category';
        section.id = sectionId;
        section.innerHTML = `<div class="category-heading"><h2>${escapeHtml(category.title)}</h2><span>${String(category.items.length).padStart(2, '0')} / REF</span></div>`;
        category.items.forEach((item, itemIndex) => {
            const code = escapeHtml(item.code);
            const name = escapeHtml(item.name);
            const card = document.createElement('article');
            card.className = 'command-card';
            card.dataset.search = `${item.name} ${item.description} ${category.title} ${item.example}`;
            card.innerHTML = `<div class="command-top"><h3>${name}</h3><span class="badge badge-${escapeHtml(item.tone)}">${escapeHtml(item.level)}</span></div><p>${escapeHtml(item.description)}</p><div class="command-example"><code id="${idSlug(category.id)}-${itemIndex}">${code}</code><button class="copy-button" type="button" data-copy="${escapeHtml(item.code)}" aria-label="نسخ مثال: ${name}">نسخ <i class="fa-regular fa-copy" aria-hidden="true"></i></button></div><div class="example-note"><strong>مثال / ملاحظة:</strong> ${escapeHtml(item.example)}</div>`;
            section.append(card);
        });
        content.append(section);
    });
    document.querySelector('[data-result-count]').textContent = `${window.hackingCategories.reduce((total, category) => total + category.items.length, 0)} نتيجة`;
})();
