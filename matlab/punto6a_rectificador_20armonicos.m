%% LABORATORIO 3 - PUNTO 6a: RECTIFICADOR DE ONDA COMPLETA (num = 20)
% Pregunta 6 del Laboratorio:
% a) Programa con coeficientes exponenciales Cn para n = 0, 1, 2, ..., 19
% b) Valor de DC
% c) Ploteo del espectro de amplitud y fase

clear; clc; close all;

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
imgDir = fullfile(fileparts(mfilename('fullpath')), '..', 'Informe', 'imagenes');
if ~exist(imgDir, 'dir'); mkdir(imgDir); end
saveas(gcf, fullfile(imgDir, 'punto6a_rectificador_20armonicos.png'));

disp('Punto 6a completado.');
