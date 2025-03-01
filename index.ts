// src/index.ts
import axios, { AxiosInstance } from 'axios';
import * as dotenv from 'dotenv';

dotenv.config(); // Loads .env file

// Optional: Some interfaces for request/response
export interface CreateDatabaseOptions {
  dbName: string;
  account: string;
  userKey?: string; // If not provided, we'll fallback to ENV
}

export interface StoreEmbeddingOptions {
  dbName: string;
  account: string;
  title: string;
  content: string;
  userKey?: string;
}

export interface QueryEmbeddingsOptions {
  dbName: string;
  account: string;
  query: string;
  userKey?: string;
  limit?: number; // For hybrid or normal query
}

export interface GetEmbeddingsOptions {
  dbName: string;
  account: string;
  start: number;
  limit: number;
  userKey?: string;
}

export class VektarisClient {
  private http: AxiosInstance;
  private baseUrl: string;
  private defaultUserKey: string | undefined;
  private defaultDbName: string | undefined;
  private defaultAccount: string | undefined;

  constructor(baseUrl?: string, userKey?: string, dbName?: string, account?: string) {
    this.baseUrl = baseUrl || process.env.VEKTARIS_BASE_URL || 'http://localhost:3000';
    this.defaultUserKey = userKey || process.env.VEKTARIS_USER_KEY;
    this.defaultDbName = dbName || process.env.VEKTARIS_DB_NAME;
    this.defaultAccount = account || process.env.VEKTARIS_ACCOUNT;

    // Create axios instance
    this.http = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Create a new database (namespace) in Vektaris.
   */
  public async createDatabase(options?: CreateDatabaseOptions): Promise<any> {
    try {
      const userKey = options?.userKey || this.defaultUserKey;
      const dbName = options?.dbName || this.defaultDbName;
      const account = options?.account || this.defaultAccount;

      if (!userKey || !dbName || !account) {
        throw new Error('Missing required parameters to create a database.');
      }

      const response = await this.http.post('/createDatabase', {
        userKey,
        dbName,
        account,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(`createDatabase error: ${error.message}`);
    }
  }

  /**
   * Store a single embedding in Vektaris.
   * NOTE: Because ICP doesn't allow multiple threads in this context,
   * we store one item at a time.
   * This example also auto-truncates title/content if they're too long.
   */
  public async storeEmbedding(options: StoreEmbeddingOptions): Promise<any> {
    try {
      const userKey = options.userKey || this.defaultUserKey;
      const dbName = options.dbName || this.defaultDbName;
      const account = options.account || this.defaultAccount;

      if (!userKey || !dbName || !account) {
        throw new Error('Missing required parameters to store embedding.');
      }

      // Optional truncation improvements:
      const MAX_TITLE_LENGTH = 100;
      const MAX_CONTENT_LENGTH = 500;

      let { title, content } = options;
      if (title.length > MAX_TITLE_LENGTH) {
        title = title.substring(0, MAX_TITLE_LENGTH);
      }
      if (content.length > MAX_CONTENT_LENGTH) {
        content = content.substring(0, MAX_CONTENT_LENGTH);
      }

      const response = await this.http.post('/storeEmbedding', {
        userKey,
        dbName,
        account,
        title,
        content,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(`storeEmbedding error: ${error.message}`);
    }
  }

  /**
   * Run a semantic query against the embeddings in the DB.
   */
  public async queryEmbeddings(options: QueryEmbeddingsOptions): Promise<any> {
    try {
      const userKey = options.userKey || this.defaultUserKey;
      const dbName = options.dbName || this.defaultDbName;
      const account = options.account || this.defaultAccount;
      const query = options.query;
      if (!userKey || !dbName || !account || !query) {
        throw new Error('Missing required parameters to query embeddings.');
      }

      const response = await this.http.post('/queryEmbeddings', {
        userKey,
        dbName,
        account,
        query,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(`queryEmbeddings error: ${error.message}`);
    }
  }

  /**
   * Retrieve embeddings without running a query.
   * This is useful when you want to do your own LLM query logic.
   */
  public async getEmbeddings(options: GetEmbeddingsOptions): Promise<any> {
    try {
      const userKey = options.userKey || this.defaultUserKey;
      const dbName = options.dbName || this.defaultDbName;
      const account = options.account || this.defaultAccount;
      const start = options.start;
      const limit = options.limit;

      if (!userKey || !dbName || !account) {
        throw new Error('Missing required parameters to get embeddings.');
      }

      const response = await this.http.post('/getEmbeddings', {
        userKey,
        dbName,
        account,
        start,
        limit,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(`getEmbeddings error: ${error.message}`);
    }
  }

  /**
   * Hybrid Search: Combines text-based and semantic similarity search.
   */
  public async hybridSearch(options: QueryEmbeddingsOptions): Promise<any> {
    try {
      const userKey = options.userKey || this.defaultUserKey;
      const dbName = options.dbName || this.defaultDbName;
      const account = options.account || this.defaultAccount;
      const query = options.query;
      const limit = options.limit || 10;

      if (!userKey || !dbName || !account || !query) {
        throw new Error('Missing required parameters to run a hybrid search.');
      }

      const response = await this.http.post('/hybridSearch', {
        userKey,
        dbName,
        account,
        query,
        limit,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(`hybridSearch error: ${error.message}`);
    }
  }
}

// If you want to provide a default export that uses .env by default:
const defaultClient = new VektarisClient();
export default defaultClient;
