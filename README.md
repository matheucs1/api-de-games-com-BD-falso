# API de Games

## Endpoints
### GET /games
Esse endpoint é responsável por retornar a listagem de todos os games cadastrados no banco  de dados.
#### Parametros
Nenhum
#### Respostas 
##### OK! 200
Caso essa resposta aconteça você vai receber a listagem de todos os games.

Exemplo de resposta:
```
[
    {
        "id": 23,
        "title": "Call of duty MW",
        "year": 2019,
        "price": 60
    },
    {
        "id": 65,
        "title": "Sea of thieves",
        "year": 2018,
        "price": 40
    },
    {
        "id": 2,
        "title": "God of War Ragnarok",
        "year": 2022,
        "price": 90
    }
]

```
##### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: token inválido, Token expirado

Exemplo de resposta:
```
{
    "err": "Token invalido"
}

```

### POST /auth
Esse endpoint é responsável por fazer o processo de login.
#### Parametros
email: E-mail do usuário cadastrado no sistema.

password: Senha do usuário cadastrado no sistema, com aquele determinado e-mail.

Exemplo: 
```
{
    "email": "matheus@email.com",
    "password": "nodejs"
}

```
#### Respostas 
##### OK! 200
Caso essa resposta aconteça você vai receber o token JWT para conseguir acessar os endpoints protegidos na API.

Exemplo de resposta:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYXRoZXVzQGVtYWlsLmNvbSIsImlhdCI6MTY5MjE5ODIzMCwiZXhwIjoxNjkyMjg0NjMwfQ.CkBBZk3ut0V86ywa9IOoXKe5_UfqlYcHBzIyBbsbXf4"
}

```
##### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: e-mail ou senha incorretos, 

Exemplo de resposta:
```
{ err: "Credenciais ivalidas" }

```
