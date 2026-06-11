import os
from google import genai
from google.adk import Agent

os.makedirs("outputs", exist_ok=True)

def generate_tshirt_design(english_prompt: str) -> dict:
    """Generates an image using Google AI Studio Imagen 3 when GCP Quota is locked."""
    print(f"\n[SYSTEM] Calling AI Studio Imagen 3 with: '{english_prompt}'")
    
    try:
        client = genai.Client()
        
        result = client.models.generate_images(
            model='gemini-2.5-flash-image',
            prompt=english_prompt,
            config=dict(
                number_of_images=1,
                aspect_ratio="1:1",
                output_mime_type="image/png"
            )
        )
        
        file_path = "outputs/latest_design.png"
        for generated_image in result.generated_images:
            from PIL import Image
            import io
            image = Image.open(io.BytesIO(generated_image.image.image_bytes))
            image.save(file_path)
            
        return {
            "status": "success",
            "message": f"Real image generated via AI Studio and saved at {file_path}",
            "applied_prompt": english_prompt
        }
    except Exception as e:
        print(f"\n[ERROR] AI Studio Imagen failed: {e}")
        
        return generate_fallback_mock(english_prompt)

def generate_fallback_mock(english_prompt: str) -> dict:
    """กลไกสำรอง (Fallback) สร้างไฟล์ภาพจำลองขึ้นมาในเครื่อง เพื่อให้ Multi-Agent เดินหน้าต่อได้"""
    file_path = "outputs/latest_design.png"
    
    from PIL import Image, ImageDraw
    img = Image.new('RGB', (500, 500), color = '#1A1A1A')
    d = ImageDraw.Draw(img)
    d.text((50, 250), "ThreadZero Mock Design", fill=(255,255,255))
    img.save(file_path)
    
    return {
        "status": "fallback_activated",
        "message": f"เนื่องจากโควตาเต็ม ระบบเปิดระบบจำลองภาพอัตโนมัติ สร้างไฟล์ทดสอบแล้วที่ {file_path}",
        "applied_prompt": english_prompt
    }

root_agent = Agent(
    name="ThreadZero_Creative_Designer",
    model="gemini-2.5-flash",
    tools=[generate_tshirt_design],
    instruction="""
    You are the Lead Creative Designer for ThreadZero, a sustainable Thai streetwear brand.
    A user will give you a rough concept for a t-shirt in Thai. 
    
    YOUR WORKFLOW:
    1. Translate the user's Thai concept into a highly detailed English prompt.
    2. Call the 'generate_tshirt_design' tool.
    3. Reply to the user in friendly Thai, confirming if it's a real or fallback image.
    """
)