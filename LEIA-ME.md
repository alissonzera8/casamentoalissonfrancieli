# Convite de Casamento — Alisson & Francieli

Site pronto para editar e publicar. Abaixo estão instruções simples para cada ajuste.

## Estrutura de arquivos

```
/index.html      → estrutura e textos do site
/style.css        → cores, fontes e visual
/script.js         → contagem regressiva, menu, galeria, formulário, música
/images/            → todas as fotos e o QR Code (substitua pelas suas)
/LEIA-ME.md        → este arquivo
```

## 1. Alterar nomes, data, horário e textos

Abra o `index.html` em qualquer editor de texto (Bloco de Notas, VS Code, etc.).
Os textos estão escritos diretamente no HTML — procure (Ctrl+F) por:

- `Alisson` e `Francieli` — nomes dos noivos (aparecem várias vezes)
- `19 de Dezembro de 2026` e `17h` — data e horário
- Textos da seção "Nossa História", da "Mensagem Especial" e do rodapé —
  estão em português simples, prontos para editar diretamente

A data usada na **contagem regressiva em tempo real** é controlada separadamente
no arquivo `script.js`, na linha:

```js
const WEDDING_DATE = new Date('2026-12-19T17:00:00');
```

Altere para a data e hora corretas no formato `AAAA-MM-DDTHH:MM:SS`.

## 2. Colocar suas fotos

Dentro da pasta `/images` você vai encontrar estas imagens de exemplo (placeholders):

- `hero-casal.jpg` → foto principal, tela inicial (funciona melhor na vertical)
- `galeria-1.jpg` até `galeria-11.jpg` → galeria de fotos
- `monograma.jpg` → ícone que aparece na aba do navegador (favicon)

**Basta substituir cada arquivo pela sua foto, mantendo exatamente o mesmo nome.**
Assim você não precisa mexer no código. Se preferir usar nomes diferentes,
lembre de também alterar o `src="images/..."` correspondente no `index.html`.

Para adicionar mais fotos na galeria, copie um bloco como este dentro da
seção `<div class="gallery-grid">` e ajuste o número da imagem:

```html
<button class="gallery-item" data-full="images/galeria-12.jpg">
  <img src="images/galeria-12.jpg" alt="Foto do casal 12" loading="lazy">
</button>
```

## 3. Alterar a localização e o mapa

No `index.html`, procure por `ENDEREÇO DO EVENTO` e `LINK DO GOOGLE MAPS`.
Há dois pontos a atualizar:

1. **Texto do endereço**, exibido na página — edite diretamente.
2. **Link "Como Chegar"** e **mapa incorporado** — para gerar os seus:
   - Abra [Google Maps](https://maps.google.com), busque o endereço do evento
   - Clique em "Compartilhar" → copie o link e cole no lugar do `href`
     dos botões "Como Chegar" / "Abrir no Google Maps"
   - Para o mapa incorporado, clique em "Compartilhar" → "Incorporar um mapa"
     → copie a URL que aparece dentro de `src="..."` e cole no lugar do
     `src` do `<iframe>` na seção "Onde Será?"

## 4. Configurar o formulário de confirmação de presença

O formulário já está pronto, faltando apenas conectar a um serviço gratuito
para receber as respostas por e-mail ou planilha. Recomendamos o **Formspree**:

1. Crie uma conta gratuita em https://formspree.io
2. Crie um novo formulário e copie a URL de "endpoint" (algo como
   `https://formspree.io/f/xxxxxxx`)
3. No `index.html`, procure por:
   ```html
   <form id="rsvp-form" class="rsvp-form" action="https://formspree.io/f/SEU_CODIGO_AQUI" method="POST" novalidate>
   ```
   e substitua `SEU_CODIGO_AQUI` pelo código do seu formulário
4. Pronto — as respostas passam a chegar no seu e-mail cadastrado no Formspree

Alternativa: usar o **Google Forms**. Nesse caso, crie um formulário com os
mesmos campos (nome, telefone, acompanhantes, nomes dos acompanhantes,
confirmação) e ajuste a função `handleRSVP` no `script.js` para enviar os
dados ao endpoint do Google Forms (ou apenas redirecionar o convidado até ele).

Enquanto isso não for configurado, o site funciona em "modo demonstração":
mostra a mensagem de agradecimento normalmente, mas as respostas não são
enviadas a lugar nenhum.

## 5. Música de fundo (opcional)

A música vem **desativada por padrão** — o visitante ativa manualmente pelo
botão com o ícone de nota musical, no canto inferior esquerdo.

Para adicionar uma música:
1. Crie uma pasta `/audio` ao lado de `/images`
2. Coloque um arquivo chamado `musica.mp3` dentro dela
3. Pronto — o botão passará a tocar/pausar essa música

Se nenhum arquivo for adicionado, o botão simplesmente não reproduz nada
(sem gerar erros visíveis para o visitante).

## 6. Como publicar o site gratuitamente

A forma mais simples é usar o **Netlify Drop** (não exige conta):

1. Acesse https://app.netlify.com/drop
2. Arraste a pasta inteira do projeto (com `index.html`, `style.css`,
   `script.js` e `images`) para a área indicada
3. Em segundos você recebe um link público (algo como
   `https://seunome.netlify.app`) para compartilhar com os convidados

Outras opções gratuitas igualmente simples:

- **GitHub Pages**: suba os arquivos para um repositório no GitHub e ative
  o "GitHub Pages" nas configurações do repositório
- **Vercel**: crie uma conta gratuita em https://vercel.com e importe a
  pasta do projeto

Em qualquer uma delas, não é necessário nenhum servidor ou configuração
extra — o site é só HTML, CSS e JavaScript.

---

Qualquer ajuste extra de cores, textos ou seções pode ser feito diretamente
nos arquivos `style.css` (visual) e `index.html` (conteúdo). Bom casamento! ❤️
