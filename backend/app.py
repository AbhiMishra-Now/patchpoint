import os
import json
import time
import random
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
# import requests # For calling Coral CLI or API if needed

load_dotenv()

app = Flask(__name__)
CORS(app)

# --- CONFIGURATION ---
USE_REAL_MCP = os.getenv('USE_REAL_MCP', 'false').lower() == 'true'
GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')
LINEAR_API_KEY = os.getenv('LINEAR_API_KEY')

# --- MOCK DATA GENERATOR (For Demo Stability) ---
def generate_mock_response(query):
    """Generates realistic mock data for the demo."""
    package_name = query.split()[-1] if query else "log4j"
    
    return {
        "source": "CURATED_SIMULATION",
        "latency_ms": random.randint(300, 600),
        "api_calls_saved": 14,
        "cache_hit": True,
        "logs": [
            "[Engine] Parsing Natural Language Query...",
            "[Engine] Generating Unified SQL Schema...",
            "[Engine] Executing Cross-Source JOIN (GitHub ↔ Linear)...",
            "[Engine] Injecting Curated Incident Data for Demo...",
            "[Engine] Resolution Complete."
        ],
        "schema_mapping_log": [
            "Resolving MCP Schemas: github_deps, linear_tickets...",
            "Executing Cross-Source JOIN on repo_id and service_key...",
            "Result Resolved via Curated Simulation Engine"
        ],
        "sql": f"SELECT gh.repo, lin.owner FROM github_deps gh JOIN linear_tickets lin ON gh.id = lin.repo_id WHERE gh.package LIKE '%{package_name}%'",
        "results": [
            {
                "repo": "auth-service",
                "package": f"{package_name}-core",
                "version": "2.14.1",
                "owner": "Alice Chen",
                "slack": "#eng-auth-oncall",
                "risk": 9.8,
                "sla": "Tier-1",
                "linear_ticket": "LIN-402"
            },
            {
                "repo": "payment-gateway",
                "package": "lodash",
                "version": "4.17.19",
                "owner": "Bob Smith",
                "slack": "#eng-backend",
                "risk": 7.2,
                "sla": "Tier-2",
                "linear_ticket": "LIN-399"
            }
        ],
        "slack_draft": f"@Alice Chen ⚠️ Critical CVE in auth-service. Risk: 9.8. Please triage LIN-402."
    }

# --- MCP LOGIC  
def fetch_real_data(query):
    """
    Connects to real MCPs via Coral SDK or CLI.
    NOTE: Replace this with actual Coral SDK calls when available.
    """
    try:
        # Example: Call Coral CLI or API
        # result = subprocess.run(['coral', 'query', query], capture_output=True, text=True)
        # data = json.loads(result.stdout)
        
        # For now, we simulate a real connection check
        if GITHUB_TOKEN and LINEAR_API_KEY:
            return {
                "source": "REAL_MCP",
                "logs": ["[Backend] Connected to GitHub MCP", "[Backend] Connected to Linear MCP"],
                # In production, this would be real data from Coral
                "results": [] 
            }
        else:
            raise Exception("API Keys Missing")
            
    except Exception as e:
        print(f"Real MCP Error: {e}")
        return None

@app.route('/api/coral-query', methods=['POST'])
def coral_query():
    start_time = time.time()
    try:
        data = request.json
        query = data.get('query', '')

        # 1. ATTEMPT REAL CONNECTION
        if USE_REAL_MCP:
            real_data = fetch_real_data(query)
            if real_data and real_data.get('results'):
                real_data['latency_ms'] = int((time.time() - start_time) * 1000)
                return jsonify(real_data)

        # 2. FALLBACK TO BACKEND MOCKS (If Real Fails or Disabled)
        response = generate_mock_response(query)
        response['latency_ms'] = int((time.time() - start_time) * 1000)
        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e), "source": "ERROR"}), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
