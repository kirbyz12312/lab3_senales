%% SCRIPT MAESTRO: EJECUTAR TODOS LOS PUNTOS DEL LABORATORIO 3
% Señales y Sistemas - Práctica de Series de Fourier

clear; clc; close all;

fprintf('=================================================================\n');
fprintf('INICIANDO EJECUCIÓN SECUENCIAL DE TODOS LOS PUNTOS DEL LAB 3\n');
fprintf('=================================================================\n\n');

fprintf('>>> Ejecutando Puntos 1, 2 y 3 (Onda Cuadrada M=10)...\n');
punto1_2_3_onda_cuadrada_10armonicos;

fprintf('\n>>> Ejecutando Punto 4 (Película y Reconstrucción M=10)...\n');
punto4_pelicula_aproximacion;

fprintf('\n>>> Ejecutando Punto 5a (Onda Cuadrada M=20)...\n');
punto5a_onda_cuadrada_20armonicos;

fprintf('\n>>> Ejecutando Punto 5b (Onda Cuadrada M=50)...\n');
punto5b_onda_cuadrada_50armonicos;

fprintf('\n>>> Ejecutando Punto 6a (Rectificador de Onda Completa num=20)...\n');
punto6a_rectificador_20armonicos;

fprintf('\n>>> Ejecutando Punto 6b (Rectificador de Onda Completa num=40)...\n');
punto6b_rectificador_40armonicos;

fprintf('\n>>> Ejecutando Punto 6c (Rectificador de Onda Completa num=60)...\n');
punto6c_rectificador_60armonicos;

fprintf('\n=================================================================\n');
fprintf('TODOS LOS PUNTOS DEL LABORATORIO HAN SIDO EJECUTADOS EXITOSAMENTE\n');
fprintf('=================================================================\n');
