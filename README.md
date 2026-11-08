# Laboratorio 3 — Serie de Fourier en MATLAB y Python

> **Presentación Web Interactiva & Análisis Numérico de Fourier**  
> **Universidad Nacional de San Agustín de Arequipa (UNSA)**  
> **Escuela Profesional de Ingeniería de Telecomunicaciones (EPIT)**  
> *Curso: Señales y Sistemas*

---

## 📌 Descripción del Proyecto

Aplicación web interactiva desarrollada para la sustentación del **Laboratorio 3 — Serie de Fourier**, diseñada siguiendo los principios estéticos del sistema **Linear (*Midnight Precision Instrument*)**. La plataforma permite explorar en tiempo real la descomposición y síntesis de Fourier de:

1. **Onda Cuadrada** de $170\text{ V} \text{ @ } 60\text{ Hz}$ ($N = 100\,000$ muestras) evaluada para $M = 10, 20 \text{ y } 50$ armónicos, junto con la comprobación analítica del **Fenómeno de Gibbs** ($+8.95\%$).
2. **Rectificador de Onda Completa** ($g(t) = |120\sqrt{2}\sin(2\pi \cdot 60 t)|$) para $\text{num} = 20, 40 \text{ y } 60$ armónicos, comprobando la estabilidad e invarianza del valor medio $V_{dc} \approx 107.5344\text{ V}$.

---

## 👥 Integrantes del Equipo

1. **Gutierrez Barrionuevo, Henry Andre** — *Punto 6a: Rectificador de Onda Completa ($\text{num} = 20$) & Valor DC*
2. **Gutierrez Ccolqque, Franco Arturo** — *Punto 4: Reconstrucción Temporal y Película de Fourier ($M = 1 \dots 10$)*
3. **Quispe Flores, Benjamín Eduardo** — *Punto 5b: Convergencia con $M = 50$ & Fenómeno de Gibbs*
4. **Quispe Yncarroque, Alex Cesar** — *Punto 5a: Incremento de Armónicos a $M = 20$ (Hasta $1200\text{ Hz}$)*
5. **Uturunco Cuela, Zaul Francisco** — *Puntos 1, 2 y 3: Onda Cuadrada Base, Coeficientes $\text{trapz}$ y Espectro ($M = 10$)*
6. **Villalta Checalla, Gianluigi Jeremy** — *Punto 7: Rectificador con $\text{num} = 40$ y $60$ Armónicos & Invarianza DC*

---

## 🛠️ Tecnologías y Arquitectura

- **Frontend:** HTML5 semántico, CSS3 modular (tema Linear Midnight `#000000`), Vanilla JavaScript ES6+.
- **Gráficas en Tiempo Real:** [Plotly.js](https://plotly.com/javascript/) (renderizado interactivo client-side de señales y espectros).
- **Tipografía Matemática:** [KaTeX](https://katex.org/) para renderizado ultrarrápido de expresiones en LaTeX.
- **Scripts de Laboratorio:**
  - `matlab/ALL.m`: Código fuente unificado en MATLAB (trapz, getframe, movie).
  - `python/all.py`: Código fuente unificado en Python (NumPy, Matplotlib).
- **Background Engine:** Canvas dinámico con señales armónicas desenfocadas en tiempo real.

---

## 🚀 Despliegue en Vercel con GitHub

El repositorio está 100% optimizado para despliegue instantáneo como **Static Web App** en **Vercel**:

### Opción 1: Conectar Repositorio desde el Dashboard de Vercel (Recomendada)

1. Sube este proyecto a tu cuenta de **GitHub**:
   ```bash
   git init -b main
   git add .
   git commit -m "feat: presentación fourier lista para vercel"
   git remote add origin https://github.com/<tu-usuario>/<nombre-del-repo>.git
   git push -u origin main
   ```
2. Entra a [vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
3. Haz clic en **"Add New..."** &rarr; **"Project"**.
4. Selecciona tu repositorio de la lista y presiona **"Import"**.
5. En la configuración de Vercel:
   - **Framework Preset:** `Other` (Static HTML).
   - **Root Directory:** `./`
   - **Build Command:** *(dejar vacío)*
   - **Output Directory:** *(dejar vacío)*
6. Haz clic en **"Deploy"**. En menos de 30 segundos tu proyecto estará en línea con HTTPS y CDN global.

### Opción 2: Usando Vercel CLI

Si tienes instalado Vercel CLI en tu terminal:
```bash
npx vercel
```
Sigue los pasos interactivos y selecciona las opciones por defecto (`Y`). Para producción:
```bash
npx vercel --prod
```

---

## 💻 Ejecución Local

Para visualizar la presentación localmente sin necesidad de servidor:
1. Abre directamente el archivo `index.html` en cualquier navegador web moderno (Chrome, Edge, Firefox, Brave).
2. O ejecuta un servidor local ligero:
   ```bash
   npx serve .
   ```
3. Presiona **F11** para activar el modo de pantalla completa durante la exposición.

---

## 📄 Licencia

Este proyecto fue desarrollado con fines académicos en la **Universidad Nacional de San Agustín de Arequipa (UNSA)** — Escuela Profesional de Ingeniería de Telecomunicaciones.

