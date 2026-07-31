#!/usr/bin/env node
"use strict";

const assert = require("node:assert/strict");

global.window = {};
require("../assets/data/projects.js");

const expectedSamples = [
  {
    title: "English · Hip-hop",
    lyrics: "Mr hit the quan went viral gigantic.Hold up wait face it go ahead pump your brakes fast.Always used to dodge cops riding around with no plate tags",
    instruction:
      "This audio has a vocal singing description: \"[singer id 0] genre: The genre of music is hip hop. " +
      "instrumentation: The instruments used in the music piece include a drum machine, synthesizer, and a rapper. " +
      "rhythm and melody: The tempo is fast and rhythmic, with a strong beat that drives the music forward. The key signature is C minor. " +
      "mood and atmosphere: The music feels intense and powerful, with a sense of urgency and determination. The rapper's confident delivery and the driving rhythm create a feeling of energy and motivation, as if the listener is being pushed forward into action.\"",
    reference: "../assets/audio/s2m/en-hiphop-quan-reference.wav",
    generated: "../assets/audio/s2m/en-hiphop-quan-generated.wav",
  },
  {
    title: "English · Pop",
    lyrics: "In the night you know where I'll be broken lover you can touch me.",
    instruction:
      "This audio has a vocal singing description: \"[singer id 0] genre: The genre of music is pop. " +
      "instrumentation: The instruments used in the music piece include a piano, electric guitar, and a drum set. " +
      "rhythm and melody: The tempo is moderate, around 120 BPM. The key signature is A minor. " +
      "mood and atmosphere: The music evokes a sense of longing and vulnerability. The soft piano and gentle guitar strums create a melancholic atmosphere, while the singer's passionate tone adds a layer of emotional intensity. The combination of these elements paints a vivid picture of a broken heart, making the listener feel the pain and yearning of the singer.\"",
    reference: "../assets/audio/s2m/en-pop-broken-lover-reference.wav",
    generated: "../assets/audio/s2m/en-pop-broken-lover-generated.wav",
  },
  {
    title: "中文 · Hip-hop",
    lyrics: "成为故事主角 forever其他 whatever做个和平使者传递着快乐Yeah they call you miss就像我的rap一样Powerful Yeah",
    instruction:
      "This audio has a vocal singing description: \"[singer id 0] genre: The genre of music is hip hop. " +
      "instrumentation: The instruments used in the music piece include a strong beat, bass, and synthesizers. " +
      "rhythm and melody: The tempo is fast and upbeat, with a strong emphasis on the rhythm. The key signature is E minor. " +
      "mood and atmosphere: The music feels vibrant and empowering, with a sense of determination and self-assurance. The strong beat and confident tone create an atmosphere of energy and motivation, making it perfect for a high-energy performance or workout session.\"",
    reference: "../assets/audio/s2m/zh-hiphop-reference.wav",
    generated: "../assets/audio/s2m/zh-hiphop-generated.wav",
  },
  {
    title: "中文 · Pop（温暖怀旧）",
    lyrics: "我感动这一刻,等待一切永恒",
    instruction:
      "This audio has a vocal singing description: \"[singer id 0] genre: The genre of music is pop. " +
      "instrumentation: The instruments used in the music piece include a piano, a guitar, and a bass. " +
      "rhythm and melody: The tempo is moderate, around 115 BPM. The key signature is B major. " +
      "mood and atmosphere: The music evokes a sense of warmth and nostalgia, like a gentle breeze on a summer evening. The soft piano and guitar melodies blend harmoniously, creating a soothing and intimate atmosphere. The female singer's tone adds a touch of sweetness and vulnerability, enhancing the overall emotional depth of the piece.\"",
    reference: "../assets/audio/s2m/zh-pop-eternal-reference.wav",
    generated: "../assets/audio/s2m/zh-pop-eternal-generated.wav",
  },
  {
    title: "中文 · Pop（忧郁思念）",
    lyrics: "能让我的痛苦剧烈加倍,你把爱统统都给了谁",
    instruction:
      "This audio has a vocal singing description: \"[singer id 0] genre: The genre of music is pop. " +
      "instrumentation: The instruments used in the music piece include a piano, synthesizer, and drums. " +
      "rhythm and melody: The tempo is moderate, with a steady beat that complements the singer's voice. The key signature is C# minor. " +
      "mood and atmosphere: The music evokes a sense of melancholy and longing. The combination of the singer's powerful voice, the somber piano, and the steady drum beat creates an atmosphere of deep emotional reflection.\"",
    reference: "../assets/audio/s2m/zh-pop-heartbreak-reference.wav",
    generated: "../assets/audio/s2m/zh-pop-heartbreak-generated.wav",
  },
];

const samples = window.PORTFOLIO_PROJECTS.s2m.samples;
assert.equal(samples.length, expectedSamples.length, "S2M 首页样例数量应固定为 5 组");

expectedSamples.forEach((expected, index) => {
  const actual = samples[index];
  assert.equal(actual.title, expected.title, `第 ${index + 1} 组标题不匹配`);
  assert.equal(actual.lyrics, expected.lyrics, `第 ${index + 1} 组完整歌词不匹配`);
  assert.equal(actual.instruction, expected.instruction, `第 ${index + 1} 组完整英文 caption 不匹配`);
  assert.equal(actual.tracks[0].label, "音色参考语音（内容与歌词无关）", `第 ${index + 1} 组参考音频标签不严谨`);
  assert.equal(actual.tracks[0].src, expected.reference, `第 ${index + 1} 组参考音频路径不匹配`);
  assert.equal(actual.tracks[1].label, "生成音乐（按上述歌词生成）", `第 ${index + 1} 组生成音频标签不严谨`);
  assert.equal(actual.tracks[1].src, expected.generated, `第 ${index + 1} 组生成音频路径不匹配`);
});

console.log("S2M sample mappings passed.");
