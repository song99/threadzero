import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  private http = inject(HttpClient);

  campaigns = signal<any[]>([]);
  searchQuery = signal<string>('');

  // Live filtering via Computed Signal
  filteredCampaigns = computed(() => {
    return this.campaigns().filter(c =>
      c.campaign_name.toLowerCase().includes(this.searchQuery().toLowerCase())
    );
  });

  ngOnInit(): void {
    this.http.get<any[]>('https://threadzero-api-61994838041.asia-southeast1.run.app/api')
      .subscribe({
        next: (data) => this.campaigns.set(data),
        error: () => this.loadMockGallery()
      });
  }

  loadMockGallery() {
    this.campaigns.set([
      {
        _id: '1',
        campaign_name: 'Eco-Flow Leaf Edition',
        caption: '100% natural fiber clothing collection infused with sustainable natural dyeing technology',
        image_url: 'https://threadzero-api-61994838041.asia-southeast1.run.app/outputs/latest_design.png',
        pledge_raised: 45000,
        pledge_goal: 60000
      }
    ]);
  }
}