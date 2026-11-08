INSERT INTO students (
    id,
    name,
    email,
    phone,
    address,
    birthdate,
    semester,
    status
) VALUES
(1001, 'Juan Perez', 'juan.perez@gmail.com', '3001234567', 'Calle 10 # 15-20', '2002-05-15', 3, TRUE),

(1002, 'Maria Gomez', 'maria.gomez@gmail.com', '3012345678', 'Carrera 20 # 10-30', '2001-08-22', 5, TRUE),

(1003, 'Carlos Rodriguez', 'carlos.rodriguez@gmail.com', '3023456789', 'Calle 25 # 12-40', '2003-01-10', 2, TRUE),

(1004, 'Laura Martinez', 'laura.martinez@gmail.com', '3034567890', 'Carrera 15 # 8-25', '2000-11-30', 7, TRUE),

(1005, 'Andres Lopez', 'andres.lopez@gmail.com', '3045678901', 'Calle 30 # 20-15', '2002-03-18', 4, TRUE),

(1006, 'Daniela Ramirez', 'daniela.ramirez@gmail.com', '3056789012', 'Carrera 12 # 5-18', '2001-06-25', 6, TRUE),

(1007, 'Santiago Torres', 'santiago.torres@gmail.com', '3107890123', 'Calle 18 # 22-10', '2003-09-12', 1, TRUE),

(1008, 'Valentina Hernandez', 'valentina.hernandez@gmail.com', '3118901234', 'Carrera 8 # 14-32', '2002-12-05', 8, TRUE),

(1009, 'Sebastian Castro', 'sebastian.castro@gmail.com', '3129012345', 'Calle 40 # 18-22', '2001-04-14', 9, TRUE),

(1010, 'Camila Moreno', 'camila.moreno@gmail.com', '3130123456', 'Carrera 25 # 30-12', '2000-07-20', 10, TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO courses (
    name,
    description,
    credits,
    semester,
    status
) VALUES
('Programación I', 'Fundamentos de programación, algoritmos y lógica computacional.', 3, 1, TRUE),

('Matemáticas I', 'Fundamentos de álgebra, ecuaciones, funciones y operaciones matemáticas.', 4, 1, TRUE),

('Bases de Datos', 'Modelado de datos, lenguaje SQL y sistemas gestores de bases de datos.', 3, 3, TRUE),

('Programación Web I', 'Desarrollo de aplicaciones web utilizando HTML, CSS, JavaScript y TypeScript.', 3, 4, TRUE),

('Arquitectura de Software', 'Principios, patrones y estilos arquitectónicos para el desarrollo de software.', 3, 6, TRUE),

('Ingeniería de Software', 'Procesos, metodologías ágiles y buenas prácticas para el desarrollo de software.', 3, 5, TRUE),

('Redes de Computadores', 'Fundamentos de redes, protocolos de comunicación y modelos de referencia.', 3, 4, TRUE),

('Sistemas Operativos', 'Administración de procesos, gestión de memoria y sistemas de archivos.', 3, 3, TRUE),

('Desarrollo de Aplicaciones Móviles', 'Fundamentos y desarrollo de aplicaciones para dispositivos móviles.', 3, 7, TRUE),

('Inteligencia Artificial', 'Fundamentos de inteligencia artificial, aprendizaje automático y algoritmos inteligentes.', 4, 8, TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO teachers (
    name,
    email,
    phone,
    specialty,
    status
) VALUES
('Ana Gomez', 'ana.gomez@uceva.edu.co', '3151112233', 'Bases de Datos', TRUE),

('Carlos Ruiz', 'carlos.ruiz@uceva.edu.co', '3152223344', 'Programación Web', TRUE),

('Marta Diaz', 'marta.diaz@uceva.edu.co', '3153334455', 'Redes de Computadores', TRUE),

('Jorge Salazar', 'jorge.salazar@uceva.edu.co', '3154445566', 'Arquitectura de Software', TRUE),

('Luisa Fernandez', 'luisa.fernandez@uceva.edu.co', '3155556677', 'Inteligencia Artificial', TRUE),

('Pedro Ortiz', 'pedro.ortiz@uceva.edu.co', '3156667788', 'Matemáticas', TRUE),

('Sandra Vargas', 'sandra.vargas@uceva.edu.co', '3157778899', 'Ingeniería de Software', TRUE),

('Felipe Cardona', 'felipe.cardona@uceva.edu.co', '3158889900', 'Sistemas Operativos', TRUE),

('Paula Mejia', 'paula.mejia@uceva.edu.co', '3159990011', 'Aplicaciones Móviles', TRUE),

('Ricardo Duque', 'ricardo.duque@uceva.edu.co', '3160001122', 'Programación', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO classrooms (
    code,
    building,
    capacity,
    status
) VALUES
('A-101', 'Edificio A', 30, TRUE),

('A-102', 'Edificio A', 35, TRUE),

('A-201', 'Edificio A', 40, TRUE),

('B-101', 'Edificio B', 45, TRUE),

('B-202', 'Edificio B', 50, TRUE),

('C-301', 'Edificio C', 25, TRUE),

('LAB-1', 'Laboratorios', 25, TRUE),

('LAB-2', 'Laboratorios', 25, TRUE),

('AUD-1', 'Auditorio', 200, TRUE),

('SALA-IA', 'Edificio D', 20, TRUE)
ON CONFLICT DO NOTHING;
