"""
LABORATORIO 3 - PUNTOS 1, 2 Y 3 (PYTHON)
Onda cuadrada de 170 V y 60 Hz, cálculo de 10 coeficientes con integración trapezoidal
y gráficas de señal original (fill_between / area) y espectro de amplitud (stem).
"""

import os
import numpy as np
import matplotlib.pyplot as plt

trapz = getattr(np, 'trapezoid', getattr(np, 'trapz', None))

def main():
    print(">>> Ejecutando Puntos 1, 2 y 3 (Python)...")
    
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
    
    # 2. Cálculo de los primeros 10 coeficientes de Fourier con trapz
    a0 = trapz(v, t)
    M = 10
    a = np.zeros(M)
    b = np.zeros(M)
    
    for i in range(1, M + 1):
        a[i - 1] = 2.0 * trapz(v * np.cos(i * wo * t), t) / T
        b[i - 1] = 2.0 * trapz(v * np.sin(i * wo * t), t) / T
        
    n = np.arange(0, M + 1)
    c = np.concatenate(([a0], np.sqrt(a**2 + b**2)))
    
    # 3. Graficar señales originales y espectro
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
    ax2.grid(True)
    
    plt.tight_layout()
    img_dir = os.path.join(os.path.dirname(__file__), '..', 'Informe', 'imagenes')
    os.makedirs(img_dir, exist_ok=True)
    fig.savefig(os.path.join(img_dir, 'py_punto1_2_3_onda_cuadrada_10armonicos.png'), dpi=300)
    plt.close(fig)
    print("Puntos 1, 2 y 3 (Python) completados con éxito.")

if __name__ == '__main__':
    main()
