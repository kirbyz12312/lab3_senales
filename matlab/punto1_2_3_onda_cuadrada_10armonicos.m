%% LABORATORIO 3 - PUNTOS 1, 2 Y 3: ONDA CUADRADA CON 10 ARMÓNICOS
% Objetivo: Definir la señal cuadrada de 170 V y 60 Hz, calcular los primeros
% 10 coeficientes usando integración trapezoidal (trapz) y graficar con area y stem.

clear; clc; close all;

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
