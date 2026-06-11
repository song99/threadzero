import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export interface Campaign {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  raised: number;
  goal: number;
  tags: string[];
  carbon_credit_score?: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private http = inject(HttpClient);

  // Writable Signal for storing featured campaigns
  featuredCampaigns = signal<Campaign[]>([]);
  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.fetchFeaturedCampaigns();
  }

  fetchFeaturedCampaigns() {
    this.isLoading.set(true);
    // Fetch real data from FastAPI Backend
    this.http.get<Campaign[]>('https://threadzero-api-61994838041.asia-southeast1.run.app/api/campaigns-featured')
      .subscribe({
        next: (data) => this.featuredCampaigns.set(data),
        error: (err) => {
          console.error('Failed to load campaigns, using fallback mock.', err);
          // Fallback Data if Backend is not running
          this._setMockData();
        },
        complete: () => this.isLoading.set(false)
      });
  }

  private _setMockData() {
    this.featuredCampaigns.set([
      {
        id: 'c1',
        title: 'Eco-Flow Leaf Edition',
        description: '100% natural fiber clothing collection infused with eco-friendly dyeing technology',
        imageUrl: 'https://threadzero-api-61994838041.asia-southeast1.run.app/outputs/latest_design.png',
        raised: 45000,
        goal: 60000,
        tags: ['Organic Cotton', 'Verified Eco'],
        carbon_credit_score: 125
      }
    ]);
  }
}