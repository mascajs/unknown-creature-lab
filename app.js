const app=document.querySelector('#app');
const avatars=[['CasualAvatar_02','윙크 후드'],['CasualAvatar_05','민트 머리'],['CasualAvatar_06','별눈 헤드폰'],['CasualAvatar_07','브이 금발'],['new-boy-01','곱슬 안경'],['new-boy-02','활짝 헤드폰'],['CasualAvatar_00','윙크 긴머리'],['CasualAvatar_01','생각하는 단발'],['CasualAvatar_03','양갈래 안경'],['CasualAvatar_04','헤드폰 웨이브'],['CasualAvatar_08','리본 양갈래'],['CasualAvatar_09','분홍 머리띠']];
const questions=[
 {icon:'01',title:'우리 생활에서 AI를 만나는 순간은?',choices:['말을 알아듣고 노래를 틀어 주는 스피커','종이에 이름을 쓰는 순간','손으로 문고리를 돌리는 순간'],answer:0,hint:'사람의 말을 알아듣거나, 사진에서 얼굴을 알아보는 기능을 떠올려 봐요.',explain:'맞아요! 말을 알아듣는 스피커, 얼굴 잠금 해제, 사진첩 정리에서 AI를 만날 수 있어요.'},
 {icon:'02',title:'사진을 구분하는 AI는 어떻게 배울까요?',choices:['정답을 한 번만 보여 주면 모든 것을 알아요','아무 자료 없이 혼자 모든 것을 알아요','여러 사진을 보고 공통된 특징을 찾아요'],answer:2,hint:'곰 사진을 여러 장 보여 주면, 사진 속에서 어떤 공통점이 있는지 찾을 수 있어요.',explain:'맞아요! 여러 자료에서 특징을 배운 뒤, 새로운 자료를 구분해 봐요.'},
 {icon:'03',title:'처음 본 사진을 AI가 틀렸어요. 연구원은 어떻게 할까요?',choices:['AI의 답을 그대로 믿어요','다양한 자료를 더 주고, 다시 시험해요','결과를 확인하지 않고 수사를 끝내요'],answer:1,hint:'틀린 결과는 AI의 약점을 발견할 기회예요. 학습 자료를 바꾸면 어떨까요?',explain:'맞아요! 여러 각도와 다양한 모습의 자료를 더 주고, 결과가 달라졌는지 확인해요.'},
 {icon:'04',title:'연구소의 수사 순서로 알맞은 것은?',choices:['AI로 판별 → 수사 끝내기','결과부터 정하기 → 맞는 자료만 찾기','후보 세우기 → 자료 모으기 → AI로 판별 → 결과 검증'],answer:2,hint:'먼저 가능한 정체를 생각하고, 증거를 모아요. AI가 답한 뒤에도 확인할 단계가 남아 있어요.',explain:'맞아요! AI로 판별한 뒤에도 결과를 검증해야 수사가 끝나요.'},
 {icon:'05',title:'AI가 자신 있게 답했어요. 마지막 확인은 누구의 몫일까요?',choices:['근거를 살펴보는 사람','화면에 뜬 숫자','아무도 확인할 필요 없어요'],answer:0,hint:'AI도 비슷한 것들을 헷갈릴 수 있어요. 연구원에게 남은 역할을 생각해 봐요.',explain:'맞아요! AI의 답을 한 번 더 살펴보고, 근거를 확인한 뒤 내가 결정해야 해요.'}
];

const STORE='unknown-creature-lab.lesson1.v2';
const surveyLinks=['https://form.kosac.re.kr/v/VIHLdoOwDIszWe2C3UYh','https://form.kosac.re.kr/v/PmpAAAEjYWlNdvYG8roo'];
const surveyNames=['핵심역량 진단 사전 설문','교육 효과성 사전 설문'];
const audioFiles=[{label:'고라니',file:'water-deer.mp3'},{label:'고양이',file:'cat.mp3'},{label:'너구리',file:'raccoon.mp3'},{label:'부엉이',file:'owl.mp3'}];
const ranks={intern:{name:'인턴연구원',status:'인턴 등록 완료',color:'#8a663a',date:'internDate'},rookie:{name:'신입연구원',status:'신입 승급 완료',color:'#214f40',date:'rookieDate'}};
const mottos=[
 ['AI를 잘 활용하되,','결정은 반드시 내가 한다!'],
 ['AI의 답은 한 번 더 확인하고,','근거를 보고 내가 결정한다!'],
 ['AI는 나를 돕는 도구,','마지막 선택은 내가 한다!']
];
const aiPages=[
 {title:'AI는 이미 우리 곁에 있어요',body:'얼굴로 휴대폰 잠금을 풀거나, 사진첩에서 같은 사람의 사진을 모을 때도 AI를 만날 수 있어요.',question:'여러분은 어디에서 AI를 만났나요?'},
 {title:'누가 하나하나 가르친 걸까요?',body:'사람이 학습할 자료를 준비하면, AI는 자료에서 공통된 특징을 찾도록 학습해요.',question:'모든 사진의 규칙을 사람이 하나씩 적어 줘야 할까요?'},
 {title:'사진을 구분하는 AI는 이렇게 배워요',steps:['여러 사진을 살펴봐요','공통된 특징을 익혀요','처음 보는 사진을 예측해요'],body:'처음 보는 사진을 구분할 때, 학습한 특징을 사용해요.'},
 {title:'이제 단서를 찾아볼까요?',body:'가려진 그림의 일부를 보고 정체를 추측해 보세요. 어떤 단서를 보고 생각했는지도 이야기해 주세요.',question:'단서가 바뀌면 생각도 달라질까요?'}
];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let state=CourseFlow.initial();
try{state=CourseFlow.restore(JSON.parse(sessionStorage.getItem(STORE)),avatars.map(a=>a[0]));}catch{}
function persist(){try{sessionStorage.setItem(STORE,JSON.stringify(state));}catch{}}
function focusTitle(){requestAnimationFrame(()=>document.querySelector('h1,h2')?.focus({preventScroll:true}));}
function today(){return new Intl.DateTimeFormat('ko-KR',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());}
function send(event,draw=true){
  const prev=state;state=CourseFlow.reduce(state,event);
  if(!prev.internIssued&&state.internIssued)state.internDate=today();
  if(!prev.rookieIssued&&state.rookieIssued)state.rookieDate=today();
  persist();if(draw)render();return state!==prev;
}
function go(view){send({type:'goto',view});}
function rankForView(){return state.view.startsWith('graduate')?'rookie':'intern';}
function avatarMarkup(avatar=state.avatar){
  const chosen=avatars.find(a=>a[0]===avatar);
  return chosen?`<img src="assets/${chosen[0]}.png" alt="${esc(chosen[1])} 캐릭터">`:'<span class="portrait-placeholder">캐릭터를<br>골라 주세요.</span>';
}
function mottoMarkup(index=state.motto){return mottos[index]?mottos[index].map(esc).join('<br>'):'<span class="motto-placeholder">나의 다짐을 골라 주세요.</span>';}
function badge(rank='intern',sample=false){
  const r=ranks[rank];
  return `<div class="badge-wrap"><div class="lanyard ${rank}" aria-hidden="true"></div><article class="badge ${rank} ${sample?'':'issued'}" aria-label="${r.name}증"><div class="badge-top"><span>UNKNOWN CREATURE LAB</span><span class="status">${sample?'등록 준비':r.status}</span></div><div class="portrait ${sample||!state.avatar?'unselected':''}">${avatarMarkup(sample?'':state.avatar)}</div><div class="rank">둔원초등학교 ${r.name}</div><div class="badge-name" id="badge-name">${esc(sample?'나의 이름':state.name)}</div><div class="badge-line">${mottoMarkup(sample?null:state.motto)}</div>${!sample&&state[r.date]?`<div class="badge-date">${esc(state[r.date])}</div>`:''}</article></div>`;
}
function welcome(){
  app.innerHTML=`<section class="hero enter"><div><div class="eyebrow">UNKNOWN CREATURE LAB</div><h1 tabindex="-1">미확인생물 연구소에<br><span class="accent">오신 것을 환영해요!</span></h1><p class="home-guide">신입연구원이 되기 위해 세 가지 과정을 함께해요.</p><ol class="journey"><li><b>입소 설문에 답해요.</b><span>설문 두 개를 마치면 인턴연구원증을 받아요.</span></li><li><b>선생님과 AI를 살펴봐요.</b><span>짧은 설명을 듣고, 단서로 정체를 추측해요.</span></li><li><b>오늘 배운 내용을 복습해요.</b><span>다섯 문제를 풀면 신입연구원으로 승급해요.</span></li></ol><form id="start-form"><label for="name">연구원증에 넣을 이름 또는 별명</label><input id="name" maxlength="12" placeholder="이름 또는 별명을 입력해 주세요" autocomplete="off" required value="${esc(state.name)}"><p class="error" id="name-error" role="alert"></p><button class="primary" type="submit">${state.internIssued?'내 연구원증 보기 →':'첫 번째 설문으로 →'}</button></form><p class="note home-note">연구원증에 쓸 이름과 진행 상태는 이 브라우저에서만 기억해요.</p></div><div>${badge('intern',true)}<p class="sample-caption">설문 두 개를 제출하면 인턴연구원으로 등록돼요.</p></div></section>`;
  document.querySelector('#start-form').onsubmit=e=>{e.preventDefault();const name=document.querySelector('#name').value.trim();if(!name){document.querySelector('#name-error').textContent='이름 또는 별명을 입력해 주세요.';return;}if(state.internIssued)go(state.rookieIssued?'graduate-badge':'intern-badge');else send({type:'start',name});};
}
function survey(index){
  app.innerHTML=`<section class="registration enter"><p class="eyebrow">입소 설문 ${index+1} / 2</p><h1 tabindex="-1">${index===0?'먼저, 여러분의<br>생각을 들려주세요.':'첫 설문을 마쳤어요.<br>하나만 더 함께해요!'}</h1><p>설문에는 정답이 없어요. 지금 내 생각과 가장 가까운 답을 솔직하게 골라 주세요.</p><div class="institution"><p>운영기관을 묻는 항목에서는 아래 이름을 골라 주세요.</p><strong>대전과학기술대학교 산학협력단</strong></div><h2>${surveyNames[index]}</h2><a id="survey-link" class="primary survey-link" href="${surveyLinks[index]}" target="_blank" rel="noopener">${index+1}번째 설문 열기 ↗</a><p class="note home-note">새 창에서 설문을 제출한 뒤 이 화면으로 돌아와 주세요.<br>제출을 마쳤다면 아래 버튼을 눌러 주세요.</p><button id="confirm-survey" class="secondary" ${state.opened[index]?'':'disabled'}>설문을 제출했어요 ${index===0?'· 다음 설문으로 →':'· 인턴연구원증 받기 →'}</button><p class="survey-order">${index===0?'두 번째 설문은 첫 번째 설문을 마친 뒤 열려요.':'두 설문을 제출하면 인턴연구원이 될 수 있어요.'}</p></section>`;
  document.querySelector('#survey-link').addEventListener('click',()=>{send({type:'open-survey',index},false);document.querySelector('#confirm-survey').disabled=false;});
  document.querySelector('#confirm-survey').onclick=()=>send({type:'confirm-survey',index});
}
function certificate(rank){
  const intern=rank==='intern';
  app.innerHTML=`<section class="complete enter"><div class="success">✓ ${intern?'인턴연구원 등록 완료':'신입연구원 승급 완료'}</div><h1 tabindex="-1">${esc(state.name)} ${ranks[rank].name},<br>${intern?'연구소에 오신 것을 환영해요!':'오늘의 훈련을 잘 마쳤어요!'}</h1><p>${intern?'연구원증을 저장하고, 선생님의 안내에 따라 AI 기초훈련을 시작해요.':'수업에서 배운 내용을 확인했어요. 이제 신입연구원증을 저장해 주세요.'}</p>${badge(rank)}<div class="actions"><button id="download" class="primary">${ranks[rank].name}증 이미지 저장</button><button id="edit-badge" class="secondary">이름·캐릭터·다짐 수정</button>${intern?'<button id="print" class="secondary">인쇄하기</button>':''}</div><p class="print-help">저장한 이미지는 다운로드 폴더에서 찾을 수 있어요.</p><p id="save-status" class="error" role="status"></p><div class="course-next">${intern?state.rookieIssued?'<button id="graduate-copy" class="primary">신입연구원증 보기 →</button>':`<button id="lesson-entry" class="primary">${state.lessonUnlocked?'AI 기초훈련 이어 보기':'AI 기초훈련 열기'} →</button>${state.observationComplete?'<button id="review-entry" class="secondary">오늘의 복습으로 →</button>':''}`:'<button id="materials-entry" class="primary">오늘의 자료실 열기 →</button><button id="intern-copy" class="secondary">인턴연구원증 다시 보기</button>'}</div><button id="restart" class="text-button">다른 연구원 시작하기</button></section>`;
  document.querySelector('#download').onclick=()=>download(rank);
  document.querySelector('#edit-badge').onclick=()=>go(intern?'intern-editor':'graduate-editor');
  if(intern)document.querySelector('#print').onclick=()=>window.print();
  document.querySelector('#restart').onclick=()=>{state=CourseFlow.initial();persist();render();};
  if(intern&&state.rookieIssued)document.querySelector('#graduate-copy').onclick=()=>go('graduate-badge');
  else if(intern){document.querySelector('#lesson-entry').onclick=()=>go(state.lessonUnlocked?'ai':'lesson-gate');const review=document.querySelector('#review-entry');if(review)review.onclick=()=>go(state.reviewUnlocked?'review':'review-gate');}
  else{document.querySelector('#intern-copy').onclick=()=>go('intern-badge');document.querySelector('#materials-entry').onclick=()=>go(state.materialsUnlocked?'materials':'materials-gate');}
}
function editor(rank){
  app.innerHTML=`<section class="editor enter"><div><p class="eyebrow">${ranks[rank].name}증 꾸미기</p><h1 tabindex="-1">나의 캐릭터와<br><span class="accent">다짐을 골라 주세요.</span></h1><p>캐릭터 하나와 나의 다짐 하나를 고르면 연구원증이 완성돼요.</p><label for="edit-name">연구원 이름</label><input id="edit-name" maxlength="12" value="${esc(state.name)}" autocomplete="off"><label>나의 캐릭터 · 남학생 6종 / 여학생 6종</label><div class="avatars" role="group" aria-label="캐릭터 선택">${avatars.map(([id,name],i)=>`${i===0?'<h3 class="avatar-group">남학생 캐릭터 · 6종</h3>':i===6?'<h3 class="avatar-group">여학생 캐릭터 · 6종</h3>':''}<button class="avatar ${id===state.avatar?'selected':''}" data-avatar="${id}" aria-pressed="${id===state.avatar}"><img src="assets/${id}.png" alt="">${name}</button>`).join('')}</div><fieldset class="motto-choices"><legend>연구원증에 넣을 나의 다짐</legend>${mottos.map((lines,i)=>`<label class="motto-choice"><input type="radio" name="motto" value="${i}" ${state.motto===i?'checked':''}><span>${lines.map(esc).join('<br>')}</span></label>`).join('')}</fieldset><p id="issue-error" class="error" role="alert"></p><button id="save-badge" class="primary" ${CourseFlow.ready(state)?'':'disabled'}>이 모습으로 연구원증 만들기 →</button></div><div>${badge(rank)}<p class="sample-caption">캐릭터와 다짐을 고르면 연구원증에 바로 보여요.</p></div></section>`;
  document.querySelector('#edit-name').oninput=e=>{document.querySelector('#badge-name').textContent=e.target.value||'나의 이름';};
  document.querySelectorAll('[data-avatar]').forEach(b=>b.onclick=()=>{send({type:'edit',avatar:b.dataset.avatar},false);document.querySelectorAll('[data-avatar]').forEach(x=>{x.classList.toggle('selected',x===b);x.setAttribute('aria-pressed',String(x===b));});const portrait=document.querySelector('.portrait');portrait.innerHTML=avatarMarkup();portrait.classList.remove('unselected');document.querySelector('#save-badge').disabled=!CourseFlow.ready(state);});
  document.querySelectorAll('input[name="motto"]').forEach(radio=>radio.onchange=()=>{send({type:'edit',motto:Number(radio.value)},false);document.querySelector('.badge-line').innerHTML=mottoMarkup();document.querySelector('#save-badge').disabled=!CourseFlow.ready(state);});
  document.querySelector('#save-badge').onclick=()=>{const name=document.querySelector('#edit-name').value.trim();if(!name){document.querySelector('#issue-error').textContent='연구원 이름을 입력해 주세요.';return;}if(!CourseFlow.ready(state))return;send({type:'edit',name},false);go(rank==='intern'?'intern-badge':'graduate-badge');};
}
function codeGate(stage){
  const config={lesson:{label:'AI 기초훈련',body:'인턴연구원 등록을 마쳤어요. 선생님이 알려 주시는 코드를 입력하면 AI 기초훈련이 열려요.',action:'AI 기초훈련 시작하기'},review:{label:'오늘의 복습',body:'오늘 수업을 마쳤다면 복습을 시작해요. 선생님이 알려 주시는 새로운 코드를 입력해 주세요.',action:'복습 시작하기'},materials:{label:'2차시 · 사건파일 #1',body:'신입연구원으로 첫 사건을 조사할 준비를 해요. 선생님이 알려 주시는 자료실 코드를 입력해 주세요.',action:'오늘의 자료실 열기'},audio:{label:'CASE FILE #2 · 3차시 자료실',body:'이번에는 소리로 정체를 조사해요. 선생님이 알려 주시는 새 코드를 입력하면 울음소리 자료를 받을 수 있어요.',action:'3차시 자료실 열기'}}[stage];
  const materials=stage==='materials',audio=stage==='audio';
  app.innerHTML=`<section class="code-gate ${audio?'audio-room ':''}enter"><p class="eyebrow">${config.label}</p><h1 tabindex="-1">선생님의 안내를 듣고<br>코드를 입력해 주세요.</h1><p>${config.body}</p><form id="code-form"><label for="course-code">수업 코드</label><input id="course-code" autocomplete="off" placeholder="선생님이 알려 주시는 코드" required><p id="code-error" class="error" role="alert"></p><button class="primary" type="submit">${config.action} →</button></form><button id="back-badge" class="text-button">${audio?'2차시 자료실로 돌아가기':`내 ${materials?'신입':'인턴'}연구원증으로 돌아가기`}</button></section>`;
  document.querySelector('#code-form').onsubmit=e=>{e.preventDefault();const opened=send({type:'unlock',stage,code:document.querySelector('#course-code').value},false);if(opened)render();else document.querySelector('#code-error').textContent='코드가 맞지 않아요. 선생님이 알려 주신 글자와 띄어쓰기를 확인해 주세요.';};
  document.querySelector('#back-badge').onclick=()=>go(audio?'materials':materials?'graduate-badge':'intern-badge');
}
function materialsRoom(){
  const files=[
    {file:'case-file-1.png',download:'사건파일#1.png',label:'사건파일 #1',tag:'제보 사진 · PNG',body:'학습을 마친 AI에 이 사진을 넣고 정체를 추측해 보세요.'},
    {file:'bear-cards.zip',download:'곰카드_20장.zip',label:'곰 카드',tag:'학습 자료 · 20장 · ZIP',body:'곰의 다양한 모습을 담은 카드 20장이 들어 있어요.'},
    {file:'gorilla-cards.zip',download:'고릴라카드_20장.zip',label:'고릴라 카드',tag:'학습 자료 · 20장 · ZIP',body:'고릴라의 다양한 모습을 담은 카드 20장이 들어 있어요.'},
    {file:'human-cards.zip',download:'사람카드_20장.zip',label:'사람 카드',tag:'학습 자료 · 20장 · ZIP',body:'사람의 다양한 모습을 담은 카드 20장이 들어 있어요.'}
  ];
  app.innerHTML=`<section class="materials-room enter"><p class="eyebrow">CASE FILE #1 · 2차시 자료실</p><h1 tabindex="-1">설산의 거인,<br><span class="accent">정체를 밝혀 주세요.</span></h1><p>웹캠을 사용할 수 없다면 아래 카드로 AI를 학습시켜 보세요.<br>곰·고릴라·사람 카드의 압축을 풀고, 각 종류의 사진을 알맞은 클래스에 올려 주세요.</p><div class="material-files">${files.map(f=>`<article class="material-file"><p class="material-tag">${f.tag}</p><h2>${f.label}</h2><p>${f.body}</p><a class="primary material-download" href="materials/${f.file}" download="${f.download}">${f.label} 내려받기 ↓</a></article>`).join('')}</div><p class="note material-help">내려받은 파일은 다운로드 폴더에서 찾을 수 있어요. ZIP 파일은 먼저 압축을 풀어 주세요.<br>사건파일은 학습용 카드에 섞지 않고, 학습을 마친 뒤 판별할 때 사용해요.</p><div class="actions"><button id="audio-entry" class="primary">3차시 자료실 열기 →</button><button id="back-graduate" class="secondary">내 신입연구원증 보기</button></div></section>`;
  document.querySelector('#back-graduate').onclick=()=>go('graduate-badge');
  document.querySelector('#audio-entry').onclick=()=>go(state.audioUnlocked?'audio-materials':'audio-gate');
}
function audioMaterialsRoom(){
  app.innerHTML=`<section class="materials-room audio-room enter"><p class="eyebrow">CASE FILE #2 · 3차시 자료실</p><h1 tabindex="-1">한밤의 울음소리,<br><span class="accent">정체를 찾아 주세요.</span></h1><p>울음소리 파일을 내려받고, 소리의 특징을 살펴보세요.<br>선생님의 안내에 따라 AI를 학습시키거나 판별할 때 사용해요.</p><div class="material-files audio-files">${audioFiles.map(f=>`<article class="material-file"><p class="material-tag">울음소리 · MP3</p><h2>${f.label}</h2><p>${f.label}의 울음소리 파일이에요.</p><a class="primary material-download" href="materials/${f.file}" download="${f.label}_울음소리.mp3">${f.label} 소리 내려받기 ↓</a></article>`).join('')}</div><p class="note material-help">내려받은 MP3는 다운로드 폴더에서 찾을 수 있어요. 압축을 풀지 않고 바로 사용할 수 있어요.</p><button id="back-materials" class="secondary">2차시 자료실로 돌아가기</button></section>`;
  document.querySelector('#back-materials').onclick=()=>go('materials');
}
function aiLesson(){
  const p=aiPages[state.aiIndex];
  app.innerHTML=`<section class="lesson-room enter"><div class="quiz-top"><span>AI 기초훈련</span><span>${state.aiIndex+1} / ${aiPages.length}</span></div><h1 tabindex="-1">${p.title}</h1>${p.steps?`<ol class="learning-steps">${p.steps.map((s,i)=>`<li><b>0${i+1}</b><span>${s}</span></li>`).join('')}</ol>`:''}<p class="lesson-copy">${p.body}</p>${p.question?`<p class="lesson-question">${p.question}</p>`:''}<div class="lesson-controls"><button id="ai-prev" class="secondary" ${state.aiIndex===0?'disabled':''}>← 이전</button><button id="ai-next" class="primary">${state.aiIndex===3?'관찰 퀴즈 시작하기 →':'다음으로 →'}</button></div></section>`;
  document.querySelector('#ai-prev').onclick=()=>send({type:'ai-prev'});
  document.querySelector('#ai-next').onclick=()=>send({type:'ai-next'});
}
function observation(){
  app.innerHTML='<iframe id="observation-frame" class="observation-frame" src="opening.html?course=1" title="단서로 추측하는 관찰 퀴즈" allow="fullscreen"></iframe><button id="observation-back" class="observation-back" aria-label="인턴연구원증으로 돌아가기">↩</button>';
  document.querySelector('#observation-back').onclick=()=>go('intern-badge');
}
window.addEventListener('message',e=>{const frame=document.querySelector('#observation-frame');if(!frame||e.source!==frame.contentWindow||e.origin!==location.origin||e.data?.type!=='mystery-observation-complete')return;send({type:'observation-complete'});});
function afterObservation(){
  app.innerHTML=`<section class="registration enter"><p class="eyebrow">관찰 훈련 완료</p><h1 tabindex="-1">단서로 정체를<br>추측해 보았어요!</h1><p>이제 선생님과 수업을 이어 가세요.<br>오늘 수업을 마친 뒤, 배운 내용을 다섯 문제로 확인해요.</p><div class="actions"><button id="review-entry" class="primary">오늘의 복습 열기 →</button><button id="back-badge" class="secondary">내 인턴연구원증 보기</button></div><p class="note">복습은 선생님이 알려 주시는 코드를 입력하면 열려요.</p></section>`;
  document.querySelector('#review-entry').onclick=()=>go(state.reviewUnlocked?'review':'review-gate');
  document.querySelector('#back-badge').onclick=()=>go('intern-badge');
}
function review(){
  const q=questions[state.index],solved=state.correct[state.index];
  app.innerHTML=`<section class="quiz enter"><div class="quiz-top"><span>${esc(state.name)} 인턴연구원의 오늘의 복습</span><span>${state.index+1} / 5</span></div><div class="progress" aria-label="${state.correct.filter(Boolean).length}문제 완료">${state.correct.map(x=>`<span class="${x?'done':''}"></span>`).join('')}</div><p class="eyebrow">REVIEW ${q.icon}</p><h2 tabindex="-1">${q.title}</h2><p>오늘 배운 내용을 떠올리며 알맞은 답을 하나 골라 주세요.</p><div class="options">${q.choices.map((c,i)=>`<button class="option ${solved&&i===q.answer?'correct':''}" data-answer="${i}" ${solved?'disabled':''}><b>${i+1}</b><span>${c}</span></button>`).join('')}</div><div class="feedback ${solved?'':'hidden'}" id="feedback" role="status" aria-live="polite">${solved?q.explain:''}</div><div class="quiz-bottom"><span class="note">틀려도 힌트를 보고 다시 풀 수 있어요.</span><button class="primary ${solved?'':'hidden'}" id="next">${state.index===4?'신입연구원으로 승급하기 →':'다음 문제 →'}</button></div></section>`;
  document.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>answer(Number(b.dataset.answer),b));
  document.querySelector('#next').onclick=()=>send({type:'review-next'});
}
function answer(index,button){
  if(state.correct[state.index]||button.disabled)return;
  const q=questions[state.index],feedback=document.querySelector('#feedback');feedback.classList.remove('hidden');
  if(index!==q.answer){button.classList.add('wrong');button.disabled=true;feedback.classList.add('hint');feedback.textContent='다시 생각해 볼까요? '+q.hint;[...document.querySelectorAll('[data-answer]')].find(b=>!b.disabled)?.focus();return;}
  send({type:'review-correct',index:state.index});requestAnimationFrame(()=>document.querySelector('#next')?.focus());
}
function render(){
  if(!CourseFlow.canEnter(state,state.view)){state.view=CourseFlow.landing(state);persist();}
  document.body.classList.toggle('observing',state.view==='observation');
  document.body.classList.toggle('audio-materials',state.view==='audio-gate'||state.view==='audio-materials');
  const routes={welcome:welcome,survey1:()=>survey(0),survey2:()=>survey(1),'intern-badge':()=>certificate('intern'),'graduate-badge':()=>certificate('rookie'),'intern-editor':()=>editor('intern'),'graduate-editor':()=>editor('rookie'),'lesson-gate':()=>codeGate('lesson'),'review-gate':()=>codeGate('review'),'materials-gate':()=>codeGate('materials'),materials:materialsRoom,'audio-gate':()=>codeGate('audio'),'audio-materials':audioMaterialsRoom,ai:aiLesson,observation:observation,'after-observation':afterObservation,review:review};
  routes[state.view]();if(state.view!=='observation'){window.scrollTo(0,0);focusTitle();}
}
function hashRoute(){
  const h=location.hash.slice(1);let view;
  if(h==='badge')view=state.rookieIssued?'graduate-badge':'intern-badge';
  if(h==='ai')view=state.lessonUnlocked?'ai':'lesson-gate';
  if(h==='review')view=state.reviewUnlocked?'review':'review-gate';
  if(h==='observation')view='observation';
  if(h==='materials')view=state.materialsUnlocked?'materials':'materials-gate';
  if(h==='audio')view=state.audioUnlocked?'audio-materials':'audio-gate';
  if(view&&CourseFlow.canEnter(state,view))state.view=view;
  else if(view)state.view=CourseFlow.landing(state);
  persist();render();
}
window.addEventListener('hashchange',hashRoute);
async function download(rank){
  if(!CourseFlow.ready(state))return;
  const r=ranks[rank],button=document.querySelector('#download');button.disabled=true;button.textContent='이미지 준비 중…';
  try{
    await document.fonts.ready;
    const canvas=document.createElement('canvas');canvas.width=900;canvas.height=1200;const c=canvas.getContext('2d');
    c.fillStyle='#fff';c.fillRect(0,0,900,1200);c.fillStyle=r.color;c.fillRect(0,0,900,205);c.textAlign='center';c.fillStyle='#fff';c.font='bold 43px LaundryGothic, sans-serif';c.fillText('미확인생물 연구소',450,100);c.font='24px LaundryGothic, sans-serif';c.fillText(r.status,450,155);
    c.fillStyle='#eaf0dc';c.beginPath();c.arc(450,425,145,0,Math.PI*2);c.fill();const image=new Image();image.src=`assets/${state.avatar}.png`;await image.decode();c.save();c.beginPath();c.arc(450,425,145,0,Math.PI*2);c.clip();c.drawImage(image,305,280,290,290);c.restore();
    c.fillStyle='#183a3c';let size=70;c.font=`bold ${size}px LaundryGothic, sans-serif`;while(c.measureText(state.name).width>770&&size>30)c.font=`bold ${--size}px LaundryGothic, sans-serif`;c.fillText(state.name,450,680);c.font='27px LaundryGothic, sans-serif';c.fillStyle='#607269';c.fillText('둔원초등학교 '+r.name,450,745);
    c.fillStyle='#eaf0dc';c.fillRect(65,815,770,145);c.fillStyle='#214f40';c.font='bold 28px LaundryGothic, sans-serif';c.fillText(mottos[state.motto][0],450,871);c.fillText(mottos[state.motto][1],450,917);c.font='23px LaundryGothic, sans-serif';c.fillStyle='#607269';c.fillText(state[r.date],450,1060);c.font='15px LaundryGothic, sans-serif';c.fillText('캐릭터: Kitsuge Apps + 신규 제작',450,1160);
    const blob=await new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('이미지 변환 실패')),'image/png'));
    const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`미확인생물연구소_${r.name}증_${state.name.replace(/[\\/:*?"<>|]/g,'_')}.png`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),10000);document.querySelector('#save-status').textContent=r.name+'증 이미지를 저장했어요. 다운로드 폴더를 확인해 주세요.';
  }catch{document.querySelector('#save-status').textContent='이미지 저장이 어려워요. 잠시 뒤 다시 시도해 주세요.';}
  finally{button.disabled=false;button.textContent=r.name+'증 이미지 저장';}
}
hashRoute();
