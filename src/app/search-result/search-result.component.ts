import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicDataService } from './../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy {

  results: any;
  searchQuery: string = "";
  paramSub: Subscription = new Subscription;

  constructor(private $route: ActivatedRoute, private musicService: MusicDataService) { }

  ngOnInit(): void {
    this.paramSub = this.$route.queryParams.subscribe(para => {
      this.searchQuery = para["q"];
      console.log(para["q"]);
    });
    this.musicService.searchArtists(this.searchQuery).subscribe(result => {
      this.results = result.artists.items.filter(item => item.images.length > 0);
    });
  }

  ngOnDestroy(): void {
    this.paramSub.unsubscribe();
  }

}
