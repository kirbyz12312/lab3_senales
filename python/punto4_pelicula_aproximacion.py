"""
LABORATORIO 3 - PUNTO 4 (PYTHON)
Reconstrucción armónica acumulada de la onda cuadrada (equivalente a la película/animación).
"""

import os
import numpy as np
import matplotlib.pyplot as plt

trapz = getattr(np, 'trapezoid', getattr(np, 'trapz', None))

def main():
    print(">>> Ejecutando Punto 4 (Python)...")
    
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
    M = 10
    a = np.zeros(M)
    b = np.zeros(M)
    
    for i in range(1, M + 1):
        a[i - 1] = 2.0 * trapz(v * np.cos(i * wo * t), t) / T
        b[i - 1] = 2.0 * trapz(v * np.sin(i * wo * t), t) / T
        
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
    
    plt.tight_layout()
    img_dir = os.path.join(os.path.dirname(__file__), '..', 'Informe', 'imagenes')
    os.makedirs(img_dir, exist_ok=True)
    fig.savefig(os.path.join(img_dir, 'py_punto4_pelicula_aproximacion_final.png'), dpi=300)
    plt.close(fig)
    print("Punto 4 (Python) completado con éxito.")

if __name__ == '__main__':
    main()
