# Auditoria Comercial, UX e Conversão — Alkor Physio

Data da reauditoria: 20 de julho de 2026  
Escopo: estado atual da landing page após a implementação da auditoria técnica e ajustes recentes de layout.  
Perspectivas: paciente em primeiro acesso, profissional da saúde avaliando a Alkor, CRO, Product Design e identidade Alkor.

## 1. Resumo executivo

O projeto evoluiu de forma perceptível desde a auditoria anterior. A experiência renderizada foi validada em desktop (1280 × 720) e mobile (390 × 844), além da leitura do código e do build de produção atual. O site está tecnicamente estável, não apresentou erros ou avisos no navegador e demonstra um padrão visual superior ao de templates comuns do setor da saúde.

Os principais ganhos confirmados foram:

- menu mobile previsível, acessível e visualmente bem resolvido;
- interação da seção “Para quem é” mais clara, suave e sem seleção inicial enganosa;
- hierarquia consistente entre títulos, textos, cartões e CTAs;
- boa adaptação tipográfica no mobile;
- apresentação do especialista mais autoral;
- acabamento visual forte em Hero, FAQ e CTA final;
- contraste, foco e reduced motion tecnicamente melhorados;
- jornada sem erros visíveis ou falhas de interação durante a auditoria.

O principal bloqueio comercial, entretanto, permanece e ficou mais evidente após a validação visual: **o projeto é um template conceitual, mas a interface se apresenta como um serviço de saúde real**. O README informa que os dados são demonstrativos, porém o visitante não recebe essa informação. Nome do profissional, fotografia, “CREFITO ativo”, tempo de experiência, número de pacientes, percentuais, depoimentos, telefone, e-mail e localização têm aparência de dados reais.

Além disso, o aviso que anteriormente identificava os depoimentos como demonstrativos não existe mais no componente atual. Os relatos agora são apresentados integralmente no formato de prova social real. Para uma empresa que vende autoridade e confiança a profissionais da saúde, essa ambiguidade é incompatível com a ética e com o posicionamento Alkor.

Há também uma tensão de objetivo que precisa ser resolvida antes da publicação:

- como experiência demonstrativa, a página simula corretamente a jornada de um paciente;
- como ativo comercial da Alkor, ela não explica que é um projeto conceitual nem oferece um caminho para contratar a Alkor;
- como site de uma clínica real, ainda não possui dados, provas e operação reais.

Portanto, a página pode ser usada em apresentação privada e contextualizada como demonstração visual. Para publicação pública ou uso como portfólio, precisa de uma moldura clara de “projeto conceitual” e de separação entre a experiência simulada do paciente e a conversão comercial da Alkor.

Conclusão resumida: **a qualidade visual e de UX está próxima do padrão Alkor; a integridade comercial e a estratégia de apresentação ainda não estão**.

### Metodologia e limitações

- Build de produção executado com sucesso.
- Auditoria visual em 1280 × 720 e 390 × 844.
- Menu, navegação por âncoras, seção interativa e fechamento da jornada verificados no navegador.
- Console do navegador sem erros ou avisos.
- Página mobile medida em aproximadamente 14.354 px de altura.
- Não havia analytics, dados de funil, entrevistas com pacientes, gravações de sessão ou credenciais clínicas documentadas.
- Não foram presumidos resultados, formação, registro, autoria dos depoimentos ou operação comercial.

## 2. Percepção do paciente

### Primeiros segundos

O paciente entende rapidamente que o serviço é de fisioterapia cardiorrespiratória. A headline é forte, humana e escaneável. A composição abstrata reforça respiração, calma e tecnologia sem parecer excessivamente hospitalar. No mobile, os dois CTAs principais ficam visíveis no primeiro viewport e a tipografia mantém boa legibilidade.

Em desktop com viewport de 1280 × 720, os CTAs internos do Hero começam em aproximadamente 701 px e terminam em 749 px. Isso significa que ficam parcialmente abaixo da dobra em telas mais baixas. O CTA do Header continua visível e reduz o impacto, mas a ação integrada à narrativa do Hero perde presença.

O paciente entende o benefício geral, mas não consegue identificar nos primeiros segundos:

- quem é o profissional;
- onde o atendimento acontece;
- qual modalidade é oferecida;
- qual diferencial concreto sustenta a escolha;
- se os dados apresentados pertencem a uma operação real.

### Identificação com o problema

A seção “Para quem é” continua sendo o elemento mais autoral da landing page. A experiência é sofisticada, memorável e adequada à especialidade. O estado inicial neutro evita marcar uma condição como se tivesse sido escolhida pelo visitante. Hover, clique e desseleção agora possuem uma lógica coerente.

No mobile, o card horizontal indica continuidade lateral e mantém boa área de toque. A ressalva de que a experiência é ilustrativa e não diagnóstica ajuda a controlar a interpretação clínica. Ainda assim, expressões determinísticas e readouts fisiológicos precisam ser validados por um profissional antes de qualquer uso real.

### Construção de confiança

A apresentação do especialista é visualmente convincente. A fotografia, o nome, o título e o manifesto criam proximidade. O problema é que a experiência não diferencia o que é conteúdo de demonstração do que seria uma credencial verificável.

A fotografia mostra um homem de jaleco e estetoscópio, uma linguagem visual facilmente associada a médico. O conteúdo o apresenta como fisioterapeuta cardiorrespiratório. Essa representação não é necessariamente incorreta, mas pode parecer genérica ou pouco autêntica para um profissional avaliando contratar a Alkor, principalmente sem contexto, registro ou formação.

### Exploração dos serviços

A seção de tratamentos é clara, bonita e bem organizada. O destaque em “Reabilitação Cardíaca” cria hierarquia e ajuda a comunicar especialidade principal. No mobile, os cartões são legíveis, mas os seis itens fazem a seção chegar a aproximadamente 2.619 px de altura.

“Como funciona” reduz ansiedade e reforça cuidado, evidência e acompanhamento. Porém, descreve mais valores institucionais do que etapas operacionais. O paciente ainda não sabe exatamente o que acontece entre o primeiro contato, a avaliação e o início do acompanhamento.

### Prova e decisão

Resultados e depoimentos são visualmente o pico de autoridade da página, mas comercialmente são o ponto mais frágil. “+500”, “10 anos”, “94%” e “98%” aparecem com alta confiança visual. A nota “com base no acompanhamento das primeiras 8 semanas” não informa amostra, critério, fonte ou metodologia.

Os três relatos possuem iniciais, condição, evolução e identificação como “Paciente acompanhado”. Sem aviso visível, o visitante tende a interpretá-los como depoimentos reais. Como o projeto ainda não pertence a um profissional, essa interpretação é inadequada.

### Momento de conversão

O CTA final é uma das áreas mais fortes do site. A frase “Sua recuperação pode começar com uma conversa tranquila” reduz pressão e mantém o tom acolhedor. Visualmente, o bloco funciona muito bem em desktop e mobile.

O comportamento real, porém, não corresponde à promessa: “Agendar avaliação” abre um `mailto:`. O telefone é um número demonstrativo. O visitante não recebe confirmação, disponibilidade, prazo de resposta ou orientação sobre o próximo passo.

### Percepção de um profissional avaliando contratar a Alkor

O profissional percebe competência clara em direção visual, front-end, responsividade e microinteração. A página demonstra capacidade de produzir algo acima de um template genérico.

Ao mesmo tempo, um profissional atento pode questionar o rigor da Alkor ao encontrar dados fictícios com aparência real. Para a Alkor, isso é especialmente sensível: a mesma experiência que prova qualidade visual pode enfraquecer confiança comercial se não estiver explicitamente apresentada como conceito.

## 3. Pontos fortes

- **Especialidade compreendida rapidamente:** o Hero comunica fisioterapia cardiorrespiratória sem exigir conhecimento técnico.
- **Headline memorável:** “Respire fundo” é simples, emocional e compatível com o serviço.
- **Direção visual premium:** tipografia, espaço negativo, paleta e efeitos mantêm calma e sofisticação.
- **Identidade visual autoral:** a ilustração respiratória diferencia o projeto de landing pages comuns de saúde.
- **Seção “Para quem é” bem posicionada:** identificação acontece antes da explicação detalhada dos serviços.
- **Interação corrigida:** nenhum sintoma inicia visualmente selecionado; hover e seleção não entram em conflito.
- **Boa experiência mobile:** menu, CTAs, títulos, cards e FAQ funcionam bem no viewport testado.
- **Menu mobile refinado:** foco, fechamento, hierarquia e CTA são previsíveis.
- **Apresentação humana:** a seção do especialista quebra a abstração do Hero e aproxima o serviço.
- **Tratamentos escaneáveis:** título, ícone e descrição têm hierarquia consistente.
- **FAQ visualmente excelente:** divisão editorial clara, perguntas relevantes e interação simples.
- **CTA final forte:** contraste, copy e hierarquia sustentam um encerramento convincente.
- **Persuasão sem pressão:** não há pop-ups, contadores, escassez ou urgência falsa.
- **Responsividade validada:** não foram observados cortes, overflow ou alvos de toque problemáticos no mobile testado.
- **Estabilidade:** não foram encontrados erros ou avisos no navegador durante a auditoria.
- **Coerência estética:** o site parece parte de um mesmo sistema, não um conjunto de seções desconectadas.

## 4. Problemas encontrados

### ALK-CRO-R2-001 — O projeto conceitual se apresenta como uma clínica real

- **Área:** Posicionamento, confiança, ética e identidade Alkor
- **Gravidade:** Crítica
- **Seção:** Página completa
- **Evidência:** o `README.md` informa que os dados são demonstrativos, mas não existe na interface qualquer identificação de “projeto conceitual”, “demonstração” ou “dados fictícios”. `lib/site.ts` apresenta nome, profissional, e-mail, telefone e localização; `Indicators.tsx`, `Results.tsx`, `Testimonials.tsx` e `ContactCTA.tsx` completam a aparência de uma operação real.
- **Impacto:** um paciente pode acreditar que encontrou uma clínica existente. Um potencial cliente da Alkor pode interpretar a ausência de transparência como falta de rigor justamente em um setor baseado em confiança. Isso impede publicação pública ética.
- **Recomendação:** separar a demonstração do contexto comercial. Em portfólio público, apresentar a página dentro de um case da Alkor com identificação inequívoca de projeto conceitual. Se a demo abrir isoladamente, incluir um aviso discreto e persistente de que profissional, contatos, métricas e relatos são fictícios. Em apresentação privada, contextualizar antes de enviar o link.
- **Exemplo de melhoria:** “Projeto conceitual desenvolvido pela Alkor. Profissional, contatos, resultados e depoimentos são demonstrativos.” A experiência simulada pode continuar intacta, enquanto o case externo oferece o CTA real para contratar a Alkor.
- **Forma de validar:** teste de cinco segundos com pessoas que não conhecem o projeto, perguntando se acreditam estar vendo uma clínica real, um template ou um case conceitual.

### ALK-CRO-R2-002 — Depoimentos demonstrativos são apresentados como relatos reais

- **Área:** Prova social, confiança e ética
- **Gravidade:** Crítica
- **Seção:** Depoimentos
- **Evidência:** `Testimonials.tsx` apresenta três relatos com aspas, iniciais, condição, resultado e o rótulo “Paciente acompanhado”. O componente atual não contém o aviso demonstrativo que existia na versão auditada anteriormente.
- **Impacto:** o formato ativa imediatamente a interpretação de prova social real. Como os relatos não foram fornecidos por um cliente nem acompanhados de autorização, a seção compromete a integridade da demonstração e pode contaminar a confiança no restante da página.
- **Recomendação:** não publicar os cards como depoimentos reais. Em demo pública, rotular a própria seção e cada relato como conteúdo demonstrativo ou substituir a grade por um estado de componente que mostre como depoimentos autorizados seriam exibidos. Em projeto real, usar apenas relatos documentados e aprovados.
- **Exemplo de melhoria:** “Exemplo de apresentação de depoimento — conteúdo fictício para demonstração de layout.”
- **Forma de validar:** mostrar apenas a seção a cinco pessoas e perguntar se os relatos parecem reais. A resposta correta deve ser inequívoca.

### ALK-CRO-R2-003 — Métricas e claims clínicos não possuem comprovação apresentada

- **Área:** Autoridade, ética e copywriting
- **Gravidade:** Crítica
- **Seção:** Hero, About, Tratamentos, Como funciona e Resultados
- **Evidência:** `Results.tsx` exibe “+500 pacientes”, “10 anos”, “94% relatam menos falta de ar” e “98% indicariam o tratamento”. A nota de oito semanas não identifica fonte ou metodologia. `Specialties.tsx` afirma “reabilitação acelerada”, “reduzindo complicações e tempo de internação”; `works.data.ts` usa “resultados consistentes”; `AboutContent.tsx` usa “recuperação ágil”.
- **Impacto:** números específicos e resultados clínicos possuem alto poder persuasivo, mas também alto risco reputacional. Em saúde, a apresentação pode ser interpretada como expectativa de resultado ou prova de desempenho inexistente.
- **Recomendação:** para a demo pública, remover os valores ou identificá-los visualmente como dados fictícios. Para um cliente real, exigir fonte, amostra, período, critério e aprovação profissional antes de publicar. Claims de velocidade ou redução de complicações devem ser transformados em objetivos/processos somente após revisão clínica.
- **Exemplo de melhoria:** em vez de estatísticas fictícias, demonstrar o componente com categorias neutras — “Espaço para indicador validado”, “Fonte e período”, “Metodologia aprovada”. Em copy clínica, priorizar “acompanhamento progressivo conforme avaliação e orientação da equipe responsável”.
- **Forma de validar:** checklist de claims assinado pelo responsável técnico e documentação vinculada a cada número publicado.

### ALK-CRO-R2-004 — O CTA promete agendamento, mas entrega e-mail ou telefone demonstrativo

- **Área:** Conversão, UX e confiança
- **Gravidade:** Alta
- **Seção:** Header, Hero, About, Tratamentos, FAQ, CTA final e Footer
- **Evidência:** os CTAs intermediários levam a `#contato`; o botão final “Agendar avaliação” abre `mailto:contato@alkorphysio.com`; o telefone é `(11) 99999-9999`. A página alterna “Agendar Consulta”, “Agendar avaliação”, “Fazer Agendamento”, “Fale com a gente” e “Ainda tenho uma dúvida”.
- **Impacto:** o verbo “agendar” cria expectativa de escolha ou solicitação de horário. Abrir um cliente de e-mail transfere trabalho ao usuário e pode falhar em dispositivos sem configuração. No estado de demo, o telefone também simula um canal que não existe.
- **Recomendação:** definir o objetivo de cada ambiente. Na demo, desativar ações fictícias ou explicar que são demonstrações. No projeto de cliente, configurar um único canal real e padronizar o verbo conforme a ação entregue. No case comercial da Alkor, usar um CTA externo próprio para solicitar um projeto.
- **Exemplo de melhoria:** “Enviar e-mail para solicitar um horário” se o canal real for e-mail; “Solicitar avaliação pelo WhatsApp” somente com número e operação confirmados; “Ver demonstração do fluxo de contato” em uma demo não operacional.
- **Forma de validar:** teste ponta a ponta em Android, iPhone e desktop, comparando o que o usuário espera antes do clique com o que acontece depois.

### ALK-CRO-R2-005 — Autoridade profissional é visualmente forte, mas não verificável

- **Área:** Autoridade, confiança e percepção de valor
- **Gravidade:** Alta
- **Seção:** Hero e Sobre o especialista
- **Evidência:** a página apresenta “Davi Faria”, “Fisioterapeuta Cardiorrespiratório”, “CREFITO ativo” e “10 anos”, mas não há número de registro, formação, especialização, instituição, experiência contextualizada ou modalidade de atendimento. Esses dados também não pertencem a um cliente confirmado.
- **Impacto:** o design cria confiança inicial, porém um paciente não consegue verificar a qualificação. Para um profissional avaliando a Alkor, o template não demonstra ainda como credenciais reais seriam organizadas com rigor.
- **Recomendação:** manter a seção visual, mas estruturar a personalização do cliente com campos explícitos para credenciais verificáveis. Na demo, marcar o conjunto como fictício. Evitar excesso curricular; exibir somente dados que ajudam a decisão.
- **Exemplo de melhoria:** “[Registro profissional confirmado] • [Especialização confirmada] • Atendimento [modalidade/local confirmados]”.
- **Forma de validar:** pedir a usuários que encontrem e expliquem em até 20 segundos por que o profissional é qualificado e como verificariam essa informação.

### ALK-CRO-R2-006 — Objeções operacionais continuam sem resposta concreta

- **Área:** Jornada, FAQ e conversão
- **Gravidade:** Alta
- **Seção:** FAQ e Contato
- **Evidência:** a resposta “Entre em contato para confirmar modalidades, localização, disponibilidade e documentos necessários” transfere as principais dúvidas ao canal de contato. A página não esclarece presencial, online ou domiciliar, bairro/endereço, prazo de retorno, duração da avaliação, convênio/particular ou necessidade de encaminhamento.
- **Impacto:** o paciente chega ao final sem saber se o atendimento é viável. Isso aumenta abandono e contatos desqualificados. Como template, a ausência também dificulta mostrar ao futuro cliente quais informações ele precisará fornecer.
- **Recomendação:** criar uma checklist de onboarding de conteúdo e preencher somente informações confirmadas. Nem todos os dados precisam estar na landing page, mas modalidade, região, forma de contato e próximo passo devem estar claros.
- **Exemplo de melhoria:** “Atendimento [modalidade] em [local]. Após a solicitação, você recebe retorno em [prazo real] com disponibilidade e orientações para a avaliação.”
- **Forma de validar:** comparar as dúvidas recebidas no primeiro contato com as respostas disponíveis na página e medir redução de perguntas operacionais repetidas.

### ALK-CRO-R2-007 — O CTA principal do Hero fica parcialmente abaixo da dobra em desktops baixos

- **Área:** Primeira impressão, Hero e conversão
- **Gravidade:** Média
- **Seção:** Hero
- **Evidência:** no viewport de 1280 × 720, os CTAs internos começam em aproximadamente 701 px e terminam em 749 px. A captura inicial mostra apenas o início dos botões. O Hero mede aproximadamente 985 px nessa configuração.
- **Impacto:** a mensagem ocupa o primeiro viewport, mas a ação conectada à narrativa exige uma pequena rolagem. O CTA do Header permanece visível, portanto não é um bloqueio, mas reduz a eficiência do Hero em notebooks e janelas baixas.
- **Recomendação:** ajustar espaçamento vertical com base também na altura do viewport, não apenas na largura. Preservar a composição em telas altas e reduzir margens/paddings em `max-height` intermediário.
- **Exemplo de melhoria:** uma variação para alturas abaixo de 760 px que reduza discretamente `pt`, `pb`, margens da badge, subtítulo e indicadores, sem diminuir legibilidade.
- **Forma de validar:** screenshots e teste de cinco segundos em 1280 × 720, 1366 × 768, 1440 × 900 e zoom de 100%/125%.

### ALK-CRO-R2-008 — A jornada mobile é extensa e repete conteúdo em formato de cards

- **Área:** Mobile, ritmo visual e conversão
- **Gravidade:** Média
- **Seção:** Página completa
- **Evidência:** em 390 × 844, a página mede aproximadamente 14.354 px. O contato começa perto de 12.636 px. “Sobre” mede cerca de 1.841 px, “Tratamentos” 2.619 px, “Como funciona” 1.335 px, “Resultados” 1.300 px e “Depoimentos” 1.786 px.
- **Impacto:** o usuário recebe bastante contexto, mas atravessa aproximadamente 15 viewports antes do CTA final. Tratamentos, pilares, métricas e depoimentos repetem cartões/grades, o que pode diminuir lembrança e chegada ao fechamento.
- **Recomendação:** preservar as seções, mas avaliar compactação mobile depois que conteúdo real existir. Priorizar os tratamentos principais, usar expansão progressiva quando fizer sentido e remover provas fictícias reduz significativamente a rolagem sem prejudicar compreensão.
- **Exemplo de melhoria:** mostrar três tratamentos prioritários e “Ver outras áreas”, ou reduzir a seção de prova a um bloco real e verificável em vez de métricas mais três depoimentos.
- **Forma de validar:** profundidade de scroll agregada, chegada ao CTA final e entrevistas observando onde o usuário sente repetição. Não usar somente comprimento como critério.

### ALK-CRO-R2-009 — A diferenciação ainda depende mais do design do que da proposta de valor

- **Área:** Posicionamento e copywriting
- **Gravidade:** Média
- **Seção:** Hero, About e Como funciona
- **Evidência:** “evidência científica”, “atendimento humanizado”, “acompanhamento próximo”, “plano individualizado” e “qualidade de vida” são mensagens corretas, mas amplamente utilizadas no setor. O Hero não apresenta local, modalidade, recorte de público ou método específico.
- **Impacto:** o visitante entende o serviço, mas não consegue explicar por que escolher este profissional. Para a Alkor, o visual demonstra diferenciação; a estratégia de conteúdo ainda parece intercambiável entre clientes.
- **Recomendação:** durante o onboarding de cada cliente, identificar um diferencial comprovável e relevante. O template deve orientar a coleta dessa informação, sem inventá-la.
- **Exemplo de melhoria:** “Fisioterapia cardiorrespiratória para [público confirmado], com atendimento [modalidade/local] e evolução acompanhada por [processo real].”
- **Forma de validar:** teste de cinco segundos perguntando serviço, público, local e principal diferença em relação a outra opção.

### ALK-CRO-R2-010 — A imagem do profissional pode comunicar uma identidade clínica genérica

- **Área:** Design, autenticidade e autoridade
- **Gravidade:** Média
- **Seção:** Sobre o especialista
- **Evidência:** a fotografia mostra jaleco e estetoscópio, códigos visuais fortemente associados a médico, enquanto a página apresenta um fisioterapeuta. O `alt` usa “Dr. Davi Faria”, mas não há identidade ou credenciais reais associadas à imagem.
- **Impacto:** a imagem funciona esteticamente, porém pode parecer stock ou encenação genérica. Um potencial cliente da área da saúde tende a valorizar representação autêntica de seu ambiente, equipamento e forma de atendimento.
- **Recomendação:** na personalização real, priorizar ensaio próprio do profissional e contexto coerente com a atuação. Na demo, garantir licença de uso e marcar a identidade como fictícia.
- **Exemplo de melhoria:** fotografia do profissional em avaliação respiratória, orientação de exercício ou ambiente real de atendimento, sem exagero hospitalar.
- **Forma de validar:** teste qualitativo perguntando qual profissão e tipo de atendimento a imagem comunica antes de mostrar o texto.

### ALK-CRO-R2-011 — Não existe mensuração do funil de conversão

- **Área:** CRO, produto e privacidade
- **Gravidade:** Média
- **Seção:** CTAs e contato
- **Evidência:** não foram encontrados analytics nem eventos para diferenciar cliques no Header, Hero, About, Tratamentos, FAQ e CTA final.
- **Impacto:** a Alkor não consegue saber qual mensagem gera intenção, onde a jornada perde usuários ou se o canal de contato converte. Ajustes futuros ficariam baseados apenas em preferência visual.
- **Recomendação:** preparar uma camada opcional de eventos para projetos reais, ativada somente após definição de ferramenta, consentimento e política de privacidade. Não registrar sintomas selecionados, textos de mensagens ou informações clínicas.
- **Exemplo de melhoria:** evento anônimo `contact_cta_click` com `placement: header|hero|about|specialties|faq|final` e `channel: email|phone|whatsapp|calendar`.
- **Forma de validar:** verificar os payloads em ambiente de teste e confirmar que nenhum dado pessoal ou de saúde é transmitido.

### ALK-CRO-R2-012 — Microcopy de ação e identidade oscila entre profissional individual e equipe

- **Área:** Copywriting e consistência
- **Gravidade:** Baixa
- **Seção:** Header, Tratamentos, FAQ, Contato e Footer
- **Evidência:** coexistem “Agendar Consulta”, “Agendar avaliação”, “Fazer Agendamento”, “Fale com a gente”, “converse com o especialista” e “Assim, a equipe consegue orientar”. A página apresenta um único profissional, sem confirmar equipe.
- **Impacto:** não impede compreensão, mas reduz precisão e pode sugerir uma operação diferente da real.
- **Recomendação:** definir a operação antes de escolher a voz. Se for profissional individual, usar primeira pessoa ou “especialista”. Se houver equipe, apresentá-la. Padronizar “consulta” ou “avaliação” conforme o serviço real.
- **Exemplo de melhoria:** “Solicitar avaliação” em todos os CTAs e “Converse com o especialista” nos apoios, caso a operação seja individual.
- **Forma de validar:** inventário de CTAs e teste de consistência; todos os botões com a mesma intenção devem gerar a mesma expectativa.

## 5. Jornada atual

1. **Header:** apresenta marca, navegação e CTA “Agendar Consulta”.
2. **Hero:** comunica especialidade, benefício, abordagem e dois caminhos de ação.
3. **Para quem é:** permite identificação com sintomas e situações cotidianas.
4. **Especialista:** introduz fotografia, identidade, manifesto e princípios.
5. **Tratamentos:** apresenta seis frentes de atuação.
6. **Como funciona:** reforça atendimento humanizado, evidência e acompanhamento.
7. **Resultados:** apresenta quatro métricas e seis benefícios percebidos.
8. **Depoimentos:** mostra três relatos com resultados resumidos.
9. **FAQ:** responde dúvidas clínicas e uma dúvida operacional.
10. **Contato:** apresenta e-mail disfarçado de agendamento e telefone demonstrativo.
11. **Footer:** repete navegação, localização e canais.

### Avaliação da jornada

A macro-ordem continua lógica: promessa → identificação → pessoa → serviços → processo → prova → objeções → contato. Não há justificativa para uma reorganização radical.

O problema está na função de alguns blocos:

- “Como funciona” comunica valores, mas não etapas concretas;
- “Resultados” e “Depoimentos” simulam provas que ainda não existem;
- “Contato” não entrega agendamento;
- a página não explica que é uma demonstração da Alkor.

No mobile, a ordem é compreensível, porém longa. Os CTAs intermediários permitem pular para o final, o que reduz parcialmente essa fricção.

## 6. Jornada recomendada

### Para a demo pública da Alkor

1. **Contexto do case:** identificar o projeto como conceitual e explicar o objetivo.
2. **Abrir demonstração:** permitir explorar a experiência simulada do paciente.
3. **Hero da demo:** preservar a composição atual.
4. **Para quem é:** preservar como principal demonstração autoral.
5. **Especialista:** marcar identidade e credenciais como fictícias.
6. **Tratamentos e processo:** demonstrar estrutura, deixando claro o que será personalizado.
7. **Prova:** usar estado explicitamente demonstrativo, sem simular prova real.
8. **FAQ:** mostrar perguntas-modelo e campos que dependem da operação.
9. **Contato da demo:** demonstrar o componente sem ativar canais falsos.
10. **Retorno ao case:** CTA real da Alkor para solicitar proposta ou personalização.

### Para um cliente real

1. Hero com especialidade, público, diferencial comprovável e ação real.
2. Identificação por sintomas/situações.
3. Especialista com registro e credenciais confirmadas.
4. Tratamentos priorizados conforme a operação.
5. Processo concreto: contato, avaliação, plano e acompanhamento.
6. Provas reais e autorizadas — ou ausência de prova.
7. FAQ clínica e operacional.
8. Contato direto com canal, expectativa e próximo passo claros.

Não recomendo trocar a ordem de “Para quem é” e “Especialista” neste momento. A primeira cria identificação e a segunda transforma essa identificação em confiança humana.

## 7. Copy que precisa ser revisada

As alternativas abaixo são direções. Campos entre colchetes dependem de dados reais e aprovação profissional.

| Trecho atual | Problema | Alternativa sugerida |
|---|---|---|
| “Reabilitação cardiorrespiratória guiada por evidência científica...” | Correto, mas genérico e sem diferencial comprovável. | “Fisioterapia cardiorrespiratória para [público], com atendimento [modalidade/local] e acompanhamento de [processo real].” |
| “Conhecer o tratamento” | O destino é a seção “Para quem é”. | “Ver se este cuidado é para mim” |
| “Agendar Consulta” / “Agendar avaliação” | Termos inconsistentes e ação final abre e-mail. | “Solicitar avaliação” ou “Enviar e-mail para solicitar horário”, conforme o fluxo real. |
| “CREFITO ativo” | Parece credencial verificável, mas não possui número nem responsável real. | “[CREFITO confirmado]” apenas após validação; na demo, “Dado demonstrativo”. |
| “+500”, “94%” e “98%” | Números sem fonte, amostra ou metodologia. | Remover na demo pública ou apresentar campos explicitamente demonstrativos. |
| “Reabilitação acelerada... reduzindo complicações e tempo de internação.” | Claim clínico forte e causal. | “Acompanhamento progressivo no pré e pós-operatório, conforme avaliação e orientação da equipe responsável.” |
| “Resultados consistentes” | Pode sugerir previsibilidade de resultado. | “Evolução acompanhada de acordo com a resposta individual.” |
| “Fale com a gente” | A página apresenta um único profissional. | “Converse com o especialista”, se a operação for individual. |
| “Assim, a equipe consegue orientar...” | Equipe não foi apresentada. | “Assim, você recebe orientação sobre o próximo passo”, até confirmar a operação. |
| “Cada sintoma muda a forma como o corpo respira.” | Formulação determinística. | “Alguns sinais ajudam a compreender como a respiração e a rotina podem estar sendo afetadas.” |
| “Projeto” sem aviso de demonstração | O visitante interpreta tudo como real. | “Projeto conceitual Alkor — dados e identidades demonstrativos.” |

Copies que continuam fortes e devem ser preservadas, salvo motivo estratégico:

- “Respire fundo.”
- “O que você sente também pode ser compreendido.”
- “Clareza também faz parte do cuidado.”
- “Sua recuperação pode começar com uma conversa tranquila.”
- “Um plano clínico para cada etapa da sua recuperação.”

## 8. Objeções não respondidas

### Sobre a própria demonstração

- Este profissional existe?
- Os números são reais?
- Os depoimentos são reais?
- O telefone e o e-mail funcionam?
- Este é um cliente da Alkor ou um projeto conceitual?
- Como um profissional interessado contrata uma versão personalizada?

### Para o futuro paciente de um cliente real

- Qual é o número completo do registro profissional?
- Qual formação e especialização sustentam a atuação?
- O atendimento é presencial, domiciliar, hospitalar ou online?
- Onde exatamente ocorre o atendimento?
- Qual região é atendida?
- O atendimento é particular, por convênio ou com reembolso?
- É necessário encaminhamento médico?
- Quanto dura a primeira avaliação?
- O que devo levar?
- O que acontece depois de solicitar um horário?
- Em quanto tempo recebo retorno?
- Há acessibilidade física no local?
- Como funcionam cancelamentos e remarcações?

Nem todas essas respostas precisam estar na landing page. A prioridade deve ser modalidade, local, forma de contato, qualificação e próximo passo — informações que determinam se o atendimento é viável.

## 9. Melhorias prioritárias

### 1. Bloqueadores

1. Identificar publicamente o projeto como conceitual antes de compartilhar a URL como portfólio.
2. Remover, desativar ou marcar de forma inequívoca depoimentos, métricas, credenciais e contatos demonstrativos.
3. Separar o fluxo simulado do paciente do CTA comercial real da Alkor.
4. Exigir validação clínica e documental antes de reutilizar claims em um projeto de cliente.

### 2. Alto impacto

1. Definir um único fluxo real de contato/agendamento para cada cliente.
2. Criar checklist de onboarding para registro, formação, modalidade, local e operação.
3. Transformar “Como funciona” em etapas concretas quando houver dados do cliente.
4. Responder as objeções operacionais que determinam viabilidade.
5. Usar fotografia autêntica do profissional na versão personalizada.

### 3. Médio impacto

1. Garantir que o CTA interno do Hero permaneça visível em desktops de pouca altura.
2. Reduzir o comprimento mobile depois que as provas reais forem definidas.
3. Tornar a proposta de valor específica com um diferencial comprovável.
4. Preparar eventos mínimos de conversão respeitando privacidade.

### 4. Refinamentos

1. Padronizar “consulta” versus “avaliação”.
2. Padronizar profissional individual versus equipe.
3. Revisar palavras como “ágil”, “acelerada” e “consistente”.
4. Manter os ganhos atuais de contraste, foco e reduced motion.

## 10. Hipóteses de conversão

As hipóteses abaixo precisam de teste; não são certezas.

1. **Contexto de projeto conceitual:** identificar a demo de forma elegante pode aumentar confiança de profissionais interessados sem reduzir percepção premium.
2. **Case + demo separada:** apresentar primeiro o case da Alkor e abrir a landing em uma demo independente pode gerar mais oportunidades do que enviar a landing sem contexto.
3. **CTA comercial da Alkor:** um retorno visível para “Quero um projeto como este” pode converter profissionais após explorarem a demonstração.
4. **CTA direto para o cliente real:** WhatsApp ou agenda, quando fizerem parte da operação, podem reduzir atrito em comparação ao `mailto:`.
5. **CTA coerente:** “Ver se este cuidado é para mim” pode alinhar melhor expectativa e destino do que “Conhecer o tratamento”.
6. **CTA do Hero em telas baixas:** manter os botões totalmente visíveis pode aumentar intenção inicial em notebooks.
7. **Credenciais próximas ao nome:** registro e especialização confirmados podem elevar confiança mais do que selos genéricos no Hero.
8. **Processo concreto:** “Contato → avaliação → plano → acompanhamento” pode reduzir mais objeções do que os três pilares institucionais atuais.
9. **Prova real versus ausência de prova:** retirar prova fictícia pode gerar mais confiança do que manter números impressionantes sem fonte.
10. **Compactação mobile:** reduzir cards secundários pode aumentar chegada ao CTA final sem diminuir entendimento.
11. **Fotografia autêntica:** imagem real do profissional e do ambiente pode aumentar confiança e percepção de personalização.
12. **FAQ operacional:** modalidade, local e próximo passo podem melhorar a qualidade dos contatos recebidos.
13. **Mensuração por posição:** eventos anônimos podem revelar se Header, Hero, About, FAQ ou CTA final geram mais intenção.

Indicadores recomendados para projetos reais:

- clique em CTA por posição;
- canal acionado;
- início de contato;
- agendamento confirmado, quando tecnicamente disponível;
- profundidade de scroll agregada;
- chegada ao CTA final;
- abandono entre clique e conclusão;
- qualidade do contato avaliada pela operação, sem enviar dados clínicos ao analytics.

## 11. Notas

| Critério | Nota | Justificativa resumida |
|---|---:|---|
| Posicionamento | 7,3 | Especialidade clara; diferencial ainda genérico e contexto de demo ausente. |
| Primeira impressão | 8,6 | Hero forte e premium; CTA interno fica parcialmente abaixo da dobra em desktop baixo. |
| Autoridade | 4,2 | Excelente apresentação visual, mas identidade, credenciais e números não são verificáveis. |
| Confiança | 4,0 | UX e design transmitem confiança; prova fictícia com aparência real produz o efeito oposto. |
| Copywriting | 7,0 | Linguagem humana e clara, com generalidades e claims que exigem revisão. |
| UX | 8,2 | Navegação, hierarquia, FAQ e interação são sólidas; contato ainda quebra expectativa. |
| Mobile | 8,3 | Execução visual e interação muito boas; jornada chega a aproximadamente 14,3 mil px. |
| Jornada | 8,0 | Macro-ordem correta; prova, processo e contato não cumprem plenamente sua função. |
| Conversão | 5,0 | CTAs visíveis e fechamento forte, mas canais são demonstrativos e não há mensuração. |
| Ética | 3,4 | Tom clínico é cuidadoso, porém depoimentos, métricas e credenciais fictícias não estão sinalizados. |
| Percepção premium | 9,0 | O acabamento visual é autoral, consistente e claramente acima de um template comum. |
| Identidade Alkor | 8,2 | Design e UX refletem a Alkor; transparência e rigor comercial ainda não acompanham a execução visual. |

**Média simples:** 6,8/10.

### Comparação qualitativa com a auditoria anterior

- **UX e mobile:** melhoraram de forma relevante e agora foram validados no navegador.
- **Acessibilidade do menu:** problema anterior resolvido.
- **Interação “Para quem é”:** mais coerente e refinada.
- **Percepção premium:** aumentou.
- **Conversão operacional:** permanece sem solução, pois o CTA ainda termina em e-mail/telefone demonstrativo.
- **Confiança e ética:** não melhoraram; a ausência atual do aviso nos depoimentos agrava o risco.

## 12. Veredito comercial

> Este site está pronto para representar a Alkor e gerar oportunidades comerciais?

**Reprovado para publicação pública no estado atual.**

Como demonstração privada, apresentada verbalmente como projeto conceitual, a página já é forte o bastante para mostrar a qualidade visual e técnica da Alkor. O design, a responsividade e as microinterações comunicam claramente um trabalho premium.

Como URL pública de portfólio, porém, ainda não deve ser apresentada sem contexto. O visitante não consegue distinguir demonstração de operação real, e os depoimentos, métricas, credenciais e canais fictícios têm aparência de fatos. Isso entra em conflito direto com os pilares de confiança, autoridade e ética da Alkor.

O caminho para aprovação não exige redesign. Exige principalmente:

1. enquadrar a página como projeto conceitual;
2. separar a demo do CTA comercial da Alkor;
3. identificar ou remover provas e dados fictícios;
4. padronizar o fluxo de conversão;
5. preparar a personalização com dados reais de cada futuro cliente.

Após esses ajustes, o projeto tem potencial para alcançar **Aprovado com ressalvas** como case público e **Aprovado** quando estiver personalizado com identidade, credenciais, conteúdo clínico e operação reais.

Nenhum componente, layout ou conteúdo do site foi alterado durante esta reauditoria. Apenas este relatório foi atualizado.
