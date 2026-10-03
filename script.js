
const $=(s)=>document.querySelector(s), $$=(s)=>document.querySelectorAll(s);

window.addEventListener('scroll',()=>{
  const max=document.documentElement.scrollHeight-innerHeight;
  $('#progress').style.width=(scrollY/max*100)+'%';
});
window.addEventListener('mousemove',e=>{
  const g=$('#cursorGlow'); g.style.left=e.clientX+'px'; g.style.top=e.clientY+'px';
});
const io=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(e.isIntersecting)e.target.classList.add('visible');
}),{threshold:.12});
$$('.reveal').forEach(el=>io.observe(el));

const typeData={
 micro:{title:'Microcytic pattern',copy:'A lower MCV means the average red blood cell is smaller. Iron deficiency is one possible cause, but thalassemia and other conditions can also produce microcytosis.'},
 normo:{title:'Normocytic pattern',copy:'The cells are average size, but anemia can still be present. Possible causes include sudden blood loss, kidney disease, chronic disease, aplastic anemia, and others.'},
 macro:{title:'Macrocytic pattern',copy:'A higher MCV means larger average red blood cells. Vitamin B12 or folate deficiency can produce this pattern, although other causes are possible.'}
};
function showType(k){$('#typeDetail').innerHTML=`<h3>${typeData[k].title}</h3><p>${typeData[k].copy}</p>`}
showType('micro');
$$('.mcv-card').forEach(b=>b.onclick=()=>{$$('.mcv-card').forEach(x=>x.classList.remove('active'));b.classList.add('active');showType(b.dataset.type)});

const labData={
 hgb:['HGB','Hemoglobin','Hemoglobin is the iron-containing protein in red blood cells that carries oxygen. A low hemoglobin level can support a diagnosis of anemia, but the cause requires context and often more testing.'],
 hct:['HCT','Hematocrit','Hematocrit is the percentage of blood volume made up of red blood cells. It is interpreted together with hemoglobin and other CBC values.'],
 mcv:['MCV','Mean corpuscular volume','MCV is the average size of red blood cells. Low, normal, and high MCV patterns can help narrow the differential diagnosis.'],
 rdw:['RDW','Red-cell distribution width','RDW reflects how much red blood cell size varies. It is one of several RBC indices clinicians can use to characterize an anemia pattern.'],
 ferritin:['FER','Ferritin','Ferritin helps assess stored iron. A low ferritin level supports iron deficiency, while interpretation can be more complex in some inflammatory conditions.'],
 iron:['Fe','Iron studies','Iron evaluation may include serum iron, transferrin or TIBC, ferritin, and transferrin saturation. Together they help assess iron availability and storage.']
};
function showLab(k){const [abbr,name,copy]=labData[k];$('#labContent').innerHTML=`<p class="kicker wine">SELECTED TEST</p><div class="lab-value">${abbr}</div><h3>${name}</h3><p class="lab-copy">${copy}</p><p class="kicker wine">REMEMBER</p><p class="lab-copy">Reference ranges vary by laboratory, age, sex, pregnancy status, and clinical context. Your healthcare professional interprets the result as part of the whole picture.</p>`}
showLab('hgb');
$$('.lab-btn').forEach(b=>b.onclick=()=>{$$('.lab-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active');showLab(b.dataset.lab)});

const buddies={
 beans:['🍅','Tomatoes','Beans provide nonheme iron. Tomatoes bring vitamin C to the combo.'],
 cereal:['🍓','Strawberries','Iron-fortified cereal + vitamin C-rich strawberries = a smart pairing.'],
 spinach:['🫑','Sweet peppers','Spinach contains nonheme iron, and sweet peppers are rich in vitamin C.']
};
$$('.food-buttons button').forEach(b=>b.onclick=()=>{
 const [emoji,name,copy]=buddies[b.dataset.food];
 $('#buddy').innerHTML=`<span>${emoji}</span><h3>${name}!</h3><p>${copy}</p>`;
});

const quiz=[
 {q:'What does a low MCV tell you?',a:['You definitely have iron deficiency','Your red blood cells are smaller than average','You need a blood transfusion'],correct:1,why:'MCV describes average red-cell size. Low MCV is microcytic, but it does not identify the cause by itself.'},
 {q:'Which pair can help improve absorption of plant iron?',a:['Lentils + tomatoes','Beans + coffee','Spinach + tea'],correct:0,why:'Vitamin C-rich foods such as tomatoes can improve absorption of nonheme iron.'},
 {q:'IV iron and a blood transfusion are…',a:['Exactly the same','Different treatments','Always given together'],correct:1,why:'IV iron delivers iron through a vein; a transfusion delivers donor blood.'},
 {q:'If hemoglobin is low, should everyone immediately take high-dose iron?',a:['Yes','No'],correct:1,why:'No. Not every anemia is iron deficiency, and too much iron can be harmful.'}
];
let qi=0,score=0,locked=false;
function renderQ(){
 locked=false; const q=quiz[qi];
 $('#qCount').textContent=`QUESTION ${qi+1} / ${quiz.length}`; $('#score').textContent=`SCORE ${score}`;
 $('#question').textContent=q.q; $('#feedback').textContent=''; $('#nextQ').classList.add('hidden');
 $('#answers').innerHTML=q.a.map((x,i)=>`<button class="answer" data-i="${i}">${x}</button>`).join('');
 $$('.answer').forEach(b=>b.onclick=()=>answer(+b.dataset.i));
}
function answer(i){
 if(locked)return;locked=true;const q=quiz[qi],buttons=$$('.answer');
 buttons[i].classList.add(i===q.correct?'good':'bad');buttons[q.correct].classList.add('good');
 if(i===q.correct)score++;
 $('#score').textContent=`SCORE ${score}`;$('#feedback').textContent=q.why;
 $('#nextQ').textContent=qi===quiz.length-1?'See my result ✦':'Next question →';$('#nextQ').classList.remove('hidden');
}
$('#nextQ').onclick=()=>{
 if(qi<quiz.length-1){qi++;renderQ()}else{
  $('#quizCard').innerHTML=`<p class="kicker gold-text">YOUR RESULT</p><h3>${score}/${quiz.length}</h3><p>${score===quiz.length?'Okayyy blood expert ✨ You got every question right.':'Nice work. Scroll back through any section you want to review, then try again.'}</p><button class="cta gold" onclick="location.reload()">Restart experience ↻</button>`;
 }
};
renderQ();

// ========================================
// MOOD / THEME SWITCHER
// ========================================

const themeBtn = document.getElementById("themeBtn");

const themes = [
    {
        className: "theme-emerald",
        name: "Emerald Luxe",
        icon: "✦"
    },
    {
        className: "theme-burgundy",
        name: "Burgundy Noir",
        icon: "♥"
    },
    {
        className: "theme-sapphire",
        name: "Midnight Sapphire",
        icon: "◆"
    }
];

let currentTheme = 0;

// Start with the original emerald theme
document.body.classList.add(themes[currentTheme].className);

themeBtn.textContent =
    themes[currentTheme].icon +
    " " +
    themes[currentTheme].name;

themeBtn.addEventListener("click", function () {

    // Remove the current theme
    document.body.classList.remove(
        themes[currentTheme].className
    );

    // Move to the next theme
    currentTheme++;

    // After the last theme, return to the first
    if (currentTheme >= themes.length) {
        currentTheme = 0;
    }

    // Apply the new theme
    document.body.classList.add(
        themes[currentTheme].className
    );

    // Change button text
    themeBtn.textContent =
        themes[currentTheme].icon +
        " " +
        themes[currentTheme].name;
});
