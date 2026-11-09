// =========================================================================
// LINEAR PRECISION SCRIPT - LAB 3 FOURIER
// =========================================================================

// 1. CÓDIGOS FUENTE MATLAB Y PYTHON
const CODE_DATA = {
  code1: {
    matlab: `% 1. Definir variables
T = 1/60;               % Periodo
fo = 60;                % Frecuencia fundamental
wo = 2*pi/T;            % Frecuencia angular
A = 170;                % Amplitud en Voltios
N = 100000;             % Número de muestras (10e4)
t = linspace(0, T, N);

v = zeros(1, N);
v(1:round(N/2)-1) = A;
v(round(N/2):N) = -A;

% 2. Calcular los primeros 10 coeficientes de Fourier utilizando trapz
a0 = trapz(t, v);
a = [];
b = [];
M = 10; % Número de armónicos

for i = 1:M
    a(i) = 2*trapz(t, v.*cos(i*wo*t))/T;
    b(i) = 2*trapz(t, v.*sin(i*wo*t))/T;
end

n = [0 1:M];                 % Arreglo de índices de armónicos
c = [a0 sqrt(a.^2 + b.^2)];  % Amplitud total de los armónicos

% 3. Graficar las señales originales y el espectro en una sola figura
figure('Name', 'Puntos 1, 2 y 3 - Onda Cuadrada (M = 10)');
subplot(2, 1, 1);
area(t, v);
grid on;
xlabel('tiempo');
ylabel('Volts');
axis([0 1/fo -1.25*A 1.25*A]);

subplot(2, 1, 2);
stem(n*fo, c);
grid on;
xlabel('frecuencia (Hz)');
ylabel('amplitud');`,
    python: `import numpy as np
import matplotlib.pyplot as plt

trapz = getattr(np, 'trapezoid', getattr(np, 'trapz', None))

# 1. Definición de variables
T = 1.0 / 60.0
fo = 60.0
wo = 2.0 * np.pi / T
A = 170.0
N = 100000
t = np.linspace(0, T, N, endpoint=False)

v = np.zeros(N)
mid = N // 2
v[:mid] = A
v[mid:] = -A

# 2. Cálculo de coeficientes con trapz
a0 = trapz(v, t)
M = 10
a = np.zeros(M)
b = np.zeros(M)

for i in range(1, M + 1):
    a[i - 1] = 2.0 * trapz(v * np.cos(i * wo * t), t) / T
    b[i - 1] = 2.0 * trapz(v * np.sin(i * wo * t), t) / T

n = np.arange(0, M + 1)
c = np.concatenate(([a0], np.sqrt(a**2 + b**2)))

# 3. Graficar señales y espectro
fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(8, 6))
ax1.fill_between(t, v, step="pre", color="#1f77b4", alpha=0.7)
ax1.set_xlim(0, 1.0 / fo)
ax1.set_ylim(-1.25 * A, 1.25 * A)
ax1.set_xlabel('tiempo')
ax1.set_ylabel('Volts')
ax1.grid(True)

ax2.stem(n * fo, c, basefmt=" ")
ax2.set_xlabel('frecuencia (Hz)')
ax2.set_ylabel('amplitud')
ax2.grid(True)`
  },

  code2: {
    matlab: `% Reconstrucción armónica acumulada y película (getframe/movie)
vf = (a0/T)*ones(1, N);
Mov = struct('cdata', [], 'colormap', []);

for i = 1:M
    vf = vf + a(i)*cos(i*wo*t) + b(i)*sin(i*wo*t);
    plot(t, v, 'c', t, vf, 'b'); grid on;
    xlabel('tiempo'); ylabel('Volts');
    title(sprintf('Aproximación armónica acumulada: Armónico %d de %d', i, M));
    axis([0 1/fo -1.25*A 1.25*A]);
    drawnow;
    Mov(i) = getframe(gcf);
end

% Reproducir la película 1 vez
movie(fig2, Mov, 1);`,
    python: `# Reconstrucción armónica acumulada en Python
vf = (a0 / T) * np.ones(N)

fig, ax = plt.subplots(figsize=(8, 5))
for i in range(1, M + 1):
    vf += a[i - 1] * np.cos(i * wo * t) + b[i - 1] * np.sin(i * wo * t)

ax.plot(t, v, 'c', label='v(t) Original')
ax.plot(t, vf, 'b', label=f'vf(t) Aproximada (M = {M})')
ax.set_xlim(0, 1.0 / fo)
ax.set_ylim(-1.25 * A, 1.25 * A)
ax.set_xlabel('tiempo')
ax.set_ylabel('Volts')
ax.grid(True)
ax.legend(loc='upper right')
plt.show()`
  },

  code3: {
    matlab: `% PUNTO 5a: Onda cuadrada con M = 20 armónicos
M = 20; % Número de armónicos
a0 = trapz(t, v);
a = []; b = [];

for i = 1:M
    a(i) = 2*trapz(t, v.*cos(i*wo*t))/T;
    b(i) = 2*trapz(t, v.*sin(i*wo*t))/T;
end

n = [0 1:M];
c = [a0 sqrt(a.^2 + b.^2)];

% 1. Gráfica de espectro discreto (hasta 1200 Hz)
figure('Name', 'Punto 5a - Espectro M=20');
subplot(2, 1, 1); area(t, v); grid on;
xlabel('tiempo'); ylabel('Volts');
subplot(2, 1, 2); stem(n*fo, c); grid on;
xlabel('frecuencia (Hz)'); ylabel('amplitud');

% 2. Gráfica de aproximación temporal vf(t)
figure('Name', 'Punto 5a - Aproximación M=20');
vf = (a0/T)*ones(1, N);
for i = 1:M
    vf = vf + a(i)*cos(i*wo*t) + b(i)*sin(i*wo*t);
end
plot(t, v, 'c', t, vf, 'b'); grid on;
xlabel('tiempo'); ylabel('Volts');
title('Aproximación armónica con M = 20');
axis([0 1/fo -1.25*A 1.25*A]);`,
    python: `# PUNTO 5a: Onda cuadrada con M = 20 armónicos
M = 20
a0 = trapz(v, t)
a = np.zeros(M)
b = np.zeros(M)

for i in range(1, M + 1):
    a[i - 1] = 2.0 * trapz(v * np.cos(i * wo * t), t) / T
    b[i - 1] = 2.0 * trapz(v * np.sin(i * wo * t), t) / T

n = np.arange(0, M + 1)
c = np.concatenate(([a0], np.sqrt(a**2 + b**2)))

# 1. Gráfica de señal y espectro discreto
fig1, (ax1, ax2) = plt.subplots(2, 1, figsize=(8, 5))
ax1.fill_between(t, v, step="pre", color="#1f77b4", alpha=0.7)
ax1.set_xlim(0, 1.0 / fo); ax1.set_ylim(-1.25 * A, 1.25 * A)
ax1.set_xlabel('tiempo'); ax1.set_ylabel('Volts'); ax1.grid(True)

ax2.stem(n * fo, c, basefmt=" ")
ax2.set_xlabel('frecuencia (Hz)'); ax2.set_ylabel('amplitud'); ax2.grid(True)
plt.tight_layout()

# 2. Gráfica de aproximación temporal
vf = (a0 / T) * np.ones(N)
for i in range(1, M + 1):
    vf += a[i - 1] * np.cos(i * wo * t) + b[i - 1] * np.sin(i * wo * t)

fig2, ax = plt.subplots(figsize=(8, 4.5))
ax.plot(t, v, 'c', label='v(t) Original')
ax.plot(t, vf, 'b', label=f'vf(t) Aproximada (M = {M})')
ax.set_xlim(0, 1.0 / fo); ax.set_ylim(-1.25 * A, 1.25 * A)
ax.set_xlabel('tiempo'); ax.set_ylabel('Volts'); ax.grid(True)
ax.legend(loc='upper right'); plt.tight_layout(); plt.show()`
  },

  code4: {
    matlab: `% PUNTO 5b: Onda cuadrada con M = 50 armónicos (Fenómeno de Gibbs)
M = 50; % Número de armónicos
a0 = trapz(t, v);
a = []; b = [];

for i = 1:M
    a(i) = 2*trapz(t, v.*cos(i*wo*t))/T;
    b(i) = 2*trapz(t, v.*sin(i*wo*t))/T;
end

n = [0 1:M];
c = [a0 sqrt(a.^2 + b.^2)];

% 1. Gráfica de espectro discreto extendido (hasta 3000 Hz)
figure('Name', 'Punto 5b - Espectro M=50');
subplot(2, 1, 1); area(t, v); grid on;
xlabel('tiempo'); ylabel('Volts');
subplot(2, 1, 2); stem(n*fo, c); grid on;
xlabel('frecuencia (Hz)'); ylabel('amplitud');

% 2. Reconstrucción y observación del Fenómeno de Gibbs
figure('Name', 'Punto 5b - Aproximación M=50 y Gibbs');
vf = (a0/T)*ones(1, N);
for i = 1:M
    vf = vf + a(i)*cos(i*wo*t) + b(i)*sin(i*wo*t);
end

plot(t, v, 'c', t, vf, 'b'); grid on;
xlabel('tiempo'); ylabel('Volts');
title('Aproximación M=50: Sobreoscilación de Gibbs (~8.95%)');
axis([0 1/fo -1.25*A 1.25*A]);`,
    python: `# PUNTO 5b: Onda cuadrada con M = 50 armónicos
M = 50
a0 = trapz(v, t)
a = np.zeros(M)
b = np.zeros(M)

for i in range(1, M + 1):
    a[i - 1] = 2.0 * trapz(v * np.cos(i * wo * t), t) / T
    b[i - 1] = 2.0 * trapz(v * np.sin(i * wo * t), t) / T

n = np.arange(0, M + 1)
c = np.concatenate(([a0], np.sqrt(a**2 + b**2)))

# 1. Gráfica de espectro discreto extendido (0 - 3000 Hz)
fig1, (ax1, ax2) = plt.subplots(2, 1, figsize=(8, 5))
ax1.fill_between(t, v, step="pre", color="#1f77b4", alpha=0.7)
ax1.set_xlim(0, 1.0 / fo); ax1.set_ylim(-1.25 * A, 1.25 * A)
ax1.set_xlabel('tiempo'); ax1.set_ylabel('Volts'); ax1.grid(True)

ax2.stem(n * fo, c, basefmt=" ")
ax2.set_xlabel('frecuencia (Hz)'); ax2.set_ylabel('amplitud'); ax2.grid(True)
plt.tight_layout()

# 2. Reconstrucción temporal y sobrepico de Gibbs
vf = (a0 / T) * np.ones(N)
for i in range(1, M + 1):
    vf += a[i - 1] * np.cos(i * wo * t) + b[i - 1] * np.sin(i * wo * t)

fig2, ax = plt.subplots(figsize=(8, 4.5))
ax.plot(t, v, 'c', label='v(t) Original')
ax.plot(t, vf, 'b', label=f'vf(t) Aproximada (M = {M})')
ax.set_xlim(0, 1.0 / fo); ax.set_ylim(-1.25 * A, 1.25 * A)
ax.set_xlabel('tiempo'); ax.set_ylabel('Volts')
ax.set_title('Fenómeno de Gibbs: Sobrepico persistente de ~8.95%')
ax.grid(True); ax.legend(loc='upper right'); plt.tight_layout(); plt.show()`
  },

  code5: {
    matlab: `% PUNTO 6a: Rectificador de onda completa (num = 20)
f1 = 60; inv = 1/f1; inc = 1/(80*f1); tnum = 3*inv;
t = 0:inc:tnum;
g1 = 120*sqrt(2)*sin(2*pi*f1*t);
g = abs(g1);
N = length(g);

num = 20;
c = zeros(1, num);
cint = zeros(1, N);

for i = 1:num
    for m = 1:N
        cint(m) = exp(-1j*2*pi*(i-1)*m/N)*g(m);
    end
    c(i) = sum(cint)/N;
end

cmag = abs(c);
cphase = angle(c);

disp('valor dc de g(t)'); 
cmag(1) % Imprime ~107.5344 V

% Plotea el espectro de magnitud y fase (primeros 5 armónicos)
f = (0:num-1)*60;
figure('Name', 'Punto 6a - Rectificador (num = 20 armónicos)');
subplot(1, 2, 1); stem(f(1:5), cmag(1:5), 'filled');
title('Espectro de Amplitud'); xlabel('Frecuencia, Hz'); grid on;

subplot(1, 2, 2); stem(f(1:5), cphase(1:5), 'filled');
title('Espectro de Fase'); xlabel('Frecuencia, Hz'); grid on;`,
    python: `# Rectificador de onda completa en Python (num = 20)
f1 = 60.0; inv = 1.0 / f1; inc = 1.0 / (80.0 * f1); tnum = 3.0 * inv
t = np.arange(0, tnum + inc / 2.0, inc)

g1 = 120.0 * np.sqrt(2.0) * np.sin(2.0 * np.pi * f1 * t)
g = np.abs(g1)
N = len(g)

num = 20
c = np.zeros(num, dtype=complex)
m_vec = np.arange(1, N + 1)

for i in range(1, num + 1):
    cint = np.exp(-1j * 2.0 * np.pi * (i - 1) * m_vec / N) * g
    c[i - 1] = np.sum(cint) / N

cmag = np.abs(c)
cphase = np.angle(c)

print("valor dc de g(t)")
print(f"ans =\n   {cmag[0]:.4f}")  # ~107.5344 V

# Plotea el espectro de magnitud y fase (primeros 5 armónicos)
f = np.arange(0, num) * 60.0
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(8.5, 4.2))

ax1.stem(f[:5], cmag[:5], basefmt=" ")
ax1.set_title('Espectro de Amplitud')
ax1.set_xlabel('Frecuencia, Hz')
ax1.set_xlim(-20, 300); ax1.set_ylim(0, 130); ax1.grid(True)

ax2.stem(f[:5], cphase[:5], basefmt=" ")
ax2.set_title('Espectro de Fase')
ax2.set_xlabel('Frecuencia, Hz')
ax2.set_xlim(-20, 300); ax2.set_ylim(0, 3.5); ax2.grid(True)

plt.tight_layout()
plt.show()`
  },

  code6: {
    matlab: `% PUNTO 7: Rectificador con num = 40 y num = 60 armónicos
% Cálculo y ploteo modular de espectros para num = 40 y 60
for num = [40, 60]
    c = zeros(1, num);
    for i = 1:num
        for m = 1:N; cint(m) = exp(-1j*2*pi*(i-1)*m/N)*g(m); end
        c(i) = sum(cint)/N;
    end
    cmag = abs(c); cphase = angle(c);
    fprintf('num = %d -> Valor DC: %.4f V\n', num, cmag(1));
    
    % Ploteo de espectros de magnitud y fase
    f = (0:num-1)*60;
    figure('Name', sprintf('Rectificador (num = %d armónicos)', num));
    subplot(1, 2, 1); stem(f(1:5), cmag(1:5), 'filled');
    title(sprintf('Amplitud (num=%d)', num)); xlabel('Frecuencia, Hz'); grid on;
    
    subplot(1, 2, 2); stem(f(1:5), cphase(1:5), 'filled');
    title(sprintf('Fase (num=%d)', num)); xlabel('Frecuencia, Hz'); grid on;
end`,
    python: `# PUNTO 7: Rectificador con num = 40 y num = 60
def rectificador(num):
    c = np.zeros(num, dtype=complex)
    for i in range(1, num + 1):
        cint = np.exp(-1j * 2.0 * np.pi * (i - 1) * m_vec / N) * g
        c[i - 1] = np.sum(cint) / N
    return np.abs(c), np.angle(c)

for num in [40, 60]:
    cmag, cphase = rectificador(num)
    print(f"num = {num} -> Valor DC: {cmag[0]:.4f} V")
    
    # Ploteo de espectros de magnitud y fase
    f = np.arange(0, num) * 60.0
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(8.5, 4))
    ax1.stem(f[:5], cmag[:5], basefmt=" ")
    ax1.set_title(f'Amplitud (num = {num})')
    ax1.set_xlabel('Frecuencia, Hz'); ax1.grid(True)
    
    ax2.stem(f[:5], cphase[:5], basefmt=" ")
    ax2.set_title(f'Fase (num = {num})')
    ax2.set_xlabel('Frecuencia, Hz'); ax2.grid(True)
    plt.tight_layout()
    plt.show()`
  }
};

const activeTabs = {
  code1: 'matlab', code2: 'matlab', code3: 'matlab',
  code4: 'matlab', code5: 'matlab', code6: 'matlab'
};

function highlightSyntax(code) {
  const esc = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const kwdReg = new RegExp('\\b(for|end|if|else|def|import|from|as|return|in|range|while|try|except|pass)\\b', 'g');
  const funReg = new RegExp('\\b(trapz|trapezoid|linspace|zeros|ones|sin|cos|sqrt|abs|exp|sum|length|len|angle|subplot|subplots|figure|area|stem|plot|title|xlabel|ylabel|grid|axis|movie|getframe|drawnow|disp|print|fill_between|tight_layout|show|savefig|legend|set_xlim|set_ylim|set_xlabel|set_ylabel|set_title|fprintf)\\b', 'g');
  const numReg = new RegExp('\\b(\\d+(?:\\.\\d+)?)\\b', 'g');
  const strReg = new RegExp('(\'[^\'\\r\\n]*\')', 'g');

  return esc.split('\n').map(line => {
    let comIdx = line.indexOf('%');
    if (comIdx === -1) comIdx = line.indexOf('#');
    let codePart = line;
    let comPart = '';
    if (comIdx !== -1) {
      codePart = line.substring(0, comIdx);
      comPart = '<span class="com">' + line.substring(comIdx) + '</span>';
    }
    codePart = codePart
      .replace(strReg, '<span class="str">$1</span>')
      .replace(kwdReg, '<span class="kwd">$1</span>')
      .replace(funReg, '<span class="fun">$1</span>')
      .replace(numReg, '<span class="num">$1</span>');
    return codePart + comPart;
  }).join('\n');
}

function renderCode(blockId) {
  const lang = activeTabs[blockId];
  const rawCode = CODE_DATA[blockId][lang];
  const container = document.getElementById(blockId + '-content');
  if (container) {
    container.innerHTML = '<pre>' + highlightSyntax(rawCode) + '</pre>';
  }
}

function switchCodeTab(blockId, lang, btnElement) {
  activeTabs[blockId] = lang;
  const header = btnElement.parentElement;
  header.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btnElement.classList.add('active');
  renderCode(blockId);
}

function copyCurrentCode(blockId) {
  const lang = activeTabs[blockId];
  const rawCode = CODE_DATA[blockId][lang];
  navigator.clipboard.writeText(rawCode).then(() => {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
  });
}

// =========================================================================
// 2. MODELO MATEMÁTICO EN TIEMPO REAL (FOURIER ENGINE)
// =========================================================================
const T_SQ = 1 / 60;
const FO = 60;
const WO = 2 * Math.PI / T_SQ;
const AMP = 170;
const NUM_PTS = 1200;

const timeVec = [];
const vSquare = [];
for (let i = 0; i < NUM_PTS; i++) {
  const ti = i * T_SQ / (NUM_PTS - 1);
  timeVec.push(ti);
  vSquare.push(ti < T_SQ / 2 ? AMP : -AMP);
}

function getSquareFourierCoeffs(maxM) {
  const freqs = [0];
  const coeffs = [0];
  for (let i = 1; i <= maxM; i++) {
    freqs.push(i * FO);
    coeffs.push(i % 2 !== 0 ? (4 * AMP) / (i * Math.PI) : 0);
  }
  return { freqs, coeffs };
}

function synthesizeSquareWave(M) {
  const vf = new Float64Array(NUM_PTS);
  for (let i = 1; i <= M; i += 2) {
    const bi = (4 * AMP) / (i * Math.PI);
    const w = i * WO;
    for (let k = 0; k < NUM_PTS; k++) {
      vf[k] += bi * Math.sin(w * timeVec[k]);
    }
  }
  return Array.from(vf);
}

function getRectifierData(numHarmonics) {
  const f1 = 60;
  const inv = 1 / f1;
  const inc = 1 / (80 * f1);
  const tnum = 3 * inv;
  const tArr = [];
  for (let val = 0; val <= tnum + inc / 2; val += inc) tArr.push(val);
  const N = tArr.length;
  const g = tArr.map(ti => Math.abs(120 * Math.sqrt(2) * Math.sin(2 * Math.PI * f1 * ti)));

  const cmag = [];
  const cphase = [];
  const fArr = [];

  for (let i = 1; i <= numHarmonics; i++) {
    fArr.push((i - 1) * 60);
    let realSum = 0, imagSum = 0;
    for (let m = 1; m <= N; m++) {
      const angle = -2 * Math.PI * (i - 1) * m / N;
      realSum += Math.cos(angle) * g[m - 1];
      imagSum += Math.sin(angle) * g[m - 1];
    }
    const cr = realSum / N;
    const ci = imagSum / N;
    cmag.push(Math.sqrt(cr * cr + ci * ci));
    let ph = Math.atan2(ci, cr);
    if (i === 1) ph = 0;
    else if (ph < 0) ph += 2 * Math.PI;
    cphase.push(ph);
  }

  return { f: fArr, cmag, cphase, dc: cmag[0] };
}

const rectData20 = getRectifierData(20);
const rectData40 = getRectifierData(40);
const rectData60 = getRectifierData(60);

// =========================================================================
// 3. GENERADOR DE GRÁFICAS PLOTLY (DSP SLATE & CYAN PRECISION)
// =========================================================================
const plotlyLayoutBase = {
  paper_bgcolor: 'rgba(0,0,0,0)',
  plot_bgcolor: 'rgba(11, 15, 25, 0.75)',
  font: { family: 'Inter, system-ui, sans-serif', color: '#94a3b8', size: 12 },
  margin: { l: 55, r: 25, t: 30, b: 45 },
  showlegend: false
};

const axisConfig = {
  gridcolor: 'rgba(51, 65, 85, 0.4)',
  zerolinecolor: 'rgba(51, 65, 85, 0.65)',
  tickcolor: '#334155',
  tickfont: { size: 11, color: '#94a3b8', family: 'Fira Code, monospace' }
};

// Slide 1
function renderPlotSlide1() {
  const fData = getSquareFourierCoeffs(10);
  const traceArea = {
    x: timeVec, y: vSquare, type: 'scatter', fill: 'tozeroy',
    fillcolor: 'rgba(6, 182, 212, 0.18)',
    line: { color: '#06b6d4', width: 2 },
    name: 'v(t)', xaxis: 'x', yaxis: 'y'
  };

  const traceStemLines = [];
  for (let k = 0; k < fData.freqs.length; k++) {
    traceStemLines.push({
      type: 'line', xref: 'x2', yref: 'y2',
      x0: fData.freqs[k], y0: 0, x1: fData.freqs[k], y1: fData.coeffs[k],
      line: { color: '#38bdf8', width: 3 }
    });
  }

  const traceStemMarkers = {
    x: fData.freqs, y: fData.coeffs, mode: 'markers', type: 'scatter',
    marker: { size: 7, color: '#facc15', line: { color: '#030712', width: 1 } },
    name: 'c_n', xaxis: 'x2', yaxis: 'y2'
  };

  const layout = {
    ...plotlyLayoutBase,
    grid: { rows: 2, columns: 1, pattern: 'independent', roworder: 'top to bottom' },
    shapes: traceStemLines,
    xaxis: { ...axisConfig, title: 'tiempo (s)', range: [0, 1 / FO] },
    yaxis: { ...axisConfig, title: 'Volts', range: [-1.25 * AMP, 1.25 * AMP] },
    xaxis2: { ...axisConfig, title: 'frecuencia (Hz)', range: [-30, 630] },
    yaxis2: { ...axisConfig, title: 'amplitud', range: [-10, 250] },
    margin: { l: 60, r: 25, t: 25, b: 45 }
  };

  Plotly.react('plot-slide-1', [traceArea, traceStemMarkers], layout, { responsive: true, displayModeBar: false });
}

// Slide 2 (Punto 4)
let p4CurrentM = 10;
let movieInterval = null;

function renderPlotSlide2(M) {
  p4CurrentM = parseInt(M);
  const valEl = document.getElementById('slider-m-val');
  if (valEl) valEl.innerText = 'M = ' + p4CurrentM;
  const sliderEl = document.getElementById('slider-m-p4');
  if (sliderEl) sliderEl.value = p4CurrentM;

  const vf = synthesizeSquareWave(p4CurrentM);

  const traceOrig = {
    x: timeVec, y: vSquare, mode: 'lines',
    line: { color: 'rgba(6, 182, 212, 0.45)', width: 2, dash: 'dot' },
    name: 'v(t) Original'
  };

  const traceRecon = {
    x: timeVec, y: vf, mode: 'lines',
    line: { color: '#facc15', width: 2.8 },
    name: 'vf(t) (M=' + p4CurrentM + ')'
  };

  const layout = {
    ...plotlyLayoutBase,
    showlegend: true,
    legend: {
      orientation: 'h',
      x: 1, xanchor: 'right',
      y: 1.14, yanchor: 'bottom',
      font: { color: '#cbd5e1', size: 11, family: 'Inter, sans-serif' }
    },
    xaxis: { ...axisConfig, title: 'tiempo (s)', range: [0, 1 / FO] },
    yaxis: { ...axisConfig, title: 'Volts', range: [-1.25 * AMP, 1.25 * AMP] },
    margin: { l: 60, r: 25, t: 40, b: 45 }
  };

  Plotly.react('plot-slide-2', [traceOrig, traceRecon], layout, { responsive: true, displayModeBar: false });
}

function updatePlotPunto4(val) {
  renderPlotSlide2(val);
}

function toggleMovieAnimation() {
  const btn = document.getElementById('btn-play-movie');
  if (movieInterval) {
    clearInterval(movieInterval);
    movieInterval = null;
    btn.innerText = '▶ Reproducir Película';
    btn.classList.remove('active');
  } else {
    btn.innerText = '⏸ Pausar Película';
    btn.classList.add('active');
    let frame = 1;
    movieInterval = setInterval(() => {
      renderPlotSlide2(frame);
      frame++;
      if (frame > 10) {
        clearInterval(movieInterval);
        movieInterval = null;
        btn.innerText = '↺ Repetir Película';
        btn.classList.remove('active');
      }
    }, 500);
  }
}

// Slide 3 (Punto 5a: M = 20)
let p5aViewMode = 'dual';

function setViewP5a(mode) {
  p5aViewMode = mode;
  document.getElementById('btn-p5a-dual').classList.toggle('active', mode === 'dual');
  document.getElementById('btn-p5a-approx').classList.toggle('active', mode === 'approx');
  renderPlotSlide3();
}

function renderPlotSlide3() {
  if (p5aViewMode === 'dual') {
    const fData = getSquareFourierCoeffs(20);
    const traceArea = {
      x: timeVec, y: vSquare, type: 'scatter', fill: 'tozeroy',
      fillcolor: 'rgba(6, 182, 212, 0.18)',
      line: { color: '#06b6d4', width: 2 },
      name: 'v(t)', xaxis: 'x', yaxis: 'y'
    };

    const stemLines = [];
    for (let k = 0; k < fData.freqs.length; k++) {
      stemLines.push({
        type: 'line', xref: 'x2', yref: 'y2',
        x0: fData.freqs[k], y0: 0, x1: fData.freqs[k], y1: fData.coeffs[k],
        line: { color: '#38bdf8', width: 2.5 }
      });
    }

    const traceStem = {
      x: fData.freqs, y: fData.coeffs, mode: 'markers', type: 'scatter',
      marker: { size: 6, color: '#facc15', line: { color: '#030712', width: 1 } },
      xaxis: 'x2', yaxis: 'y2'
    };

    const layout = {
      ...plotlyLayoutBase,
      grid: { rows: 2, columns: 1, pattern: 'independent' },
      shapes: stemLines,
      xaxis: { ...axisConfig, title: 'tiempo (s)', range: [0, 1 / FO] },
      yaxis: { ...axisConfig, title: 'Volts', range: [-1.25 * AMP, 1.25 * AMP] },
      xaxis2: { ...axisConfig, title: 'frecuencia (Hz)', range: [-40, 1260] },
      yaxis2: { ...axisConfig, title: 'amplitud', range: [-10, 250] },
      margin: { l: 60, r: 25, t: 25, b: 45 }
    };

    Plotly.react('plot-slide-3', [traceArea, traceStem], layout, { responsive: true, displayModeBar: false });
  } else {
    const vf = synthesizeSquareWave(20);
    const traceOrig = {
      x: timeVec, y: vSquare, mode: 'lines',
      line: { color: 'rgba(6, 182, 212, 0.45)', width: 2, dash: 'dot' },
      name: 'v(t) Original'
    };
    const traceRecon = {
      x: timeVec, y: vf, mode: 'lines',
      line: { color: '#facc15', width: 2.8 },
      name: 'vf(t) (M = 20)'
    };
    const layout = {
      ...plotlyLayoutBase,
      showlegend: true,
      legend: {
        orientation: 'h',
        x: 1, xanchor: 'right',
        y: 1.14, yanchor: 'bottom',
        font: { color: '#cbd5e1', size: 11, family: 'Inter, sans-serif' }
      },
      xaxis: { ...axisConfig, title: 'tiempo (s)', range: [0, 1 / FO] },
      yaxis: { ...axisConfig, title: 'Volts', range: [-1.25 * AMP, 1.25 * AMP] },
      margin: { l: 60, r: 25, t: 40, b: 45 }
    };
    Plotly.react('plot-slide-3', [traceOrig, traceRecon], layout, { responsive: true, displayModeBar: false });
  }
}

// Slide 4 (Punto 5b: M = 50 & Gibbs)
let p5bViewMode = 'approx';

function setViewP5b(mode) {
  p5bViewMode = mode;
  document.getElementById('btn-p5b-approx').classList.toggle('active', mode === 'approx');
  document.getElementById('btn-p5b-spect').classList.toggle('active', mode === 'spect');
  renderPlotSlide4();
}

function renderPlotSlide4() {
  if (p5bViewMode === 'approx') {
    const vf = synthesizeSquareWave(50);
    const traceOrig = {
      x: timeVec, y: vSquare, mode: 'lines',
      line: { color: 'rgba(6, 182, 212, 0.4)', width: 2, dash: 'dot' },
      name: 'v(t) Original'
    };
    const traceRecon = {
      x: timeVec, y: vf, mode: 'lines',
      line: { color: '#facc15', width: 2.2 },
      name: 'vf(t) (M = 50)'
    };

    const layout = {
      ...plotlyLayoutBase,
      showlegend: true,
      legend: {
        orientation: 'h',
        x: 1, xanchor: 'right',
        y: 1.14, yanchor: 'bottom',
        font: { color: '#cbd5e1', size: 11, family: 'Inter, sans-serif' }
      },
      xaxis: { ...axisConfig, title: 'tiempo (s)', range: [0, 1 / FO] },
      yaxis: { ...axisConfig, title: 'Volts', range: [-1.25 * AMP, 1.25 * AMP] },
      annotations: [
        {
          x: 0.00032, y: 185.2, xref: 'x', yref: 'y',
          text: '<b>Sobrepico de Gibbs: 185.21 V (+8.95%)</b>',
          showarrow: true, arrowhead: 2, arrowcolor: '#facc15', arrowwidth: 1.5,
          ax: 65, ay: -26,
          font: { color: '#fde047', size: 11, family: 'Inter, sans-serif' },
          bgcolor: 'rgba(11, 15, 25, 0.9)',
          bordercolor: 'rgba(250, 204, 21, 0.5)',
          borderwidth: 1,
          borderpad: 4
        }
      ],
      margin: { l: 60, r: 25, t: 45, b: 45 }
    };
    Plotly.react('plot-slide-4', [traceOrig, traceRecon], layout, { responsive: true, displayModeBar: false });
  } else {
    const fData = getSquareFourierCoeffs(50);
    const stemLines = [];
    for (let k = 0; k < fData.freqs.length; k++) {
      stemLines.push({
        type: 'line', x0: fData.freqs[k], y0: 0, x1: fData.freqs[k], y1: fData.coeffs[k],
        line: { color: '#06b6d4', width: 1.8 }
      });
    }
    const traceStem = {
      x: fData.freqs, y: fData.coeffs, mode: 'markers', type: 'scatter',
      marker: { size: 4.5, color: '#facc15' }
    };
    const layout = {
      ...plotlyLayoutBase,
      shapes: stemLines,
      xaxis: { ...axisConfig, title: 'frecuencia (Hz)', range: [-50, 3100] },
      yaxis: { ...axisConfig, title: 'amplitud', range: [-5, 240] },
      margin: { l: 60, r: 25, t: 30, b: 45 }
    };
    Plotly.react('plot-slide-4', [traceStem], layout, { responsive: true, displayModeBar: false });
  }
}

// Slide 5 (Punto 6a)
function renderPlotSlide5() {
  const f5 = rectData20.f.slice(0, 5);
  const mag5 = rectData20.cmag.slice(0, 5);
  const phase5 = rectData20.cphase.slice(0, 5);

  const stemLinesMag = [];
  const stemLinesPhase = [];

  for (let k = 0; k < 5; k++) {
    stemLinesMag.push({
      type: 'line', xref: 'x', yref: 'y',
      x0: f5[k], y0: 0, x1: f5[k], y1: mag5[k],
      line: { color: '#06b6d4', width: 3.5 }
    });
    stemLinesPhase.push({
      type: 'line', xref: 'x2', yref: 'y2',
      x0: f5[k], y0: 0, x1: f5[k], y1: phase5[k],
      line: { color: '#a855f7', width: 3.5 }
    });
  }

  const traceMag = {
    x: f5, y: mag5, mode: 'markers', type: 'scatter',
    marker: { size: 8, color: '#facc15', line: { color: '#030712', width: 1.5 } },
    xaxis: 'x', yaxis: 'y'
  };

  const tracePhase = {
    x: f5, y: phase5, mode: 'markers', type: 'scatter',
    marker: { size: 8, color: '#c084fc', line: { color: '#030712', width: 1.5 } },
    xaxis: 'x2', yaxis: 'y2'
  };

  const layout = {
    ...plotlyLayoutBase,
    grid: { rows: 1, columns: 2, pattern: 'independent' },
    shapes: [...stemLinesMag, ...stemLinesPhase],
    xaxis: { ...axisConfig, title: 'Frecuencia (Hz)', range: [-20, 280] },
    yaxis: { ...axisConfig, title: 'Amplitud (V)', range: [0, 130] },
    xaxis2: { ...axisConfig, title: 'Frecuencia (Hz)', range: [-20, 280] },
    yaxis2: { ...axisConfig, title: 'Fase (rad)', range: [0, 3.5] },
    annotations: [
      {
        xref: 'x domain', yref: 'y domain',
        x: 0.5, y: 1.10, xanchor: 'center', yanchor: 'bottom',
        text: '<b>Espectro de Amplitud</b>', showarrow: false,
        font: { color: '#06b6d4', size: 12, family: 'Inter, sans-serif' }
      },
      {
        xref: 'x2 domain', yref: 'y2 domain',
        x: 0.5, y: 1.10, xanchor: 'center', yanchor: 'bottom',
        text: '<b>Espectro de Fase</b>', showarrow: false,
        font: { color: '#c084fc', size: 12, family: 'Inter, sans-serif' }
      },
      {
        x: 0, y: 107.53, xref: 'x', yref: 'y',
        text: '<b>V_dc = 107.53 V</b>', showarrow: true, arrowhead: 2,
        ax: 35, ay: -25,
        font: { color: '#fde047', size: 10, family: 'Inter, sans-serif' },
        arrowcolor: '#facc15',
        bgcolor: 'rgba(11, 15, 25, 0.9)',
        bordercolor: 'rgba(250, 204, 21, 0.5)',
        borderwidth: 1,
        borderpad: 3
      }
    ],
    margin: { l: 55, r: 25, t: 45, b: 45 }
  };

  Plotly.react('plot-slide-5', [traceMag, tracePhase], layout, { responsive: true, displayModeBar: false });
}

// Slide 6 (Punto 7)
let p7Mode = 40;

function setViewP7(mode) {
  p7Mode = mode;
  const btn40 = document.getElementById('btn-p7-40');
  const btn60 = document.getElementById('btn-p7-60');
  const btnComp = document.getElementById('btn-p7-comp');
  if (btn40) btn40.classList.toggle('active', mode === 40);
  if (btn60) btn60.classList.toggle('active', mode === 60);
  if (btnComp) btnComp.classList.toggle('active', mode === 'all');
  renderPlotSlide6();
}

function renderPlotSlide6() {
  const titleEl = document.getElementById('plot-title-p7');

  if (p7Mode === 'all') {
    if (titleEl) titleEl.innerText = 'Superposición de Espectros e Invarianza DC (num = 20, 40, 60)';

    // Subplot 1: Superposición de los primeros 5 armónicos
    const f5 = rectData20.f.slice(0, 5);
    const stemLinesComp = [];
    for (let k = 0; k < 5; k++) {
      stemLinesComp.push({
        type: 'line', xref: 'x', yref: 'y',
        x0: f5[k], y0: 0, x1: f5[k], y1: rectData20.cmag[k],
        line: { color: 'rgba(51, 65, 85, 0.7)', width: 2 }
      });
    }

    const trace20 = {
      x: f5, y: rectData20.cmag.slice(0, 5), mode: 'markers', type: 'scatter',
      marker: { size: 10, color: '#06b6d4', symbol: 'circle' },
      xaxis: 'x', yaxis: 'y', name: 'num = 20 (DC = 107.53 V)'
    };
    const trace40 = {
      x: f5, y: rectData40.cmag.slice(0, 5), mode: 'markers', type: 'scatter',
      marker: { size: 7, color: '#facc15', symbol: 'diamond' },
      xaxis: 'x', yaxis: 'y', name: 'num = 40 (DC = 107.53 V)'
    };
    const trace60 = {
      x: f5, y: rectData60.cmag.slice(0, 5), mode: 'markers', type: 'scatter',
      marker: { size: 4, color: '#c084fc', symbol: 'square' },
      xaxis: 'x', yaxis: 'y', name: 'num = 60 (DC = 107.53 V)'
    };

    // Subplot 2: Espectro Completo de 60 armónicos (0 a 3540 Hz)
    const stemLinesExt = [];
    for (let k = 0; k < rectData60.f.length; k++) {
      stemLinesExt.push({
        type: 'line', xref: 'x2', yref: 'y2',
        x0: rectData60.f[k], y0: 0, x1: rectData60.f[k], y1: rectData60.cmag[k],
        line: { color: '#06b6d4', width: 1.5 }
      });
    }
    const traceExt = {
      x: rectData60.f, y: rectData60.cmag, mode: 'markers', type: 'scatter',
      marker: { size: 4.5, color: '#facc15' },
      xaxis: 'x2', yaxis: 'y2', name: 'Espectro 60 armónicos'
    };

    const layout = {
      ...plotlyLayoutBase,
      showlegend: true,
      legend: {
        orientation: 'h',
        x: 0.5, xanchor: 'center',
        y: -0.22, yanchor: 'top',
        font: { color: '#cbd5e1', size: 10, family: 'Inter, sans-serif' }
      },
      grid: { rows: 1, columns: 2, pattern: 'independent' },
      shapes: [...stemLinesComp, ...stemLinesExt],
      xaxis: { ...axisConfig, title: 'Frecuencia (Hz)', range: [-20, 280] },
      yaxis: { ...axisConfig, title: 'Amplitud (V)', range: [0, 130] },
      xaxis2: { ...axisConfig, title: 'Frecuencia (Hz)', range: [-50, 3650] },
      yaxis2: { ...axisConfig, title: 'Amplitud (V)', range: [0, 130] },
      annotations: [
        {
          xref: 'x domain', yref: 'y domain',
          x: 0.5, y: 1.10, xanchor: 'center', yanchor: 'bottom',
          text: '<b>Invarianza de los Primeros 5 Armónicos</b>', showarrow: false,
          font: { color: '#facc15', size: 11, family: 'Inter, sans-serif' }
        },
        {
          xref: 'x2 domain', yref: 'y2 domain',
          x: 0.5, y: 1.10, xanchor: 'center', yanchor: 'bottom',
          text: '<b>Espectro Completo (0 - 3.54 kHz)</b>', showarrow: false,
          font: { color: '#06b6d4', size: 11, family: 'Inter, sans-serif' }
        }
      ],
      margin: { l: 55, r: 25, t: 45, b: 65 }
    };

    Plotly.react('plot-slide-6', [trace20, trace40, trace60, traceExt], layout, { responsive: true, displayModeBar: false });
  } else {
    const dataToUse = (p7Mode === 60) ? rectData60 : rectData40;
    if (titleEl) {
      titleEl.innerText = 'Rectificador: Espectros con num = ' + p7Mode + ' armónicos';
    }

    const f5 = dataToUse.f.slice(0, 5);
    const mag5 = dataToUse.cmag.slice(0, 5);
    const phase5 = dataToUse.cphase.slice(0, 5);

    const stemLinesMag = [];
    const stemLinesPhase = [];

    for (let k = 0; k < 5; k++) {
      stemLinesMag.push({
        type: 'line', xref: 'x', yref: 'y',
        x0: f5[k], y0: 0, x1: f5[k], y1: mag5[k],
        line: { color: '#06b6d4', width: 3.5 }
      });
      stemLinesPhase.push({
        type: 'line', xref: 'x2', yref: 'y2',
        x0: f5[k], y0: 0, x1: f5[k], y1: phase5[k],
        line: { color: '#a855f7', width: 3.5 }
      });
    }

    const traceMag = {
      x: f5, y: mag5, mode: 'markers', type: 'scatter',
      marker: { size: 8, color: '#facc15', line: { color: '#030712', width: 1.5 } },
      xaxis: 'x', yaxis: 'y', name: 'Amplitud'
    };

    const tracePhase = {
      x: f5, y: phase5, mode: 'markers', type: 'scatter',
      marker: { size: 8, color: '#c084fc', line: { color: '#030712', width: 1.5 } },
      xaxis: 'x2', yaxis: 'y2', name: 'Fase'
    };

    const layout = {
      ...plotlyLayoutBase,
      showlegend: false,
      grid: { rows: 1, columns: 2, pattern: 'independent' },
      shapes: [...stemLinesMag, ...stemLinesPhase],
      xaxis: { ...axisConfig, title: 'Frecuencia (Hz)', range: [-20, 280] },
      yaxis: { ...axisConfig, title: 'Amplitud (V)', range: [0, 130] },
      xaxis2: { ...axisConfig, title: 'Frecuencia (Hz)', range: [-20, 280] },
      yaxis2: { ...axisConfig, title: 'Fase (rad)', range: [0, 3.5] },
      annotations: [
        {
          xref: 'x domain', yref: 'y domain',
          x: 0.5, y: 1.10, xanchor: 'center', yanchor: 'bottom',
          text: '<b>Espectro de Amplitud</b>', showarrow: false,
          font: { color: '#facc15', size: 12, family: 'Inter, sans-serif' }
        },
        {
          xref: 'x2 domain', yref: 'y2 domain',
          x: 0.5, y: 1.10, xanchor: 'center', yanchor: 'bottom',
          text: '<b>Espectro de Fase</b>', showarrow: false,
          font: { color: '#c084fc', size: 12, family: 'Inter, sans-serif' }
        },
        {
          x: 0, y: 107.53, xref: 'x', yref: 'y',
          text: '<b>V_dc = 107.53 V</b>', showarrow: true, arrowhead: 2,
          ax: 35, ay: -25,
          font: { color: '#fde047', size: 10, family: 'Inter, sans-serif' },
          arrowcolor: '#facc15',
          bgcolor: 'rgba(11, 15, 25, 0.9)',
          bordercolor: 'rgba(250, 204, 21, 0.5)',
          borderwidth: 1,
          borderpad: 3
        }
      ],
      margin: { l: 55, r: 25, t: 45, b: 45 }
    };

    Plotly.react('plot-slide-6', [traceMag, tracePhase], layout, { responsive: true, displayModeBar: false });
  }
}

// Slide 7 (Conclusiones)
function renderPlotSlide7() {
  const harmOrders = [];
  const sqDecay = [];
  const rectDecay = [];
  for (let n = 1; n <= 15; n += 2) {
    harmOrders.push(n);
    sqDecay.push(100 / n);
    rectDecay.push(100 / (4 * n * n - 1));
  }

  const traceSq = {
    x: harmOrders, y: sqDecay,
    mode: 'lines+markers', name: 'Onda Cuadrada (~1/n)',
    line: { color: '#38bdf8', width: 2.5 }, marker: { size: 7, color: '#38bdf8' }
  };

  const traceRect = {
    x: harmOrders, y: rectDecay,
    mode: 'lines+markers', name: 'Rectificador (~1/n²)',
    line: { color: '#facc15', width: 2.5 }, marker: { size: 7, color: '#fde047' }
  };

  const layout = {
    ...plotlyLayoutBase,
    showlegend: true,
    legend: {
      orientation: 'h',
      x: 1, xanchor: 'right',
      y: 1.14, yanchor: 'bottom',
      font: { color: '#cbd5e1', size: 11, family: 'Inter, sans-serif' }
    },
    xaxis: { ...axisConfig, title: 'Orden Armónico (n)', range: [0, 16] },
    yaxis: { ...axisConfig, title: 'Energía Relativa Normalizada (%)', range: [-2, 105] },
    margin: { l: 60, r: 25, t: 40, b: 45 }
  };

  Plotly.react('plot-slide-7', [traceSq, traceRect], layout, { responsive: true, displayModeBar: false });
}

// =========================================================================
// 4. NAVEGACIÓN Y SINCRONIZACIÓN DE DIAPOSITIVAS
// =========================================================================
let currentSlide = 0;
const totalSlides = 8;

const topicTitles = [
  "Laboratorio 3 — Serie de Fourier en MATLAB y Python",
  "Puntos 1, 2 y 3 — Onda Cuadrada Base y Coeficientes (Zaul Uturunco)",
  "Punto 4 — Reconstrucción y Película de Fourier (Franco Gutierrez)",
  "Punto 5a — Incremento de Armónicos a M = 20 (Alex Quispe)",
  "Punto 5b — Aproximación M = 50 y Fenómeno de Gibbs (Benjamín Quispe)",
  "Punto 6a — Rectificador de Onda Completa y DC (Henry Gutierrez)",
  "Punto 7 — Rectificador con 40 y 60 Armónicos (Jeremy Villalta)",
  "Conclusiones Generales & Comparativa MATLAB vs Python"
];

function toggleDropdownMenu() {
  const menu = document.getElementById('sections-dropdown');
  menu.classList.toggle('show');
}

// Close dropdown on click outside
window.addEventListener('click', (e) => {
  const wrapper = document.querySelector('.dropdown-wrapper');
  if (wrapper && !wrapper.contains(e.target)) {
    const menu = document.getElementById('sections-dropdown');
    if (menu) menu.classList.remove('show');
  }
});

function goToSlide(index) {
  if (index < 0 || index >= totalSlides) return;
  currentSlide = index;

  // Actualizar diapositivas
  document.querySelectorAll('.slide').forEach((s, idx) => {
    s.classList.toggle('active', idx === currentSlide);
  });

  // Actualizar pills en navbar superior
  document.querySelectorAll('.nav-pill').forEach((pill, idx) => {
    pill.classList.toggle('active', idx === currentSlide);
  });

  // Actualizar items en dropdown
  document.querySelectorAll('.dropdown-item').forEach((item, idx) => {
    item.classList.toggle('active', idx === currentSlide);
  });

  // Cerrar menú dropdown si estaba abierto
  const menu = document.getElementById('sections-dropdown');
  if (menu) menu.classList.remove('show');

  // Actualizar slide indicator y título
  const indicator = document.getElementById('slide-indicator');
  if (indicator) indicator.innerText = 'Slide ' + (currentSlide + 1) + ' / ' + totalSlides;

  // Barra de progreso
  const pct = (currentSlide / (totalSlides - 1)) * 100;
  document.getElementById('progress-bar').style.width = pct + '%';

  // Botones anterior / siguiente
  document.getElementById('btn-prev').disabled = currentSlide === 0;
  document.getElementById('btn-next').disabled = currentSlide === totalSlides - 1;

  // Renderizar matemáticas KaTeX en la diapositiva activa
  if (window.renderMathInElement) {
    renderMathInElement(document.getElementById('slide-' + currentSlide), {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false }
      ],
      throwOnError: false
    });
  }

  // Renderizar gráfica Plotly
  setTimeout(() => {
    if (currentSlide === 1) renderPlotSlide1();
    else if (currentSlide === 2) renderPlotSlide2(p4CurrentM);
    else if (currentSlide === 3) renderPlotSlide3();
    else if (currentSlide === 4) renderPlotSlide4();
    else if (currentSlide === 5) renderPlotSlide5();
    else if (currentSlide === 6) renderPlotSlide6();
    else if (currentSlide === 7) renderPlotSlide7();
  }, 60);
}

document.getElementById('btn-prev').addEventListener('click', () => goToSlide(currentSlide - 1));
document.getElementById('btn-next').addEventListener('click', () => goToSlide(currentSlide + 1));

// Keyboard shortcuts
window.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT') return;
  if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
    e.preventDefault();
    goToSlide(currentSlide + 1);
  } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
    e.preventDefault();
    goToSlide(currentSlide - 1);
  } else if (e.key === 'f' || e.key === 'F') {
    toggleFullscreen();
  } else if (e.key >= '0' && e.key <= '7') {
    goToSlide(parseInt(e.key));
  }
});

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen().catch(() => {});
  }
}
document.getElementById('btn-fullscreen').addEventListener('click', toggleFullscreen);

// =========================================================================
// 5. ANIMACIÓN DE ONDAS DESENFOCADAS EN EL FONDO (CANVAS DSP)
// =========================================================================
const canvas = document.getElementById('bg-signals-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let step = 0;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function drawBlurredSignals() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    step += 0.016;

    const w = canvas.width;
    const h = canvas.height;
    const centerY = h * 0.48;

    // 1. Barras espectrales suaves en la base inferior (Dominio frecuencial)
    const numBars = 36;
    const barWidth = w / (numBars * 1.55);
    const gap = barWidth * 0.5;
    const startX = (w - (numBars * (barWidth + gap))) / 2;

    for (let i = 0; i < numBars; i++) {
      const barHeight =
        Math.sin(step * 1.3 + i * 0.26) * 45 +
        Math.cos(step * 0.7 + i * 0.14) * 30 +
        60;

      const bx = startX + i * (barWidth + gap);
      const by = h - barHeight - 15;

      const gradient = ctx.createLinearGradient(0, by, 0, h);
      gradient.addColorStop(0, 'rgba(250, 204, 21, 0.28)');
      gradient.addColorStop(0.5, 'rgba(245, 158, 11, 0.12)');
      gradient.addColorStop(1, 'rgba(3, 7, 18, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(bx, by, barWidth, barHeight, [6, 6, 0, 0]);
      } else {
        ctx.rect(bx, by, barWidth, barHeight);
      }
      ctx.fill();
    }

    // 2. Ondas armónicas sinusoidales superpuestas (Fasores en tiempo)
    const waves = [
      { freq: 0.007, amp: 65, speed: 0.02, color: 'rgba(250, 204, 21, 0.42)', width: 3 },
      { freq: 0.013, amp: 44, speed: -0.016, color: 'rgba(249, 115, 22, 0.35)', width: 2.5 },
      { freq: 0.021, amp: 28, speed: 0.025, color: 'rgba(6, 182, 212, 0.32)', width: 2 },
      { freq: 0.032, amp: 18, speed: -0.02, color: 'rgba(168, 85, 247, 0.25)', width: 1.8 }
    ];

    waves.forEach(wave => {
      ctx.beginPath();
      ctx.lineWidth = wave.width;
      ctx.strokeStyle = wave.color;

      for (let x = 0; x < w; x += 4) {
        const y = centerY + Math.sin(x * wave.freq + step * (wave.speed * 85)) * wave.amp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    });

    requestAnimationFrame(drawBlurredSignals);
  }
  drawBlurredSignals();
}

// Inicialización general al cargar el DOM
window.addEventListener('DOMContentLoaded', () => {
  Object.keys(CODE_DATA).forEach(renderCode);
  goToSlide(0);

  // Inicializar KaTeX en todo el documento
  if (window.renderMathInElement) {
    renderMathInElement(document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false }
      ],
      throwOnError: false
    });
  }
});

// Resize de Plotly en cambios de ventana
window.addEventListener('resize', () => {
  ['plot-slide-1', 'plot-slide-2', 'plot-slide-3', 'plot-slide-4', 'plot-slide-5', 'plot-slide-6', 'plot-slide-7'].forEach(id => {
    Plotly.Plots.resize(id).catch(()=>{});
  });
});
