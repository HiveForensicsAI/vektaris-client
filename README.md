# Hive Forensics AI - Vektaris API Client

[![Hive Forensics AI](https://www.hiveforensics.com/logo.png)](https://www.hiveforensics.com)

## 🚀 Introduction
Welcome to the **Hive Forensics AI** API client for interacting with **Vektaris**, our cutting-edge vector database built on the **ICP blockchain**. This npm package provides a simple and efficient way for developers to integrate our API into their applications.

**Vektaris** enables seamless storage, retrieval, and querying of vector embeddings, optimized for AI-driven applications. Our current beta phase is open for testers—[**sign up now**](https://www.hiveforensics.com) to gain early access!

## 🌐 Project Links
- 🌎 **Hive Forensics AI**: [https://www.hiveforensics.com](https://www.hiveforensics.com)
- 🔬 **Vektaris (Vector DB Engine)**: [https://www.vektaris.com](https://www.vektaris.com)
- 🛠 **Developed by**: [Samuel Paniagua](https://www.theseus.dev)

---

## 📦 Installation
To install the Vektaris API client, run the following command:
```bash
npm install vektaris-client
```

Alternatively, if cloning from our repository:
```bash
git clone https://github.com/hiveforensics/vektaris-client.git
cd vektaris-client
npm install
npm run build
```

---

## ⚙️ Configuration
Before using the package, create a `.env` file to store your API credentials:

```env
VEKTARIS_BASE_URL=https://api.vektaris.com
VEKTARIS_USER_KEY=your-api-key-here
VEKTARIS_DB_NAME=your-database-name
VEKTARIS_ACCOUNT=your-email@example.com
```

Ensure you replace the placeholders with your **actual credentials** after signing up.

---

## 🔥 Features
✅ **Create Databases (Namespaces)**  
✅ **Store Vector Embeddings** *(one at a time due to ICP constraints)*  
✅ **Run Semantic Queries**  
✅ **Retrieve Stored Embeddings** *(for external LLMs or AI models)*  
✅ **Perform Hybrid Search** *(text-based & semantic similarity combined)*  

---

## 📖 Usage Guide

### 1️⃣ Import & Initialize Client
```javascript
import VektarisClient from 'vektaris-client';

const client = new VektarisClient(); // Uses .env values by default
```

### 2️⃣ Create a New Database
```javascript
await client.createDatabase({
  dbName: 'MyVectorDB',
  account: 'user@example.com',
});
```

### 3️⃣ Store an Embedding
```javascript
await client.storeEmbedding({
  dbName: 'MyVectorDB',
  account: 'user@example.com',
  title: 'AI-driven cybersecurity solutions',
  content: 'This document discusses AI models for cyber threat detection...'
});
```

### 4️⃣ Query Embeddings
```javascript
const results = await client.queryEmbeddings({
  dbName: 'MyVectorDB',
  account: 'user@example.com',
  query: 'cybersecurity threats'
});
console.log(results);
```

### 5️⃣ Retrieve All Embeddings (No Query)
```javascript
const embeddings = await client.getEmbeddings({
  dbName: 'MyVectorDB',
  account: 'user@example.com',
  start: 0,
  limit: 100
});
console.log(embeddings);
```

### 6️⃣ Hybrid Search
```javascript
const hybridResults = await client.hybridSearch({
  dbName: 'MyVectorDB',
  account: 'user@example.com',
  query: 'AI in security',
  limit: 10
});
console.log(hybridResults);
```

---

## 🚧 Beta Testing & Feedback
We are currently in our **beta phase**, and we value your feedback! If you encounter any issues or have feature suggestions, please visit our website and contact us.  

🔗 **Sign up for early access**: [https://www.vektaris.com](https://www.vektaris.com)

---

## 💡 Future Enhancements
- 🔄 **Batch Upload Support** *(Store multiple embeddings in sequence)*
- 🛡️ **Security Enhancements** *(Encryption for stored embeddings)*
- 📊 **Advanced Analytics Dashboard** *(Monitor vector similarity trends)*

---

## 📜 License
This project is licensed under the **MIT License**.

---

## 👨‍💻 Developed By
👤 **Samuel Paniagua**  
🌐 [Portfolio](https://www.theeseus.dev)  
🐦 [Twitter](https://twitter.com/theeseus_ai)  

---

⭐ **If you find this package useful, consider giving it a star on GitHub!**

