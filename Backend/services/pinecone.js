const { PineconeClient } = require('@pinecone-database/pinecone');

class PineconeService {
    constructor() {
        this.client = new PineconeClient();
        this.initialize();
    }

    async initialize() {
        await this.client.init({
            environment: process.env.PINECONE_ENVIRONMENT,
            apiKey: process.env.PINECONE_API_KEY
        });
        this.index = this.client.Index(process.env.PINECONE_INDEX_NAME);
    }

    async storeEmbedding(id, vector, metadata) {
        await this.index.upsert([{
            id,
            values: vector,
            metadata
        }]);
    }

    async queryEmbeddings(vector, topK = 5) {
        const queryResponse = await this.index.query({
            vector,
            topK,
            includeMetadata: true
        });
        return queryResponse.matches;
    }
}

module.exports = new PineconeService();