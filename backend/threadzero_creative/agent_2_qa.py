import os
from google import genai
from google.genai import types
from PIL import Image
from dotenv import load_dotenv

load_dotenv()

def run_qa_agent():
    print("🕵️‍♂️ ThreadZero QA Agent Initialized. Inspecting design...\n")
    
    file_path = "outputs/latest_design.png"
    
    if not os.path.exists(file_path):
        print(f"[ERROR] No design found at {file_path}. Please run Agent 1 first.")
        return

    design_image = Image.open(file_path)
    print(f"[SYSTEM] Image '{file_path}' loaded successfully. Sending to Gemini Vision...\n")

    client = genai.Client()

    prompt = """
    You are the Lead Quality Assurance (QA) Inspector for 'ThreadZero', a streetwear brand.
    Your job is to inspect the attached T-shirt design image before it goes to production.
    
    CRITICAL RULES:
    1. Look at the image carefully.
    2. If you see the text "Mock Design" or if it is just a plain dark box with text, it is a development test. You MUST set 'is_mock_detected' to true, and 'decision' to 'APPROVED_FOR_DEV'.
    3. If it is a real illustration (e.g., an elephant, graphic art), evaluate if it fits a streetwear style. If yes, decision is 'APPROVED_FOR_PRODUCTION'.
    4. Provide constructive feedback in Thai.
    """

    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=[design_image, prompt],
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=types.Schema(
                type=types.Type.OBJECT,
                properties={
                    "decision": types.Schema(
                        type=types.Type.STRING,
                        description="MUST be one of: APPROVED_FOR_PRODUCTION, APPROVED_FOR_DEV, or REJECTED"
                    ),
                    "is_mock_detected": types.Schema(
                        type=types.Type.BOOLEAN
                    ),
                    "feedback_th": types.Schema(
                        type=types.Type.STRING,
                        description="Detailed feedback in Thai language"
                    ),
                    "confidence_score": types.Schema(
                        type=types.Type.INTEGER,
                        description="Confidence in your decision from 1 to 100"
                    ),
                },
                required=["decision", "is_mock_detected", "feedback_th", "confidence_score"]
            ),
            temperature=0.1, # ปรับให้อนุมานน้อยลง เน้นความแม่นยำในการตรวจ
        ),
    )

    print("📋 QA Report Results (JSON):")
    print(response.text)

if __name__ == "__main__":
    run_qa_agent()