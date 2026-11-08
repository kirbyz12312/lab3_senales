"""
LABORATORIO 3 - PUNTO 6c (PYTHON)
Rectificador de onda completa con incremento a num = 60 armónicos.
"""

import os
import numpy as np
import matplotlib.pyplot as plt

def main():
    print(">>> Ejecutando Punto 6c: num = 60 armónicos (Python)...")
    
    f1 = 60.0
    inv = 1.0 / f1
    inc = 1.0 / (80.0 * f1)
    tnum = 3.0 * inv
    t = np.arange(0, tnum + inc / 2.0, inc)
    
    g1 = 120.0 * np.sqrt(2.0) * np.sin(2.0 * np.pi * f1 * t)
    g = np.abs(g1)
    N = len(g)
    
    num = 60
    c = np.zeros(num, dtype=complex)
    m_vec = np.arange(1, N + 1)
    
    for i in range(1, num + 1):
        cint = np.exp(-1j * 2.0 * np.pi * (i - 1) * m_vec / N) * g
        c[i - 1] = np.sum(cint) / N
        
    cmag = np.abs(c)
    cphase = np.angle(c)
    
    print("valor dc de g(t)")
    print(f"ans =\n   {cmag[0]:.4f}")
    
    f = np.arange(0, num) * 60.0
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(8.5, 4.5))
    
    ax1.stem(f[:5], cmag[:5], basefmt=" ")
    ax1.set_title('Espectro de Amplitud')
    ax1.set_xlabel('Frecuencia, Hz')
    ax1.set_xlim(-20, 300)
    ax1.set_ylim(0, 130)
    ax1.grid(True)
    
    ax2.stem(f[:5], cphase[:5], basefmt=" ")
    ax2.set_title('Espectro de Fase')
    ax2.set_xlabel('Frecuencia, Hz')
    ax2.set_xlim(-20, 300)
    ax2.set_ylim(0, 3.5)
    ax2.grid(True)
    
    plt.tight_layout()
    img_dir = os.path.join(os.path.dirname(__file__), '..', 'Informe', 'imagenes')
    os.makedirs(img_dir, exist_ok=True)
    fig.savefig(os.path.join(img_dir, 'py_punto6c_rectificador_60armonicos.png'), dpi=300)
    plt.close(fig)
    print("Punto 6c (Python) completado con éxito.")

if __name__ == '__main__':
    main()
