# PatchPoint 🛡️

Enterprise-grade Vulnerability Impact Mapper powered by Coral SQL.

## 🚀 Overview
PatchPoint is a unified security intelligence dashboard that joins fragmented data from GitHub (code), Linear (ownership), and Slack (context) into a single SQL-queryable layer.

## 🏗️ Architecture
- **Hybrid Data Engine**: Attempts to fetch real data from GitHub/Linear MCPs using Coral SDK, with a seamless high-fidelity fallback to mock data.
- **Agent Orchestration**: Visualizes the internal coordination between multiple specialized agents (Code Scanner, Ownership Resolver, Context Fetcher).
- **AI Action Intelligence**: Uses Groq (Llama-3) to synthesize vulnerability data into actionable remediation plans and Slack drafts.

## 🛠️ Setup Instructions

### 🚀 Zero-Config Demo
The frontend comes with a built-in **Smart Fallback**. If the backend is not running, it will automatically serve high-fidelity mock data.
```bash
npm install
npm run dev
```

### 🏗️ Production Setup (Hybrid Architecture)

#### 1. Backend (Python Flask)
The backend handles secure MCP communication and SQL execution.
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python app.py
```

#### 2. Frontend (Vite/React)
In a separate terminal:
```bash
npm install
npm run dev
```

### 🔌 Real MCP Connectivity
1. Configure `GITHUB_TOKEN` and `LINEAR_API_KEY` in `backend/.env`.
2. Set `USE_REAL_MCP=true` in `backend/.env`.
3. Restart the Python backend.
4. The frontend will automatically detect the "LIVE MCP" source and display real resolution data.

## 🛡️ Security
This tool follows the principle of least privilege. API tokens are only used for read-only access to dependency graphs and ticket ownership metadata.
