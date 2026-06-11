import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-campaign',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);

  // --- Signals for deep campaign state management ---
  campaignId = signal<string | null>(null);
  campaignData = signal<any | null>(null);
  isLoading = signal<boolean>(false);

  // Thumbnail Switcher
  selectedImageIndex = signal<number>(0);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.campaignId.set(id);
    this.loadCampaignDetail();
  }

  loadCampaignDetail() {
    this.isLoading.set(true);
    this.http.get(`https://threadzero-api-61994838041.asia-southeast1.run.app/api/campaign/${this.campaignId()}`)
      .subscribe({
        next: (res: any) => this.campaignData.set(res.data),
        error: (err) => {
          console.log('Using static mockup layout tailored to screen_2.jpg');
          this._setMockDetail();
        },
        complete: () => this.isLoading.set(false)
      });
  }

  private _setMockDetail() {
    this.campaignData.set({
      title: 'Eco-Flow Leaf Edition',
      creator: 'ThaiEco Design',
      category: 'Fashion',
      location: 'Chiang Mai',
      raisedAmount: 45000,
      targetAmount: 60000,
      backersCount: 60,
      daysLeft: 12,
      pricePerUnit: 750,
      carbonCredits: 15,
      images: [
        'https://threadzero-api-61994838041.asia-southeast1.run.app/outputs/latest_design.png' // Generated or uploaded main image
      ],
      story: 'The "Eco-Flow Leaf Edition" collection is born from a passion for nature and a commitment to reducing the fashion industry\'s environmental impact. We use 100% organic cotton grown without harmful chemicals, combined with a natural dyeing technology that uses up to 70% less water.'
    });
  }
}