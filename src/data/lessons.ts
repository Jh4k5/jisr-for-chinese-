export interface Lesson {
  id: number;
  title: string;
  titleZh: string;
  description: string;
  vocabularyIds: string[];
  grammarIds: string[];
  keySentences: { chinese: string; pinyin: string; arabic: string }[];
  conversations: {
    scene: string;
    speakers: string[];
    lines: { speaker: string; chinese: string; pinyin: string; arabic: string }[];
  }[];
  exercises: {
    type: "multiple_choice" | "fill_blank" | "translate" | "tone";
    question: string;
    options?: string[];
    answer: string | string[];
    explanation?: string;
  }[];
}

export const lessons: Lesson[] = [
  {
    id: 1,
    title: "التحية والتعارف",
    titleZh: "问候与介绍",
    description: "تعلم أساسيات التحية والتعريف بالنفس",
    vocabularyIds: ["1", "2", "3", "4", "5", "6", "7", "8", "61", "62", "63", "99", "100"],
    grammarIds: ["1", "2", "3"],
    keySentences: [
      { chinese: "你好！", pinyin: "Nǐ hǎo!", arabic: "مرحبا!" },
      { chinese: "我是学生。", pinyin: "Wǒ shì xuésheng.", arabic: "أنا طالب." },
      { chinese: "你叫什么名字？", pinyin: "Nǐ jiào shénme míngzi?", arabic: "ما اسمك؟" },
      { chinese: "很高兴认识你。", pinyin: "Hěn gāoxìng rènshi nǐ.", arabic: "سررت بلقائك." },
    ],
    conversations: [
      {
        scene: "في المدرسة",
        speakers: ["علي", "ليلى"],
        lines: [
          { speaker: "علي", chinese: "你好，我是阿里。", pinyin: "Nǐ hǎo, wǒ shì Ālǐ.", arabic: "مرحبا، أنا علي." },
          { speaker: "ليلى", chinese: "你好，我叫李丽。很高兴认识你。", pinyin: "Nǐ hǎo, wǒ jiào Lǐ Lì. Hěn gāoxìng rènshi nǐ.", arabic: "مرحبا، اسمي لي لي. سررت بلقائك." },
          { speaker: "علي", chinese: "也很高兴认识你。你是学生吗？", pinyin: "Yě hěn gāoxìng rènshi nǐ. Nǐ shì xuésheng ma?", arabic: "وأنا أيضاً سعيد بلقائك. هل أنت طالبة؟" },
          { speaker: "ليلى", chinese: "是的，我是学生。你呢？", pinyin: "Shì de, wǒ shì xuésheng. Nǐ ne?", arabic: "نعم، أنا طالبة. وأنت؟" },
        ],
      },
    ],
    exercises: [
      {
        type: "multiple_choice",
        question: "ما معنى '你好'؟",
        options: ["مرحبا", "مع السلامة", "شكراً", "من فضلك"],
        answer: "مرحبا",
      },
      {
        type: "fill_blank",
        question: "____是学生。",
        answer: "我",
        explanation: "أنا طالب",
      },
      {
        type: "translate",
        question: "أنا صيني",
        answer: "我是中国人。",
      },
    ],
  },
  {
    id: 2,
    title: "الأشياء والأماكن",
    titleZh: "事物与地点",
    description: "تعلم كيف تسأل عن الأشياء والأماكن",
    vocabularyIds: ["10", "11", "12", "13", "14", "15", "64", "65", "66"],
    grammarIds: ["4", "5", "6"],
    keySentences: [
      { chinese: "这是什么？", pinyin: "Zhè shì shénme?", arabic: "ما هذا؟" },
      { chinese: "那是谁的书？", pinyin: "Nà shì shéi de shū?", arabic: "كتاب من ذلك؟" },
      { chinese: "哪一个是你的？", pinyin: "Nǎ yí ge shì nǐ de?", arabic: "أي واحد هو لك؟" },
      { chinese: "你几岁？", pinyin: "Nǐ jǐ suì?", arabic: "كم عمرك؟" },
    ],
    conversations: [
      {
        scene: "في المكتبة",
        speakers: ["سارة", "أحمد"],
        lines: [
          { speaker: "سارة", chinese: "这是什么？", pinyin: "Zhè shì shénme?", arabic: "ما هذا؟" },
          { speaker: "أحمد", chinese: "这是一本中文书。", pinyin: "Zhè shì yì běn Zhōngwén shū.", arabic: "هذا كتاب صيني." },
          { speaker: "سارة", chinese: "那是什么？", pinyin: "Nà shì shénme?", arabic: "ما ذلك؟" },
          { speaker: "أحمد", chinese: "那是字典。", pinyin: "Nà shì zìdiǎn.", arabic: "ذلك قاموس." },
        ],
      },
    ],
    exercises: [
      {
        type: "multiple_choice",
        question: "'这是什么' تعني:",
        options: ["ما هذا؟", "من هذا؟", "أين هذا؟", "متى هذا؟"],
        answer: "ما هذا؟",
      },
      {
        type: "fill_blank",
        question: "____是你的？",
        answer: "哪个",
      },
    ],
  },
  {
    id: 3,
    title: "الممتلكات والوجود",
    titleZh: "所有与存在",
    description: "التعبير عن الملكية والوجود",
    vocabularyIds: ["16", "17", "18", "19", "67", "68", "69"],
    grammarIds: ["7", "8", "9"],
    keySentences: [
      { chinese: "我有一本书。", pinyin: "Wǒ yǒu yì běn shū.", arabic: "لدي كتاب." },
      { chinese: "他没有时间。", pinyin: "Tā méiyǒu shíjiān.", arabic: "ليس لديه وقت." },
      { chinese: "你去哪里？", pinyin: "Nǐ qù nǎlǐ?", arabic: "إلى أين تذهب؟" },
      { chinese: "他来了。", pinyin: "Tā lái le.", arabic: "جاء." },
    ],
    conversations: [
      {
        scene: "في البيت",
        speakers: ["محمد", "فاطمة"],
        lines: [
          { speaker: "محمد", chinese: "你有手机吗？", pinyin: "Nǐ yǒu shǒujī ma?", arabic: "هل لديك هاتف محمول؟" },
          { speaker: "فاطمة", chinese: "有，我有两个手机。", pinyin: "Yǒu, wǒ yǒu liǎng ge shǒujī.", arabic: "نعم، لدي هاتفان محمولان." },
          { speaker: "محمد", chinese: "能借我一个吗？", pinyin: "Néng jiè wǒ yí ge ma?", arabic: "هل يمكنك إعارتني واحداً؟" },
        ],
      },
    ],
    exercises: [
      {
        type: "multiple_choice",
        question: "'没有' تعني:",
        options: ["لدي", "ليس لدي", "أريد", "أحتاج"],
        answer: "ليس لدي",
      },
      {
        type: "fill_blank",
        question: "我去____。",
        answer: ["学校", "北京", "家"],
      },
    ],
  },
  {
    id: 4,
    title: "الأكل والشرب",
    titleZh: "吃与喝",
    description: "تعلم كلمات الطعام والشراب",
    vocabularyIds: ["20", "21", "22", "23", "70"],
    grammarIds: ["10", "11", "12"],
    keySentences: [
      { chinese: "我想吃饭。", pinyin: "Wǒ xiǎng chī fàn.", arabic: "أريد أن آكل." },
      { chinese: "请喝水。", pinyin: "Qǐng hē shuǐ.", arabic: "اشرب الماء من فضلك." },
      { chinese: "你在看什么？", pinyin: "Nǐ zài kàn shénme?", arabic: "ماذا تنظر؟" },
      { chinese: "我喜欢听音乐。", pinyin: "Wǒ xǐhuan tīng yīnyuè.", arabic: "أحب الاستماع للموسيقى." },
    ],
    conversations: [
      {
        scene: "في المطعم",
        speakers: ["عمر", "النادل"],
        lines: [
          { speaker: "عمر", chinese: "我想吃饭。", pinyin: "Wǒ xiǎng chī fàn.", arabic: "أريد أن آكل." },
          { speaker: "النادل", chinese: "你想吃什么？", pinyin: "Nǐ xiǎng chī shénme?", arabic: "ماذا تريد أن تأكل؟" },
          { speaker: "عمر", chinese: "我想吃中国菜。", pinyin: "Wǒ xiǎng chī Zhōngguó cài.", arabic: "أريد أن آكل طعاماً صينياً." },
          { speaker: "النادل", chinese: "好的，请等十分钟。", pinyin: "Hǎo de, qǐng děng shí fēnzhōng.", arabic: "حسناً، انتظر عشر دقائق من فضلك." },
        ],
      },
    ],
    exercises: [
      {
        type: "multiple_choice",
        question: "'吃' تعني:",
        options: ["يشرب", "يأكل", "ينظر", "يسمع"],
        answer: "يأكل",
      },
    ],
  },
  {
    id: 5,
    title: "التحدث والقراءة",
    titleZh: "说与读",
    description: "التعبيرات المتعلقة بالتحدث والقراءة",
    vocabularyIds: ["24", "25", "26", "27", "71", "72", "73", "74", "75"],
    grammarIds: ["13", "14"],
    keySentences: [
      { chinese: "你会说中文吗？", pinyin: "Nǐ huì shuō Zhōngwén ma?", arabic: "هل تتحدث الصينية؟" },
      { chinese: "我在读书。", pinyin: "Wǒ zài dú shū.", arabic: "أنا أقرأ كتاباً." },
      { chinese: "请写下你的名字。", pinyin: "Qǐng xiě xià nǐ de míngzi.", arabic: "اكتب اسمك من فضلك." },
      { chinese: "今天天气很好。", pinyin: "Jīntiān tiānqì hěn hǎo.", arabic: "الطقس اليوم جميل." },
    ],
    conversations: [
      {
        scene: "في الفصل",
        speakers: ["المعلم", "الطالب"],
        lines: [
          { speaker: "المعلم", chinese: "你会写这个汉字吗？", pinyin: "Nǐ huì xiě zhège Hànzì ma?", arabic: "هل تستطيع كتابة هذا الحرف الصيني؟" },
          { speaker: "الطالب", chinese: "会，我会写。", pinyin: "Huì, wǒ huì xiě.", arabic: "نعم، أستطيع كتابته." },
          { speaker: "المعلم", chinese: "请读这个句子。", pinyin: "Qǐng dú zhège jùzi.", arabic: "اقرأ هذه الجملة من فضلك." },
        ],
      },
    ],
    exercises: [
      {
        type: "translate",
        question: "أنا أتعلم الصينية",
        answer: "我学中文。",
      },
    ],
  },
  {
    id: 6,
    title: "الرغبة والقدرة",
    titleZh: "想与会",
    description: "التعبير عن الرغبة والقدرة",
    vocabularyIds: ["28", "29", "30", "31", "76", "77", "78"],
    grammarIds: ["15", "16", "17"],
    keySentences: [
      { chinese: "我想去中国。", pinyin: "Wǒ xiǎng qù Zhōngguó.", arabic: "أريد الذهاب إلى الصين." },
      { chinese: "你会说英语吗？", pinyin: "Nǐ huì shuō Yīngyǔ ma?", arabic: "هل تتحدث الإنجليزية؟" },
      { chinese: "你能帮我吗？", pinyin: "Nǐ néng bāng wǒ ma?", arabic: "هل يمكنك مساعدتي؟" },
      { chinese: "明天会下雨。", pinyin: "Míngtiān huì xià yǔ.", arabic: "سيهطل المطر غداً." },
    ],
    conversations: [
      {
        scene: "في السوق",
        speakers: ["الزبون", "البائع"],
        lines: [
          { speaker: "الزبون", chinese: "我想要这个。", pinyin: "Wǒ xiǎng yào zhège.", arabic: "أريد هذا." },
          { speaker: "البائع", chinese: "你要几个？", pinyin: "Nǐ yào jǐ ge?", arabic: "كم واحداً تريد؟" },
          { speaker: "الزبون", chinese: "我要三个。总共多少钱？", pinyin: "Wǒ yào sān ge. Zǒnggòng duōshao qián?", arabic: "أريد ثلاثة. بكم المجموع؟" },
        ],
      },
    ],
    exercises: [
      {
        type: "fill_blank",
        question: "你__说中文吗？",
        answer: "会",
      },
    ],
  },
  {
    id: 7,
    title: "المشاعر والمواقف",
    titleZh: "喜欢与知道",
    description: "التعبير عن المشاعر والمعرفة",
    vocabularyIds: ["32", "33", "34", "35", "79"],
    grammarIds: ["18", "19"],
    keySentences: [
      { chinese: "我喜欢学习中文。", pinyin: "Wǒ xǐhuan xuéxí Zhōngwén.", arabic: "أحب تعلم الصينية." },
      { chinese: "我知道他在哪里。", pinyin: "Wǒ zhīdào tā zài nǎlǐ.", arabic: "أعرف أين هو." },
      { chinese: "他在做什么？", pinyin: "Tā zài zuò shénme?", arabic: "ماذا يفعل؟" },
      { chinese: "现在几点？", pinyin: "Xiànzài jǐ diǎn?", arabic: "كم الساعة الآن؟" },
    ],
    conversations: [
      {
        scene: "بين الأصدقاء",
        speakers: ["خالد", "سامي"],
        lines: [
          { speaker: "خالد", chinese: "你喜欢做运动吗？", pinyin: "Nǐ xǐhuan zuò yùndòng ma?", arabic: "هل تحب ممارسة الرياضة؟" },
          { speaker: "سامي", chinese: "喜欢，我喜欢打篮球。你呢？", pinyin: "Xǐhuan, wǒ xǐhuan dǎ lánqiú. Nǐ ne?", arabic: "نعم، أحب لعب كرة السلة. وأنت؟" },
          { speaker: "خالد", chinese: "我喜欢游泳。你知道游泳馆在哪里吗？", pinyin: "Wǒ xǐhuan yóuyǒng. Nǐ zhīdào yóuyǒngguǎn zài nǎlǐ ma?", arabic: "أحب السباحة. هل تعرف أين مسبح السباحة؟" },
        ],
      },
    ],
    exercises: [
      {
        type: "multiple_choice",
        question: "'喜欢' تعني:",
        options: ["يكره", "يحب", "يريد", "يعرف"],
        answer: "يحب",
      },
    ],
  },
  {
    id: 8,
    title: "العمل والتسوق",
    titleZh: "工作与购物",
    description: "كلمات العمل والبيع والشراء",
    vocabularyIds: ["36", "37", "38", "80", "81", "82", "83"],
    grammarIds: ["20", "21"],
    keySentences: [
      { chinese: "我在工作。", pinyin: "Wǒ zài gōngzuò.", arabic: "أنا أعمل." },
      { chinese: "我想买一本书。", pinyin: "Wǒ xiǎng mǎi yì běn shū.", arabic: "أريد شراء كتاب." },
      { chinese: "这里卖水果吗？", pinyin: "Zhèlǐ mài shuǐguǒ ma?", arabic: "هل يباع هنا فواكه؟" },
      { chinese: "以前我不学中文。", pinyin: "Yǐqián wǒ bù xué Zhōngwén.", arabic: "لم أكن أتعلم الصينية من قبل." },
    ],
    conversations: [
      {
        scene: "في المتجر",
        speakers: ["المشتري", "البائع"],
        lines: [
          { speaker: "المشتري", chinese: "请问，这个多少钱？", pinyin: "Qǐngwèn, zhège duōshao qián?", arabic: "من فضلك، بكم هذا؟" },
          { speaker: "البائع", chinese: "这个五十块钱。", pinyin: "Zhège wǔshí kuài qián.", arabic: "هذا بخمسين يوان." },
          { speaker: "المشتري", chinese: "太贵了。能便宜一点吗？", pinyin: "Tài guì le. Néng piányi yìdiǎn ma?", arabic: "غالي جداً. هل يمكن أن يكون أرخص قليلاً؟" },
        ],
      },
    ],
    exercises: [
      {
        type: "fill_blank",
        question: "我想____一本书。",
        answer: "买",
      },
    ],
  },
  {
    id: 9,
    title: "الصفات: الحجم والكمية",
    titleZh: "大小与多少",
    description: "الصفات المتعلقة بالحجم والكمية",
    vocabularyIds: ["39", "40", "41", "42", "84", "85", "86"],
    grammarIds: ["22", "23"],
    keySentences: [
      { chinese: "这个房间很大。", pinyin: "Zhège fángjiān hěn dà.", arabic: "هذه الغرفة كبيرة جداً." },
      { chinese: "人很少。", pinyin: "Rén hěn shǎo.", arabic: "الناس قليلون." },
      { chinese: "上午我很忙。", pinyin: "Shàngwǔ wǒ hěn máng.", arabic: "أنا مشغول جداً في الصباح." },
      { chinese: "请等五分钟。", pinyin: "Qǐng děng wǔ fēnzhōng.", arabic: "انتظر خمس دقائق من فضلك." },
    ],
    conversations: [
      {
        scene: "في المكتب",
        speakers: ["المدير", "الموظف"],
        lines: [
          { speaker: "المدير", chinese: "今天你忙不忙？", pinyin: "Jīntiān nǐ máng bú máng?", arabic: "هل أنت مشغول اليوم؟" },
          { speaker: "الموظف", chinese: "上午很忙，下午有时间。", pinyin: "Shàngwǔ hěn máng, xiàwǔ yǒu shíjiān.", arabic: "الصباح مشغول جداً، بعد الطلب لدي وقت." },
          { speaker: "المدير", chinese: "好的，下午我们开会。", pinyin: "Hǎo de, xiàwǔ wǒmen kāihuì.", arabic: "حسناً، سنلتقي بعد الظهر." },
        ],
      },
    ],
    exercises: [
      {
        type: "multiple_choice",
        question: "عكس '大' هو:",
        options: ["小", "多", "高", "新"],
        answer: "小",
      },
    ],
  },
  {
    id: 10,
    title: "الصفات المادية",
    titleZh: "高矮新旧",
    description: "الصفات المتعلقة بالارتفاع والجدة",
    vocabularyIds: ["43", "44", "45", "46", "87", "88"],
    grammarIds: ["24"],
    keySentences: [
      { chinese: "他很高。", pinyin: "Tā hěn gāo.", arabic: "هو طويل جداً." },
      { chinese: "这是一本新书。", pinyin: "Zhè shì yì běn xīn shū.", arabic: "هذا كتاب جديد." },
      { chinese: "这辆自行车是旧的。", pinyin: "Zhè liàng zìxíngchē shì jiù de.", arabic: "هذه الدراجة قديمة." },
      { chinese: "我等了一个小时。", pinyin: "Wǒ děng le yí ge xiǎoshí.", arabic: "انتظرت ساعة." },
    ],
    conversations: [
      {
        scene: "في متجر السيارات",
        speakers: ["المشتري", "البائع"],
        lines: [
          { speaker: "المشتري", chinese: "这辆车是新的吗？", pinyin: "Zhè liàng chē shì xīn de ma?", arabic: "هل هذه السيارة جديدة؟" },
          { speaker: "البائع", chinese: "是的，这是新车。", pinyin: "Shì de, zhè shì xīn chē.", arabic: "نعم، هذه سيارة جديدة." },
          { speaker: "المشتري", chinese: "那辆呢？", pinyin: "Nà liàng ne?", arabic: "وتلك؟" },
          { speaker: "البائع", chinese: "那辆是旧的，比较便宜。", pinyin: "Nà liàng shì jiù de, bǐjiào piányi.", arabic: "تلك قديمة، أرخص نسبياً." },
        ],
      },
    ],
    exercises: [
      {
        type: "fill_blank",
        question: "这本书很____。",
        answer: ["新", "旧", "好", "大"],
      },
    ],
  },
  {
    id: 11,
    title: "السرعة والوقت",
    titleZh: "快慢与时间",
    description: "التعبير عن السرعة والوقت",
    vocabularyIds: ["47", "48", "49", "50", "89", "90"],
    grammarIds: ["25"],
    keySentences: [
      { chinese: "请慢一点说。", pinyin: "Qǐng màn yìdiǎn shuō.", arabic: "تحدث ببطء من فضلك." },
      { chinese: "他跑得很快。", pinyin: "Tā pǎo de hěn kuài.", arabic: "يركض بسرعة كبيرة." },
      { chinese: "我喜欢吃水果。", pinyin: "Wǒ xǐhuan chī shuǐguǒ.", arabic: "أحب أكل الفواكه." },
      { chinese: "吃饭吧。", pinyin: "Chī fàn ba.", arabic: "لنتناول الطعام." },
    ],
    conversations: [
      {
        scene: "بين الأصدقاء",
        speakers: ["هدى", "نور"],
        lines: [
          { speaker: "هدى", chinese: "你喜欢什么水果？", pinyin: "Nǐ xǐhuan shénme shuǐguǒ?", arabic: "ما الفاكهة التي تحبها؟" },
          { speaker: "نور", chinese: "我喜欢苹果和香蕉。", pinyin: "Wǒ xǐhuan píngguǒ hé xiāngjiāo.", arabic: "أحب التفح والموز." },
          { speaker: "هدى", chinese: "今天我们一起去买水果吧。", pinyin: "Jīntiān wǒmen yìqǐ qù mǎi shuǐguǒ ba.", arabic: "لنذهب معاً لشراء الفواكه اليوم." },
        ],
      },
    ],
    exercises: [
      {
        type: "tone",
        question: "اختر النغمة الصحيحة لـ'快'",
        options: ["kuāi", "kuái", "kuǎi", "kuài"],
        answer: "kuài",
        explanation: "النغمة الرابعة descendente (هابطة)",
      },
    ],
  },
  {
    id: 12,
    title: "الناس والعلاقات",
    titleZh: "人与家庭",
    description: "كلمات العائلة والناس",
    vocabularyIds: ["51", "52", "53", "54", "91", "92"],
    grammarIds: ["26"],
    keySentences: [
      { chinese: "他是我的父亲。", pinyin: "Tā shì wǒ de fùqīn.", arabic: "هو والدي." },
      { chinese: "这个菜很好吃。", pinyin: "Zhège cài hěn hǎochī.", arabic: "هذا الطبق لذيذ." },
      { chinese: "我想喝水。", pinyin: "Wǒ xiǎng hē shuǐ.", arabic: "أريد أن أشرب ماء." },
      { chinese: "你家里有几个人？", pinyin: "Nǐ jiā lǐ yǒu jǐ ge rén?", arabic: "كم شخصاً في عائلتك؟" },
    ],
    conversations: [
      {
        scene: "تقديم العائلة",
        speakers: ["زائر", "المضيف"],
        lines: [
          { speaker: "زائر", chinese: "这是你家人吗？", pinyin: "Zhè shì nǐ jiā rén ma?", arabic: "هل هؤلاء عائلتك؟" },
          { speaker: "المضيف", chinese: "是的，这是我爸爸、妈妈和姐姐。", pinyin: "Shì de, zhè shì wǒ bàba, māma hé jiějie.", arabic: "نعم، هذا أبي وأمي وأختي الكبرى." },
          { speaker: "زائر", chinese: "你家很大，人很多！", pinyin: "Nǐ jiā hěn dà, rén hěn duō!", arabic: "بيتك كبير، والناس كثيرون!" },
        ],
      },
    ],
    exercises: [
      {
        type: "fill_blank",
        question: "他是____人。",
        answer: ["中国", "好", "男"],
      },
    ],
  },
  {
    id: 13,
    title: "التعليم والمدرسة",
    titleZh: "学校与学习",
    description: "كلمات المدرسة والتعليم",
    vocabularyIds: ["55", "56", "57", "58", "93", "94"],
    grammarIds: [],
    keySentences: [
      { chinese: "我是学生。", pinyin: "Wǒ shì xuésheng.", arabic: "أنا طالب." },
      { chinese: "我的老师很好。", pinyin: "Wǒ de lǎoshī hěn hǎo.", arabic: "مدرسي جيد جداً." },
      { chinese: "他是我的朋友。", pinyin: "Tā shì wǒ de péngyou.", arabic: "هو صديقي." },
      { chinese: "请喝茶。", pinyin: "Qǐng hē chá.", arabic: "اشرب الشاي من فضلك." },
    ],
    conversations: [
      {
        scene: "في المدرسة",
        speakers: ["طالب جديد", "معلم"],
        lines: [
          { speaker: "طالب جديد", chinese: "老师好！请问学校在哪里？", pinyin: "Lǎoshī hǎo! Qǐngwèn xuéxiào zài nǎlǐ?", arabic: "مرحباً يا أستاذ! أين المدرسة من فضلك؟" },
          { speaker: "معلم", chinese: "学校在前边。你是新学生吗？", pinyin: "Xuéxiào zài qiánbian. Nǐ shì xīn xuésheng ma?", arabic: "المدرسة في الأمام. هل أنت طالب جديد؟" },
          { speaker: "طالب جديد", chinese: "是的，我是新学生。", pinyin: "Shì de, wǒ shì xīn xuésheng.", arabic: "نعم، أنا طالب جديد." },
        ],
      },
    ],
    exercises: [
      {
        type: "multiple_choice",
        question: "'学校' تعني:",
        options: ["مسجد", "مدرسة", "مستشفى", "سوق"],
        answer: "مدرسة",
      },
    ],
  },
  {
    id: 14,
    title: "الصين واللغة",
    titleZh: "中国与中文",
    description: "كلمات الصين واللغة الصينية",
    vocabularyIds: ["59", "60", "95", "96"],
    grammarIds: [],
    keySentences: [
      { chinese: "我是中国人。", pinyin: "Wǒ shì Zhōngguó rén.", arabic: "أنا صيني." },
      { chinese: "我学中文。", pinyin: "Wǒ xué Zhōngwén.", arabic: "أتعلم الصينية." },
      { chinese: "这是一本好书。", pinyin: "Zhè shì yì běn hǎo shū.", arabic: "هذا كتاب جيد." },
      { chinese: "请给我一支笔。", pinyin: "Qǐng gěi wǒ yì zhī bǐ.", arabic: "أعطني قلماً من فضلك." },
    ],
    conversations: [
      {
        scene: "في الجامعة",
        speakers: ["طالب عربي", "طالب صيني"],
        lines: [
          { speaker: "طالب عربي", chinese: "你是中国人吗？", pinyin: "Nǐ shì Zhōngguó rén ma?", arabic: "هل أنت صيني؟" },
          { speaker: "طالب صيني", chinese: "是的，我是中国人。你是哪里人？", pinyin: "Shì de, wǒ shì Zhōngguó rén. Nǐ shì nǎlǐ rén?", arabic: "نعم، أنا صيني. من أين أنت؟" },
          { speaker: "طالب عربي", chinese: "我是阿拉伯人。我喜欢中国。", pinyin: "Wǒ shì Ālābó rén. Wǒ xǐhuan Zhōngguó.", arabic: "أنا عربي. أحب الصين." },
        ],
      },
    ],
    exercises: [
      {
        type: "translate",
        question: "أنا أتعلم اللغة الصينية",
        answer: "我学中文。",
      },
    ],
  },
  {
    id: 15,
    title: "التقنية والاتصال",
    titleZh: "电脑与电话",
    description: "كلمات التقنية والاتصالات",
    vocabularyIds: ["97", "98"],
    grammarIds: [],
    keySentences: [
      { chinese: "我用电脑学习。", pinyin: "Wǒ yòng diànnǎo xuéxí.", arabic: "أستخدم الحاسوب للتعلم." },
      { chinese: "请给我打电话。", pinyin: "Qǐng gěi wǒ dǎ diànhuà.", arabic: "اتصل بي من فضلك." },
      { chinese: "你的电话号码是多少？", pinyin: "Nǐ de diànhuà hàomǎ shì duōshao?", arabic: "ما رقم هاتفك؟" },
      { chinese: "电脑很慢。", pinyin: "Diànnǎo hěn màn.", arabic: "الحاسوب بطيء." },
    ],
    conversations: [
      {
        scene: "طلب المساعدة",
        speakers: ["شخص أ", "شخص ب"],
        lines: [
          { speaker: "شخص أ", chinese: "我的电脑坏了，你能帮我吗？", pinyin: "Wǒ de diànnǎo huài le, nǐ néng bāng wǒ ma?", arabic: "حاسوبي تعطل، هل يمكنك مساعدتي؟" },
          { speaker: "شخص ب", chinese: "当然可以。怎么了？", pinyin: "Dāngrán kěyǐ. Zěnme le?", arabic: "بالطبع. ما المشكلة؟" },
          { speaker: "شخص أ", chinese: "电脑开不了机。", pinyin: "Diànnǎo kāi bù liǎo jī.", arabic: "الحاسوب لا يعمل." },
        ],
      },
    ],
    exercises: [
      {
        type: "multiple_choice",
        question: "'电脑' تعني:",
        options: ["تلفاز", "حاسوب", "هاتف", "راديو"],
        answer: "حاسوب",
      },
    ],
  },
];

export const grammarRules = [
  { id: "1", title: "الجملة الاسمية: هو + اسم", description: "في الصينية، نستخدم (是) للربط بين المبتدأ والخبر الاسمي", examples: ["我是学生", "他是老师"] },
  { id: "2", title: "النفي: 不 + فعل", description: "نستخدم (不) لنفي الأفعال والصفات", examples: ["我不是老师", "他不高"] },
  { id: "3", title: "الأرقام: 1-10", description: "الأرقام الأساسية من واحد إلى عشرة", examples: ["一, 二, 三, 四, 五, 六, 七, 八, 九, 十"] },
  { id: "4", title: "أدوات الاستفهام: 什么، 谁، 哪", description: "أدوات السؤال الأساسية", examples: ["这是什么？", "他是谁？", "哪个是你的？"] },
  { id: "5", title: "الملكية: 的", description: "نستخدم (的) للإشارة للملكية", examples: ["我的书", "他的朋友"] },
  { id: "6", title: "كم: 几", description: "نستخدم (几) للسؤال عن الأعداد الصغيرة", examples: ["你几岁？", "你有几个朋友？"] },
  { id: "7", title: "الملكية: 有", description: "نستخدم (有) للتعبير عن الملكية", examples: ["我有一本书", "他有钱"] },
  { id: "8", title: "النفي: 没 + 有", description: "نستخدم (没有) لنفي الملكية والوجود", examples: ["我没有钱", "这里没有人"] },
  { id: "9", title: "الفعل الماضي: 了", description: "نستخدم (了) للدلالة على الماضي أو التغيير", examples: ["我去了北京", "他来了"] },
  { id: "10", title: "الفعل المضارع: 在 + فعل", description: "نستخدم (在) قبل الفعل للدلالة على الاستمرار", examples: ["我在学习", "他在吃饭"] },
  { id: "11", title: "الطلب: 请", description: "نستخدم (请) للطلب بأدب", examples: ["请喝茶", "请坐"] },
  { id: "12", title: "أفعال الحواس", description: "الأفعال المتعلقة بالحواس الخمس", examples: ["看 - ينظر", "听 - يسمع", "吃 - يأكل", "喝 - يشرب"] },
  { id: "13", title: "القدرة: 会", description: "نستخدم (会) للتعبير عن القدرة والمعرفة", examples: ["我会说中文", "他会开车"] },
  { id: "14", title: "التعلم: 学 + اسم الفاعل", description: "أفعال التعلم والدراسة", examples: ["学中文", "学习汉字"] },
  { id: "15", title: "الرغبة: 想", description: "نستخدم (想) للتعبير عن الرغبة", examples: ["我想去中国", "他想吃饭"] },
  { id: "16", title: "الطلب/النية: 要", description: "نستخدم (要) للطلب أو التعبير عن النية", examples: ["我要水", "我要去学校"] },
  { id: "17", title: "القدرة: 能", description: "نستخدم (能) للقدرة والإمكانية", examples: ["你能帮我吗？", "这里能停车"] },
  { id: "18", title: "الحب: 喜欢", description: "نستخدم (喜欢) للتعبير عن الحب والإعجاب", examples: ["我喜欢学习", "她喜欢跳舞"] },
  { id: "19", title: "المعرفة: 知道", description: "نستخدم (知道) للتعبير عن المعرفة", examples: ["我知道", "他不知道"] },
  { id: "20", title: "التسوق: 买 / 卖", description: "أفعال البيع والشراء", examples: ["买书 - يشتري كتاباً", "卖水果 - يبيع فواكه"] },
  { id: "21", title: "الزمن: 以前 / 以后", description: "التعبير عن الزمن السابق واللاحق", examples: ["一年以前 - قبل سنة", "三天以后 - بعد ثلاثة أيام"] },
  { id: "22", title: "الصفات: 大 / 小", description: "الصفات المتعلقة بالحجم", examples: ["大房子 - بيت كبير", "小房间 - غرفة صغيرة"] },
  { id: "23", title: "الكمية: 多 / 少", description: "الصفات المتعلقة بالكمية", examples: ["很多人 - أشخاص كثيرون", "少时间 - وقت قليل"] },
  { id: "24", title: "الطول: 高 / 矮", description: "الصفات المتعلقة بالطول والارتفاع", examples: ["他很高 - هو طويل", "这棵树很矮 - هذه الشجرة قصيرة"] },
  { id: "25", title: "السرعة: 快 / 慢", description: "الصفات المتعلقة بالسرعة", examples: ["车很快 - السيارة سريعة", "请慢说 - تكلم ببطء"] },
  { id: "26", title: "الناس: 人", description: "كلمة الإنسان والناس", examples: ["中国人 - صيني", "好人 - شخص طيب"] },
];

export function getLessonById(id: number): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === id);
}

export function getAllLessons(): Lesson[] {
  return lessons;
}
