import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  weatherDataList: any[] = [];
  city: string = '';

  constructor(private http: HttpClient) {}

  ionViewDidEnter() {
    this.getWeatherData('Jakarta'); // Tampilkan cuaca awal saat aplikasi dimuat
  }

  getWeatherData(city: string) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${environment.apiKey}&q=${city}`;
    this.http.get(url).subscribe((data: any) => {
      this.weatherDataList.push(data);
    });
  }

  addCity() {
    if (this.city && this.city.trim() !== '') {
      this.getWeatherData(this.city);
      this.city = ''; // Mengosongkan input setelah menambahkan kota
    }
  }

  getWeatherIconUrl(weatherData: any) {
    if (weatherData) {
      return `https:${weatherData.current.condition.icon}`;
    }
    return '';
  }
}
