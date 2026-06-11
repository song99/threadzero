import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AgentService {

  private http = inject(HttpClient);
  private apiUrl = 'https://threadzero-api-61994838041.asia-southeast1.run.app';

  // สั่ง AI เจนภาพ
  generateDesign(prompt: string) {
    return this.http.post(`${this.apiUrl}/ai-generate`, { prompt });
  }

  // ส่งผล QA ไปบันทึกลง MongoDB (ผ่าน Agent 3)
  finalizeCampaign(payload: any) {
    return this.http.post(`${this.apiUrl}/finalize-campaign`, payload);
  }

}
