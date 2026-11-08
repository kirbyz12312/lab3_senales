"""
LABORATORIO 3 - PUNTO 5a (PYTHON)
Onda cuadrada de 170 V y 60 Hz con M = 20 armónicos.
"""

import os
import numpy as np
import matplotlib.pyplot as plt

trapz = getattr(np, 'trapezoid', getattr(np, 'trapz', None))

def main():
    print(">>> Ejecutando Punto 5a: M = 20 armónicos (Python)...")
    
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
    
    a0 = trapz(v, t)
    M = 20
    a = np.zeros(M)
    b = np.zeros(M)
    
    for i in range(1, M + 1):
        a[i - 1] = 2.0 * trapz(v * np.cos(i * wo * t), t) / T
        b[i - 1] = 2.0 * trapz(v * np.sin(i * wo * t), t) / T
        
    n = np.arange(0, M + 1)
    c = np.concatenate(([a0], np.sqrt(a**2 + b**2)))
    
    # 1. Gráfica de espectro
    fig1, (ax1, ax2) = plt.subplots(2, 1, figsize=(8, 6))
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
    fig1.savefig(os.path.join(img_dir, 'py_punto5a_onda_cuadrada_20armonicos_espectro.png'), dpi=300)
    plt.close(fig1)
    
    # 2. Gráfica de aproximación
    vf = (a0 / T) * np.ones(N)
    for i in range(1, M + 1):
        vf += a[i - 1] * np.cos(i * wo * t) + b[i - 1] * np.sin(i * wo * t)
        
    fig2, ax = plt.subplots(figsize=(8, 5))
    ax.plot(t, v, 'c', label='v(t) Original')
    ax.plot(t, vf, 'b', label=f'vf(t) Aproximada (M = {M})')
    ax.set_xlim(0, 1.0 / fo)
    ax.set_ylim(-1.25 * A, 1.25 * A)
    ax.set_xlabel('tiempo')
    ax.set_ylabel('Volts')
    ax.grid(True)
    ax.legend(loc='upper right')
    
    plt.tight_layout()
    fig2.savefig(os.path.join(img_dir, 'py_punto5a_onda_cuadrada_20armonicos_aprox.png'), dpi=300)
    plt.close(fig2)
    print("Punto 5a (Python) completado con éxito.")

if __name__ == '__main__':
    main()
