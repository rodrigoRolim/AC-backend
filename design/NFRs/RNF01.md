#### Divisão arquitetural do sistema em camadas para desacomplamento
**Categoria:** Padrão
**Prioridade:** Essencial

O projeto de software deverá ser fortemente orientado  a baixo acoplamamento e alta coesão,primando pela separação das responsabiliades.

Todo o projeto deverá ser feito utilizando uma arquitetura separada em camadas, onde cada camada conterá apenas os algoritmos relacionados à sua responsabilidade. Abaixo as camadas que deverão ser utilizadas, e suas responsabilidades:

- **Interface:** abrigar lógicas de tela, validação de campos, acionamento de comandos, códigos para design de interface etc. Nesta camada a tecnologia de usada será o framework vue baseado no conceito de web components.

- **Negócio:** abrigar lógicas de negócio, onde será codificado o escopo das regras de negócio associadas aos requisitos funcionais pertinentes à funcionalidade.

- **Dados**: abrigar lógicas de acesso a dados,comandos de requisições ao banco de dados ou comandos para utilização de mecanismos de persistência utilizado, para o caso de uso de ORM.

- **Segurança:** abrigar lógicas de autenticação, auditoria, manutenção de usuários.

- **Infraestrutura:** abrigar lógicas não relacionadas a interfaces gráficas, regras de negócio, dados ou segurança, mas que poderão ser utilizadas em todas estas camadas. Conterá recursos para gravação de logs, transferência de arquivos e de mensagens. 