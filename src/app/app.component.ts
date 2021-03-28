import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private swPush: SwPush
  ) {
    this.swPush.requestSubscription({
      serverPublicKey: 'BBl5Vw0PCEM8nbonAjahMaBPAR3MEibrU-zwkXHd0vp_bL4w43ej_K41pLBWOIjCW_3TnotZvskdY_Xmg0Hde3I'
    })
    .then(subscription => {
      console.log('Usuário permitiu notificações.');
      this.http.post('http://localhost:9000/add-subscription', subscription)
        .subscribe();
    })
    .catch(err => {
      console.error('Usuário recusou ou Navegador não suporta', err);
    });
  }

  ngOnInit(): void {
    this.subscribeToNotificationClicks();
  }

  subscribeToNotificationClicks(): void {
    this.swPush.notificationClicks
      .subscribe(result => {
        alert('Usuário clicou na ação ' + result.action);
      });
  }
}
