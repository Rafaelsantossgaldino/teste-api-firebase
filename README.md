# API com FireBase - Admin Authenticator

Foi realizada uma integração com o Firebase Admin para permitir o registro de usuários através de e-mail e senha. Implementei um recurso completo de login, proporcionando aos usuários acesso seguro ao sistema. Além disso, desenvolvi uma funcionalidade de criação de tarefas, onde cada usuário pode criar, atualizar, deletar e listar suas próprias tarefas, armazenadas no Realtime Database.

Para garantir a segurança e a privacidade dos dados, foram estabelecidas regras específicas no Realtime Database, assegurando que cada usuário tenha acesso apenas às suas próprias informações. Essa abordagem fortalece a proteção dos dados e a integridade do sistema, permitindo uma experiência de usuário mais confiável e personalizada.

## Configuração do FireBase
Apos criar o projeto no FireBase vá ate Configurações do projeto

![image](https://github.com/user-attachments/assets/f1b82626-ee1a-47f1-8fbc-dae8d0df439e)

Navegue até a aba *Contas de Servicos*, e clique no botao *Gerar nova chave privada*, feito isso automaticamente sera feito o download do arquivo de configuração do firebase. De um nome para esse arquivo pois voce precisará colocar ele na pasta so seu projeto. 

![image](https://github.com/user-attachments/assets/ebc0a6fb-9dc2-433b-97e3-043d3d73424a)

No meu caso eu coloquei em src/serviceAccountKey2.json

![image](https://github.com/user-attachments/assets/8ed4a002-dfed-472d-9c6f-357dc52d1af0)



Instruções para instalar e configurar o projeto.

```bash
# Comando para instalar dependências
npm install

# Comando para executar a aplicação
npm run dev


# Regra para adicionar no RealTime Database
{
  "rules": {
    "tasks": {
      ".indexOn": ["userId"], // Adiciona o índice para userId
      "$taskId": {
        ".read": "auth != null && data.child('userId').val() === auth.uid",
        ".write": "auth != null && newData.child('userId').val() === auth.uid"
      }
    }
  }
}
