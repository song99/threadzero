# ใช้ Python 3.11 ที่เข้ากันได้ดีกับสถาปัตยกรรม ADK
FROM python:3.11-slim

WORKDIR /app

# คัดลอกไฟล์ requirements และติดตั้ง Library
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# คัดลอกโค้ดและโฟลเดอร์ทั้งหมด (รวมถึงโฟลเดอร์ outputs) ลงใน Container
COPY . .

# สั่งให้แอปพลิเคชันรันบนพอร์ตที่กำหนดโดยตัวแปรสภาพแวดล้อม PORT (พอร์ตมาตรฐานของ Google Cloud Run คือ 8080)
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8080}"]