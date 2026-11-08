"""
================================================================================
LABORATORIO 3 - SERIE DE FOURIER EN PYTHON (CÓDIGO UNIFICADO)
================================================================================
Este script integra todos los puntos del laboratorio:
  - Puntos 1, 2 y 3: Onda cuadrada con 10 armónicos
  - Punto 4: Reconstrucción armónica acumulada (equivalente a película)
  - Punto 5a: Onda cuadrada con 20 armónicos
  - Punto 5b: Onda cuadrada con 50 armónicos (Fenómeno de Gibbs)
  - Punto 6a: Rectificador de onda completa (20 armónicos)
  - Punto 6b: Rectificador de onda completa (40 armónicos)
  - Punto 6c: Rectificador de onda completa (60 armónicos)
================================================================================
"""

import os
import numpy as np
import matplotlib.pyplot as plt

# Compatibilidad entre versiones de NumPy (trapz -> trapezoid)
trapz = getattr(np, 'trapezoid', getattr(np, 'trapz', None))

# Directorio de imágenes (se calcula una sola vez al inicio)
IMG_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'Informe', 'imagenes')
os.makedirs(IMG_DIR, exist_ok=True)


def pausa(mensaje):
    """Pausa la ejecución para revisar resultados antes de continuar."""
    print(mensaje)
    try:
        input("Presione ENTER para continuar...")
    except EOFError:
        # Si no hay entrada interactiva (ej. ejecución en batch), no se detiene
        pass


# ==============================================================================
# PUNTOS 1, 2 Y 3: ONDA CUADRADA CON 10 ARMÓNICOS
# ==============================================================================
# Objetivo: Definir la señal cuadrada de 170 V y 60 Hz, calcular los primeros
# 10 coeficientes usando integración trapezoidal y graficar con área y stem.
# ==============================================================================
def puntos_1_2_3():
    print("\n========================================")
    print("PUNTOS 1, 2 Y 3: Onda cuadrada (M = 10)")
    print("========================================")

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
    fig.savefig(os.path.join(IMG_DIR, 'py_punto1_2_3_onda_cuadrada_10armonicos.png'), dpi=300)
    plt.close(fig)
    print("Puntos 1, 2 y 3 (Python) completados con éxito.")


# ==============================================================================
# PUNTO 4: RECONSTRUCCIÓN ARMÓNICA ACUMULADA (EQUIVALENTE A PELÍCULA)
# ==============================================================================
# Objetivo: Reconstruir la onda cuadrada sumando armónicos hasta M = 10
# (equivalente a la animación/película con getframe y movie en MATLAB).
# ==============================================================================
def punto_4():
    print("\n========================================")
    print("PUNTO 4: Aproximación armónica acumulada (M = 10)")
    print("========================================")

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
    fig.savefig(os.path.join(IMG_DIR, 'py_punto4_pelicula_aproximacion_final.png'), dpi=300)
    plt.close(fig)
    print("Punto 4 (Python) completado con éxito.")


# ==============================================================================
# PUNTO 5a: ONDA CUADRADA CON 20 ARMÓNICOS
# ==============================================================================
# Objetivo: Incrementar el número de armónicos a M = 20 y observar la mejora
# en la aproximación de la onda cuadrada y el espectro resultante.
# ==============================================================================
def punto_5a():
    print("\n========================================")
    print("PUNTO 5a: Onda cuadrada (M = 20)")
    print("========================================")

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
    fig1.savefig(os.path.join(IMG_DIR, 'py_punto5a_onda_cuadrada_20armonicos_espectro.png'), dpi=300)
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
    fig2.savefig(os.path.join(IMG_DIR, 'py_punto5a_onda_cuadrada_20armonicos_aprox.png'), dpi=300)
    plt.close(fig2)
    print("Punto 5a (Python) completado con éxito.")


# ==============================================================================
# PUNTO 5b: ONDA CUADRADA CON 50 ARMÓNICOS (FENÓMENO DE GIBBS)
# ==============================================================================
# Objetivo: Incrementar el número de armónicos a M = 50 y observar la
# convergencia y el Fenómeno de Gibbs en las discontinuidades.
# ==============================================================================
def punto_5b():
    print("\n========================================")
    print("PUNTO 5b: Onda cuadrada (M = 50)")
    print("========================================")

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
    M = 50
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
    fig1.savefig(os.path.join(IMG_DIR, 'py_punto5b_onda_cuadrada_50armonicos_espectro.png'), dpi=300)
    plt.close(fig1)

    # 2. Gráfica de aproximación y Gibbs
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
    fig2.savefig(os.path.join(IMG_DIR, 'py_punto5b_onda_cuadrada_50armonicos_aprox.png'), dpi=300)
    plt.close(fig2)
    print("Punto 5b (Python) completado con éxito.")


# ==============================================================================
# FUNCIÓN AUXILIAR PARA EL RECTIFICADOR DE ONDA COMPLETA
# ==============================================================================
# Encapsula la lógica común de los puntos 6a, 6b y 6c (solo cambia `num`).
# ==============================================================================
def _rectificador(num, nombre_archivo, etiqueta_punto):
    print(f"\n========================================")
    print(f"{etiqueta_punto}: Rectificador de onda completa (num = {num})")
    print("========================================")

    # Genera la forma de onda del rectificador de onda completa
    f1 = 60.0
    inv = 1.0 / f1
    inc = 1.0 / (80.0 * f1)
    tnum = 3.0 * inv
    t = np.arange(0, tnum + inc / 2.0, inc)

    g1 = 120.0 * np.sqrt(2.0) * np.sin(2.0 * np.pi * f1 * t)
    g = np.abs(g1)
    N = len(g)

    # Obtiene los coeficientes de la Serie Exponencial de Fourier
    c = np.zeros(num, dtype=complex)
    m_vec = np.arange(1, N + 1)

    for i in range(1, num + 1):
        cint = np.exp(-1j * 2.0 * np.pi * (i - 1) * m_vec / N) * g
        c[i - 1] = np.sum(cint) / N

    cmag = np.abs(c)
    cphase = np.angle(c)

    # Imprime el valor DC
    print("valor dc de g(t)")
    print(f"ans =\n   {cmag[0]:.4f}")

    # Plotea el espectro de magnitud y fase (primeros 5 armónicos)
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
    fig.savefig(os.path.join(IMG_DIR, nombre_archivo), dpi=300)
    plt.close(fig)
    print(f"{etiqueta_punto} (Python) completado con éxito.")


# ==============================================================================
# PUNTO 6a: RECTIFICADOR DE ONDA COMPLETA (num = 20)
# ==============================================================================
# a) Coeficientes exponenciales Cn para n = 0, 1, 2, ..., 19
# b) Valor de DC (~107.5344 V)
# c) Espectro de amplitud y fase
# ==============================================================================
def punto_6a():
    _rectificador(num=20,
                  nombre_archivo='py_punto6a_rectificador_20armonicos.png',
                  etiqueta_punto='Punto 6a')


# ==============================================================================
# PUNTO 6b: RECTIFICADOR DE ONDA COMPLETA (num = 40)
# ==============================================================================
# Incremento del número de armónicos a considerar (40 armónicos)
# ==============================================================================
def punto_6b():
    _rectificador(num=40,
                  nombre_archivo='py_punto6b_rectificador_40armonicos.png',
                  etiqueta_punto='Punto 6b')


# ==============================================================================
# PUNTO 6c: RECTIFICADOR DE ONDA COMPLETA (num = 60)
# ==============================================================================
# Incremento del número de armónicos a considerar (60 armónicos)
# ==============================================================================
def punto_6c():
    _rectificador(num=60,
                  nombre_archivo='py_punto6c_rectificador_60armonicos.png',
                  etiqueta_punto='Punto 6c')


# ==============================================================================
# EJECUCIÓN PRINCIPAL
# ==============================================================================
def main():
    print("======================================================================")
    print("LABORATORIO 3 - SERIE DE FOURIER EN PYTHON (CÓDIGO UNIFICADO)")
    print("======================================================================")

    puntos_1_2_3()
    pausa("\nPresione ENTER para continuar con el Punto 4...")

    punto_4()
    pausa("\nPresione ENTER para continuar con el Punto 5a...")

    punto_5a()
    pausa("\nPresione ENTER para continuar con el Punto 5b...")

    punto_5b()
    pausa("\nPresione ENTER para continuar con el Punto 6a...")

    punto_6a()
    pausa("\nPresione ENTER para continuar con el Punto 6b...")

    punto_6b()
    pausa("\nPresione ENTER para continuar con el Punto 6c...")

    punto_6c()

    print("\n======================================================================")
    print("TODOS LOS PUNTOS DEL LABORATORIO COMPLETADOS (Python)")
    print("======================================================================")


if __name__ == '__main__':
    main()