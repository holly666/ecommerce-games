#!/usr/bin/env node
const fs = require('fs');

// Helper: escape string for JS
function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n').replace(/\r/g, '');
}

// HTML header + CSS
const part1 = `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>女尊世界 · 当家主</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:"PingFang SC","Microsoft YaHei",sans-serif;background:#1a1a2e;color:#e8d5b7;min-height:100vh}
#game{max-width:680px;margin:0 auto;padding:20px}
#cover{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:92vh;text-align:center}
h2{color:#c9a96e;font-size:2.4em;margin-bottom:6px;letter-spacing:8px}
.s{color:#a89070;font-size:1.1em;margin-bottom:28px;letter-spacing:4px}
.d{color:#7a6a50;font-size:0.88em;max-width:440px;line-height:1.9;margin-bottom:36px}
.bgg{background:#c9a96e;color:#1a1a2e;border:none;padding:14px 50px;border-radius:8px;cursor:pointer;font-size:1.05em;font-weight:bold;letter-spacing:4px;transition:background 0.2s}
.bgg:hover{background:#e0c080}
.sw{background:#16213e;border:1px solid #c9a96e;border-radius:12px;padding:22px;margin-bottom:14px;display:none}
.sw.on{display:block}
.st{color:#c9a96e;font-size:1.1em;text-align:center;margin-bottom:6px;font-weight:bold;letter-spacing:2px}
.ss{color:#7a6a50;font-size:0.8em;text-align:center;margin-bottom:18px}
.cg{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:10px 0}
.cc{background:#0f3460;border:2px solid #3a3a5a;border-radius:10px;padding:14px;cursor:pointer;transition:all 0.2s;text-align:left}
.cc:hover{border-color:#c9a96e;transform:translateY(-2px)}
.cn{color:#c9a96e;font-size:0.98em;font-weight:bold;margin-bottom:5px}
.cd{color:#a89070;font-size:0.8em;line-height:1.5;margin-bottom:5px}
.ct{display:flex;flex-wrap:wrap;gap:4px}
.ch{background:#1a2a4a;color:#7a9aca;font-size:0.7em;padding:2px 6px;border-radius:3px}
.cbtn{display:block;width:100%;background:#4a8a4a;color:#fff;padding:13px;border-radius:8px;cursor:pointer;font-size:1em;font-weight:bold;letter-spacing:2px;margin-top:14px;transition:background 0.2s;border:none}
.cbtn:hover{background:#5a9a5a}
.cbtn:disabled{background:#3a5a3a;color:#6a7a6a;cursor:not-allowed}
.sel{background:#1a2a1a;border:1px solid #4a8a4a;border-radius:6px;padding:10px;margin:8px 0;font-size:0.85em;color:#8aca8a}
.nw{background:#0f3460;border:1px solid #c9a96e;border-radius:8px;padding:14px;margin:10px 0}
.nl{color:#a89070;font-size:0.8em;display:block;margin-bottom:6px}
.ni{width:100%;background:#16213e;border:1px solid #5a4a3a;color:#e8d5b7;padding:10px 12px;border-radius:6px;font-size:1em}
.sc{background:#16213e;border:1px solid #c9a96e;border-radius:12px;padding:20px;margin-bottom:14px;display:none}
.sc.on{display:block}
.sct{color:#c9a96e;font-size:1.0em;font-weight:bold;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid #333;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:4px}
.scd{color:#7a6a50;font-size:0.8em}
.sctx{line-height:1.9;color:#d4c4a8;font-size:0.9em;margin-bottom:14px}
.sctx p{margin-bottom:10px}
.chc{display:block;width:100%;background:#0f3460;border:2px solid #5a4a3a;color:#e8d5b7;padding:12px 14px;margin:6px 0;border-radius:8px;cursor:pointer;text-align:left;font-size:0.9em;line-height:1.5;transition:all 0.18s}
.chc:hover{background:#1a4a7a;transform:translateX(3px)}
.chc:disabled{opacity:0.4;cursor:not-allowed;transform:none!important}
.chc.safe{border-color:#4a8a4a}.chc.safe:hover{background:#1a3a1a}
.chc.risky{border-color:#8a3a3a}.chc.risky:hover{background:#3a1a1a}
.chc.love{border-color:#8a4a6a}.chc.love:hover{background:#3a1a2a}
.chc.smart{border-color:#4a4a8a}.chc.smart:hover{background:#1a1a3a}
.chc.gov{border-color:#6a6a3a}.chc.gov:hover{background:#2a2a1a}
.tag{display:inline-block;font-size:0.72em;padding:1px 6px;border-radius:3px;margin-right:5px;font-weight:bold}
.t-safe{background:#2a4a2a;color:#8aca8a}.t-risky{background:#4a2a2a;color:#ca8a8a}.t-love{background:#4a2a4a;color:#ca8aca}.t-smart{background:#2a2a4a;color:#8a8aca}.t-gov{background:#3a3a1a;color:#caca6a}
.sb{background:#16213e;border:1px solid #c9a96e;border-radius:10px;padding:10px 14px;margin-bottom:12px;display:none}
.sb.on{display:block}
.sg{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}
.st2{background:#0f3460;border-radius:6px;padding:5px 6px;text-align:center}
.sn{font-size:0.65em;color:#a89070}.sv{font-size:1.0em;color:#c9a96e;font-weight:bold}
.aw{display:none;background:#2a1a3e;border:1px solid #9a4a6a;border-radius:6px;padding:7px 12px;text-align:center;margin-top:8px}
.aw.on{display:block}
.abb{background:#1a0a2e;border-radius:10px;height:6px;margin-top:4px}
.abf{background:linear-gradient(90deg,#9a4a6a,#c96a8a);border-radius:10px;height:6px;transition:width 0.5s}
.aff-label{font-size:0.72em;color:#c96a8a;margin-bottom:3px}
.aff-level{font-size:0.78em;color:#e8a0b0;font-weight:bold;margin-top:3px}
.sbar{display:none;text-align:center;margin:10px 0}
.sbar.on{display:block}
.bs{background:#c9a96e;color:#1a1a2e;border:none;padding:6px 14px;border-radius:5px;cursor:pointer;font-size:0.82em;font-weight:bold;margin:0 3px}
.bg2{background:transparent;color:#7a6a50;border:1px solid #3a3a3a;padding:6px 14px;border-radius:5px;cursor:pointer;font-size:0.82em;margin:0 3px}
.lw{display:none;background:#0d1b2a;border:1px solid #222;border-radius:8px;padding:8px;margin-top:12px;max-height:110px;overflow-y:auto;font-size:0.75em;color:#6a5a4a;line-height:1.6}
.lw.on{display:block}
.le{border-bottom:1px solid #1a1a1a;padding:2px 0}
.et{background:#3a2a1a;color:#c9a96e;font-size:0.7em;padding:2px 8px;border-radius:4px;margin-bottom:8px;letter-spacing:1px;display:inline-block}
.night-panel{display:none;background:#1a0f2e;border:1px solid #7a4a9a;border-radius:10px;padding:14px;margin:10px 0}
.night-panel.on{display:block}
.night-title{color:#b080d0;font-size:0.9em;font-weight:bold;margin-bottom:10px;text-align:center}
</style>
</head>
<body>
<div id=game>
<div id=cover>
<h2>🏛 女尊世界</h2><div class=s>当 家 主</div>
<div class=d>女尊王朝，边境小镇。<br>你年过及笄，议得一门亲事。<br>破屋一间，薄田几亩，夫君一名。<br>从寒门到霸主，一切从今日开始。</div>
<button class=bgg onclick="s1()">开始游戏</button>
</div>
<div id=step1 class="sw"><div class=st>第一步 · 你的身世</div><div class=ss>你从哪里来？</div><div class=cg id=bg-grid></div><div id=sel-bg></div></div>
<div id=step2 class="sw"><div class=st>第二步 · 你的心性</div><div class=ss>你是什么样的人？</div><div class=cg id=trait-grid></div><div id=sel-trait></div></div>
<div id=step3 class="sw"><div id=sel-confirm></div></div>
<div id=stats-bar class=sb>
<div class=sg id=stats-grid></div>
<div class=aw id=aff-wrap>
<div class=aff-label>💕 夫君好感</div>
<div style="display:flex;align-items:center;gap:8px">
<div style="flex:1;background:#1a0a2e;border-radius:10px;height:6px"><div class=abf id=aff-bar style="width:50%"></div></div>
<span id=aff-num style="color:#c96a8a;font-size:0.85em;font-weight:bold">50</span>
</div>
<div class=aff-level id=aff-level>室友</div>
</div>
</div>
<div id=scene class=sc>
<div class=sct><span id=scene-title-text></span><span class=scd id=day-num></span></div>
<div id=event-tag></div>
<div class=sctx id=scene-text></div>
<div id=choices></div>
</div>
<div class=night-panel id=night-panel>
<div class=night-title>🌙 夜幕降临 · 归家时光</div>
<div id=night-choices></div>
</div>
<div id=sbar class=sbar>
<button class=bs onclick="saveGame()">💾 存档</button>
<button class=bs onclick="loadGame()">📂 读档</button>
<button class=bg2 onclick="if(confirm('确定重开？'))resetGame()">🔄 重开</button>
<button class=bg2 onclick="toggleLog()">📜 日志</button>
</div>
<div class=lw id=log-wrap><div id=log></div></div>
</div>
<script>
`;

// Write part 1
fs.writeFileSync('index.html', part1);
console.log('Part 1 written:', part1.length, 'bytes');
