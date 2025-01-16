const tf = require('@tensorflow/tfjs-node');
const tokenizers = require('@tensorflow-models/universal-sentence-encoder');

class EmbeddingService {
    constructor() {
        this.model = null;
        this.initialize();
    }

    async initialize() {
        this.model = await tokenizers.load();
    }

    async generateEmbedding(text) {
        const embeddings = await this.model.embed(text);
        return Array.from(await embeddings.array());
    }
}

module.exports = new EmbeddingService();
