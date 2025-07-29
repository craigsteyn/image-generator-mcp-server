# image-generator MCP Server

An mcp server that generates images based on image prompts

This is a TypeScript-based MCP server that implements image generation using **OpenAI**'s `dall-e-3` image generation model. It supports both regular OpenAI and Azure OpenAI endpoints.

## Features

### Tools
- `generate_image` - Generate an image for given prompt
  - Takes `prompt` as a required parameter
  - Takes `imageName` as a required parameter to save the generated image in a `generated-images` directory on your desktop

## Development

Install dependencies:
```bash
npm install
```

Build the server:
```bash
npm run build
```

For development with auto-rebuild:
```bash
npm run watch
```

## Installation

To use with Claude Desktop, add the server config:

On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

### For regular OpenAI:
```json
{
  "mcpServers": {
    "image-generator": {
      "command": "image-generator",
      "env": {
        "OPENAI_API_KEY": "<your-openai-api-key>"
      }
    }
  }
}
```

### For Azure OpenAI:
```json
{
  "mcpServers": {
    "image-generator": {
      "command": "image-generator",
      "env": {
        "AZURE_OPENAI_API_KEY": "<your-azure-openai-api-key>",
        "AZURE_OPENAI_BASE_URL": "<your-azure-openai-endpoint>",
        "AZURE_OPENAI_API_VERSION": "2024-02-01"
      }
    }
  }
}
```

### Using npx (for regular OpenAI):
```json
{
  "mcpServers": {
    "image-generator": {
      "command": "npx",
      "args": ["image-generator-mcp"],
      "env": {
        "OPENAI_API_KEY": "<your-openai-api-key>"
      }
    }
  }
}
```

### Using npx (for Azure OpenAI):
```json
{
  "mcpServers": {
    "image-generator": {
      "command": "npx",
      "args": ["image-generator-mcp"],
      "env": {
        "AZURE_OPENAI_API_KEY": "<your-azure-openai-api-key>",
        "AZURE_OPENAI_BASE_URL": "<your-azure-openai-endpoint>",
        "AZURE_OPENAI_API_VERSION": "2024-02-01"
      }
    }
  }
}
```

**Environment Variables:**
- `OPENAI_API_KEY`: Your OpenAI API key (for regular OpenAI)
- `AZURE_OPENAI_API_KEY`: Your Azure OpenAI API key
- `AZURE_OPENAI_BASE_URL`: Your Azure OpenAI endpoint (e.g., `https://your-resource.openai.azure.com`)
- `AZURE_OPENAI_API_VERSION`: The Azure OpenAI API version (e.g., `2024-02-01`)

**Note:** If Azure environment variables are provided, the server will use Azure OpenAI. Otherwise, it will use regular OpenAI with the `OPENAI_API_KEY`.

### Debugging

Since MCP servers communicate over stdio, debugging can be challenging. We recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), which is available as a package script:

```bash
npm run inspector
```

The Inspector will provide a URL to access debugging tools in your browser.
