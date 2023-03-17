# Lista de Tarefas

Repositório BACK END: https://github.com/Daniflav94/Lista-tarefas-2.0-BACKEND

## Objetivo

Aplicação web de lista de tarefas completa que possui autenticação, listas principais já prontas e opção de criar novas listas, com possibilidade de personalizar a imagem de fundo de cada uma. As tarefas possuem opção de inserir data e repetição diária, semanal ou mensal, também é possível editar as informações inseridas, adicionar anotações e excluir uma tarefa.

## Descrição

Para que cada usuário pudesse ter acesso a somente suas tarefas e listas criadas foi realizada autenticação utilizando o Spring Security. Os dados do usuário como nome e email são mostrados na sidenav e é possível adicionar uma foto através do serviço Storage do Firebase. A aplicação já possui listas prontas como a Tarefas que exibe todas as tarefas criadas (sem lista), lista Meu Dia que exibe somente as tarefas com data para hoje e lista Importante que exibe as tarefas que foram favoritadas. Também é possível criar novas listas com suas próprias tarefas. 
As tarefas criadas possibilitam adicionar uma data de conclusão, podendo escolher entre Hoje, Amanhã ou abrir o calendário e escolher uma data. Também é possível adicionar repetições, no qual foi criada uma lógica no Java utilizando Cron Expressions que agenda para listar as tarefas em um momento do dia, verifica se há repetição e duplica a tarefa na data estabelecida. O usuário pode editar as tarefas através de uma caixa de diálogo e também adicionar anotações ou excluir uma tarefa. Há a opção de marcar uma tarefa como concluída e essas tarefas são renderizadas abaixo mas escondidas, clicando no botão Concluídas elas serão exibidas e podem ser deletadas.

## Tecnologias

- Angular;
- Java;
- Spring;
- MySQL;
- Firebase.

## Gif e imagens
![Lista-tarefas demonstração (1)](https://user-images.githubusercontent.com/99519903/225986773-736a8b32-c215-4204-ac8e-baaac1cf39a0.gif)

![Captura de tela 2023-03-17 142735](https://user-images.githubusercontent.com/99519903/225978058-89686e01-90cf-4468-9915-b420c6c704e9.png)
![Captura de tela 2023-03-17 142143](https://user-images.githubusercontent.com/99519903/225978102-c4dc5253-a809-4c60-bfa5-83779b728661.png)
![Captura de tela 2023-03-17 142209](https://user-images.githubusercontent.com/99519903/225978120-0903991a-c866-4bac-981c-62dacdb24d51.png)
![Sem título](https://user-images.githubusercontent.com/99519903/225978206-d113ede8-b513-46cc-bc6a-beccad7d8760.png)
![Captura de tela 2023-03-17 142414](https://user-images.githubusercontent.com/99519903/225978241-17d7e7b2-4796-43dc-ae91-25d82e76b802.png)
![Sem título2](https://user-images.githubusercontent.com/99519903/225978260-1f8794c0-2054-4227-94fa-871635744ff0.png)
