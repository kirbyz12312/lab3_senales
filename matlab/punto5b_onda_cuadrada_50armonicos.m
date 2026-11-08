%% LABORATORIO 3 - PUNTO 5b: ONDA CUADRADA CON 50 ARMÓNICOS
% Objetivo: Incrementar el número de armónicos a M = 50 y observar la
% convergencia y el Fenómeno de Gibbs en las discontinuidades.

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
imgDir = fullfile(fileparts(mfilename('fullpath')), '..', 'Informe', 'imagenes');
if ~exist(imgDir, 'dir'); mkdir(imgDir); end
saveas(fig1, fullfile(imgDir, 'punto5b_onda_cuadrada_50armonicos_espectro.png'));
saveas(fig2, fullfile(imgDir, 'punto5b_onda_cuadrada_50armonicos_aprox.png'));

disp('Punto 5b (M = 50 armónicos) completado con éxito.');
