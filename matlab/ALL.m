%% ========================================================================
%% LABORATORIO 3 - SERIE DE FOURIER EN MATLAB (CÓDIGO UNIFICADO)
%% ========================================================================
% Este script integra todos los puntos del laboratorio:
%   - Puntos 1, 2 y 3: Onda cuadrada con 10 armónicos
%   - Punto 4: Película de aproximación de Fourier
%   - Punto 5a: Onda cuadrada con 20 armónicos
%   - Punto 5b: Onda cuadrada con 50 armónicos
%   - Punto 6a: Rectificador de onda completa (20 armónicos)
%   - Punto 6b: Rectificador de onda completa (40 armónicos)
%   - Punto 6c: Rectificador de onda completa (60 armónicos)
%% ========================================================================

clear; clc; close all;

%% ========================================================================
%% PUNTOS 1, 2 Y 3: ONDA CUADRADA CON 10 ARMÓNICOS
%% ========================================================================
% Objetivo: Definir la señal cuadrada de 170 V y 60 Hz, calcular los primeros
% 10 coeficientes usando integración trapezoidal (trapz) y graficar con area y stem.

disp('========================================');
disp('PUNTOS 1, 2 Y 3: Onda cuadrada (M = 10)');
disp('========================================');

% 1. Definir variables
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
ylabel('amplitud');

% Guardar imagen para el informe
imgDir = fullfile(fileparts(mfilename('fullpath')), '..', 'Informe', 'imagenes');
if ~exist(imgDir, 'dir'); mkdir(imgDir); end
saveas(gcf, fullfile(imgDir, 'punto1_2_3_onda_cuadrada_10armonicos.png'));

disp('Puntos 1, 2 y 3 completados con éxito.');
disp('Presione ENTER para continuar con el Punto 4...');
pause;

%% ========================================================================
%% PUNTO 4: PELÍCULA Y APROXIMACIÓN DE FOURIER
%% ========================================================================
% Objetivo: Realizar una película donde se vea el efecto de la aproximación 
% de la serie de Fourier en función del número de armónicos con getframe y movie.

disp('========================================');
disp('PUNTO 4: Película de aproximación (M = 10)');
disp('========================================');

% Definición de parámetros
T = 1/60;
fo = 60;
wo = 2*pi/T;
A = 170;
N = 100000;
t = linspace(0, T, N);

v = zeros(1, N);
v(1:round(N/2)-1) = A;
v(round(N/2):N) = -A;

a0 = trapz(t, v);
M = 10; % Número de armónicos para la animación
a = zeros(1, M);
b = zeros(1, M);

for i = 1:M
    a(i) = 2*trapz(t, v.*cos(i*wo*t))/T;
    b(i) = 2*trapz(t, v.*sin(i*wo*t))/T;
end

n = [0 1:M];
c = [a0 sqrt(a.^2 + b.^2)];

% Figura 1: Señal y espectro
fig1 = figure('Name', 'Punto 4 - Espectro M=10');
subplot(2,1,1); area(t,v); grid on;
xlabel('tiempo'); ylabel('Volts');
axis([0 1/fo -1.25*A 1.25*A]);
subplot(2,1,2); stem(n*fo,c); grid on;
xlabel('frecuencia (Hz)'); ylabel('amplitud');

% Figura 2: Generación de la película con getframe
fig2 = figure('Name', 'Punto 4 - Película / Animación');
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
movie(fig2, Mov, 1);

% Guardar captura final
saveas(fig2, fullfile(imgDir, 'punto4_pelicula_aproximacion_final.png'));

disp('Punto 4 completado con éxito.');
disp('Presione ENTER para continuar con el Punto 5a...');
pause;

%% ========================================================================
%% PUNTO 5a: ONDA CUADRADA CON 20 ARMÓNICOS
%% ========================================================================
% Objetivo: Incrementar el número de armónicos a M = 20 y observar la mejora
% en la aproximación de la onda cuadrada y el espectro resultante.

disp('========================================');
disp('PUNTO 5a: Onda cuadrada (M = 20)');
disp('========================================');

% 1. Definición de parámetros
T = 1/60;
fo = 60;
wo = 2*pi/T;
A = 170;
N = 100000;
t = linspace(0, T, N);

v = zeros(1, N);
v(1:round(N/2)-1) = A;
v(round(N/2):N) = -A;

% 2. Coeficientes para M = 20
a0 = trapz(t, v);
a = [];
b = [];
M = 20; % Número de armónicos

for i = 1:M
    a(i) = 2*trapz(t, v.*cos(i*wo*t))/T;
    b(i) = 2*trapz(t, v.*sin(i*wo*t))/T;
end

n = [0 1:M];
c = [a0 sqrt(a.^2 + b.^2)];

% 3. Gráfica de señal original y espectro
fig1 = figure('Name', 'Punto 5a - Espectro M=20');
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
ylabel('amplitud');

% 4. Gráfica de aproximación temporal
fig2 = figure('Name', 'Punto 5a - Aproximación M=20');
vf = (a0/T)*ones(1, N);
Mov = struct('cdata', [], 'colormap', []);

for i = 1:M
    vf = vf + a(i)*cos(i*wo*t) + b(i)*sin(i*wo*t);
    plot(t, v, 'c', t, vf, 'b'); grid on;
    xlabel('tiempo'); ylabel('Volts');
    axis([0 1/fo -1.25*A 1.25*A]);
    drawnow;
    Mov(i) = getframe(gcf);
end
movie(fig2, Mov, 1);

% Guardar imágenes
saveas(fig1, fullfile(imgDir, 'punto5a_onda_cuadrada_20armonicos_espectro.png'));
saveas(fig2, fullfile(imgDir, 'punto5a_onda_cuadrada_20armonicos_aprox.png'));

disp('Punto 5a (M = 20 armónicos) completado con éxito.');
disp('Presione ENTER para continuar con el Punto 5b...');
pause;

%% ========================================================================
%% PUNTO 5b: ONDA CUADRADA CON 50 ARMÓNICOS
%% ========================================================================
% Objetivo: Incrementar el número de armónicos a M = 50 y observar la
% convergencia y el Fenómeno de Gibbs en las discontinuidades.

disp('========================================');
disp('PUNTO 5b: Onda cuadrada (M = 50)');
disp('========================================');

% 1. Definición de parámetros
T = 1/60;
fo = 60;
wo = 2*pi/T;
A = 170;
N = 100000;
t = linspace(0, T, N);

v = zeros(1, N);
v(1:round(N/2)-1) = A;
v(round(N/2):N) = -A;

% 2. Coeficientes para M = 50
a0 = trapz(t, v);
a = [];
b = [];
M = 50; % Número de armónicos

for i = 1:M
    a(i) = 2*trapz(t, v.*cos(i*wo*t))/T;
    b(i) = 2*trapz(t, v.*sin(i*wo*t))/T;
end

n = [0 1:M];
c = [a0 sqrt(a.^2 + b.^2)];

% 3. Gráfica de señal original y espectro (hasta 3000 Hz)
fig1 = figure('Name', 'Punto 5b - Espectro M=50');
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
ylabel('amplitud');

% 4. Gráfica de aproximación temporal y fenómeno de Gibbs
fig2 = figure('Name', 'Punto 5b - Aproximación M=50 y Gibbs');
vf = (a0/T)*ones(1, N);
Mov = struct('cdata', [], 'colormap', []);

for i = 1:M
    vf = vf + a(i)*cos(i*wo*t) + b(i)*sin(i*wo*t);
    plot(t, v, 'c', t, vf, 'b'); grid on;
    xlabel('tiempo'); ylabel('Volts');
    axis([0 1/fo -1.25*A 1.25*A]);
    drawnow;
    Mov(i) = getframe(gcf);
end
movie(fig2, Mov, 1);

% Guardar imágenes
saveas(fig1, fullfile(imgDir, 'punto5b_onda_cuadrada_50armonicos_espectro.png'));
saveas(fig2, fullfile(imgDir, 'punto5b_onda_cuadrada_50armonicos_aprox.png'));

disp('Punto 5b (M = 50 armónicos) completado con éxito.');
disp('Presione ENTER para continuar con el Punto 6a...');
pause;

%% ========================================================================
%% PUNTO 6a: RECTIFICADOR DE ONDA COMPLETA (num = 20)
%% ========================================================================
% Pregunta 6 del Laboratorio:
% a) Programa con coeficientes exponenciales Cn para n = 0, 1, 2, ..., 19
% b) Valor de DC
% c) Ploteo del espectro de amplitud y fase

disp('========================================');
disp('PUNTO 6a: Rectificador de onda completa (num = 20)');
disp('========================================');

% Genera la forma de onda del rectificador de onda completa
f1 = 60;
inv = 1/f1; 
inc = 1/(80*f1); 
tnum = 3*inv;
t = 0:inc:tnum;
g1 = 120*sqrt(2)*sin(2*pi*f1*t);
g = abs(g1);
N = length(g);

% Obtiene los coeficientes de la Serie Exponencial de Fourier
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

% Imprime el valor de DC
disp('valor dc de g(t)'); 
cmag(1)

% Plotea el espectro de magnitud y fase (primeros 5 armónicos como en la guía)
figure('Name', 'Punto 6a - Rectificador (num = 20 armónicos)');
f = (0:num-1)*60;

subplot(1, 2, 1);
stem(f(1:5), cmag(1:5), 'filled');
title('Espectro de Amplitud');
xlabel('Frecuencia, Hz');
grid on;

subplot(1, 2, 2); 
stem(f(1:5), cphase(1:5), 'filled');
title('Espectro de Fase');
xlabel('Frecuencia, Hz');
grid on;

% Guardar imagen
saveas(gcf, fullfile(imgDir, 'punto6a_rectificador_20armonicos.png'));

disp('Punto 6a completado.');
disp('Presione ENTER para continuar con el Punto 6b...');
pause;

%% ========================================================================
%% PUNTO 6b: RECTIFICADOR DE ONDA COMPLETA (num = 40)
%% ========================================================================
% Incremento del número de armónicos a considerar (40 armónicos)

disp('========================================');
disp('PUNTO 6b: Rectificador de onda completa (num = 40)');
disp('========================================');

% Genera la forma de onda del rectificador de onda completa
f1 = 60;
inv = 1/f1; 
inc = 1/(80*f1); 
tnum = 3*inv;
t = 0:inc:tnum;
g1 = 120*sqrt(2)*sin(2*pi*f1*t);
g = abs(g1);
N = length(g);

% Obtiene los coeficientes de la Serie Exponencial de Fourier
num = 40;
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

% Imprime el valor de DC
disp('valor dc de g(t)'); 
cmag(1)

% Plotea el espectro de magnitud y fase
figure('Name', 'Punto 6b - Rectificador (num = 40 armónicos)');
f = (0:num-1)*60;
subplot(1, 2, 1); 
stem(f(1:5), cmag(1:5), 'filled');
title('Espectro de Amplitud');
xlabel('Frecuencia, Hz');
grid on;

subplot(1, 2, 2); 
stem(f(1:5), cphase(1:5), 'filled');
title('Espectro de Fase');
xlabel('Frecuencia, Hz');
grid on;

% Guardar imagen
saveas(gcf, fullfile(imgDir, 'punto6b_rectificador_40armonicos.png'));

disp('Punto 6b completado.');
disp('Presione ENTER para continuar con el Punto 6c...');
pause;

%% ========================================================================
%% PUNTO 6c: RECTIFICADOR DE ONDA COMPLETA (num = 60)
%% ========================================================================
% Incremento del número de armónicos a considerar (60 armónicos)

disp('========================================');
disp('PUNTO 6c: Rectificador de onda completa (num = 60)');
disp('========================================');

% Genera la forma de onda del rectificador de onda completa
f1 = 60;
inv = 1/f1; 
inc = 1/(80*f1); 
tnum = 3*inv;
t = 0:inc:tnum;
g1 = 120*sqrt(2)*sin(2*pi*f1*t);
g = abs(g1);
N = length(g);

% Obtiene los coeficientes de la Serie Exponencial de Fourier
num = 60;
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

% Imprime el valor de DC
disp('valor dc de g(t)'); 
cmag(1)

% Plotea el espectro de magnitud y fase
figure('Name', 'Punto 6c - Rectificador (num = 60 armónicos)');
f = (0:num-1)*60;
subplot(1, 2, 1); 
stem(f(1:5), cmag(1:5), 'filled');
title('Espectro de Amplitud');
xlabel('Frecuencia, Hz');
grid on;

subplot(1, 2, 2); 
stem(f(1:5), cphase(1:5), 'filled');
title('Espectro de Fase');
xlabel('Frecuencia, Hz');
grid on;

% Guardar imagen
saveas(gcf, fullfile(imgDir, 'punto6c_rectificador_60armonicos.png'));

disp('Punto 6c completado.');

%% ========================================================================
%% FIN DEL LABORATORIO
%% ========================================================================
disp('========================================');
disp('TODOS LOS PUNTOS DEL LABORATORIO COMPLETADOS');
disp('========================================');