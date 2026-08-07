CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(20) DEFAULT 'cliente',
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE mesas (
    id SERIAL PRIMARY KEY,
    numero INT UNIQUE NOT NULL,
    capacidad INT NOT NULL,
    estado BOOLEAN DEFAULT TRUE
);


CREATE TABLE reservaciones (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    mesa_id INT NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    comensales INT NOT NULL,
    estado VARCHAR(30) DEFAULT 'pendiente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_usuario
        FOREIGN KEY(usuario_id)
        REFERENCES usuarios(id),

    CONSTRAINT fk_mesa
        FOREIGN KEY(mesa_id)
        REFERENCES mesas(id)
);

NSERT INTO mesas(numero, capacidad)
VALUES
(1,2),
(2,4),
(3,4),
(4,6),
(5,8);



INSERT INTO usuarios(nombre,email,password,rol)
VALUES
(
'Administrador',
'admin@restaurante.com',
'temporal',
'admin'
);