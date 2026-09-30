
(function(){
  "use strict";

  /* ===== navegación ===== */
  var slides = document.querySelectorAll(".slide");
  var total = slides.length;
  var current = 0;
  var dotsBox = document.getElementById("dots");
  var bar = document.getElementById("progressBar");
  var runMark = document.getElementById("runMark");
  var counter = document.getElementById("counter");
  var vent = document.getElementById("ventisca");

  for (var i = 0; i < total; i++){
    var d = document.createElement("div");
    d.className = "dot";
    d.dataset.i = i;
    d.addEventListener("click", function(){ goTo(parseInt(this.dataset.i,10)); });
    dotsBox.appendChild(d);
  }
  var dots = dotsBox.querySelectorAll(".dot");

  function pad(n){ return (n<10?"0":"")+n; }
  function doVent(){
    vent.classList.remove("go");
    void vent.offsetWidth;
    vent.classList.add("go");
  }
  function goTo(n, silent){
    if (n < 0 || n >= total) return;
    if (!silent && n !== current) doVent();
    slides[current].classList.remove("active");
    current = n;
    slides[current].classList.add("active");
    var pct = ((current)/(total-1))*100;
    bar.style.width = pct + "%";
    runMark.style.left = pct + "%";
    counter.innerHTML = "<b>"+pad(current+1)+"</b> / "+pad(total);
    for (var k = 0; k < total; k++){
      dots[k].classList.toggle("active", k === current);
      dots[k].classList.toggle("done", k < current);
    }
  }
  document.getElementById("prev").addEventListener("click", function(){ goTo(current-1); });
  document.getElementById("next").addEventListener("click", function(){ goTo(current+1); });
  document.addEventListener("keydown", function(e){
    if (e.target && e.target.tagName === "INPUT") return;
    if (e.key === "ArrowRight") goTo(current+1);
    if (e.key === "ArrowLeft") goTo(current-1);
  });
  document.querySelectorAll("[data-go]").forEach(function(b){
    b.addEventListener("click", function(){ goTo(parseInt(this.dataset.go,10)); });
  });

  /* ===== retratos de galletas ===== */
  function galletaSVG(pelo, pc, ropa, extra){
    var masa = "#d9a05b";
    var back = "";
    var front = "";
    if (pelo === "largo"){
      back = "<path d='M26,42 C17,70 19,100 25,110 L37,104 C32,84 32,62 36,48 Z' fill='"+pc+"'/>" +
             "<path d='M74,42 C83,70 81,100 75,110 L63,104 C68,84 68,62 64,48 Z' fill='"+pc+"'/>";
      front = "<path d='M27,52 Q25,25 50,23 Q75,25 73,52 Q66,37 50,36 Q34,37 27,52 Z' fill='"+pc+"'/>";
    } else if (pelo === "coleta"){
      back = "<path d='M72,46 C90,58 90,88 78,104 C74,84 72,64 64,54 Z' fill='"+pc+"'/>";
      front = "<path d='M27,52 Q25,25 50,23 Q75,25 73,52 Q66,37 50,36 Q34,37 27,52 Z' fill='"+pc+"'/>";
    } else if (pelo === "punta"){
      front = "<path d='M26,54 Q22,24 50,22 Q78,24 74,54 L69,41 L63,52 L57,39 L50,51 L43,39 L37,52 L31,41 Z' fill='"+pc+"'/>";
    } else if (pelo === "flequillo"){
      front = "<path d='M25,54 Q24,24 50,22 Q76,24 75,54 Q70,40 60,40 L58,50 L52,40 L44,50 L40,40 Q30,42 25,54 Z' fill='"+pc+"'/>";
    } else {
      front = "<path d='M27,52 Q25,25 50,23 Q75,25 73,52 Q66,37 50,36 Q34,37 27,52 Z' fill='"+pc+"'/>";
    }
    var ex = "";
    if (extra === "espadaRey"){
      ex = "<g transform='rotate(18 86 66)'><rect x='83' y='24' width='7' height='58' fill='#cfd8e8'/>" +
           "<path d='M83,24 L90,24 L86.5,12 Z' fill='#e8eef8'/>" +
           "<rect x='75' y='80' width='23' height='7' rx='2' fill='#5a3a24'/>" +
           "<rect x='83' y='87' width='7' height='13' rx='3' fill='#3a2418'/></g>" +
           "<path d='M34,30 L44,16 L50,26 L56,16 L66,30 Z' fill='#c9a24a' stroke='#a8842a' stroke-width='1.2'/>";
    } else if (extra === "espadaOscura"){
      ex = "<g transform='rotate(-18 16 66)'><rect x='11' y='26' width='7' height='56' fill='#5a4a7a'/>" +
           "<path d='M11,26 L18,26 L14.5,14 Z' fill='#9a7ad0'/>" +
           "<rect x='4' y='80' width='22' height='7' rx='2' fill='#2a1a3a'/>" +
           "<circle cx='15' cy='92' r='5' fill='#7b4bd8'/></g>" +
           "<path d='M22,44 q-8,-16 4,-24 M78,44 q8,-16 -4,-24' stroke='#9a7ad0' stroke-width='3' fill='none' stroke-linecap='round'/>";
    } else if (extra === "arco"){
      ex = "<g transform='translate(84,66)'><path d='M0,-26 q16,26 0,52' fill='none' stroke='#b5822a' stroke-width='4'/>" +
           "<path d='M0,-26 L0,26' stroke='#e8eef8' stroke-width='1.6'/>" +
           "<path d='M-14,0 L10,0' stroke='#8a5a3a' stroke-width='2.5'/>" +
           "<path d='M-14,0 l6,-4 l0,8 Z' fill='#cfd8e8'/></g>";
    } else if (extra === "lobo"){
      ex = "<polygon points='28,32 24,12 42,24' fill='"+pc+"'/><polygon points='72,32 76,12 58,24' fill='"+pc+"'/>" +
           "<polygon points='30,30 28,18 38,26' fill='#e8a8b8'/><polygon points='70,30 72,18 62,26' fill='#e8a8b8'/>";
    } else if (extra === "coronaOro"){
      ex = "<path d='M32,26 L38,12 L50,22 L62,12 L68,26 Z' fill='#e8c84a' stroke='#b5822a' stroke-width='1.5'/>" +
           "<circle cx='50' cy='12' r='3' fill='#e0466a'/>" +
           "<g transform='translate(84,74)'><circle cx='0' cy='0' r='9' fill='#e8c84a' stroke='#b5822a' stroke-width='1.5'/></g>";
    } else if (extra === "campana"){
      ex = "<g transform='translate(82,76)'><path d='M0,-14 q-10,0 -10,12 l20,0 q0,-12 -10,-12 Z' fill='#e8c84a'/>" +
           "<rect x='-12' y='-3' width='24' height='4' rx='2' fill='#b5822a'/><circle cx='0' cy='4' r='3' fill='#b5822a'/></g>" +
           "<path d='M34,28 Q50,18 66,28' fill='none' stroke='#e8c84a' stroke-width='3' stroke-linecap='round'/>";
    } else if (extra === "ola"){
      ex = "<path d='M22,34 q10,-12 20,-2 q10,-12 20,-2 q8,-8 16,-2' fill='none' stroke='#5aa8d8' stroke-width='3.5' stroke-linecap='round'/>" +
           "<g transform='translate(84,72)'><path d='M0,-14 q10,14 0,28 q-10,-14 0,-28 Z' fill='#a8d8f0'/></g>";
    } else if (extra === "capaVino"){
      ex = "<path d='M24,50 Q22,20 50,18 Q78,20 76,50 Q64,32 50,32 Q36,32 24,50 Z' fill='#6a1a3a'/>" +
           "<g transform='translate(84,74)'><path d='M-7,-12 l14,0 l-3,12 l-8,0 Z' fill='#8a2a4a'/><rect x='-2' y='0' width='4' height='10' fill='#8a2a4a'/></g>";
    }
    return "<svg viewBox='0 0 100 118' xmlns='http://www.w3.org/2000/svg'>" +
      back +
      "<path d='M27,118 C29,92 39,85 50,85 C61,85 71,92 73,118 Z' fill='"+ropa+"'/>" +
      "<path d='M42,87 L50,96 L58,87' fill='none' stroke='#f8fbff' stroke-width='2'/>" +
      "<circle cx='50' cy='52' r='23' fill='"+masa+"' stroke='#8a5a3a' stroke-width='2'/>" +
      "<circle cx='34' cy='44' r='2.6' fill='#6a4428'/><circle cx='66' cy='60' r='2.4' fill='#6a4428'/><circle cx='38' cy='68' r='2.2' fill='#6a4428'/>" +
      "<circle cx='40' cy='62' r='3.4' fill='#e0466a' opacity='.4'/><circle cx='60' cy='62' r='3.4' fill='#e0466a' opacity='.4'/>" +
      "<ellipse cx='42' cy='54' rx='3' ry='4.2' fill='#3a2010'/><ellipse cx='58' cy='54' rx='3' ry='4.2' fill='#3a2010'/>" +
      "<circle cx='43.2' cy='52.4' r='1.2' fill='#fff'/><circle cx='59.2' cy='52.4' r='1.2' fill='#fff'/>" +
      "<path d='M45,65 Q50,69 55,65' stroke='#8a5a3a' stroke-width='1.8' fill='none' stroke-linecap='round'/>" +
      front + ex +
    "</svg>";
  }

  var roster = [
    { nm:"Dark Cacao", cc:"#4a3a5a", wp:"🗡️ rey del norte", fr:"Antes <b>entrenaba</b> con su hijo. Ahora lucha solo.", pelo:"largo", pc:"#3a3a4a", ropa:"#4a3a5a", extra:"espadaRey", file:"darkcacao.png" },
    { nm:"Dark Choco", cc:"#7b4bd8", wp:"🌑 el príncipe perdido", fr:"<b>Era</b> valiente y alegre… hasta que tomó la espada oscura.", pelo:"punta", pc:"#5a3a2a", ropa:"#3a2450", extra:"espadaOscura", file:"darkchoco.png" },
    { nm:"Caramel Arrow", cc:"#e0a63a", wp:"🏹 capitana de arqueras", fr:"Nunca falla un tiro. <b>Lo</b> ve todo desde la muralla.", pelo:"coleta", pc:"#c98a2a", ropa:"#8a5a2a", extra:"arco", file:"caramelarrow.png" },
    { nm:"Crunchy Chip", cc:"#8a6a4a", wp:"🐺 vanguardia de la muralla", fr:"Cuando <b>era</b> joven, ya defendía la muralla del norte.", pelo:"corto", pc:"#6a5238", ropa:"#8a6a4a", extra:"lobo", file:"crunchychip.png" },
    { nm:"Golden Cheese", cc:"#e8c84a", wp:"👑 heroína ancestral · oro", fr:"Su ciudad <b>brillaba</b> como el sol. Todo <b>era</b> de oro.", pelo:"largo", pc:"#e8c84a", ropa:"#c9a24a", extra:"coronaOro", file:"goldencheese.png" },
    { nm:"Financier", cc:"#e8d0a0", wp:"🔔 sacerdotisa del oro", fr:"Toca la campana y <b>la</b> escucha todo el reino.", pelo:"flequillo", pc:"#d8c090", ropa:"#e8d0a0", extra:"campana", file:"financier.png" },
    { nm:"Sea Fairy", cc:"#5aa8d8", wp:"🌊 legendaria del mar", fr:"Antes <b>vivía</b> en el mar y <b>cantaba</b> con las olas.", pelo:"largo", pc:"#a8d8f0", ropa:"#5aa8d8", extra:"ola", file:"seafairy.png" },
    { nm:"Pomegranate", cc:"#8a2a4a", wp:"🍷 sacerdotisa de la oscuridad", fr:"Sirve a la Hechicera Oscura. Siempre <b>los</b> está vigilando.", pelo:"largo", pc:"#4a0a1a", ropa:"#6a1a3a", extra:"capaVino", file:"pomegranate.png" }
  ];
  var rBox = document.getElementById("roster");
  roster.forEach(function(c){
    var el = document.createElement("div");
    el.className = "chara";
    el.style.setProperty("--cc", c.cc);
    el.innerHTML =
      "<div class=\"av\">" + galletaSVG(c.pelo, c.pc, c.ropa, c.extra) + "</div>" +
      "<div class=\"nm\">"+c.nm+"</div>" +
      "<div class=\"wp\">"+c.wp+"</div>" +
      "<div class=\"frase\"><span>"+c.fr+"</span></div>";
    var ph = document.createElement("img");
    ph.className = "photo";
    ph.alt = c.nm;
    ph.src = "personajes/" + c.file;
    ph.addEventListener("load", function(){ el.classList.add("hasPhoto"); });
    el.insertBefore(ph, el.firstChild);
    el.addEventListener("click", function(){ el.classList.toggle("open"); });
    rBox.appendChild(el);
  });

  /* ===== vocabulario ===== */
  var vocab = [
    { emo:"❄️", es:"la nieve", kr:"눈", ej:"El príncipe desapareció en la nieve.", qc:"var(--hielo)" },
    { emo:"🧱", es:"la muralla", kr:"성벽", ej:"La muralla protege el reino.", qc:"var(--cacao)" },
    { emo:"🗡️", es:"la espada", kr:"검", ej:"La espada oscura le habló.", qc:"var(--sombra)" },
    { emo:"🧊", es:"el hielo", kr:"얼음", ej:"Todo el castillo es de hielo.", qc:"var(--hielo)" },
    { emo:"🤴", es:"el príncipe", kr:"왕자", ej:"El príncipe era muy valiente.", qc:"var(--uva)" },
    { emo:"💭", es:"el recuerdo", kr:"기억", ej:"El rey guarda un recuerdo.", qc:"var(--oro)" },
    { emo:"🔍", es:"encontrar", kr:"찾다", ej:"Queremos encontrarlo.", qc:"var(--ok)" },
    { emo:"😢", es:"perder", kr:"잃다", ej:"El rey perdió a su hijo.", qc:"var(--fresa)" }
  ];
  var cardsBox = document.getElementById("vocabCards");
  vocab.forEach(function(v){
    var c = document.createElement("div");
    c.className = "fcard";
    c.innerHTML =
      "<div class=\"in\">" +
        "<div class=\"face\" style=\"--qc:"+v.qc+"\"><div class=\"gem\"></div><div class=\"emo\">"+v.emo+"</div><div class=\"es\">"+v.es+"</div><div class=\"hint\">toca ❄ 터치</div></div>" +
        "<div class=\"face back\"><div class=\"kr\">"+v.kr+"</div><div class=\"ej\">"+v.ej+"</div></div>" +
      "</div>";
    c.addEventListener("click", function(){ c.classList.toggle("flipped"); });
    cardsBox.appendChild(c);
  });

  /* ===== intruso ===== */
  var intrusoRounds = [
    { words:["la nieve","el hielo","el frío","la espada"], bad:3, theme:"Las otras tres son del INVIERNO ❄️" },
    { words:["antes","hace muchos años","cuando era niño","mañana"], bad:3, theme:"Las otras tres hablan del PASADO 🎞️" },
    { words:["perder","encontrar","recordar","la muralla"], bad:3, theme:"Las otras tres son ACCIONES (verbos) 🔍" }
  ];
  var intrusoIdx = 0;
  var iWords = document.getElementById("intrusoWords");
  var iFb = document.getElementById("intrusoFb");
  var iRound = document.getElementById("intrusoRound");
  function renderIntruso(){
    var r = intrusoRounds[intrusoIdx];
    iRound.textContent = "Ronda " + (intrusoIdx+1) + " / 3";
    iFb.textContent = "";
    iFb.className = "feedback";
    iWords.innerHTML = "";
    r.words.forEach(function(w, idx){
      var b = document.createElement("div");
      b.className = "word-btn";
      b.textContent = w;
      b.addEventListener("click", function(){
        if (idx === r.bad){
          b.classList.add("right");
          iFb.textContent = "🕵️ ¡Intruso capturado! " + r.theme;
          iFb.classList.add("good");
          setTimeout(function(){
            intrusoIdx++;
            if (intrusoIdx < intrusoRounds.length){ renderIntruso(); }
            else {
              iRound.textContent = "Completado";
              iWords.innerHTML = "";
              iFb.textContent = "⭐ ¡Las tres rondas completas! Pasa a la siguiente diapositiva ›";
            }
          }, 1600);
        } else {
          b.classList.add("wrong");
          iFb.textContent = "Mmm… esa palabra sí es del grupo. ¡Piensa en el tema!";
          iFb.className = "feedback oops";
          setTimeout(function(){ b.classList.remove("wrong"); }, 400);
        }
      });
      iWords.appendChild(b);
    });
  }
  renderIntruso();

  /* ===== álbum del recuerdo (imperfecto) ===== */
  var alb = [
    { s:"☀️ Antes, el sol ＿＿ todos los días. (brillar)", opts:["brilló","brillaba","brilla"], ok:1, rec:"r1", why:"Cosa repetida en el pasado → brillaba." },
    { s:"🌿 Los campos ＿＿ verdes y bonitos. (estar)", opts:["estaban","estuvieron","están"], ok:0, rec:"r2", why:"Descripción del pasado → estaban." },
    { s:"🏰 El castillo ＿＿ de oro. (ser · ¡rebelde!)", opts:["fue","era","es"], ok:1, rec:"r3", why:"ser es rebelde: ERA." },
    { s:"🤴 El rey ＿＿ cada mañana con su hijo. (entrenar)", opts:["entrenaba","entrenó","entrena"], ok:0, rec:"r4", why:"«cada mañana» = repetido → entrenaba." },
    { s:"🚶 Los dos ＿＿ juntos a la muralla. (ir · ¡rebelde!)", opts:["fueron","iban","van"], ok:1, rec:"r5", why:"ir es rebelde: IBAN." },
    { s:"🌅 Y desde allí ＿＿ el amanecer. (ver · ¡rebelde!)", opts:["veían","vieron","ven"], ok:0, rec:"r6", why:"ver es rebelde: VEÍAN." }
  ];
  var albIdx = 0;
  var albSent = document.getElementById("albSentence");
  var albOpts = document.getElementById("albOpts");
  var albFb = document.getElementById("albFb");
  var albCount = document.getElementById("albCount");
  function renderAlb(){
    var r = alb[albIdx];
    albCount.textContent = "Recuerdo " + (albIdx+1) + " / 6";
    albFb.textContent = "";
    albFb.className = "feedback";
    albSent.textContent = r.s;
    albOpts.innerHTML = "";
    r.opts.forEach(function(op, idx){
      var b = document.createElement("button");
      b.className = "end-btn";
      b.textContent = op;
      b.addEventListener("click", function(){
        if (idx === r.ok){
          b.classList.add("right");
          var g = document.getElementById(r.rec);
          if (g) g.classList.add("on");
          albFb.textContent = "🖼️ ¡El recuerdo aparece! " + r.why;
          albFb.classList.add("good");
          setTimeout(function(){
            albIdx++;
            if (albIdx < alb.length){ renderAlb(); }
            else {
              albCount.textContent = "Álbum completo";
              albSent.textContent = "🎞️ ¡Así era el reino antes! Dominas la foto antigua.";
              albOpts.innerHTML = "";
              albFb.textContent = "Ahora lee el capítulo cinco ›";
            }
          }, 2300);
        } else {
          b.classList.add("wrong");
          albFb.textContent = "¿Es una foto del pasado 🎞️ o algo de hoy? Piensa en -aba / -ía.";
          albFb.className = "feedback oops";
          setTimeout(function(){ b.classList.remove("wrong"); }, 400);
        }
      });
      albOpts.appendChild(b);
    });
  }
  renderAlb();

  /* ===== detective ===== */
  var det = [
    { q:"¿Por qué el reino es frío ahora?",
      opts:["Porque siempre fue así","Porque llegó la oscuridad y se congeló","Porque está en el norte"], ok:1,
      exp:"Antes el sol <b>brillaba</b> y los campos <b>estaban</b> verdes; el frío llegó <b>con la oscuridad</b>." },
    { q:"¿El príncipe era malo desde el principio?",
      opts:["No: era valiente y quería ser como su padre","Sí, siempre fue malo","El texto no lo dice"], ok:0,
      exp:"<b>Era valiente</b> y admiraba a su padre. Todo cambió cuando tomó la espada oscura." },
    { q:"¿Qué pista nos dice que la espada es peligrosa?",
      opts:["Que es muy grande","Que le habló y él la tomó","Que era del rey"], ok:1,
      exp:"Una espada que <b>habla</b> no es normal: ella lo convence. ¡Pista escondida!" },
    { q:"¿Por qué el rey mira el retrato todos los días?",
      opts:["Porque le gusta el arte","Porque no recuerda su cara","Porque extraña a su hijo y espera encontrarlo"], ok:2,
      exp:"El texto no lo dice directo, pero <b>lo mira todos los días</b>: el retrato es su recuerdo del príncipe." }
  ];
  var detIdx = 0;
  var dQ = document.getElementById("detQ");
  var dOpts = document.getElementById("detOpts");
  var dExp = document.getElementById("detExp");
  var dRound = document.getElementById("detRound");
  function renderDet(){
    var r = det[detIdx];
    dRound.textContent = "Pregunta " + (detIdx+1) + " / 4";
    dQ.textContent = r.q;
    dExp.innerHTML = "";
    dOpts.innerHTML = "";
    r.opts.forEach(function(op, idx){
      var b = document.createElement("div");
      b.className = "opt";
      b.textContent = op;
      b.addEventListener("click", function(){
        if (idx === r.ok){
          b.classList.add("right");
          dExp.innerHTML = "✅ " + r.exp;
          setTimeout(function(){
            detIdx++;
            if (detIdx < det.length){ renderDet(); }
            else {
              dRound.textContent = "Caso cerrado";
              dQ.textContent = "🕵️ ¡Excelente, detective! Resolviste las cuatro preguntas.";
              dOpts.innerHTML = "";
              dExp.textContent = "Ahora, el atajo mágico ›";
            }
          }, 2600);
        } else {
          b.classList.add("wrong");
          dExp.innerHTML = "Busca las pistas en el texto otra vez…";
        }
      });
      dOpts.appendChild(b);
    });
  }
  renderDet();

  /* ===== muralla (pronombres OD) ===== */
  var mur = [
    { s:"🗺️ — ¿Ves el mapa? — Sí, ＿＿ veo.", opts:["la","lo","los"], ok:1, why:"el mapa (masculino singular) → LO." },
    { s:"🗡️ — ¿Buscas la espada oscura? — Sí, ＿＿ busco.", opts:["lo","las","la"], ok:2, why:"la espada (femenino singular) → LA." },
    { s:"🏹 — ¿Tienes los arcos? — Sí, ＿＿ tengo.", opts:["los","las","lo"], ok:0, why:"los arcos (masculino plural) → LOS." },
    { s:"🧱 — ¿Ves las murallas? — No, no ＿＿ veo con la nieve.", opts:["los","las","la"], ok:1, why:"las murallas (femenino plural) → LAS. ¡El «no» va primero!" },
    { s:"🤴 — ¿Conocen al príncipe? — Sí, ＿＿ conocemos.", opts:["lo","la","le"], ok:0, why:"¡También para personas! al príncipe → LO." },
    { s:"🔍 — Quiero encontrar a Dark Choco. → ＿＿", opts:["Encontrarlo quiero.","Lo quiero encontrar.","Quiero lo encontrar."], ok:1, why:"Delante del verbo conjugado: LO quiero encontrar (= quiero encontrarLO)." }
  ];
  var murIdx = 0;
  var murSent = document.getElementById("murSentence");
  var murOpts = document.getElementById("murOpts");
  var murFb = document.getElementById("murFb");
  var murCount = document.getElementById("murCount");
  function renderMur(){
    var r = mur[murIdx];
    murCount.textContent = "Bloque " + (murIdx+1) + " / 6";
    murFb.textContent = "";
    murFb.className = "feedback";
    murSent.textContent = r.s;
    murOpts.innerHTML = "";
    r.opts.forEach(function(op, idx){
      var b = document.createElement("button");
      b.className = "end-btn";
      b.textContent = op;
      b.addEventListener("click", function(){
        if (idx === r.ok){
          b.classList.add("right");
          var bl = document.getElementById("b" + (murIdx + 1));
          if (bl) bl.classList.add("on");
          murFb.textContent = "🧱 ¡Bloque reparado! " + r.why;
          murFb.classList.add("good");
          setTimeout(function(){
            murIdx++;
            if (murIdx < mur.length){ renderMur(); }
            else {
              murCount.textContent = "🧱 Muralla completa";
              murSent.textContent = "🔁 ¡La muralla resiste y tú dominas el atajo mágico!";
              murOpts.innerHTML = "";
              murFb.textContent = "Sigue el capítulo seis ›";
            }
          }, 2300);
        } else {
          b.classList.add("wrong");
          murFb.textContent = "Mira la palabra: ¿es él, ella, ellos o ellas? El atajo copia género y número.";
          murFb.className = "feedback oops";
          setTimeout(function(){ b.classList.remove("wrong"); }, 400);
        }
      });
      murOpts.appendChild(b);
    });
  }
  renderMur();

  /* ===== ordena la historia ===== */
  var events = [
    "El equipo llega a la muralla y pregunta por el príncipe.",
    "El rey mira la nieve en silencio con un retrato viejo.",
    "Entre la ventisca aparece una figura con una espada oscura.",
    "El rey le recuerda cuando entrenaban juntos.",
    "La espada brilla y arrastra al príncipe otra vez a la nieve."
  ];
  var shuffled = [2,4,0,3,1];
  var expected = 0;
  var oList = document.getElementById("orderList");
  var oFb = document.getElementById("orderFb");
  shuffled.forEach(function(evIdx){
    var el = document.createElement("div");
    el.className = "ev";
    el.innerHTML = "<span class=\"num\">?</span><span>" + events[evIdx] + "</span>";
    el.addEventListener("click", function(){
      if (el.classList.contains("locked")) return;
      if (evIdx === expected){
        el.classList.add("locked");
        el.querySelector(".num").textContent = expected + 1;
        expected++;
        if (expected === events.length){
          oFb.textContent = "❄️ ¡Historia perfecta! El recuerdo todavía vive.";
          oFb.className = "feedback good";
        } else {
          oFb.textContent = "✅ ¡Sí! ¿Y qué pasa después?";
          oFb.className = "feedback good";
        }
      } else {
        el.classList.add("wrong");
        oFb.textContent = "Todavía no… recuerda la noche de ventisca.";
        oFb.className = "feedback oops";
        setTimeout(function(){ el.classList.remove("wrong"); }, 450);
      }
    });
    oList.appendChild(el);
  });

  /* ===== confeti ===== */
  var confChars = ["❄️","🍫","✨","🧊","🖼️","🕯️"];
  function confettiBurst(){
    for (var c = 0; c < 34; c++){
      var f = document.createElement("div");
      f.className = "confetti";
      f.textContent = confChars[c % confChars.length];
      f.style.left = (Math.random()*100) + "vw";
      f.style.animationDuration = (1.6 + Math.random()*2.4) + "s";
      f.style.animationDelay = (Math.random()*0.6) + "s";
      document.body.appendChild(f);
      (function(node){ setTimeout(function(){ node.remove(); }, 5200); })(f);
    }
  }
  var cutin = document.getElementById("cutin");

  /* ===== combate 1: Centinela de Hielo ===== */
  var boss = [
    { q:"Antes el sol ＿＿ todos los días. (brillar)", opts:["brilló","brillaba","brilla"], ok:1 },
    { q:"Cuando yo ＿＿ niña, jugaba en la nieve. (ser)", opts:["era","fui","soy"], ok:0 },
    { q:"Nosotros ＿＿ a la muralla cada mañana. (ir)", opts:["fuimos","íbamos","vamos"], ok:1 },
    { q:"Ellos ＿＿ el amanecer desde la torre. (ver)", opts:["veían","vieron","ven"], ok:0 },
    { q:"El castillo ＿＿ muy grande y dorado. (parecer)", opts:["pareció","parecía","parece"], ok:1 },
    { q:"¿Cuál NO es palabra del imperfecto?", opts:["antes","hace muchos años","mañana"], ok:2 }
  ];
  var bossIdx = 0;
  var hp = boss.length;
  var bQ = document.getElementById("bossQ");
  var bOpts = document.getElementById("bossOpts");
  var bHp = document.getElementById("bossHp");
  var bSprite = document.getElementById("bossSprite");
  var bGame = document.getElementById("bossGame");
  var bWin = document.getElementById("bossWin");
  var field = document.getElementById("battlefield");
  var mini = document.getElementById("miniSlash");
  function spawnDamage(f){
    var d = document.createElement("div");
    d.className = "dmg";
    d.textContent = String(800 + Math.floor(Math.random()*2200));
    d.style.left = (42 + Math.random()*16) + "%";
    d.style.top = "22%";
    f.appendChild(d);
    setTimeout(function(){ d.remove(); }, 950);
  }
  function ventHit(){
    mini.classList.remove("go");
    void mini.offsetWidth;
    mini.classList.add("go");
    bSprite.classList.add("hit");
    spawnDamage(field);
    setTimeout(function(){ bSprite.classList.remove("hit"); }, 520);
  }
  function renderBoss(){
    var r = boss[bossIdx];
    bQ.textContent = "🧊 Ataque " + (bossIdx+1) + ": " + r.q;
    bOpts.innerHTML = "";
    r.opts.forEach(function(op, idx){
      var b = document.createElement("div");
      b.className = "opt";
      b.style.textAlign = "center";
      b.textContent = op;
      b.addEventListener("click", function(){
        if (idx === r.ok){
          b.classList.add("right");
          hp--;
          bHp.style.width = (hp/boss.length)*100 + "%";
          var isLast = (bossIdx === boss.length - 1);
          if (isLast){
            document.getElementById("cutinTxt").textContent = "¡LA MURALLA RESISTE!";
            cutin.classList.remove("go");
            void cutin.offsetWidth;
            cutin.classList.add("go");
            setTimeout(ventHit, 700);
            setTimeout(function(){
              bSprite.textContent = "🖼️";
              bGame.classList.add("hidden");
              bWin.classList.remove("hidden");
              confettiBurst();
            }, 2100);
          } else {
            ventHit();
            setTimeout(function(){
              bossIdx++;
              renderBoss();
            }, 950);
          }
        } else {
          b.classList.add("wrong");
        }
      });
      bOpts.appendChild(b);
    });
  }
  renderBoss();

  /* ============ ACTO II ============ */

  /* ===== memoria ===== */
  var memoPairs = [
    { es:"la nieve", m:"❄️ 눈" },
    { es:"la muralla", m:"🧱 성벽" },
    { es:"la espada", m:"🗡️ 검" },
    { es:"el príncipe", m:"🤴 왕자" },
    { es:"encontrar", m:"🔍 찾다" },
    { es:"perder", m:"😢 잃다" }
  ];
  var memoCards = [];
  memoPairs.forEach(function(p, i){
    memoCards.push({ pid:i, label:p.es });
    memoCards.push({ pid:i, label:p.m });
  });
  for (var m = memoCards.length - 1; m > 0; m--){
    var j = Math.floor(Math.random() * (m + 1));
    var tmp = memoCards[m]; memoCards[m] = memoCards[j]; memoCards[j] = tmp;
  }
  var memoGrid = document.getElementById("memoGrid");
  var memoStats = document.getElementById("memoStats");
  var memoFb = document.getElementById("memoFb");
  var memoOpen = [];
  var memoFound = 0;
  var memoTries = 0;
  function memoUpdate(){
    memoStats.textContent = "Parejas: " + memoFound + " / 6 · Intentos: " + memoTries;
  }
  memoCards.forEach(function(c){
    var el = document.createElement("div");
    el.className = "mcard";
    el.textContent = "❄";
    el.addEventListener("click", function(){
      if (el.classList.contains("lock") || el.classList.contains("up") || memoOpen.length === 2) return;
      el.classList.add("up");
      el.textContent = c.label;
      memoOpen.push({ el:el, pid:c.pid });
      if (memoOpen.length === 2){
        memoTries++;
        if (memoOpen[0].pid === memoOpen[1].pid){
          memoOpen[0].el.classList.add("lock");
          memoOpen[1].el.classList.add("lock");
          memoOpen = [];
          memoFound++;
          memoFb.textContent = "❄️ ¡Pareja! Dila en voz alta.";
          memoFb.className = "feedback good";
          if (memoFound === 6){
            memoFb.textContent = "⭐ ¡Memoria completa! Equipo listo para el norte.";
          }
        } else {
          memoFb.textContent = "No son pareja… ¡memoria de guardiana!";
          memoFb.className = "feedback oops";
          var a = memoOpen[0].el, bEl = memoOpen[1].el;
          memoOpen = [];
          setTimeout(function(){
            a.classList.remove("up"); a.textContent = "❄";
            bEl.classList.remove("up"); bEl.textContent = "❄";
          }, 1000);
        }
        memoUpdate();
      }
    });
    memoGrid.appendChild(el);
  });
  memoUpdate();

  /* ===== rol + Caramel Arrow ===== */
  var rolItems = [
    { t:"👶 Tu infancia", m:"Cuando era pequeña, vivía en ____ ." },
    { t:"🎮 Tu rutina de antes", m:"Todos los días jugaba a ____ con ____ ." },
    { t:"🧸 Tu objeto favorito", m:"Mi juguete favorito era ____ . ¡Lo llevaba a todas partes!" },
    { t:"🏫 Tu escuela", m:"Mi escuela era ____ y mi maestra se llamaba ____ ." },
    { t:"🔁 El atajo", m:"— ¿Recuerdas a tu primer amigo? — Sí, ____ recuerdo." }
  ];
  var rolList = document.getElementById("rolList");
  rolItems.forEach(function(r){
    var el = document.createElement("div");
    el.className = "rline";
    el.innerHTML = r.t + "<span class=\"tap\">toca ❄</span><div class=\"model\">🗣️ " + r.m + "</div>";
    el.addEventListener("click", function(){ el.classList.toggle("open"); });
    rolList.appendChild(el);
  });

  var ivQs = [
    { q:"¿Dónde vivías cuando eras pequeña?", h:"Vivía en..." },
    { q:"¿Qué hacías todos los días a los 6 años?", h:"Todos los días..." },
    { q:"¿Cómo era tu casa antes?", h:"Mi casa era..." },
    { q:"¿Qué juguete tenías y cómo era?", h:"Tenía un/una... y era..." },
    { q:"¿Ibas al parque? ¿Con quién?", h:"Iba al parque con..." },
    { q:"— ¿Ves las montañas desde tu casa? Contesta con el atajo.", h:"Sí, las veo / No, no las veo." },
    { q:"— ¿Tienes tu cuaderno de español? Contesta con el atajo.", h:"Sí, lo tengo." },
    { q:"¿Qué comida no te gustaba de niña?", h:"No me gustaba..." },
    { q:"¿Cómo era tu mejor amiga cuando eran niñas?", h:"Era... y siempre..." },
    { q:"— ¿Quieres encontrar a Dark Choco? Usa el atajo.", h:"Sí, lo quiero encontrar / quiero encontrarlo." }
  ];
  var ivPool = [];
  var ivQ = document.getElementById("ivQ");
  var ivHint = document.getElementById("ivHint");
  document.getElementById("ivBtn").addEventListener("click", function(){
    if (ivPool.length === 0){ ivPool = ivQs.slice(); }
    var pick = Math.floor(Math.random() * ivPool.length);
    var q = ivPool.splice(pick, 1)[0];
    ivQ.textContent = "🏹 " + q.q;
    ivHint.textContent = "Pista: " + q.h;
  });

  /* ===== ¿y tú? ===== */
  var compItems = [
    { s:"El príncipe entrenaba con su padre todos los días.", si:"¡Yo también hacía algo con mi familia todos los días!", no:"Yo no. Cuando era pequeña, jugaba sola o con amigos." },
    { s:"Los dos iban a la muralla a ver el amanecer.", si:"¡Yo también iba a lugares bonitos con mi familia!", no:"Yo no iba a ningún lugar especial. Me quedaba en casa." },
    { s:"El reino era cálido, verde y lleno de sol.", si:"¡Mi ciudad también era así cuando era pequeña!", no:"Mi ciudad era diferente: era..." },
    { s:"Dark Choco quería ser tan fuerte como su padre.", si:"¡Yo también quería ser como alguien de mi familia!", no:"Yo quería ser diferente. Quería ser..." },
    { s:"El rey guarda un retrato viejo y lo mira cada día.", si:"¡Yo también guardo algo especial de mi infancia!", no:"Yo no guardo nada viejo. Prefiero cosas nuevas." }
  ];
  var compIdx = 0;
  var compSent = document.getElementById("compSent");
  var compModel = document.getElementById("compModel");
  var compRound = document.getElementById("compRound");
  function renderComp(){
    var r = compItems[compIdx];
    compRound.textContent = "Frase " + (compIdx+1) + " / 5";
    compSent.textContent = r.s;
    compModel.innerHTML = "";
  }
  function compAnswer(kind){
    if (compIdx >= compItems.length) return;
    var r = compItems[compIdx];
    var txt = (kind === "si") ? r.si : r.no;
    compModel.innerHTML = "🗣️ " + txt + "<span class=\"say\">Dilo en voz alta y completa la frase.</span>";
    setTimeout(function(){
      compIdx++;
      if (compIdx < compItems.length){ renderComp(); }
      else {
        compRound.textContent = "Completado";
        compSent.textContent = "⭐ ¡Ya cuentas tu propia foto antigua!";
        compModel.innerHTML = "Siguiente misión: el dictado ›";
      }
    }, 3400);
  }
  document.getElementById("compSi").addEventListener("click", function(){ compAnswer("si"); });
  document.getElementById("compNo").addEventListener("click", function(){ compAnswer("no"); });
  renderComp();

  /* ===== dictado ===== */
  var dictItems = [
    "Antes el reino era cálido y verde.",
    "Cuando era niño, el príncipe jugaba con su padre.",
    "¿Ves la espada oscura? Sí, la veo.",
    "Todos los días entrenábamos en la muralla.",
    "No lo encuentro en la nieve."
  ];
  var dictIdx = 0;
  var dictIn = document.getElementById("dictIn");
  var dictFb = document.getElementById("dictFb");
  var dictRound = document.getElementById("dictRound");
  var dictSecret = document.getElementById("dictSecret");
  function dictNorm(s){
    return s.toLowerCase().replace(/[.,;:!?¡¿"«»]/g, "").replace(/\s+/g, " ").trim();
  }
  function dictDeacc(s){
    return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  function speak(text, rate){
    if (!window.speechSynthesis){ dictFb.textContent = "Este navegador no tiene voz: la profe lee el mensaje 👩‍🏫"; dictFb.className = "feedback oops"; return; }
    var u = new SpeechSynthesisUtterance(text);
    u.lang = "es-ES";
    u.rate = rate;
    var vs = window.speechSynthesis.getVoices();
    for (var v = 0; v < vs.length; v++){
      if (vs[v].lang && vs[v].lang.indexOf("es") === 0){ u.voice = vs[v]; break; }
    }
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }
  function renderDict(){
    dictRound.textContent = "Mensaje " + (dictIdx+1) + " / 5";
    dictIn.value = "";
    dictFb.textContent = "";
    dictFb.className = "feedback";
    dictSecret.textContent = dictItems[dictIdx];
  }
  document.getElementById("dictPlay").addEventListener("click", function(){ speak(dictItems[dictIdx], 0.82); });
  document.getElementById("dictSlow").addEventListener("click", function(){ speak(dictItems[dictIdx], 0.55); });
  document.getElementById("dictCheck").addEventListener("click", function(){
    var ans = dictNorm(dictIn.value);
    var target = dictNorm(dictItems[dictIdx]);
    if (ans === target){
      dictFb.textContent = "🖼️ ¡El retrato brilla! Mensaje perfecto.";
      dictFb.className = "feedback good";
    } else if (ans !== "" && dictDeacc(ans) === dictDeacc(target)){
      dictFb.textContent = "¡Casi perfecto! Revisa las tildes: " + dictItems[dictIdx];
      dictFb.className = "feedback oops";
    } else {
      dictFb.textContent = "Escucha otra vez… pista: la frase tiene " + dictItems[dictIdx].split(" ").length + " palabras.";
      dictFb.className = "feedback oops";
    }
  });
  document.getElementById("dictNext").addEventListener("click", function(){
    dictIdx++;
    if (dictIdx < dictItems.length){ renderDict(); }
    else {
      dictIdx = dictItems.length - 1;
      dictRound.textContent = "Dictado completado";
      dictFb.textContent = "⭐ ¡Cinco recuerdos descifrados! El príncipe te espera ›";
      dictFb.className = "feedback good";
    }
  });
  renderDict();

  /* ===== jefe final: Dark Choco ===== */
  var boss2 = [
    { q:"🎞️ Antes tú ＿＿ conmigo cada mañana. (entrenar)", opts:["entrenaste","entrenabas","entrenas"], ok:1 },
    { q:"🗡️ — ¿Recuerdas la espada de tu padre? — Sí, ＿＿ recuerdo.", opts:["lo","las","la"], ok:2 },
    { q:"🌅 Nosotros ＿＿ el amanecer juntos. (ver)", opts:["veíamos","vimos","vemos"], ok:0 },
    { q:"🤴 — ¿Ves al príncipe? — Sí, ＿＿ veo entre la nieve.", opts:["lo","le","la"], ok:0 },
    { q:"⚠️ 🪃 Todas las mañanas nosotros ＿＿ temprano. (levantarse)", opts:["se levantan","nos levantamos","me levanto"], ok:1 },
    { q:"⚠️ ⚖️ El rey es ＿＿ fuerte ＿＿ su hijo.", opts:["tan / como","más / de","el más / que"], ok:0 },
    { q:"🏰 Hace muchos años, el castillo ＿＿ de oro. (ser)", opts:["fue","era","es"], ok:1 },
    { q:"🔍 Quiero encontrar a mi hijo. → ＿＿", opts:["Lo quiero encontrar.","Quiero lo encontrar.","Le quiero encontrar."], ok:0 }
  ];
  var boss2Idx = 0;
  var hp2 = boss2.length;
  var b2Q = document.getElementById("boss2Q");
  var b2Opts = document.getElementById("boss2Opts");
  var b2Hp = document.getElementById("boss2Hp");
  var b2Sprite = document.getElementById("boss2Sprite");
  var b2Game = document.getElementById("boss2Game");
  var b2Win = document.getElementById("boss2Win");
  var field2 = document.getElementById("battlefield2");
  var mini2 = document.getElementById("miniSlash2");
  function ventHit2(){
    mini2.classList.remove("go");
    void mini2.offsetWidth;
    mini2.classList.add("go");
    b2Sprite.classList.add("hit");
    spawnDamage(field2);
    setTimeout(function(){ b2Sprite.classList.remove("hit"); }, 520);
  }
  function renderBoss2(){
    var r = boss2[boss2Idx];
    b2Q.textContent = "🌑 Ataque " + (boss2Idx+1) + ": " + r.q;
    b2Opts.innerHTML = "";
    r.opts.forEach(function(op, idx){
      var b = document.createElement("div");
      b.className = "opt";
      b.style.textAlign = "center";
      b.textContent = op;
      b.addEventListener("click", function(){
        if (idx === r.ok){
          b.classList.add("right");
          hp2--;
          b2Hp.style.width = (hp2/boss2.length)*100 + "%";
          var isLast = (boss2Idx === boss2.length - 1);
          if (isLast){
            document.getElementById("cutinTxt").textContent = "¡RECUERDA QUIÉN ERAS!";
            cutin.classList.remove("go");
            void cutin.offsetWidth;
            cutin.classList.add("go");
            setTimeout(ventHit2, 700);
            setTimeout(function(){
              b2Sprite.textContent = "🕯️";
              b2Game.classList.add("hidden");
              b2Win.classList.remove("hidden");
              confettiBurst();
            }, 2100);
          } else {
            ventHit2();
            setTimeout(function(){
              boss2Idx++;
              renderBoss2();
            }, 950);
          }
        } else {
          b.classList.add("wrong");
        }
      });
      b2Opts.appendChild(b);
    });
  }
  renderBoss2();

  /* init */
  goTo(0, true);
})();
