# App

GymPass style app.

# RFs (Requisitos funcionais)
    
    [x] Deve ser possivel se cadastrar;
    [] Deve ser possivel se autenticar;
    [] Deve ser possivel obter um perfil de usuario logado
    [] Deves ser possivel obter um numero de check-ins realizados pelo usuario logado
    [] Deve ser possivel o usuario obter seus histórico de check-ins
    [] Deve ser possivel o usuario buscar academias próximas
    [] Deve ser possivel o usurio buscar academias pelo nome
    [] Deve ser possivel o usuario realizar o check in em uma academia
    [] Deve ser possivel validar o check in de um usuario
    [] Deve ser possivel cadastrar uma academia

# RNs (Regras de negócio)
    
    [x] o usuario nao deve ser possivel se cadastrar com um email duplicado
    [] o usuario nao pode fazer 2 check ins no mesmo dia
    [] o usuario nao pode fazer check in se nao estiver a 100m da academia
    [] o check in so pode ser validado até 20 minutos apos criado
    [] o check in so pode ser validado por administradores
    [] A academia so pode ser cadastrada por administradores.

# RNF (Requisitos não-funcionais)

    [x] A senha do usuario precisa estar criptografada
    [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
    [] Todas listas devem conter 20 items por pagina no maximo. 
    [] O usuario deve ser identificado por um JWT 
    
