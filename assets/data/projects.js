window.PORTFOLIO_PROJECTS = Object.freeze({
  s2m: Object.freeze({
    title: "S2M-Inject",
    repositoryUrl: "https://github.com/matttt222/S2M-Inject",
    samples: Object.freeze([
      {
        title: "English · Hip-hop",
        mode: "English",
        lyrics: "Mr hit the quan went viral gigantic.Hold up wait face it go ahead pump your brakes fast.Always used to dodge cops riding around with no plate tags",
        instruction:
          "This audio has a vocal singing description: \"[singer id 0] genre: The genre of music is hip hop. " +
          "instrumentation: The instruments used in the music piece include a drum machine, synthesizer, and a rapper. " +
          "rhythm and melody: The tempo is fast and rhythmic, with a strong beat that drives the music forward. The key signature is C minor. " +
          "mood and atmosphere: The music feels intense and powerful, with a sense of urgency and determination. The rapper's confident delivery and the driving rhythm create a feeling of energy and motivation, as if the listener is being pushed forward into action.\"",
        tracks: [
          { label: "音色参考语音（内容与歌词无关）", src: "../assets/audio/s2m/en-hiphop-quan-reference.wav" },
          { label: "生成音乐（按上述歌词生成）", src: "../assets/audio/s2m/en-hiphop-quan-generated.wav" },
        ],
      },
      {
        title: "English · Pop",
        mode: "English",
        lyrics: "In the night you know where I'll be broken lover you can touch me.",
        instruction:
          "This audio has a vocal singing description: \"[singer id 0] genre: The genre of music is pop. " +
          "instrumentation: The instruments used in the music piece include a piano, electric guitar, and a drum set. " +
          "rhythm and melody: The tempo is moderate, around 120 BPM. The key signature is A minor. " +
          "mood and atmosphere: The music evokes a sense of longing and vulnerability. The soft piano and gentle guitar strums create a melancholic atmosphere, while the singer's passionate tone adds a layer of emotional intensity. The combination of these elements paints a vivid picture of a broken heart, making the listener feel the pain and yearning of the singer.\"",
        tracks: [
          { label: "音色参考语音（内容与歌词无关）", src: "../assets/audio/s2m/en-pop-broken-lover-reference.wav" },
          { label: "生成音乐（按上述歌词生成）", src: "../assets/audio/s2m/en-pop-broken-lover-generated.wav" },
        ],
      },
      {
        title: "中文 · Hip-hop",
        mode: "中文",
        lyrics: "成为故事主角 forever其他 whatever做个和平使者传递着快乐Yeah they call you miss就像我的rap一样Powerful Yeah",
        instruction:
          "This audio has a vocal singing description: \"[singer id 0] genre: The genre of music is hip hop. " +
          "instrumentation: The instruments used in the music piece include a strong beat, bass, and synthesizers. " +
          "rhythm and melody: The tempo is fast and upbeat, with a strong emphasis on the rhythm. The key signature is E minor. " +
          "mood and atmosphere: The music feels vibrant and empowering, with a sense of determination and self-assurance. The strong beat and confident tone create an atmosphere of energy and motivation, making it perfect for a high-energy performance or workout session.\"",
        tracks: [
          { label: "音色参考语音（内容与歌词无关）", src: "../assets/audio/s2m/zh-hiphop-reference.wav" },
          { label: "生成音乐（按上述歌词生成）", src: "../assets/audio/s2m/zh-hiphop-generated.wav" },
        ],
      },
      {
        title: "中文 · Pop（温暖怀旧）",
        mode: "中文",
        lyrics: "我感动这一刻,等待一切永恒",
        instruction:
          "This audio has a vocal singing description: \"[singer id 0] genre: The genre of music is pop. " +
          "instrumentation: The instruments used in the music piece include a piano, a guitar, and a bass. " +
          "rhythm and melody: The tempo is moderate, around 115 BPM. The key signature is B major. " +
          "mood and atmosphere: The music evokes a sense of warmth and nostalgia, like a gentle breeze on a summer evening. The soft piano and guitar melodies blend harmoniously, creating a soothing and intimate atmosphere. The female singer's tone adds a touch of sweetness and vulnerability, enhancing the overall emotional depth of the piece.\"",
        tracks: [
          { label: "音色参考语音（内容与歌词无关）", src: "../assets/audio/s2m/zh-pop-eternal-reference.wav" },
          { label: "生成音乐（按上述歌词生成）", src: "../assets/audio/s2m/zh-pop-eternal-generated.wav" },
        ],
      },
      {
        title: "中文 · Pop（忧郁思念）",
        mode: "中文",
        lyrics: "能让我的痛苦剧烈加倍,你把爱统统都给了谁",
        instruction:
          "This audio has a vocal singing description: \"[singer id 0] genre: The genre of music is pop. " +
          "instrumentation: The instruments used in the music piece include a piano, synthesizer, and drums. " +
          "rhythm and melody: The tempo is moderate, with a steady beat that complements the singer's voice. The key signature is C# minor. " +
          "mood and atmosphere: The music evokes a sense of melancholy and longing. The combination of the singer's powerful voice, the somber piano, and the steady drum beat creates an atmosphere of deep emotional reflection.\"",
        tracks: [
          { label: "音色参考语音（内容与歌词无关）", src: "../assets/audio/s2m/zh-pop-heartbreak-reference.wav" },
          { label: "生成音乐（按上述歌词生成）", src: "../assets/audio/s2m/zh-pop-heartbreak-generated.wav" },
        ],
      },
    ]),
  }),
  amend: Object.freeze({
    title: "AMEND",
    samples: Object.freeze([
      {
        title: "英文局部替换",
        mode: "Replacement · English",
        instruction: 'Replace "the same" with "so too".',
        sourceText: "I was just thinking the same, agreed conscience, it takes only a taste to go to my head.",
        targetText: "I was just thinking so too, agreed conscience, it takes only a taste to go to my head.",
        tracks: [
          { label: "原始语音", src: "../assets/audio/amend/replacement-en-reference.wav" },
          { label: "编辑结果", src: "../assets/audio/amend/replacement-en-amend.wav" },
        ],
      },
      {
        title: "中文插入",
        mode: "Insertion · 中文",
        instruction: '在“知”后加入“而”。',
        sourceText: "若有若无的活动通知，倘若不是我看到了一些勉强有价值的问题",
        targetText: "若有若无的活动通知，而倘若不是我看到了一些勉强有价值的问题",
        tracks: [
          { label: "原始语音", src: "../assets/audio/amend/insertion-zh-reference.wav" },
          { label: "编辑结果", src: "../assets/audio/amend/insertion-zh-amend.wav" },
        ],
      },
      {
        title: "中文删除",
        mode: "Deletion · 中文",
        instruction: '删除“后”。',
        sourceText: "不知道你们小时候有没有被问过这样一个问题：你长大后想做什么？",
        targetText: "不知道你们小时候有没有被问过这样一个问题：你长大想做什么？",
        tracks: [
          { label: "原始语音", src: "../assets/audio/amend/deletion-zh-reference.wav" },
          { label: "编辑结果", src: "../assets/audio/amend/deletion-zh-amend.wav" },
        ],
      },
      {
        title: "英文整句替换",
        mode: "Full replacement · English",
        instruction: 'Replace "Cats and Dogs each hate the other." with "Please shut the door."',
        sourceText: "Cats and Dogs each hate the other.",
        targetText: "Please shut the door.",
        tracks: [
          { label: "原始语音", src: "../assets/audio/amend/full-replacement-en-reference.wav" },
          { label: "编辑结果", src: "../assets/audio/amend/full-replacement-en-amend.wav" },
        ],
      },
      {
        title: "中文整句替换",
        mode: "Full replacement · 中文",
        instruction: '将“保护用户隐私和信息安全。”替换为“遗憾的是看不见窗外的景致。”',
        sourceText: "保护用户隐私和信息安全。",
        targetText: "遗憾的是看不见窗外的景致。",
        tracks: [
          { label: "原始语音", src: "../assets/audio/amend/full-replacement-zh-reference.wav" },
          { label: "编辑结果", src: "../assets/audio/amend/full-replacement-zh-amend.wav" },
        ],
      },
    ]),
  }),
});
