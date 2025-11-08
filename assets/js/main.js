(() => {
  const fmtBRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

  const stepsInput = document.getElementById('stepsInput');
  const icmsInput = document.getElementById('icmsInput');
  const calcBtn = document.getElementById('calcBtn');
  const resultArea = document.getElementById('resultArea');
  const creditOut = document.getElementById('creditOut');
  const percentOut = document.getElementById('percentOut');
  const resultMsg = document.getElementById('resultMsg');
  const percentBar = document.getElementById('percentBar');

  const MONEY_PER_POINT = 0.0002;

  const calc = () => {
    const steps = Number(stepsInput.value) || 0;
    const icms = Number(icmsInput.value) || 0;

    const credit = steps * MONEY_PER_POINT;
    const percent = icms > 0 ? Math.min((credit / icms) * 100, 100) : NaN;

    creditOut.textContent = fmtBRL.format(credit);
    percentOut.textContent = isNaN(percent)
      ? '— do seu ICMS'
      : `${percent.toFixed(2).replace('.', ',')}% do seu ICMS`;

    percentBar.style.width = isNaN(percent) ? '0%' : `${percent}%`;

    let msg = '';
    if (steps === 0) {
      msg = 'Informe seus passos para ver seu potencial de economia.';
    } else if (isNaN(percent)) {
      msg = `Com ${steps.toLocaleString('pt-BR')} passos, você gerou ${fmtBRL.format(credit)} em créditos simbólicos.`;
    } else {
      msg = `Com ${steps.toLocaleString('pt-BR')} passos, você gerou ${fmtBRL.format(credit)} em créditos — o equivalente a ${percent.toFixed(2).replace('.', ',')}% do seu ICMS.`;
    }
    resultMsg.textContent = msg;

    resultArea.classList.remove('d-none');
  };

  calcBtn.addEventListener('click', calc);
})();
