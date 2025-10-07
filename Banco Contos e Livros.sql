DROP DATABASE IF EXISTS biblicontlivros;
CREATE DATABASE biblicontlivros CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE biblicontlivros;


-- Tabela: autores
CREATE TABLE autores (
  idAutor INT AUTO_INCREMENT PRIMARY KEY,
  nomeAutor VARCHAR(255) NOT NULL,
  caminhoImagemAutor VARCHAR(255),
  formacaoAutor TEXT,
  trabalhoAtualAutor TEXT
) ENGINE=InnoDB;	

-- Tabela: ilustradores
CREATE TABLE ilustradores (
  idilustrador INT AUTO_INCREMENT PRIMARY KEY,
  nomeilustrador VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

-- Tabela: editoras
CREATE TABLE editoras (
  idEditora INT AUTO_INCREMENT PRIMARY KEY,
  nomeEditora VARCHAR(255) NOT NULL,
  cidadeEditora VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

-- Tabela: palavras_chave
CREATE TABLE palavras_chave (
  idPalavraChave INT AUTO_INCREMENT PRIMARY KEY,
  descritivoPalavraChave VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- Tabela: usuarios
CREATE TABLE usuarios (
  idUsuario INT AUTO_INCREMENT PRIMARY KEY,
  nomeUsuario VARCHAR(255) NOT NULL,
  emailUsuario VARCHAR(255) NOT NULL UNIQUE,
  senhaHash VARCHAR(255),
  provedorAuth VARCHAR(50),
  provedorAuthId VARCHAR(255) UNIQUE,
  caminhoImagemUsuario VARCHAR(255),
  descricaoUsuario TEXT,
  funcaoUsuario ENUM('admin', 'usuario') NOT NULL DEFAULT 'usuario',
  dataCriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Tabela: obras (livros/contos)
CREATE TABLE obras (
  idObra INT AUTO_INCREMENT PRIMARY KEY,
  tituloObra VARCHAR(255) NOT NULL,
  tipoObra ENUM('Livro', 'Conto') NOT NULL,
  resumoObra TEXT,
  relatorioObra TEXT,
  dataPublicacao DATE,
  caminhoImagemObra VARCHAR(255) NOT NULL,
  contadorAcessos INT DEFAULT 0,
  idAutor INT,
  idilustrador INT,
  idEditora INT,
  FOREIGN KEY (idAutor) REFERENCES autores(idAutor) ON DELETE SET NULL,
  FOREIGN KEY (idilustrador) REFERENCES ilustradores(idilustrador) ON DELETE SET NULL,
  FOREIGN KEY (idEditora) REFERENCES editoras(idEditora) ON DELETE SET NULL
) ENGINE=InnoDB;
  

-- Tabela: associação obras <-> palavras-chave
CREATE TABLE obra_palavrachave_assoc (
  idObra INT NOT NULL,
  idPalavraChave INT NOT NULL,
  PRIMARY KEY (idObra, idPalavraChave),
  FOREIGN KEY (idObra) REFERENCES obras(idObra) ON DELETE CASCADE,
  FOREIGN KEY (idPalavraChave) REFERENCES palavras_chave(idPalavraChave) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Tabela: minha_lista (obras favoritas)
CREATE TABLE acessos_livrosminha_lista (
  idUsuario INT NOT NULL,
  idObra INT NOT NULL,
  dataAdicao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (idUsuario, idObra),
  FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) ON DELETE CASCADE,
  FOREIGN KEY (idObra) REFERENCES obras(idObra) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Tabela: histórico de acessos às obras
CREATE TABLE historico_acessos (
  idAcesso INT AUTO_INCREMENT PRIMARY KEY,
  idUsuario INT NOT NULL,
  idObra INT NOT NULL,
  dataAcesso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) ON DELETE CASCADE,
  FOREIGN KEY (idObra) REFERENCES obras(idObra) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Tabela: redefinição de senha
CREATE TABLE redefinicao_senha (
  idRedefinicao INT AUTO_INCREMENT PRIMARY KEY,
  emailUsuario VARCHAR(255) NOT NULL,
  tokenRedefinicao VARCHAR(255) NOT NULL UNIQUE,
  dataExpiracao DATETIME NOT NULL
) ENGINE=InnoDB;

-- Tabela: acessos anônimos ou não logados
CREATE TABLE acessos_obras (
  idAcessoObras INT AUTO_INCREMENT PRIMARY KEY,
  idObra INT,
  dataAcesso DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (idObra) REFERENCES obras(idObra)
);

-- Stored Procedure: Obras mais acessadas
DELIMITER //

CREATE PROCEDURE GetObrasMaisAcessadas(IN limite INT)
BEGIN
    SELECT
        O.tituloObra AS Titulo,
        A.nomeAutor AS NomeAutor,
        I.nomeIlustrador AS NomeIlustrador,
        E.nomeEditora AS NomeEditora,
        GROUP_CONCAT(PC.descritivoPalavraChave SEPARATOR ', ') AS PalavrasChave,
        O.contadorAcessos AS TotalAcessos
    FROM
        obras O
    LEFT JOIN autores A ON O.idAutor = A.idAutor
    LEFT JOIN ilustradores I ON O.idIlustrador = I.idIlustrador
    LEFT JOIN editoras E ON O.idEditora = E.idEditora
    LEFT JOIN obra_palavrachave_assoc OPCA ON O.idObra = OPCA.idObra
    LEFT JOIN palavras_chave PC ON OPCA.idPalavraChave = PC.idPalavraChave
    GROUP BY O.idObra
    ORDER BY O.contadorAcessos DESC
    LIMIT limite;
END //

DELIMITER ;
