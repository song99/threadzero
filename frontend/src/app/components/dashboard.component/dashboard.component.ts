import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // Signals for storing sustainability platform stats
  carbonCredits = signal<number>(450);
  totalRaised = signal<number>(150000);
  backers = signal<number>(320);
  activeCampaigns = signal<number>(8);

  activities = signal([
    { type: 'pledge', text: 'Mr. A backed your Eco-Flow campaign', time: '2 mins ago' },
    { type: 'vote', text: '15 people voted for your design', time: '1 hour ago' },
    { type: 'qa', text: 'AI successfully reviewed the Urban Green design', time: '3 hours ago' }
  ]);
}