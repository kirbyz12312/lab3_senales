%% LABORATORIO 3 - PUNTO 5a: ONDA CUADRADA CON 20 ARMÓNICOS
% Objetivo: Incrementar el número de armónicos a M = 20 y observar la mejora
% en la aproximación de la onda cuadrada y el espectro resultante.

clear; clc; close all;

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
imgDir = fullfile(fileparts(mfilename('fullpath')), '..', 'Informe', 'imagenes');
if ~exist(imgDir, 'dir'); mkdir(imgDir); end
saveas(fig1, fullfile(imgDir, 'punto5a_onda_cuadrada_20armonicos_espectro.png'));
saveas(fig2, fullfile(imgDir, 'punto5a_onda_cuadrada_20armonicos_aprox.png'));

disp('Punto 5a (M = 20 armónicos) completado con éxito.');
