"""
SCRIPT MAESTRO (PYTHON): EJECUTAR TODOS LOS PUNTOS DEL LABORATORIO 3
"""

import punto1_2_3_onda_cuadrada_10armonicos
import punto4_pelicula_aproximacion
import punto5a_onda_cuadrada_20armonicos
import punto5b_onda_cuadrada_50armonicos
import punto6a_rectificador_20armonicos
import punto6b_rectificador_40armonicos
import punto6c_rectificador_60armonicos

def main():
    print("=================================================================")
    print("INICIANDO EJECUCIÓN SECUENCIAL DE TODOS LOS PUNTOS EN PYTHON")
    print("=================================================================\n")
    
    punto1_2_3_onda_cuadrada_10armonicos.main()
    print()
    punto4_pelicula_aproximacion.main()
    print()
    punto5a_onda_cuadrada_20armonicos.main()
    print()
    punto5b_onda_cuadrada_50armonicos.main()
    print()
    punto6a_rectificador_20armonicos.main()
    print()
    punto6b_rectificador_40armonicos.main()
    print()
    punto6c_rectificador_60armonicos.main()
    print()
    
    print("=================================================================")
    print("TODOS LOS PUNTOS DEL LABORATORIO EN PYTHON EJECUTADOS CON ÉXITO")
    print("=================================================================")

if __name__ == '__main__':
    main()
