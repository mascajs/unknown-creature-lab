(function(root){
  'use strict';
  const CODES={lesson:'디싹 둔원초',review:'디싹 둔원초1',materials:'디싹 둔원초2'};
  const initial=()=>({version:4,name:'',avatar:'',motto:null,view:'welcome',opened:[false,false],surveys:[false,false],internIssued:false,rookieIssued:false,lessonUnlocked:false,reviewUnlocked:false,materialsUnlocked:false,aiIndex:0,aiComplete:false,observationComplete:false,index:0,correct:[false,false,false,false,false],internDate:'',rookieDate:''});
  const ready=s=>!!s.avatar&&[0,1,2].includes(s.motto);
  const intern=s=>s.name.trim()!==''&&s.surveys.every(Boolean)&&s.internIssued;
  const observed=s=>intern(s)&&s.lessonUnlocked&&s.aiComplete&&s.observationComplete;
  const reviewed=s=>observed(s)&&s.reviewUnlocked&&s.correct.every(Boolean);
  function canEnter(s,view){
    switch(view){
      case 'welcome':return true;
      case 'survey1':return !!s.name;
      case 'survey2':return !!s.name&&s.surveys[0];
      case 'intern-editor':return intern(s);
      case 'intern-badge':case 'lesson-gate':return intern(s)&&ready(s);
      case 'ai':return intern(s)&&ready(s)&&s.lessonUnlocked;
      case 'observation':return intern(s)&&ready(s)&&s.lessonUnlocked&&s.aiComplete;
      case 'after-observation':case 'review-gate':return observed(s)&&ready(s);
      case 'review':return observed(s)&&ready(s)&&s.reviewUnlocked;
      case 'graduate-editor':return reviewed(s)&&s.rookieIssued;
      case 'graduate-badge':return reviewed(s)&&s.rookieIssued&&ready(s);
      case 'materials-gate':return reviewed(s)&&s.rookieIssued&&ready(s);
      case 'materials':return reviewed(s)&&s.rookieIssued&&ready(s)&&s.materialsUnlocked;
      default:return false;
    }
  }
  function landing(s){return reviewed(s)&&s.rookieIssued?(ready(s)?'graduate-badge':'graduate-editor'):intern(s)?(ready(s)?'intern-badge':'intern-editor'):s.name?(s.surveys[0]?'survey2':'survey1'):'welcome'}
  function reduce(old,event){
    const s={...old,opened:[...old.opened],surveys:[...old.surveys],correct:[...old.correct]};
    switch(event.type){
      case 'start':{const name=String(event.name||'').trim().slice(0,12);if(!name)return old;s.name=name;s.view='survey1';break;}
      case 'open-survey':{const i=event.index;if(![0,1].includes(i)||!canEnter(s,i===0?'survey1':'survey2')||s.surveys[i])return old;s.opened[i]=true;break;}
      case 'confirm-survey':{const i=event.index;if(![0,1].includes(i)||!s.opened[i]||s.surveys[i]||!canEnter(s,i===0?'survey1':'survey2'))return old;s.surveys[i]=true;if(i===0)s.view='survey2';else{s.internIssued=true;s.view='intern-editor'}break;}
      case 'goto':if(!canEnter(s,event.view))return old;s.view=event.view;break;
      case 'unlock':{const code=String(event.code||'').trim().replace(/\s+/g,' ');if(!Object.hasOwn(CODES,event.stage)||code!==CODES[event.stage]||!ready(s))return old;if(event.stage==='lesson'&&intern(s)){s.lessonUnlocked=true;s.view='ai'}else if(event.stage==='review'&&observed(s)){s.reviewUnlocked=true;s.view='review'}else if(event.stage==='materials'&&canEnter(s,'materials-gate')){s.materialsUnlocked=true;s.view='materials'}else return old;break;}
      case 'ai-prev':if(!canEnter(s,'ai'))return old;s.aiIndex=Math.max(0,s.aiIndex-1);break;
      case 'ai-next':if(!canEnter(s,'ai'))return old;if(s.aiIndex<3)s.aiIndex++;else{s.aiComplete=true;s.view='observation'}break;
      case 'observation-complete':if(s.view!=='observation'||!canEnter(s,'observation'))return old;s.observationComplete=true;s.view='after-observation';break;
      case 'review-correct':if(!canEnter(s,'review')||event.index!==s.index||s.correct[s.index])return old;s.correct[s.index]=true;break;
      case 'review-next':if(!canEnter(s,'review')||!s.correct[s.index])return old;if(s.index<4)s.index++;else if(reviewed(s)){s.rookieIssued=true;s.view='graduate-badge'}break;
      case 'edit':if(!intern(s))return old;if(event.name!==undefined){const name=String(event.name).trim().slice(0,12);if(!name)return old;s.name=name;}if(event.avatar)s.avatar=event.avatar;if(event.motto!==undefined){if(![0,1,2].includes(event.motto))return old;s.motto=event.motto;}break;
      default:return old;
    }
    return s;
  }
  function restore(raw,avatarIds){
    const s=initial();
    if(!raw||![2,3,4].includes(raw.version))return s;
    s.name=typeof raw.name==='string'?raw.name.trim().slice(0,12):'';
    if(avatarIds.includes(raw.avatar)&&(raw.version>=3||raw.avatar!=='CasualAvatar_02'))s.avatar=raw.avatar;
    if(raw.version>=3&&[0,1,2].includes(raw.motto))s.motto=raw.motto;
    for(const key of ['opened','surveys','correct'])if(Array.isArray(raw[key])&&raw[key].length===s[key].length)s[key]=raw[key].map(x=>x===true);
    for(const key of ['internIssued','rookieIssued','lessonUnlocked','reviewUnlocked','aiComplete','observationComplete'])s[key]=raw[key]===true;
    if(raw.version<4&&!s.rookieIssued)s.reviewUnlocked=false;
    s.materialsUnlocked=raw.version===4&&raw.materialsUnlocked===true;
    s.aiIndex=Number.isInteger(raw.aiIndex)?Math.max(0,Math.min(3,raw.aiIndex)):0;
    s.index=Number.isInteger(raw.index)?Math.max(0,Math.min(4,raw.index)):0;
    for(const key of ['internDate','rookieDate'])if(typeof raw[key]==='string')s[key]=raw[key].slice(0,60);
    s.view=canEnter(s,raw.view)?raw.view:landing(s);
    return s;
  }
  const api={initial,ready,canEnter,landing,reduce,restore};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.CourseFlow=api;
})(typeof window==='undefined'?globalThis:window);
