# Auditoria Técnica — Alkor Physio

Data da auditoria: 20 de julho de 2026  
Escopo: repositório completo, considerando o estado atual da árvore de trabalho.  
Diretrizes: `Alkor_AI_Project_Brief.md`, `1-Alkor_Auditoria_Tecnica.md` e instruções específicas desta auditoria.

## 1. Resumo executivo

O projeto possui uma base técnica boa para uma landing page premium de rota única. A estrutura por seções é fácil de compreender, o App Router está corretamente adotado, a maior parte da página permanece como Server Component, o TypeScript está em modo estrito e as animações mais custosas possuem cleanup e pausa fora da viewport. O código é, em geral, legível e compatível com a manutenção por um desenvolvedor solo.

Os princípios que orientam esta avaliação são: clareza antes de criatividade; conversão sem atrito; Server Components por padrão; performance e acessibilidade como requisitos; animação com propósito; dados clínicos e comerciais verificáveis; poucas dependências; e manutenção operacional simples.

O projeto ainda não está pronto para publicação. O bloqueador principal não é arquitetural: existem identidade, contatos, credenciais, números de resultado e experiência apresentados como fatos sem evidência no repositório. Isso conflita diretamente com as regras da Alkor para projetos de saúde. Há também três riscos técnicos relevantes: o menu mobile fechado continua acessível pelo teclado, o loop respiratório continua consumindo `requestAnimationFrame` com movimento reduzido e o build/lint não puderam ser reproduzidos na instalação atual por mistura de dependências nativas Windows/WSL.

Resumo das verificações:

- Leitura integral de todos os arquivos-fonte, configurações, dados e assets do projeto.
- `tsc --noEmit`: aprovado, sem erros.
- `git status`: limpo no início da produção deste relatório.
- Build de produção: não validado; falhou antes da compilação por ausência do binding Windows de `lightningcss` na instalação atual.
- ESLint: não validado; falhou ao carregar o binding nativo de `unrs-resolver` pelo mesmo conflito de plataforma.
- `npm audit --package-lock-only`: 2 vulnerabilidades moderadas, 0 altas e 0 críticas.
- Core Web Vitals, contraste renderizado e comportamento em tecnologias assistivas não foram medidos em ambiente publicado. Onde aplicável, as conclusões abaixo são inferências estáticas explicitamente identificadas.

Informações ausentes que não devem ser inventadas:

- identidade e registro reais do profissional;
- telefone, e-mail, endereço, modalidades e horários;
- comprovação dos anos de experiência;
- fonte, amostra e metodologia dos percentuais e números de pacientes;
- consentimento verificável para depoimentos;
- domínio canônico e URLs sociais;
- política de privacidade e responsável pelo tratamento de dados, caso futuramente haja formulário ou analytics.

## 2. Pontos fortes

- **Arquitetura compreensível:** `app/page.tsx` funciona como composição simples de seções; `components/sections`, `components/layout`, `hooks` e arquivos `*.data.ts` tornam a navegação no projeto direta.
- **Server Components bem aproveitados:** About, Specialties, How It Works, Results, Testimonials, FAQ, Contact e Footer não foram convertidos em Client Components sem necessidade.
- **App Router correto para o escopo:** `app/layout.tsx` concentra layout, fontes e metadata; a página é estática e não possui carregamento remoto que justificaria cache, `loading.tsx` ou `error.tsx` específicos neste momento.
- **TypeScript forte:** `strict: true`, ausência de `any` explícito, props tipadas e tipos de domínio claros em `symptoms.ts`, `about.data.ts` e `testimonials.data.ts`.
- **Uso adequado de recursos Next.js:** `next/font` evita carregamento manual de fontes e `next/image` é usado na fotografia do profissional com `sizes` e dimensões estáticas inferidas pelo import.
- **Animações com cleanup:** `Header.tsx`, `useBackgroundCanvas.ts` e `useBreathingAnimation.ts` encerram timelines, observers, listeners e frames na desmontagem.
- **Trabalho fora da viewport reduzido:** os dois loops de desenho usam `IntersectionObserver`, evitando animação contínua quando suas áreas não estão visíveis em condições normais.
- **DPR do canvas limitado:** `useBackgroundCanvas.ts` limita a densidade a 2, uma decisão prudente para telas móveis e notebooks de alta densidade.
- **Sem superfície de backend desnecessária:** não há formulários, endpoints, segredos, HTML injetado, armazenamento local ou scripts de terceiros no código atual.
- **Semântica geral consistente:** há um único `h1`, seções com `h2`, artigos onde apropriado, links reais para navegação e textos alternativos descritivos na fotografia.
- **Navegação centralizada:** `components/layout/navLinks.ts` evita divergência entre header e footer.
- **Fallback ético parcial:** a seção de depoimentos informa explicitamente que os relatos são demonstrativos e devem ser substituídos antes da publicação.
- **Direção visual consistente:** tokens, espaçamento, tipografia e microinterações formam uma linguagem coesa sem exigir um design system excessivamente abstrato.

## 3. Problemas encontrados

### ALK-TEC-001 — Dados e claims não verificáveis em uma página de saúde

- **Categoria:** Segurança, privacidade, integridade de conteúdo e prontidão de produção
- **Gravidade:** Crítica
- **Arquivo ou rota:** `/`; `components/sections/hero/Indicators.tsx:1`; `components/sections/results/Results.tsx:16-19,73`; `components/sections/about/about.data.ts:10-11`; `components/layout/Footer.tsx:25,47-59`; `components/sections/contact/ContactCTA.tsx:27-42`; `components/sections/testimonials/Testimonials.tsx:75-76`
- **Evidência:** a página afirma “CREFITO ativo”, “+10 anos”, “+500 pacientes”, “94%” e “98%”, apresenta “Davi Faria” como profissional e publica telefone/e-mail com aparência real. O repositório não contém fonte, registro, configuração de ambiente ou documentação que confirme esses dados. Os depoimentos são identificados como demonstrativos, mas permanecem visualmente apresentados como prova social.
- **Explicação:** em saúde, números, credenciais e relatos não podem ser tratados como copy decorativa. O brief da Alkor proíbe expressamente inventar especializações, registros, números, resultados e depoimentos.
- **Impacto:** impede publicação segura; pode induzir pacientes a erro, comprometer confiança, gerar risco reputacional e criar exposição ética ou jurídica.
- **Correção recomendada:** substituir por dados reais e aprovados, com fonte documentada; enquanto isso, usar placeholders inequivocamente visíveis. Não publicar depoimentos demonstrativos. Centralizar identidade e contatos em uma configuração pequena para reduzir divergências, sem criar um CMS prematuramente.
- **Exemplo de implementação:** um `site.config.ts` tipado com campos como `professionalName`, `crefito`, `phone`, `email` e `location`, preenchido somente após confirmação. Estatísticas e depoimentos devem aceitar apenas conteúdo aprovado e sua respectiva fonte/autorização.
- **Risco da correção:** baixo tecnicamente; alto se dados forem substituídos sem validação do cliente.
- **Forma de validar:** checklist assinado pelo responsável pelo conteúdo; conferência de todos os claims e contatos na página; revisão jurídica/ética quando aplicável; busca no repositório por valores antigos.

### ALK-TEC-002 — Build e lint não reproduzíveis na instalação auditada

- **Categoria:** Engenharia, estabilidade e entrega
- **Gravidade:** Alta
- **Arquivo ou rota:** `package.json:6-9`, `package-lock.json`, instalação local de `node_modules`
- **Evidência:** `tsc --noEmit` passou. `next build` falhou ao carregar `lightningcss.win32-x64-msvc.node`; o ESLint falhou ao carregar o binding de `unrs-resolver`. A instalação está em WSL, mas as verificações disponíveis foram executadas por Node Windows, enquanto os módulos opcionais instalados pertencem a outra plataforma.
- **Explicação:** a falha observada é ambiental, não prova defeito no código. Contudo, sem build e lint verdes em um ambiente limpo não há evidência suficiente para declarar o commit publicável.
- **Impacto:** regressões de CSS, regras Next.js, imports e geração estática podem chegar à entrega sem serem detectadas.
- **Correção recomendada:** escolher um único ambiente oficial — preferencialmente Node Linux dentro do WSL para este caminho — fazer instalação limpa a partir do lockfile e executar `npm run lint` e `npm run build`. Registrar a versão de Node em `.nvmrc` ou `engines` e automatizar as duas verificações em CI.
- **Exemplo de implementação:** pipeline mínimo com instalação por lockfile, typecheck, lint e build; sem adicionar uma plataforma de testes complexa.
- **Risco da correção:** baixo; uma reinstalação pode revelar problemas reais antes mascarados.
- **Forma de validar:** clone limpo, `npm ci`, `npm run lint` e `npm run build` com códigos de saída zero.

### ALK-TEC-003 — Menu mobile fechado permanece navegável por teclado

- **Categoria:** Acessibilidade e React
- **Gravidade:** Alta
- **Arquivo ou rota:** `components/layout/MobileHeader.tsx:13-56`; `components/layout/Header.tsx:229-263`
- **Evidência:** o menu fechado usa apenas `max-h-0` e `opacity-0`. Links e CTA continuam no DOM, sem `hidden`, `inert`, `aria-hidden` ou remoção do fluxo de tabulação.
- **Explicação:** ocultar visualmente não remove elementos interativos da ordem de foco. Usuários de teclado podem tabular por links invisíveis. O menu também não gerencia foco ao abrir/fechar, embora Escape e `aria-expanded` estejam corretamente implementados.
- **Impacto:** navegação confusa, foco invisível e possível interação com conteúdo que o usuário não percebe.
- **Correção recomendada:** quando fechado, tornar o painel efetivamente indisponível para foco; quando aberto, mover o foco para o primeiro item e restaurá-lo ao botão ao fechar. Para este menu pequeno, uma solução nativa com `inert`/`hidden` coordenada à animação é preferível a adicionar biblioteca.
- **Exemplo de implementação:** aplicar `inert={!isOpen}` e `aria-hidden={!isOpen}` ao contêiner, com controle de foco no botão e no primeiro link; se `hidden` for usado, aguardar o término da animação de saída.
- **Risco da correção:** médio, pois ocultar cedo demais pode cortar a animação de fechamento.
- **Forma de validar:** percorrer a página apenas com Tab/Shift+Tab; testar Escape; verificar foco devolvido ao acionador; testar com NVDA ou VoiceOver.

### ALK-TEC-004 — `prefers-reduced-motion` não interrompe o loop respiratório

- **Categoria:** Animações, acessibilidade e performance
- **Gravidade:** Alta
- **Arquivo ou rota:** `hooks/useBreathingAnimation.ts:39-41,93-101,129-147`
- **Evidência:** com movimento reduzido, os cálculos oscilatórios são ignorados, mas o `IntersectionObserver` ainda chama `start()` e `frame()` agenda outro `requestAnimationFrame` indefinidamente. O loop continua interpolando e escrevendo várias custom properties a cada frame.
- **Explicação:** a apresentação fica estática, porém o custo computacional permanece. Isso não cumpre integralmente a preferência do usuário e desperdiça CPU/bateria.
- **Impacto:** consumo contínuo em dispositivos mais fracos e experiência aquém do requisito de acessibilidade.
- **Correção recomendada:** em reduced motion, aplicar um frame estático quando o perfil mudar e não iniciar RAF contínuo. Manter o observer apenas para o modo animado.
- **Exemplo de implementação:** extrair a escrita do estado visual para uma função; chamar uma vez no modo reduzido e usar RAF somente quando `prefersReducedMotion` for falso.
- **Risco da correção:** baixo; deve-se garantir que a troca de sintoma ainda atualize o frame estático.
- **Forma de validar:** ativar “reduzir movimento”, observar que não há RAF recorrente no Performance panel e trocar sintomas para confirmar a atualização estática.

### ALK-TEC-005 — Foco do FAQ pode ficar invisível

- **Categoria:** Acessibilidade
- **Gravidade:** Média
- **Arquivo ou rota:** `components/sections/faq/FAQ.tsx:31,40`
- **Evidência:** o `summary` remove o outline com `focus-visible:outline-none`. O anel está em um filho com `group-focus-visible`, mas o elemento marcado como `group` é o `details`; o foco recai no `summary`, não no `details`.
- **Explicação:** pela estrutura atual, não há garantia de que a variante no filho seja ativada. A regra global de foco também é explicitamente anulada no `summary`.
- **Impacto:** usuários de teclado podem não identificar qual pergunta está focada.
- **Correção recomendada:** estilizar diretamente `summary:focus-visible` ou usar `group/summary` no próprio elemento focável, sem remover o outline antes de existir substituto confiável.
- **Exemplo de implementação:** aplicar ring/outline diretamente na linha do `summary`, com offset que não seja cortado pelo contêiner.
- **Risco da correção:** baixo, limitado ao acabamento visual.
- **Forma de validar:** navegar pelas perguntas com Tab em Chrome, Firefox e Safari; conferir foco visível em alto contraste.

### ALK-TEC-006 — Textos secundários pequenos têm contraste insuficiente

- **Categoria:** Acessibilidade e UI
- **Gravidade:** Média
- **Arquivo ou rota:** `components/sections/for-whom/ForWhom.tsx:72-91,130-181`; `components/sections/for-whom/SymptomCard.tsx:48-69`; `components/sections/testimonials/Testimonials.tsx:74-77`; `components/sections/contact/ContactCTA.tsx:41-43`; `components/layout/Footer.tsx:67-70`
- **Evidência:** por inferência estática usando as cores padrão do Tailwind, `slate-500` sobre `#07131f` tem contraste aproximado de 3,93:1; `slate-400` sobre branco, 2,56:1; `slate-500` sobre `slate-950`, 4,24:1. Os textos afetados têm entre 8 e 12 px e não são texto grande.
- **Explicação:** WCAG AA requer 4,5:1 para texto normal. Opacidades e gradientes podem reduzir ainda mais o contraste em alguns pontos.
- **Impacto:** labels, ressalvas e informações de contato ficam difíceis de ler, especialmente para baixa visão e em telas móveis.
- **Correção recomendada:** elevar os tons dos textos informativos e manter tons fracos apenas em elementos realmente decorativos. Confirmar no layout renderizado, pois backdrop e transparência alteram o resultado final.
- **Exemplo de implementação:** testar `slate-300/400` sobre painéis escuros e `slate-600` sobre fundos claros, preservando hierarquia por tamanho/peso em vez de opacidade excessiva.
- **Risco da correção:** baixo; pode exigir pequeno ajuste de hierarquia visual.
- **Forma de validar:** axe/Lighthouse e medição manual nos pixels renderizados em desktop e mobile.

### ALK-TEC-007 — SEO técnico cobre apenas título e descrição

- **Categoria:** Next.js e SEO técnico
- **Gravidade:** Média
- **Arquivo ou rota:** `app/layout.tsx:27-31`; pasta `app/`
- **Evidência:** há título e descrição, mas não existem `metadataBase`, canonical, Open Graph, Twitter card, `robots.ts`, `sitemap.ts`, imagem social ou schema estruturado. O domínio e os dados reais do negócio também não estão definidos.
- **Explicação:** para uma landing page local de saúde, esses sinais melhoram indexação, compartilhamento, consistência da entidade e descoberta local. `loading.tsx` e `error.tsx` não são ausências relevantes hoje, porque a rota é estática e não carrega dados remotos.
- **Impacto:** compartilhamentos sem apresentação controlada, indexação menos completa e menor capacidade de associar o profissional/local à página.
- **Correção recomendada:** após confirmação do domínio e dados reais, completar metadata, canonical, robots, sitemap e schema apropriado. Não inventar avaliações, endereço, registro ou horários para preencher schema.
- **Exemplo de implementação:** `metadataBase` no layout; `alternates.canonical`; objetos `openGraph`/`twitter`; `app/robots.ts`; `app/sitemap.ts`; JSON-LD de `Physician`, `MedicalBusiness` ou tipo mais preciso somente após validar a natureza real do negócio.
- **Risco da correção:** médio se schema ou canonical forem preenchidos com dados provisórios; baixo com dados confirmados.
- **Forma de validar:** Rich Results Test, Schema Validator, inspeção de source, compartilhamento de URL e Google Search Console após deploy.

### ALK-TEC-008 — Imagem abaixo da dobra é carregada com prioridade

- **Categoria:** Performance e Next.js
- **Gravidade:** Média
- **Arquivo ou rota:** `components/sections/about/AboutContent.tsx:29-46`; `components/sections/about/AboutImage.tsx:43-51`; `public/physiotherapist.jpg`
- **Evidência:** a fotografia da seção About, depois de Hero e For Whom, recebe `priority`. O arquivo-fonte tem 3743×5615 e aproximadamente 2,98 MB.
- **Explicação:** `next/image` reduz o custo de entrega e evita CLS, mas a prioridade pode competir com recursos do Hero e antecipar uma imagem que não é o LCP inicial. O asset-fonte excessivo também aumenta armazenamento, processamento de otimização e tempo de build/deploy.
- **Impacto:** potencial piora de LCP e consumo inicial de banda, especialmente no mobile. O impacto exato precisa ser medido em build funcional.
- **Correção recomendada:** remover a prioridade da imagem abaixo da dobra e exportar um original com dimensões/qualidade coerentes com o máximo exibido, preservando resolução suficiente para DPR 2.
- **Exemplo de implementação:** lazy loading padrão do `Image` e fonte próxima de 1024–1600 px na maior dimensão útil, validada visualmente.
- **Risco da correção:** baixo; compressão agressiva pode degradar a percepção premium.
- **Forma de validar:** waterfall de rede, Lighthouse mobile e comparação visual em DPR 1/2.

### ALK-TEC-009 — Hidratação client-side maior do que o necessário no Hero e no logo

- **Categoria:** Next.js, React e performance
- **Gravidade:** Média
- **Arquivo ou rota:** `components/sections/hero/Hero.tsx:1-10`; `components/svg/LogoSVG.tsx:1`
- **Evidência:** `Hero.tsx` é Client Component apenas para executar `useBackgroundCanvas`, fazendo conteúdo estático importado abaixo dessa fronteira entrar no grafo cliente. `LogoSVG.tsx` também declara `use client` sem hooks, eventos ou APIs do navegador.
- **Explicação:** a animação pode ficar em uma ilha cliente pequena, enquanto estrutura, heading, copy e CTAs permanecem server-rendered sem hidratação. O logo é cálculo SVG determinístico e não precisa de boundary cliente.
- **Impacto:** JavaScript e hidratação desnecessários acima da dobra; o peso real não pôde ser quantificado porque o build não concluiu.
- **Correção recomendada:** isolar canvas/ref/hook em um componente cliente e voltar `Hero` a Server Component; remover `use client` do logo. Não fragmentar além desses limites claros.
- **Exemplo de implementação:** `HeroBackground.client.tsx` contendo canvas e hook, composto pelo `Hero.tsx` servidor.
- **Risco da correção:** médio no canvas por posicionamento e sincronização com o heading; baixo no logo.
- **Forma de validar:** build analyzer ou manifest de chunks, hidratação sem warnings e comparação visual do Hero em resize.

### ALK-TEC-010 — Estado acessível da interação “For Whom” não corresponde integralmente à seleção

- **Categoria:** React e acessibilidade
- **Gravidade:** Média
- **Arquivo ou rota:** `components/sections/for-whom/SymptomCard.tsx:26-32`; `components/sections/for-whom/ForWhom.tsx:27-35,103-113`; `hooks/useActiveSymptom.ts:38-75`
- **Evidência:** `aria-pressed` recebe `active`, que também fica verdadeiro durante pré-visualização por foco/hover, embora a seleção persistente só ocorra no clique. As setas mudam o item fixado, mas o foco DOM permanece no botão anterior. A desseleção fora da caixa depende de `pointerdown`; não há equivalente explícito por teclado, e clicar novamente no botão ativo não alterna para falso.
- **Explicação:** estado visual de prévia, foco e seleção persistente são conceitos diferentes para tecnologia assistiva. Um padrão de toggle button deve anunciar apenas o estado fixado e oferecer forma coerente de desfazer a seleção.
- **Impacto:** leitores de tela podem ouvir um item como pressionado apenas ao focá-lo; depois de usar setas, foco e seleção podem apontar para itens diferentes.
- **Correção recomendada:** separar `selected` de `previewed`; usar `aria-pressed` somente para seleção; ao navegar por setas, mover foco com roving tabindex ou remover esse atalho e manter Tab/Enter; permitir Escape ou segundo clique para desselecionar.
- **Exemplo de implementação:** o hook expõe `isSelected` e `isPreviewed`; o card recebe ambos, e o grupo mantém refs apenas se adotar roving tabindex.
- **Risco da correção:** médio, pois altera uma interação recém-refinada e exige regressão desktop/mobile.
- **Forma de validar:** teclado completo, leitor de tela, touch, mouse, drag-to-scroll e sequência hover → clique → clique externo.

### ALK-TEC-011 — Canvas do Hero depende da taxa de atualização e cria objetos por frame

- **Categoria:** Performance e animações
- **Gravidade:** Média
- **Arquivo ou rota:** `hooks/useBackgroundCanvas.ts:243-403`
- **Evidência:** `time += 0.008` e `p.angle += p.angleSpeed` avançam por frame, não por tempo decorrido. Funções de desenho e três gradientes Canvas são recriados em cada frame, além do cálculo de centenas de pontos de ruído.
- **Explicação:** monitores de 120/144 Hz executam mais atualizações e mudam a velocidade de partes da animação. A carga pode ser relevante em hardware intermediário, embora DPR, partículas responsivas e pausa por viewport já mitiguem o custo.
- **Impacto:** movimento inconsistente entre dispositivos e possível pressão de CPU/garbage collector. Não há profiling suficiente para afirmar jank real.
- **Correção recomendada:** usar delta time limitado para progressão; mover funções estáveis para fora do frame; otimizar somente após profiling, preservando o visual atual.
- **Exemplo de implementação:** calcular `dt = min((now-last)/1000, limite)` e multiplicar velocidades por `dt`; manter gradientes dependentes de geometria no frame, mas evitar closures desnecessárias.
- **Risco da correção:** médio, pois muda ritmo e aparência da animação.
- **Forma de validar:** Performance panel em 60/120 Hz, CPU throttling e comparação de duração do ciclo em diferentes refresh rates.

### ALK-TEC-012 — Ausência de testes automatizados para interações com estado e cleanup

- **Categoria:** Qualidade, React e manutenção
- **Gravidade:** Média
- **Arquivo ou rota:** `package.json:6-10`; `hooks/useActiveSymptom.ts`; `hooks/useHorizontalScroll.ts`; `components/layout/Header.tsx`
- **Evidência:** não há script de teste nem arquivos de teste. A seção For Whom possui hover intent, seleção persistente, clique externo, teclado, wheel, pointer capture e supressão de clique; o menu possui estado, Escape, scroll lock e timelines.
- **Explicação:** a complexidade localizada dessas interações já ultrapassa o ponto em que validação exclusivamente manual é confiável. Não é necessário criar uma suíte extensa.
- **Impacto:** regressões pequenas de input, cleanup ou acessibilidade podem reaparecer sem aviso.
- **Correção recomendada:** adicionar poucos testes de comportamento de alto valor e um smoke E2E mobile/desktop. Evitar testar detalhes visuais internos do GSAP.
- **Exemplo de implementação:** testes para estado inicial/hover/clique/reset do hook; drag não gera clique; menu fechado não recebe foco; Escape fecha e restaura foco.
- **Risco da correção:** baixo, com custo inicial moderado de configuração.
- **Forma de validar:** testes verdes localmente e no CI, incluindo execução repetida sem flakiness.

### ALK-TEC-013 — Dependência transitiva PostCSS com vulnerabilidade moderada

- **Categoria:** Segurança e dependências
- **Gravidade:** Média
- **Arquivo ou rota:** `package.json:16`; `package-lock.json:5495-5498`
- **Evidência:** `npm audit` reportou GHSA-qx2v-qp2m-jg93 em `postcss < 8.5.10`; o lockfile contém `next/node_modules/postcss` 8.4.31. Total: 2 entradas moderadas relacionadas, nenhuma alta ou crítica.
- **Explicação:** o advisory trata de XSS ao serializar CSS com `</style>` não escapado. A aplicação atual não recebe nem serializa CSS fornecido por usuário, então a exposição prática observável é baixa. O fix sugerido automaticamente pelo npm aponta para downgrade incompatível e não deve ser aplicado cegamente.
- **Impacto:** risco baixo no uso atual, mas dívida de supply chain e bloqueio potencial em políticas de segurança.
- **Correção recomendada:** atualizar Next.js para uma versão estável compatível que carregue PostCSS corrigido, após consultar release notes e validar build. Não forçar override transitivo sem confirmar compatibilidade.
- **Exemplo de implementação:** atualização controlada em branch, reinstalação limpa e repetição de typecheck/lint/build/audit.
- **Risco da correção:** médio, por possível mudança de framework/toolchain.
- **Forma de validar:** `npm audit`, build de produção e smoke test completos após atualização.

### ALK-TEC-014 — Código, asset e dependência sem uso

- **Categoria:** Arquitetura, qualidade e manutenção
- **Gravidade:** Baixa
- **Arquivo ou rota:** `components/sections/for-whom/ForWhomContent.tsx`; `components/sections/for-whom/IlustrationContent.tsx`; `public/hero-physio.jpg`; `package.json:17`
- **Evidência:** não existem imports para os dois componentes alternativos nem referência ao JPG. `react-countup` está declarado, mas não é importado. Os componentes legados também instanciam estados independentes de `useActiveSymptom`, portanto não formariam uma interação sincronizada se fossem recombinados sem revisão.
- **Explicação:** artefatos mortos aumentam ambiguidade sobre a implementação oficial e carregam dependências desnecessárias no lockfile.
- **Impacto:** custo de manutenção e onboarding; impacto pequeno no bundle, pois módulos não importados tendem a não ser empacotados.
- **Correção recomendada:** confirmar que não há uso planejado imediato e remover em uma mudança separada e facilmente revisável.
- **Exemplo de implementação:** exclusão dos dois componentes/asset e remoção de `react-countup`, seguida de instalação pelo lockfile.
- **Risco da correção:** baixo, desde que não sejam protótipos deliberadamente preservados.
- **Forma de validar:** busca global, typecheck, lint e build.

### ALK-TEC-015 — Dados do cliente estão distribuídos entre muitos componentes

- **Categoria:** Arquitetura e manutenibilidade
- **Gravidade:** Baixa
- **Arquivo ou rota:** `app/layout.tsx`; `components/sections/about/about.data.ts`; `components/sections/hero/Indicators.tsx`; `components/sections/results/Results.tsx`; `components/layout/Footer.tsx`; `components/sections/contact/ContactCTA.tsx`
- **Evidência:** identidade, metadata, endereço, telefone, e-mail, credenciais e métricas ficam em arquivos diferentes, com telefone/e-mail duplicados.
- **Explicação:** para um template reutilizado por um desenvolvedor solo, essa distribuição aumenta o risco de entregar um cliente com dados de outro. Não justifica CMS nem camada genérica; uma configuração tipada é suficiente.
- **Impacto:** inconsistência e custo de personalização por cliente.
- **Correção recomendada:** centralizar apenas dados globais realmente compartilhados. Manter conteúdo específico de seção próximo da seção.
- **Exemplo de implementação:** `site.config.ts` para marca/contato/localização/SEO; dados clínicos e textos continuam em seus domínios.
- **Risco da correção:** baixo.
- **Forma de validar:** alterar dados fictícios em uma única fonte e conferir todas as ocorrências renderizadas.

### ALK-TEC-016 — Documentação operacional insuficiente

- **Categoria:** Qualidade e manutenção
- **Gravidade:** Baixa
- **Arquivo ou rota:** `README.md`
- **Evidência:** o README contém somente instruções genéricas para iniciar o servidor. Não informa versão de Node, ambiente WSL, comandos de qualidade, estrutura, placeholders obrigatórios ou checklist de publicação.
- **Explicação:** o conflito de plataforma encontrado e a quantidade de dados demonstrativos tornam a ausência de instruções operacionais um risco recorrente.
- **Impacto:** reinstalações inconsistentes e maior chance de publicar placeholders.
- **Correção recomendada:** documentar setup mínimo, ambiente oficial, validações e lista de dados que precisam ser substituídos. Evitar documentação extensa que rapidamente fique obsoleta.
- **Exemplo de implementação:** seções curtas “Requisitos”, “Desenvolvimento”, “Validação” e “Checklist por cliente”.
- **Risco da correção:** baixo.
- **Forma de validar:** uma instalação limpa seguindo apenas o README.

## 4. Melhorias por prioridade

### 1. Bloqueadores

1. **ALK-TEC-001:** impedir publicação de dados, credenciais, resultados e relatos não confirmados.
2. **ALK-TEC-002:** obter build e lint verdes em ambiente limpo e único antes de aprovar release.

### 2. Alta prioridade

1. **ALK-TEC-003:** retirar o menu mobile fechado da ordem de foco e completar o gerenciamento de foco.
2. **ALK-TEC-004:** eliminar RAF contínuo no modo de movimento reduzido.

### 3. Média prioridade

1. **ALK-TEC-005:** restaurar foco visível no FAQ.
2. **ALK-TEC-006:** corrigir contraste de textos pequenos.
3. **ALK-TEC-007:** completar SEO após confirmar domínio e dados reais.
4. **ALK-TEC-008:** deixar a imagem de About em lazy load e otimizar o original.
5. **ALK-TEC-009:** reduzir a fronteira cliente do Hero e remover a do logo.
6. **ALK-TEC-010:** alinhar semântica acessível, foco, preview e seleção do For Whom.
7. **ALK-TEC-011:** normalizar animação do canvas por delta time, condicionada a profiling.
8. **ALK-TEC-012:** cobrir interações críticas com poucos testes automatizados.
9. **ALK-TEC-013:** atualizar a cadeia Next/PostCSS de forma controlada.

### 4. Baixa prioridade

1. **ALK-TEC-014:** remover código, asset e dependência sem uso.
2. **ALK-TEC-015:** centralizar dados globais do cliente.
3. **ALK-TEC-016:** completar documentação operacional.

### 5. Melhorias opcionais

1. Medir Core Web Vitals reais em deploy de preview antes de otimizar além dos achados comprovados.
2. Adicionar imagem Open Graph autoral quando a identidade final estiver aprovada.
3. Avaliar atualização dinâmica de `prefers-reduced-motion` se o público-alvo justificar suporte a mudanças da preferência durante a sessão.
4. Considerar `not-found.tsx` autoral quando surgirem rotas públicas adicionais; não é prioridade para a landing page estática atual.

## 5. Arquivos mais críticos

1. **`hooks/useBackgroundCanvas.ts`** — maior arquivo lógico (396 linhas), loop por frame, resize, parallax, ruído, partículas e desenho concentrados no mesmo effect.
2. **`components/layout/Header.tsx`** — reúne ScrollTrigger, duas timelines, estado do menu, scroll lock, teclado e composição desktop/mobile.
3. **`components/sections/for-whom/ForWhom.tsx`** — coordena seleção, hover, clique externo, drag, wheel, animação, apresentação e semântica.
4. **`hooks/useActiveSymptom.ts`** — máquina de estados implícita da interação; pequenas mudanças afetam mouse, touch, foco e teclado.
5. **`hooks/useHorizontalScroll.ts`** — coordena eventos nativos e React, pointer capture e supressão de clique.
6. **`hooks/useBreathingAnimation.ts`** — RAF contínuo e escrita frequente de custom properties; contém o defeito de reduced motion.
7. **`components/sections/results/Results.tsx`** — concentra claims quantitativos que bloqueiam publicação sem comprovação.
8. **`components/layout/MobileHeader.tsx`** — contém o principal problema de navegação por teclado.
9. **`app/layout.tsx`** — ponto central de fontes, idioma e SEO global ainda incompleto.

## 6. Plano de correção

1. **Congelar a publicação e validar conteúdo:** obter dados reais, fontes de claims, autorizações e domínio; substituir ou remover tudo que não estiver comprovado.
2. **Normalizar o ambiente:** escolher WSL/Linux ou Windows, reinstalar pelo lockfile e registrar versão de Node. Não avançar com mudanças amplas até lint e build passarem.
3. **Criar uma linha de base:** salvar resultados de typecheck, lint, build, audit e um smoke test manual em mobile/desktop.
4. **Corrigir acessibilidade bloqueante:** menu mobile, RAF no reduced motion, foco do FAQ, contraste e semântica do For Whom. Validar teclado e leitor de tela a cada alteração.
5. **Corrigir performance comprovável:** remover prioridade da imagem About, otimizar o asset e reduzir fronteiras cliente. Medir antes/depois.
6. **Atualizar dependências com controle:** resolver o advisory do PostCSS por uma versão estável do Next, sem aceitar downgrade automático incompatível.
7. **Completar SEO com dados reais:** canonical, metadata social, robots, sitemap e schema validado.
8. **Adicionar testes mínimos:** cobrir menu e For Whom; integrar typecheck/lint/build/test ao CI.
9. **Limpar manutenção:** remover artefatos mortos, centralizar apenas dados globais e atualizar README.
10. **Executar revisão final:** Lighthouse/axe, teste em navegadores, dispositivo móvel intermediário, preview público e conferência de conteúdo pelo responsável.

## 7. Notas

| Área | Nota | Justificativa resumida |
|---|---:|---|
| Arquitetura | 7,5 | Estrutura simples e coesa; perde pontos por arquivos legados, dados globais dispersos e boundaries cliente evitáveis. |
| Qualidade do código | 7,4 | Código legível e cleanup cuidadoso; falta automação de testes e há complexidade concentrada em hooks de animação. |
| Next.js | 7,2 | App Router, fontes, metadata básica e Image corretos; SEO incompleto, Hero hidratado além do necessário e build não comprovado. |
| TypeScript | 8,4 | Strict ativo, sem `any`, tipos claros e typecheck aprovado; alguns tipos de domínio poderiam ser mais reutilizados sem urgência. |
| Performance | 6,7 | Pausa por viewport e DPR cap são bons; imagem prioritária abaixo da dobra, hidratação extra e loops/frame rate exigem correção e medição. |
| Acessibilidade | 6,1 | Semântica geral e reduced motion parcial são bons; menu invisível focável, foco do FAQ, contraste e estado do For Whom são relevantes. |
| SEO técnico | 5,5 | Title, description, idioma e headings existem; faltam os principais artefatos técnicos de publicação e dados reais. |
| Segurança | 6,5 | Superfície de ataque pequena e sem segredos/formulários; claims não verificáveis e advisory moderado impedem nota maior. |
| Animações | 7,0 | Direção visual, cleanup, GSAP context e pausa por viewport são bons; reduced motion e dependência de refresh rate precisam ajuste. |
| Manutenibilidade | 6,9 | Organização por seção é prática para solo dev; faltam testes, setup reproduzível, configuração global e documentação. |

**Média simples:** 6,9/10.

## 8. Veredito técnico

**Reprovado para produção no estado atual.**

A reprovação não significa que a base de engenharia seja ruim. O projeto está próximo de um nível tecnicamente sólido e possui boas decisões de arquitetura, TypeScript, composição e animação. O veredito decorre de dois bloqueadores objetivos: conteúdo clínico/comercial não comprovado apresentado como real e ausência de uma validação reproduzível de lint/build. As falhas de teclado e reduced motion também devem ser corrigidas antes da publicação.

Após resolver ALK-TEC-001 a ALK-TEC-004 e obter uma execução limpa das verificações, o projeto tende a evoluir para **Aprovado com ressalvas**. Os demais itens podem ser tratados em sequência, sem refatoração gigante e preservando a implementação atual.

Nenhuma correção de código foi realizada nesta etapa. O próximo passo depende de autorização explícita para iniciar o plano de correção.
