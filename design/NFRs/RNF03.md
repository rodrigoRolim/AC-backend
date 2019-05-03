#### Processo de autenticação de usuários e criptografias de senhas 
**Categoria:** Segurança
**Prioridade:** Essencial
##### descrição
A autenticação de usuários devem ser feitas via dados de login usuais: senha e um nome de usuário. 
As senhas devem ser armazenados no servidor criptografadas usando uma criptografia de mão única, ou seja, não permite a descriptografia. 
A tecnologia usada será sha256. Portanto, os usuários terão senhas com hashing de mão única armazenadas no servidor.