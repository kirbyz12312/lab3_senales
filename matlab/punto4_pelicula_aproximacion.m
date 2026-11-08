%% LABORATORIO 3 - PUNTO 4: PELÍCULA Y APROXIMACIÓN DE FOURIER
% Objetivo: Realizar una película donde se vea el efecto de la aproximación 
% de la serie de Fourier en función del número de armónicos con getframe y movie.

clear; clc; close all;

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
imgDir = fullfile(fileparts(mfilename('fullpath')), '..', 'Informe', 'imagenes');
if ~exist(imgDir, 'dir'); mkdir(imgDir); end
saveas(fig2, fullfile(imgDir, 'punto4_pelicula_aproximacion_final.png'));

disp('Punto 4 completado con éxito.');
