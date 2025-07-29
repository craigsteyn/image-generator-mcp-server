import OpenAI, { AzureOpenAI, ClientOptions, AzureClientOptions } from "openai";
import { ImageGenerateParams } from "openai/resources/images.mjs";

const IMAGE_MODEL = "dall-e-3";

export interface OpenAIConfig {
    apiKey: string;
    baseURL?: string;
    apiVersion?: string;
}

export class ImageGenerator {
    private openai: OpenAI;
    
    constructor(config?: OpenAIConfig) {
        // Use provided config or fall back to environment variables
        const apiKey = config?.apiKey || process.env.OPENAI_API_KEY || process.env.AZURE_OPENAI_API_KEY;
        const baseURL = config?.baseURL || process.env.AZURE_OPENAI_BASE_URL;
        const apiVersion = config?.apiVersion || process.env.AZURE_OPENAI_API_VERSION;

        if (!apiKey) {
            throw new Error("API key is required. Please provide OPENAI_API_KEY or AZURE_OPENAI_API_KEY environment variable.");
        }

        // Use AzureOpenAI client when Azure configuration is detected
        if (baseURL || process.env.AZURE_OPENAI_API_KEY) {
            const azureConfig: AzureClientOptions = {
                apiKey,
                endpoint: baseURL,
                apiVersion
            };
            this.openai = new AzureOpenAI(azureConfig);
        } else {
            // Use regular OpenAI client for standard OpenAI API
            const openaiConfig: ClientOptions = { apiKey };
            this.openai = new OpenAI(openaiConfig);
        }
    }

    async generateImage(prompt: string, size: ImageGenerateParams['size'] = "1024x1024") {
        const response = await this.openai.images.generate({
            model: IMAGE_MODEL,
            prompt,
            size,
            response_format: 'b64_json'
        });
        return response.data[0].b64_json;
    }
}