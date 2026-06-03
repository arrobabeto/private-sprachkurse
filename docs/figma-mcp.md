# Figma MCP — Private Sprachkurse (Token-Based)

Connect Cursor to your Figma design file using a **personal access token** — no OAuth required.

Works alongside [Orbitype MCP](./orbitype-cms-mcp.md) for design-to-code-to-CMS workflows.

This project uses the community [`figma-developer-mcp`](https://www.npmjs.com/package/figma-developer-mcp) server (read/design context via Figma REST API). It does **not** support writing back to the Figma canvas; for that, use the [official Figma MCP](https://developers.figma.com/docs/figma-mcp-server/) with OAuth.

---

## Where to paste your credentials

### 1. Figma access token → `.env` + shell export

1. Open [Figma → Settings → Security → Personal access tokens](https://www.figma.com/settings)
2. Generate a token with at least: **Current user**, **File content**, **File metadata**
3. Copy the token (starts with `figd_`)

Add to your local [`.env`](../.env) (gitignored):

```bash
FIGMA_API_KEY="figd_your_token_here"
```

Export for Cursor MCP (reads `${env:FIGMA_API_KEY}` from your shell):

```bash
npm run mcp:env
```

Copy the `export FIGMA_API_KEY=...` line into `~/.zshrc`, then **restart Cursor**.

Do **not** paste the raw token into [`.cursor/mcp.json`](../.cursor/mcp.json) if you commit that file to git.

---

### 2. Figma file key → `.env`

The file key is the ID in your Figma URL:

```
https://www.figma.com/design/AbCdEf123456/Private-Sprachkurse?node-id=1-2
                              ^^^^^^^^^^^^
                              file key
```

Add to [`.env`](../.env):

```bash
FIGMA_FILE_KEY="AbCdEf123456"
```

This is **not** an auth credential — it identifies your Private Sprachkurse design file for prompts. Nuxt does not read it at runtime.

**Usage in chat:**

> Implement this frame: https://www.figma.com/design/YOUR_FILE_KEY/Private-Sprachkurse?node-id=1-2

Or:

> Read the homepage from FIGMA_FILE_KEY and suggest SectionProse JSON for Orbitype.

---

## MCP configuration

[`.cursor/mcp.json`](../.cursor/mcp.json):

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["-y", "figma-developer-mcp", "--stdio"],
      "env": {
        "FIGMA_API_KEY": "${env:FIGMA_API_KEY}"
      }
    }
  }
}
```

After editing, reload MCP in **Cursor Settings → MCP**.

---

## Verify

Check your token against the Figma REST API:

```bash
npm run figma:verify
```

Or manually:

```bash
curl -s -H "X-Figma-Token: $FIGMA_API_KEY" https://api.figma.com/v1/me
```

Should return your Figma user JSON.

---

## Quick start

1. Add `FIGMA_API_KEY` and `FIGMA_FILE_KEY` to `.env`
2. Run `npm run mcp:env` and add exports to `~/.zshrc`
3. Restart Cursor and confirm **figma** MCP server is connected
4. Prompt: _"Get design context for my Private Sprachkurse homepage frame"_
5. Implement `SectionX.vue` in `components/sections/`
6. Push content via Orbitype MCP ([orbitype-cms-mcp.md](./orbitype-cms-mcp.md))

---

## Figma + Orbitype workflow

1. **Figma MCP** — read design context (token)
2. **Code** — build `SectionX.vue`
3. **Orbitype MCP** — insert section JSON into `pages.sections`
4. **Browser** — preview at `http://localhost:3000/`

---

## Troubleshooting

| Problem                         | Fix                                                                 |
| ------------------------------- | ------------------------------------------------------------------- |
| Figma MCP not listed            | Restart Cursor after editing `mcp.json`                             |
| Unauthorized / 403              | Check `FIGMA_API_KEY` is exported in shell; rerun `npm run mcp:env` |
| Token works in curl but not MCP | Restart Cursor so MCP inherits `FIGMA_API_KEY`                      |
| Wrong design returned           | Verify `FIGMA_FILE_KEY` and `node-id` in the URL                    |
