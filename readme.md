- yarn install
    sqlite3 -D
    jest -D
    @types/jest -D
    ts-jest -D
    supertest -D
    @types/supertest -D
    cross-env
- alteração dos scripts dentro do package.json
    migration:run:test -> roda as migrations no banco de teste
    test:setup -> setar o ambiente pra teste, e rodar o comandos das migrations
    test -> roda os teste "padrão" sem exibir erros e logs
    test:verbose -> roda os teste com os erros e logs
    test:unit -> roda apenas os teste unitarios
    test:integration -> roda apena os testes de integração
    test:coverage -> gera o relatório de cobertura dos testes
- configurar o jest com o comando yarn jest --init
- criar os arquivos jest-unit.config.ts
- criar os arquivos jest-integration.config.ts
- alterar o nosso ormconfig.js
    carregar dinamicamente qual banco/conexão vai ser usado
- alterar o tsconfig.json
    rootDirs (como array e com o caminho da pasta de teste)
    incluse (nova propriedade)
- criar a pasta tests na raiz do projeto
- no arquivo src/app.ts
    criar o método get server
    colocar o comentário "istanbul" no método start (pra ser ignorado no relatório de teste)
- decidir qual primeira coisa que será testado (ex: controller)
- criar a mesma estrutura de pastas dentro do diretório tests
- criar o arquivo meuController.spec.ts
- pensar nos casos/cenários de testes
- pensar nos agrupamentos dos casos/cenários (describes)
- criar o teste
- rodar o comando yarn test
- caso teste falhe, conserta ou criar o código
- rodar o comando novamente e seguir o fluxo até o teste passar e o que está sendo testado estiver
complemente implementado
- alterar o .gitignore
    /coverage
    /db-test.sql
