# 🧪 Testes Frontend com React, Vitest e Cypress

Este guia explica como configurar um ambiente de **testes unitários, de integração e E2E** em um projeto **React + Vite** utilizando **Vitest**, **Testing Library** e **Cypress**.

---

## 📦 Instalação das dependências (Vitest)

```bash
npm install @testing-library/jest-dom \
@testing-library/react \
@testing-library/user-event \
@vitest/coverage-v8 \
jsdom \
vitest \
path \
@types/testing-library__jest-dom -D
```

---

## ⚙️ Configuração do Vitest

### Criar o arquivo `vitest.config.ts` na raiz do projeto

```ts
/// <reference types="vitest"/>

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "./src") }],
  },
});
```

---

### Criar o arquivo `vitest-env.d.ts` dentro da pasta `src`

```ts
/// <reference types="vitest/globals" />
```

---

### Criar o arquivo `setupTests.ts` dentro da pasta `src`

```ts
import "@testing-library/jest-dom";
```

---

## 📜 Scripts no `package.json`

```json
{
  "scripts": {
    "test": "vitest",
    "test:coverage": "vitest run --coverage",
    "cypress:open": "cypress open"
  }
}
```

---

## 🧩 Exemplo de teste unitário

### Componente

```ts
function App() {
  return (
    <div>
      <h1>Hello World</h1>
      <h1>Seja bem-vindo</h1>
    </div>
  );
}

export default App;
```

### Teste

```ts
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Testa o componente App", () => {
  test("Devem existir dois títulos na página", async () => {
    render(<App />);
    const titles = await screen.findAllByRole("heading");
    expect(titles).toHaveLength(2);
  });
});
```

---

# 🚀 Testes E2E com Cypress

## Instalação

```bash
npm install cypress -D
```

## Inicialização

```bash
npx cypress open
```

## Configuração `cypress.config.ts`

```ts
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
  },
});
```

## Exemplo de teste E2E

```ts
describe("Página inicial", () => {
  it("Deve exibir os títulos", () => {
    cy.visit("/");
    cy.contains("Hello World").should("be.visible");
  });
});
```

---

## ▶️ Executando os testes

```bash
npm run test
npm run test:coverage
npm run cypress:open
```
