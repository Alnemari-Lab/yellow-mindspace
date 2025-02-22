
interface Question {
  id: number;
  text: {
    en: string;
    ar: string;
  };
  options: {
    en: string[];
    ar: string[];
  };
}

export const questions: Question[] = [
  { id: 1, text: { en: "I have historically been more inclined toward…", ar: "لقد كنت تاريخيًا أميل أكثر نحو…" }, options: { en: ["Competition", "Cooperation"], ar: ["المنافسة", "التعاون"] } },
  { id: 2, text: { en: "When learning about something new, I first want…", ar: "عند التعلم عن شيء جديد، أريد أولاً…" }, options: { en: ["Some specific examples", "A broad overview"], ar: ["بعض الأمثلة المحددة", "نظرة عامة شاملة"] } },
  { id: 3, text: { en: "When helping others learn, I am naturally more of a…", ar: "عند مساعدة الآخرين في التعلم، أنا بطبيعتي أكثر…" }, options: { en: ["Teacher", "Facilitator"], ar: ["المعلم", "الميسر"] } },
  { id: 4, text: { en: "Which is more appealing?", ar: "ما هو الأكثر جاذبية بالنسبة لي؟" }, options: { en: ["Potential", "Actual"], ar: ["الإمكانات", "الواقع"] } },
  { id: 5, text: { en: "My typical mode of operating involves…", ar: "أسلوبي المعتاد في العمل يتضمن…" }, options: { en: ["Relying heavily on my ability to improvise", "Planning things in advance when possible"], ar: ["الاعتماد بشدة على قدرتي على الارتجال", "التخطيط المسبق قدر الإمكان"] } },
  { id: 6, text: { en: "I am naturally more of a…", ar: "أنا بطبيعتي أكثر…" }, options: { en: ["Sympathizer", "Strategist"], ar: ["متعاطفًا", "استراتيجيًا"] } },
  { id: 7, text: { en: "I am more of a…", ar: "أنا أكثر…" }, options: { en: ["Visionary or 'ideas-person'", "Doer or implementer"], ar: ["رؤيويًا أو شخصًا مبدعًا بالأفكار", "منفذًا أو مُنجزًا"] } },
  { id: 8, text: { en: "If forced to choose, I would rather have…", ar: "إذا اضطررت للاختيار، فأنا أفضل أن يكون لدي…" }, options: { en: ["One 'great' friend", "Many 'good' friends"], ar: ["صديق واحد عظيم", "العديد من الأصدقاء الجيدين"] } },
  { id: 9, text: { en: "When handling interpersonal conflict, my natural style is more…", ar: "عند التعامل مع النزاعات الشخصية، أسلوبي الطبيعي هو…" }, options: { en: ["Direct", "Indirect"], ar: ["مباشر", "غير مباشر"] } },
  { id: 10, text: { en: "Generally speaking, I am more interested in…", ar: "بشكل عام، أنا أكثر اهتمامًا بـ…" }, options: { en: ["Working with theories or ideas", "Putting things into practice"], ar: ["العمل مع النظريات أو الأفكار", "وضع الأشياء موضع التنفيذ"] } },
  { id: 11, text: { en: "I have historically been more focused on…", ar: "لقد كنت تاريخيًا أكثر تركيزًا على…" }, options: { en: ["Getting ahead", "My relationships or emotional matters"], ar: ["التقدم في الحياة", "علاقاتي أو الأمور العاطفية"] } },
  { id: 12, text: { en: "I typically pay more attention to…", ar: "أنا عادة ما أركز أكثر على…" }, options: { en: ["My own thoughts, feelings, or impressions", "What is happening with others or the world around me"], ar: ["أفكاري ومشاعري وانطباعاتي", "ما يحدث مع الآخرين أو العالم من حولي"] } },
  { id: 13, text: { en: "I feel most like myself when I'm…", ar: "أشعر بأنني على طبيعتي عندما أكون…" }, options: { en: ["Handling practical matters", "Lost in my thoughts or imagination"], ar: ["أتعامل مع الأمور العملية", "غارقًا في أفكاري أو خيالي"] } },
  { id: 14, text: { en: "When making a big decision, I mostly consider…", ar: "عند اتخاذ قرار كبير، أفكر في المقام الأول في…" }, options: { en: ["What will work best", "What best aligns with my morals or values"], ar: ["ما سيعمل بشكل أفضل", "ما يتماشى مع أخلاقي أو قيمي"] } },
  { id: 15, text: { en: "When working in a group or organization, I am…", ar: "عند العمل في مجموعة أو منظمة، أنا…" }, options: { en: ["Often anxious or self-conscious", "In my element"], ar: ["غالبًا قلق أو غير واثق من نفسي", "في عنصري الطبيعي"] } },
  { id: 16, text: { en: "I would describe my emotional life as…", ar: "أصف حياتي العاطفية بأنها…" }, options: { en: ["Rich, nuanced, and complex", "Rather straightforward and uncomplicated"], ar: ["غنية ومعقدة ومتنوعة", "بسيطة ومباشرة إلى حد ما"] } },
  { id: 17, text: { en: "Which word appeals to you more?", ar: "أي كلمة تجذبك أكثر؟" }, options: { en: ["Optimize", "Empathize"], ar: ["التحسين", "التعاطف"] } },
  { id: 18, text: { en: "Which is more likely to capture your attention?", ar: "ما هو الأكثر احتمالاً لجذب انتباهك؟" }, options: { en: ["A new theory or explanation", "A new fact or happening"], ar: ["نظرية أو تفسير جديد", "حقيقة أو حدث جديد"] } },
  { id: 19, text: { en: "I have historically been more…", ar: "لقد كنت تاريخيًا أكثر…" }, options: { en: ["Hesitant, timid, and careful", "Outgoing, bold, and assertive"], ar: ["مترددًا وحذرًا", "جريئًا واجتماعيًا وواثقًا"] } },
  { id: 20, text: { en: "In social encounters, I am more inclined to…", ar: "في اللقاءات الاجتماعية، أميل إلى…" }, options: { en: ["Make assertions", "Ask questions"], ar: ["تقديم التصريحات", "طرح الأسئلة"] } },
  { id: 21, text: { en: "I often find myself…", ar: "أجد نفسي غالبًا…" }, options: { en: ["Stepping back to consider how things are related or interconnected", "Focusing mostly on my concrete affairs"], ar: ["أفكر في كيفية ارتباط الأشياء ببعضها البعض", "أركز في الغالب على الأمور الملموسة"] } },
  { id: 22, text: { en: "Which is more true of you?", ar: "أي من العبارتين ينطبق عليك أكثر؟" }, options: { en: ["I generally feel at home navigating external affairs", "I sometimes worry about being overwhelmed by the demands of the world"], ar: ["أشعر بأنني في راحة عند التعامل مع الشؤون الخارجية", "أقلق أحيانًا من الانغماس في متطلبات العالم"] } },
  { id: 23, text: { en: "In social situations, I tend to be more in the…", ar: "في المواقف الاجتماعية، أميل إلى أن أكون أكثر في…" }, options: { en: ["Background", "Foreground"], ar: ["الخلفية", "المقدمة"] } },
  { id: 24, text: { en: "After making a decision or drawing a conclusion, I…", ar: "بعد اتخاذ قرار أو التوصل إلى استنتاج، أنا…" }, options: { en: ["Typically don't change my mind, at least not in a major way", "Often end up questioning, even overturning, my original judgment"], ar: ["نادراً ما أغير رأيي", "غالبًا ما أعيد التفكير وقد أعدل رأيي"] } },
  { id: 25, text: { en: "When others are hurting emotionally, I…", ar: "عندما يتألم الآخرون عاطفيًا، أنا…" }, options: { en: ["Feel for them and am moved to help", "Tend to feel inadequate and outside my comfort zone"], ar: ["أتعاطف معهم وأشعر بالحاجة إلى المساعدة", "أشعر بالعجز وخارج منطقة راحتي"] } },
  { id: 26, text: { en: "In social situations, I typically…", ar: "في المواقف الاجتماعية، أنا عادةً…" }, options: { en: ["Refrain from making strong assertions", "Am not opposed to 'calling things as I see them'"], ar: ["أتحاشى تقديم تصريحات قوية", "لست ضد قول الأشياء كما أراها"] } },
  { id: 27, text: { en: "In general, I…", ar: "بشكل عام، أنا…" }, options: { en: ["Feel responsible for, or compelled to meet, the needs of others", "Prefer not to be bothered with others' personal needs"], ar: ["أشعر بالمسؤولية عن تلبية احتياجات الآخرين", "أفضل عدم الانشغال باحتياجات الآخرين الشخصية"] } },
  { id: 28, text: { en: "With respect to the outside world, I generally operate more…", ar: "بالنسبة للعالم الخارجي، أعمل عادةً…" }, options: { en: ["Slowly and cautiously", "Quickly and confidently"], ar: ["ببطء وحذر", "بسرعة وثقة"] } },
  { id: 29, text: { en: "When it comes to helping others, my natural inclination is to offer:", ar: "عندما يتعلق الأمر بمساعدة الآخرين، أميل إلى تقديم:" }, options: { en: ["Multiple options or possibilities", "Specific advice or guidance"], ar: ["خيارات متعددة أو إمكانيات", "نصائح أو إرشادات محددة"] } },
  { id: 30, text: { en: "When shopping for a vehicle, I would naturally focus more on its…", ar: "عند شراء سيارة، أركز أكثر على…" }, options: { en: ["Technical specs and functionality", "Overall look and feel"], ar: ["المواصفات التقنية والوظائف", "الشكل العام والإحساس"] } },
  { id: 31, text: { en: "When it comes to my calendar, I prefer to…", ar: "عندما يتعلق الأمر بجدولي الزمني، أفضل…" }, options: { en: ["Leave things open to maximize flexibility", "Get things scheduled to minimize future guesswork or uncertainty"], ar: ["ترك الأمور مفتوحة لزيادة المرونة", "تحديد المواعيد لتقليل التخمين أو عدم اليقين"] } },
  { id: 32, text: { en: "With my intimates, I am inclined to…", ar: "مع المقربين مني، أميل إلى…" }, options: { en: ["Expressly state what I think or feel", "Bite my tongue to minimize conflict"], ar: ["التعبير بوضوح عما أفكر أو أشعر به", "كتمان مشاعري لتجنب الصراع"] } },
  { id: 33, text: { en: "Which better describes you?", ar: "أي العبارتين تصفك بشكل أفضل؟" }, options: { en: ["I am primarily a down-to-earth person", "Abstract or creative thought is a welcome break from everyday affairs"], ar: ["أنا شخص واقعي بدرجة كبيرة", "التفكير المجرد أو الإبداعي هو استراحة مرحب بها من الحياة اليومية"] } },
  { id: 34, text: { en: "Generally speaking, I am more interested in…", ar: "بشكل عام، أنا أكثر اهتمامًا بـ…" }, options: { en: ["Knowing the details and specifics", "Discerning underlying or overarching patterns"], ar: ["معرفة التفاصيل والمواصفات", "اكتشاف الأنماط الأساسية أو الشاملة"] } },
  { id: 35, text: { en: "To recharge and feel my best, I need plenty of…", ar: "لإعادة شحن طاقتي، أحتاج إلى…" }, options: { en: ["Quiet and alone time", "Out and about time"], ar: ["الكثير من الوقت الهادئ والوحدة", "الكثير من النشاط الاجتماعي"] } },
  { id: 36, text: { en: "When engaging in a conversation, I typically…", ar: "عند المشاركة في محادثة، أميل إلى…" }, options: { en: ["Take a moment or two to reflect before speaking", "Quickly share whatever comes to mind"], ar: ["أخذ لحظة للتفكير قبل التحدث", "مشاركة أي شيء يتبادر إلى ذهني بسرعة"] } }
];
