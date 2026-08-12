/* ==========================================================================
   EvoGames — Learn Page Controller
   ========================================================================== */

(function LearnApp() {
  const STORAGE_KEY = 'evo-learn-progress';
  const rail = document.getElementById('timelineRail');

  function loadReadEras() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return [];
  }
  function saveReadEras(arr) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  }
  let readEras = loadReadEras();

  function updateProgressBar() {
    const pct = Math.round((readEras.length / ERAS.length) * 100);
    document.getElementById('learnProgressFill').style.width = pct + '%';
    document.getElementById('learnProgressPct').textContent =
      (EvoI18n.currentLang === 'fa' ? String(pct).replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]) : pct) + '%';
  }

  function buildTimeline() {
    rail.innerHTML = ERAS.map((era, idx) => {
      const isRead = readEras.includes(era.id);
      return `
      <div class="era-item ${isRead ? 'read' : ''}" data-era="${era.id}">
        <div class="era-node">
          ${isRead ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>' : era.num}
        </div>
        <div class="era-card card reveal" data-era-card="${era.id}">
          <div class="era-card-head">
            <div>
              <span class="era-tag" data-i18n="learn.${era.id}_tag"></span>
              <h3 class="era-title" data-i18n="learn.${era.id}_title"></h3>
              <div class="era-period" data-i18n="learn.${era.id}_period"></div>
            </div>
            <div class="era-expand-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
            </div>
          </div>
          <div class="era-body">
            <div class="era-body-inner">
              <p data-i18n="learn.${era.id}_body"></p>
              <div class="era-fact-box">
                <span class="era-fact-label" data-i18n="learn.${era.id}_fact_label"></span>
                <span data-i18n="learn.${era.id}_fact"></span>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    }).join('');

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = EvoI18n.get(key, el.textContent);
    });

    rail.querySelectorAll('.era-card').forEach(card => {
      card.addEventListener('click', () => {
        const wasExpanded = card.classList.contains('expanded');
        card.classList.toggle('expanded');
        if (!wasExpanded) {
          const eraId = card.dataset.eraCard;
          if (!readEras.includes(eraId)) {
            readEras.push(eraId);
            saveReadEras(readEras);
            updateProgressBar();
            const item = card.closest('.era-item');
            item.classList.add('read');
            const node = item.querySelector('.era-node');
            node.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
          }
        }
      });
    });

    initRevealObserver();
  }

  buildTimeline();
  updateProgressBar();

  window.addEventListener('evo-lang-changed', () => {
    buildTimeline();
    updateProgressBar();
  });

  const quizOverlay = document.getElementById('quizOverlay');
  const quizContent = document.getElementById('quizContent');
  let quizIdx = 0;
  let quizScore = 0;
  let quizAnswered = false;

  function getQuestions() {
    return QUIZ_QUESTIONS[EvoI18n.currentLang] || QUIZ_QUESTIONS.en;
  }

  function openQuiz() {
    quizIdx = 0; quizScore = 0; quizAnswered = false;
    renderQuizQuestion();
    quizOverlay.classList.add('open');
  }

  function renderQuizQuestion() {
    const questions = getQuestions();
    const q = questions[quizIdx];
    quizAnswered = false;
    const pct = Math.round((quizIdx / questions.length) * 100);
    quizContent.innerHTML = `
      <div class="quiz-progress-row">
        <div class="quiz-progress-track"><div class="quiz-progress-fill" style="width:${pct}%"></div></div>
        <span class="quiz-score-chip">${EvoI18n.get('learn.quiz_score')}: <bdi dir="ltr">${quizScore}/${questions.length}</bdi></span>
      </div>
      <div class="quiz-question">${q.q}</div>
      <div class="quiz-options">
        ${q.options.map((opt, i) => `<button class="quiz-option" data-idx="${i}">${opt}</button>`).join('')}
      </div>
      <div class="quiz-feedback" id="quizFeedback"></div>
      <div class="quiz-footer">
        <button class="btn btn-primary" id="quizNextBtn" style="display:none;">
          ${quizIdx === questions.length - 1 ? EvoI18n.get('learn.quiz_finish') : EvoI18n.get('learn.quiz_next')}
        </button>
      </div>
    `;

    quizContent.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => {
        if (quizAnswered) return;
        quizAnswered = true;
        const idx = parseInt(btn.dataset.idx, 10);
        const feedback = document.getElementById('quizFeedback');
        const allBtns = quizContent.querySelectorAll('.quiz-option');
        allBtns.forEach(b => b.disabled = true);

        if (idx === q.correct) {
          btn.classList.add('correct');
          quizScore++;
          feedback.textContent = '✓ ' + EvoI18n.get('learn.quiz_correct');
          feedback.className = 'quiz-feedback show correct-text';
        } else {
          btn.classList.add('incorrect');
          allBtns[q.correct].classList.add('correct');
          feedback.textContent = '✕ ' + EvoI18n.get('learn.quiz_incorrect');
          feedback.className = 'quiz-feedback show incorrect-text';
        }
        document.getElementById('quizNextBtn').style.display = 'inline-flex';
        quizContent.querySelector('.quiz-score-chip').innerHTML =
          `${EvoI18n.get('learn.quiz_score')}: <bdi dir="ltr">${quizScore}/${questions.length}</bdi>`;
      });
    });

    document.getElementById('quizNextBtn').addEventListener('click', () => {
      if (quizIdx < questions.length - 1) {
        quizIdx++;
        renderQuizQuestion();
      } else {
        renderQuizResult();
      }
    });
  }

  function renderQuizResult() {
    const questions = getQuestions();
    const pct = Math.round((quizScore / questions.length) * 100);
    const perfect = quizScore === questions.length;
    const good = pct >= 60;
    quizContent.innerHTML = `
      <div class="quiz-result-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 3 7l9 5 9-5-9-5Z"/><path d="M3 12l9 5 9-5M3 17l9 5 9-5"/></svg>
      </div>
      <div class="quiz-result-score" dir="ltr">${quizScore} / ${questions.length}</div>
      <div class="quiz-result-msg">${perfect ? EvoI18n.get('learn.quiz_perfect') : (good ? EvoI18n.get('learn.quiz_good') : EvoI18n.get('learn.quiz_retry_msg'))}</div>
      <div class="quiz-footer" style="justify-content:center;">
        <button class="btn btn-primary" id="quizRetryBtn">${EvoI18n.get('learn.quiz_retry')}</button>
      </div>
    `;
    document.getElementById('quizRetryBtn').addEventListener('click', openQuiz);
  }

  document.getElementById('openQuizBtn').addEventListener('click', openQuiz);
  document.getElementById('quizCloseBtn').addEventListener('click', () => quizOverlay.classList.remove('open'));
  quizOverlay.addEventListener('click', (e) => { if (e.target === quizOverlay) quizOverlay.classList.remove('open'); });
})();
