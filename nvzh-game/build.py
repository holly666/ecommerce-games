#!/usr/bin/env python3
# Write the complete game HTML file

with open('index.html', 'w', encoding='utf-8') as f:
    f.write('''<!DOCTYPE html>
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
<button class=bg2 onclick="if(confirm(\'确定重开？\'))resetGame()">🔄 重开</button>
<button class=bg2 onclick="toggleLog()">📜 日志</button>
</div>
<div class=lw id=log-wrap><div id=log></div></div>
</div>
<script>
var BGS=[{id:"biz",name:"商贾之后",desc:"父亲是镇上布商，家境殷实，自幼耳濡目染商道。",tags:["善经营","人脉广"],init:{money:80,prestige:2}},{id:"scholar",name:"书香门第",desc:"祖上出过几位秀才，虽家道中落，却知书达理。",tags:["智慧高","人脉佳"],init:{money:30,prestige:4,wit:2}},{id:"gentry",name:"官宦人家",desc:"父亲曾是县城小吏，因得罪权贵被贬，但人脉犹在。",tags:["声望高","懂人情"],init:{money:20,prestige:6,social:2}},{id:"poor",name:"寒门出身",desc:"一无所有，白手起家。唯有满腔热血，和一颗不服输的心。",tags:["意志坚","无包袱"],init:{money:5,bravo:2}}];
var TRAITS=[{id:"sharp",name:"精明强干",desc:"心思缜密，算账从不出错，遇事总有办法。",effect:{wit:2},tags:["机敏","果断"]},{id:"warm",name:"温柔贤惠",desc:"待人和气，人缘极好，邻里有难处总愿相帮。",effect:{social:2},tags:["和善","包容"]},{id:"fierce",name:"泼辣直爽",desc:"敢说敢做，嘴巴不饶人，但心里最有数。",effect:{bravo:2},tags:["胆大","豪爽"]},{id:"calm",name:"内敛沉稳",desc:"话不多，但句句在点，旁人不敢小觑。",effect:{prestige:2},tags:["稳重","深沉"]}];
var HUSBANDS=[{id:"scholar",name:"顾长卿",bg:"书香门第",desc:"眉清目秀，谈吐斯文。家中曾有功名，如今家道中落。",traits:["才华","文静"]},{id:"outgoing",name:"柳云舟",bg:"商贾之家",desc:"爱说爱笑，走到哪里都是焦点。没什么心机，但总能让人开心。",traits:["人缘","活泼"]},{id:"quiet",name:"沈墨白",bg:"武勋世家",desc:"话不多，喜怒不形于色。心思细腻，往往能注意到别人忽略的细节。",traits:["细腻","机敏"]},{id:"tsundere",name:"楚灼",bg:"寒门子弟",desc:"嘴硬心软，明明在意却偏要装作不在乎。相处久了会发现意外的温柔。",traits:["傲娇","别扭"]}];
var S={};
var IDT_NAMES=["窘境","谋生·商","谋生·仕","崛起","一方霸主"];
var AFF_LABELS=[[0,"陌生人"],[31,"室友"],[51,"伴侣"],[71,"知心人"],[86,"命定之人"]];
function getAffLabel(a){var label="陌生人";for(var i=0;i<AFF_LABELS.length;i++){if(a>=AFF_LABELS[i][0])label=AFF_LABELS[i][1];}return label;}
function initS(){if(!S.log)S.log=[];if(!S.wit)S.wit=0;if(!S.social)S.social=0;if(!S.bravo)S.bravo=0;if(!S.day)S.day=1;if(!S.cls)S.cls="无业";if(!S.flags)S.flags={};if(!S.affection)S.affection=50;if(!S.identity)S.identity=1;if(!S.husbandEvents)S.husbandEvents=[];if(!S.mainQuest)S.mainQuest=0;if(!S.questChoice)S.questChoice={};if(!S.wealth)S.wealth=0;if(!S.eventsTriggered)S.eventsTriggered={};if(!S.isOfficial)S.isOfficial=false;if(!S.isMerchant)S.isMerchant=false;if(!S.officialTaskCount)S.officialTaskCount=0;if(!S.marketDay)S.marketDay=0;if(!S.marketProfit)S.marketProfit=0;if(!S.nearFestival)S.nearFestival=null;if(!S.husbandProblems)S.husbandProblems=[];if(!S.invitationAccepted)S.invitationAccepted=false;if(!S.invitationDay)S.invitationDay=0;if(!S.hasShop)S.hasShop=false;if(!S.shopReputation)S.shopReputation=0;if(!S.officialProbation)S.officialProbation=[];if(!S.govTaskDone)S.govTaskDone=0;if(!S.prestige)S.prestige=0;if(!S.money)S.money=0;}
function addLog(m){S.log.push(m);var le=document.getElementById("log");if(!le)return;var e=document.createElement("div");e.className="le";e.textContent=("[第"+S.day+"天] "+m).substring(0,28);le.appendChild(e);le.scrollTop=le.scrollHeight;while(le.children.length>15)le.removeChild(le.firstChild);}
function toggleLog(){var lw=document.getElementById("log-wrap");if(lw)lw.classList.toggle("on");}
function saveGame(){localStorage.setItem("nvzh_v5",JSON.stringify(S));addLog("已存档");}
function loadGame(){var d=localStorage.getItem("nvzh_v5");if(d){S=JSON.parse(d);showGame();document.getElementById("aff-wrap").classList.add("on");document.getElementById("sbar").classList.add("on");renderStats();updateAff();addLog("读档成功");}else{addLog("无存档");}}
function resetGame(){localStorage.removeItem("nvzh_v5");location.reload();}
function showGame(){document.getElementById("scene").classList.add("on");document.getElementById("stats-bar").style.display="block";}
function checkIdentity(){if(S.identity===1){if(S.hasShop){S.identity=2;addLog("⏩ 进入阶段2：谋生·商");S.cls="布庄老板";}else if(S.isOfficial){S.identity=2;addLog("⏩ 进入阶段2：谋生·仕");S.cls="县衙小吏";}}if(S.identity===2&&S.day>=60&&(S.marketProfit>=500||S.govTaskDone>=5)){S.identity=3;addLog("⏩ 进入阶段3：崛起");}if(S.identity===3&&S.day>=120){S.identity=4;addLog("⏩ 进入阶段4：一方霸主");}}
function renderStats(){var el=document.getElementById("stats-grid");var idt=IDT_NAMES[S.identity-1]||"窘境";el.innerHTML='<div class=st2><div class=sn>💰 银两</div><div class=sv>'+(S.money||0)+'</div></div><div class=st2><div class=sn>⭐ 声望</div><div class=sv>'+(S.prestige||0)+'</div></div><div class=st2><div class=sn>🤝 人脉</div><div class=sv>'+(S.social||0)+'</div></div><div class=st2><div class=sn>📖 智慧</div><div class=sv>'+(S.wit||0)+'</div></div><div class=st2><div class=sn>⚔ 魄力</div><div class=sv>'+(S.bravo||0)+'</div></div><div class=st2><div class=sn>🏷 身份</div><div class=sv>'+idt+'</div></div><div class=st2><div class=sn>📅</div><div class=sv>第'+(S.day||1)+'日</div></div>';}
function updateAff(){var a=Math.round(S.affection);document.getElementById("aff-num").textContent=a;document.getElementById("aff-bar").style.width=a+"%";var el=document.getElementById("aff-level");if(el)el.textContent=getAffLabel(a);}
function showScene(title,text,choices,etag){document.getElementById("scene-title-text").textContent=title;document.getElementById("day-num").textContent="第 "+S.day+" 日";document.getElementById("event-tag").innerHTML=etag?'<span class=et>'+etag+'</span>':'';var t=Array.isArray(text)?text.map(function(p){return\'<p>\'+p+\'</p>\';}).join(\'\'):text;document.getElementById("scene-text").innerHTML=t;var h=\'\';if(choices&&choices.length>0){choices.forEach(function(c){var tp=c.type||\'safe\';var tm={safe:\'🍚\',risky:\'⚔\',love:\'💕\',smart:\'📖\',gov:\'🏛\'};var cm={safe:\'safe\',risky:\'risky\',love:\'love\',smart:\'smart\',gov:\'gov\'};var tcm={safe:\'t-safe\',risky:\'t-risky\',love:\'t-love\',smart:\'t-smart\',gov:\'t-gov\'};var dis=c.disabled?\'disabled \':\'\';h+=\'<button class="chc \'+cm[tp]+\'" \'+dis+\'data-next="\'+c.next+\'" data-type="\'+tp+\'"><span class="tag \'+tcm[tp]+\'">\'+tm[tp]+\'</span> \'+c.text+\'</button>\';});}document.getElementById("choices").innerHTML=h;document.getElementById("choices").onclick=function(e){var btn=e.target.closest(\'.chc\');if(btn&&!btn.disabled){go(btn.getAttribute("data-next"),btn.getAttribute("data-type"));}};document.getElementById("night-panel").classList.remove("on");}
function showNight(){document.getElementById("scene").classList.remove("on");document.getElementById("night-panel").classList.add("on");var h=\'\';var aff=S.affection;var hname=S.husband.name;var trait=S.trait?S.trait.id:"";var opts=[];opts.push({text:"和"+hname+"一起吃晚饭",next:"n_eat",type:"safe",tag:"🍚"});if(aff>=31)opts.push({text:"和他聊聊天",next:"n_talk",type:"love",tag:"💬"});if(aff>=51)opts.push({text:"说些体己话",next:"n_heart",type:"love",tag:"💕"});if(aff>=71)opts.push({text:"听他说说心事",next:"n_secret",type:"love",tag:"🌙"});if(trait==="sharp")opts.push({text:"一起算算家里的账",next:"n_account",type:"smart",tag:"📖"});if(S.nearFestival)opts.push({text:S.nearFestival+"将至，一起过节吧",next:"n_festival",type:"love",tag:"🏮"});if(S.husbandProblems&&S.husbandProblems.length>0)opts.push({text:"关心他的烦恼",next:"n_problem",type:"love",tag:"💞"});if(S.flags.husbandBirthdayDay&&!S.eventsTriggered.birthday_gift_sent&&S.day===S.flags.husbandBirthdayDay){opts.push({text:"今天是他的生日！给他送礼物",next:"n_birthday",type:"love",tag:"🎂"});}opts.push({text:"各自休息，明日再见",next:"n_sleep",type:"safe",tag:"🌙"});var cm={safe:\'safe\',risky:\'risky\',love:\'love\',smart:\'smart\',gov:\'gov\'};var tcm={safe:\'t-safe\',risky:\'t-risky\',love:\'t-love\',smart:\'t-smart\',gov:\'t-gov\'};var tm={safe:\'🍚\',risky:\'⚔\',love:\'💕\',smart:\'📖\',gov:\'🏛\'};opts.forEach(function(o){h+=\'<button class="chc \'+cm[o.type]+\'" data-next="\'+o.next+\'" data-type="\'+o.type+\'"><span class="tag \'+tcm[o.type]+\'">\'+tm[o.type]+\'</span> \'+o.text+\'</button>\';});document.getElementById("night-choices").innerHTML=h;document.getElementById("night-choices").onclick=function(e){var btn=e.target.closest(\'.chc\');if(btn){go(btn.getAttribute("data-next"),btn.getAttribute("data-type"));}};}

window.s1=function(){document.getElementById("cover").style.display="none";document.getElementById("step1").classList.add("on");var h=\'\';BGS.forEach(function(b,i){h+=\'<div class=cc data-i=\'+i+\'><div class=cn>\'+b.name+\'</div><div class=cd>\'+b.desc+\'</div><div class=ct>\';b.tags.forEach(function(t){h+=\'<span class=ch>\'+t+\'</span>\';});h+=\'</div></div>\';});document.getElementById("bg-grid").innerHTML=h;document.getElementById("bg-grid").onclick=function(e){var card=e.target.closest(\'.cc\');if(card){window._selBG(parseInt(card.getAttribute("data-i")));}};};
window._selBG=function(i){S.bg=BGS[i];var b=S.bg;if(b.init.money)S.money=b.init.money;if(b.init.prestige)S.prestige=b.init.prestige;if(b.init.social)S.social=b.init.social;if(b.init.wit)S.wit=b.init.wit;if(b.init.bravo)S.bravo=b.init.bravo;document.getElementById("sel-bg").innerHTML=\'<div class=sel>✓ 已选择：<strong>\'+b.name+\'</strong> — \'+b.desc+\'</div><button class=cbtn onclick="s2()">下一步 →</button>\';};
window.s2=function(){document.getElementById("step1").classList.remove("on");document.getElementById("step2").classList.add("on");var h=\'\';TRAITS.forEach(function(t,i){h+=\'<div class=cc data-i=\'+i+\'><div class=cn>\'+t.name+\'</div><div class=cd>\'+t.desc+\'</div><div class=ct>\';t.tags.forEach(function(tag){h+=\'<span class=ch>\'+tag+\'</span>\';});h+=\'</div></div>\';});document.getElementById("trait-grid").innerHTML=h;document.getElementById("trait-grid").onclick=function(e){var card=e.target.closest(\'.cc\');if(card){window._selTrait(parseInt(card.getAttribute("data-i")));}};};
window._selTrait=function(i){S.trait=TRAITS[i];var t=S.trait;if(t.effect.wit)S.wit+=t.effect.wit;if(t.effect.social)S.social+=t.effect.social;if(t.effect.bravo)S.bravo+=t.effect.bravo;if(t.effect.prestige)S.prestige+=t.effect.prestige;document.getElementById("sel-trait").innerHTML=\'<div class=sel>✓ 已选择：<strong>\'+t.name+\'</strong> — \'+t.desc+\'</div><button class=cbtn onclick="s3()">下一步 →</button>\';};
window.s3=function(){document.getElementById("step2").classList.remove("on");document.getElementById("step3").classList.add("on");var names=["念卿","锦绣","如玉","秋水","碧落","凝霜","映雪","思柔"];var dn=names[Math.floor(Math.random()*names.length)];var h=\'<div class=sel>身世：<strong>\'+(S.bg?S.bg.name:"?")+\'</strong>　心性：<strong>\'+(S.trait?S.trait.name:"?")+\'</strong></div>\';h+=\'<div class=nw><label class=nl>为自己取个名字</label><input class=ni type=text id=player-name value="\'+dn+\'" placeholder="输入你的名字…"></div>\';h+=\'<div style="color:#7a6a50;font-size:0.82em;margin:10px 0 4px">请选择你的夫君：</div><div class=cg id=h-grid>\';HUSBANDS.forEach(function(hs,i){h+=\'<div class=cc data-i=\'+i+\'><div class=cn>\'+hs.name+\'</div><div class=cd>\'+hs.desc+\'</div><div class=ct><span class=ch>\'+hs.bg+\'</span></div></div>\';});h+=\'</div><div id=sel-h></div>\';document.getElementById("sel-confirm").innerHTML=h;document.getElementById("h-grid").onclick=function(e){var card=e.target.closest(\'.cc\');if(card){window._selH(parseInt(card.getAttribute("data-i")));}};};
window._selH=function(i){S.husband=HUSBANDS[i];S.affection=50;document.getElementById("sel-h").innerHTML=\'<div class=sel>✓ 已选择夫君：<strong>\'+S.husband.name+\'</strong> — \'+S.husband.traits.join("、")+\'</div><button class=cbtn onclick="startGame()">✓ 确认，进入新婚</button>\';};
window.startGame=function(){initS();var ni=document.getElementById("player-name");S.playerName=(ni&&ni.value.trim())||"念卿";addLog("角色："+S.playerName+"（"+(S.bg?S.bg.name:"")+"·"+(S.trait?S.trait.name:"")+"）");addLog("婚配："+S.husband.name);S.flags.husbandBirthdayDay=45+Math.floor(Math.random()*21);S.flags.husbandBirthdayDone=false;document.getElementById("step3").classList.remove("on");showGame();document.getElementById("stats-bar").style.display="block";document.getElementById("sbar").classList.add("on");document.getElementById("aff-wrap").classList.add("on");renderStats();updateAff();introMatchmaker();};

function introMatchmaker(){addLog("🌟 媒婆来访");var tid=S.trait?S.trait.id:"";var extraNote="";var choices=[{text:"认真听她说每一家的情况",next:"m_detail",type:"smart"},{text:"问李婶哪户人家最有钱有势",next:"m_money",type:"smart"},{text:"催她快点定下婚期，懒得听",next:"m_hasty",type:"fierce"}];if(tid==="warm"){extraNote="（你温柔倾听，体会每家的不易）";S.affection+=3;}if(tid==="fierce"){extraNote="（泼辣的你直接切入正题，倒也痛快）";}showScene("议亲",["天刚蒙蒙亮，破旧的小院外便传来一阵敲门声。","媒婆李婶笑盈盈地推门进来，身后跟着几个提着礼盒的妇人。她上下打量着你，眼里闪着精明的光。","「好俊的姑娘！」李婶笑道，「你娘托我说合的亲事，我可费了好大劲。这镇上四户人家，个个人中龙凤——」"+extraNote,"她拍了拍手，身后的小厮抬上来四幅画像。"],choices,"🌟 重点剧情");}
function m_detail(){addLog("详听媒婆介绍");showScene("四户人家",["李婶闻言，眼底闪过一丝赞许，拉过板凳坐下——","「这第一户，顾家，书香门第，祖上出过秀才，如今虽家道中落，但顾家公子生得俊俏，性子也稳重……」","「这第二户，柳家，镇上布商柳老板的独子，家里有钱，人也活络，就是爱玩了些……」","「第三户，沈家，武勋世家，祖上跟过先帝打过仗，沈家公子话不多，但心思细腻……」","「第四户，楚家——」李婶顿了顿，「寒门子弟，孤儿寡弟。模样倒是好的，就是性子有些别扭。」"],[{text:"选顾长卿（书香门第·才华文静）",next:"m_choose",type:"safe"},{text:"选柳云舟（商贾之家·人缘活泼）",next:"m_choose",type:"safe"},{text:"选沈墨白（武勋世家·细腻机敏）",next:"m_choose",type:"safe"},{text:"选楚灼（寒门子弟·傲娇别扭）",next:"m_choose",type:"risky"}],"🌟 重点剧情");}
function m_money(){addLog("询问家境");showScene("四户人家",["李婶会心一笑，压低声音：","「要论家境，柳家最厚，布庄生意遍布三县，柳公子又是独子——啧啧。」","「但若论门第，顾家瘦死骆驼比马大，交往的都是读书人。」","「沈家名头响亮，可不复当年勇了。至于楚家——」她摇摇头，「孤儿寡弟的，能有什么好日子？」","她递上四幅画像，笑眯眯地等你自己挑。"],[{text:"选柳云舟（商贾之家有钱）",next:"m_choose",type:"safe"},{text:"选顾长卿（书香门第）",next:"m_choose",type:"safe"},{text:"选沈墨白（武勋世家）",next:"m_choose",type:"safe"},{text:"选楚灼（寒门子弟）",next:"m_choose",type:"risky"}],"🌟 重点剧情");}
function m_hasty(){S.bravo+=1;addLog("催促婚期 魄力+1");showScene("四户人家",["你不耐烦地摆摆手。李婶讪讪一笑，直接把四位公子的画像铺在你面前。","「好好好，姑娘爽快！那就让我老李直说了——」","她指着四幅画像，一一报出名号家世，末了补了一句：","「这婚期嘛，女尊王朝，男子及笄便要婚配。姑娘既已年过及笈，亲事——宜早不宜迟。」"],[{text:"选顾长卿（书香门第）",next:"m_choose",type:"safe"},{text:"选柳云舟（商贾之家）",next:"m_choose",type:"safe"},{text:"选沈墨白（武勋世家）",next:"m_choose",type:"safe"},{text:"选楚灼（寒门子弟）",next:"m_choose",type:"risky"}],"🌟 重点剧情");}
function m_choose