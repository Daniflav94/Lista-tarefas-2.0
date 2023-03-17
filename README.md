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
- MySQL

