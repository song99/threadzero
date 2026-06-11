import os
import asyncio
import json
from dotenv import load_dotenv
from google import genai
from google.genai import types
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

load_dotenv()

async def run_mcp_manager_agent():
    print("🗄️ ThreadZero Manager (MCP Edition) Initialized...\n")
    
    design_url = "outputs/latest_design.png"
    qa_report_json = '{"decision": "APPROVED_FOR_DEV", "is_mock_detected": true}'

    server_params = StdioServerParameters(
        command="npx",
        args=["-y", "mongodb-mcp-server"],
        env={
            **os.environ,
            "MDB_MCP_CONNECTION_STRING": "mongodb://localhost:27017"
        }
    )

    print("[SYSTEM] Connecting to MongoDB MCP Server...")
    
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            print("[SYSTEM] MCP Connection Established!")

            client = genai.Client()
            
            instruction = """
            คุณคือผู้จัดการแคมเปญและการตลาดของ ThreadZero
            1. คิดชื่อแคมเปญและแคปชั่นภาษาไทย
            2. จัดรูปแบบเป็น JSON
            3. บังคับให้มี "target_frontend": "Angular 19"
            """
            
            prompt = f"Design URL: {design_url}\nQA Report: {qa_report_json}\n\nเมื่อคิดเสร็จแล้ว ให้นำ JSON ไปใส่ในเครื่องมือ insert เพื่อบันทึกข้อมูล"

            print("\n[SYSTEM] Agent is thinking and executing via MCP...")
            
            response = client.models.generate_content(
                model='gemini-2.5-flash',
                contents=prompt,
                config=types.GenerateContentConfig(
                    system_instruction=instruction,
                    response_mime_type="application/json",
                    response_schema=types.Schema(
                        type=types.Type.OBJECT,
                        properties={
                            "campaign_name": types.Schema(type=types.Type.STRING),
                            "caption": types.Schema(type=types.Type.STRING),
                            "image_url": types.Schema(type=types.Type.STRING),
                            "target_frontend": types.Schema(type=types.Type.STRING),
                        },
                        required=["campaign_name", "caption", "image_url", "target_frontend"]
                    ),
                ),
            )
            
            print("🚀 Payload Prepared:")
            print(response.text)

            print("\n[SYSTEM] Calling MCP Tool: insert-many...")
            result = await session.call_tool(
                "insert-many", 
                arguments={
                    "database": "threadzero", 
                    "collection": "campaigns", 
                    "documents": [json.loads(response.text)]
                }
            )
            
            print(f"✅ MCP Execution Result: {result}")
            
            await asyncio.sleep(0.5)

if __name__ == "__main__":
    try:
        asyncio.run(run_mcp_manager_agent())
    except BaseException:
        pass