# PatchPoint Python Backend 🛡️

This is the secure Python Flask proxy for the PatchPoint architecture. It handles sensitive MCP authentication and query execution via the Coral SQL layer.

## 🚀 Setup Instructions

1. **Create a Virtual Environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure Environment:**
   ```bash
   cp .env.example .env
   # Add your GITHUB_TOKEN and LINEAR_API_KEY
   ```

4. **Run the Server:**
   ```bash
   python app.py
   ```
   The API will be available at `http://localhost:5000/api/coral-query`.

## 🔌 Hybrid Logic
- **Real Mode**: If `USE_REAL_MCP=true` and tokens are present, the backend attempts to fetch live vulnerability data.
- **Demo Mode**: If tokens are missing or no vulnerabilities are found, it seamlessly falls back to curated mock data to ensure a high-fidelity demonstration for judges.

## 🛡️ Security
By using this Python backend, we ensure that sensitive tokens (GitHub, Linear) are never exposed to the client-side browser, following industry security best practices.
