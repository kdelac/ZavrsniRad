import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { SignalRService } from './services/signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PrikazPozicije';

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  requestId;
  interval;
  squares: Square[] = [];
  x: Number;
  y: Number;
  z = 18;
  sirina: any;
  visina: any;
  velicinaBeacona: any;
  pozicijaBeacona2: any;
  pozicijaBeacona3: any;

  constructor(private ngZone: NgZone, public signalRService: SignalRService) { }

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addTransferChartDataListener();
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.fillStyle = 'red';
    this.sirina = this.canvas.nativeElement.width;
    this.visina = this.canvas.nativeElement.height
    this.play();
    this.ngZone.runOutsideAngular(() => this.tick());
    setInterval(() => {
      this.tick();
    }, 100);
  }

  tick() {
    const sirina = this.sirina/this.signalRService.width;
    const visina = this.visina/this.signalRService.height;

    this.x = this.signalRService.datax*sirina;
    this.y = this.signalRService.datay*visina;

    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.squares.forEach((square: Square) => {
      square.move(this.x,this.y);
    });
    this.drawBeacons();
    this.drawMap();
    this.requestId = requestAnimationFrame(() => this.tick);
    this.drawSignal(this.z);
    this.z += 2
    if(this.z == 40){
      this.z = 18
    }
  }

  play() {
    const square = new Square(this.ctx);
    this.squares = this.squares.concat(square);
  }


  drawBeacons(){
    this.velicinaBeacona = 5;
    this.pozicijaBeacona2 = this.sirina - this.velicinaBeacona
    this.pozicijaBeacona3 = this.visina - this.velicinaBeacona

    ///prvi beacon
    this.ctx.beginPath();
    this.ctx.fillStyle = 'black'
    this.ctx.arc(this.velicinaBeacona, this.velicinaBeacona, 2, 0, 2 * Math.PI);
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.fillStyle = 'black'
    this.ctx.arc(this.velicinaBeacona, this.velicinaBeacona, 5, 0, 2 * Math.PI);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.fillStyle = 'black'
    this.ctx.arc(this.velicinaBeacona, this.velicinaBeacona, 12, 0, 2 * Math.PI);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.fillStyle = 'black'
    this.ctx.arc(this.velicinaBeacona, this.velicinaBeacona, 18, 0, 2 * Math.PI);
    this.ctx.stroke();

    ///drugi beacon
    this.ctx.beginPath();
    this.ctx.fillStyle = 'black'
    this.ctx.arc(this.pozicijaBeacona2, this.velicinaBeacona, 2, 0, 2 * Math.PI);
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.fillStyle = 'black'
    this.ctx.arc(this.pozicijaBeacona2, this.velicinaBeacona, 5, 0, 2 * Math.PI);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.fillStyle = 'black'
    this.ctx.arc(this.pozicijaBeacona2, this.velicinaBeacona, 12, 0, 2 * Math.PI);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.fillStyle = 'black'
    this.ctx.arc(this.pozicijaBeacona3, this.velicinaBeacona, 18, 0, 2 * Math.PI);
    this.ctx.stroke();

    ///treci beacon
    this.ctx.beginPath();
    this.ctx.fillStyle = 'black'
    this.ctx.arc(this.velicinaBeacona, this.pozicijaBeacona3, 2, 0, 2 * Math.PI);
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.fillStyle = 'black'
    this.ctx.arc(this.velicinaBeacona,this.pozicijaBeacona3, 5, 0, 2 * Math.PI);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.fillStyle = 'black'
    this.ctx.arc(this.velicinaBeacona, this.pozicijaBeacona3, 12, 0, 2 * Math.PI);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.fillStyle = 'black'
    this.ctx.arc(this.velicinaBeacona, this.pozicijaBeacona3, 18, 0, 2 * Math.PI);
    this.ctx.stroke();
  }

  drawMap(){
    this.ctx.fillStyle = 'black';
    this.ctx.strokeRect(0, 0, this.sirina, this.visina);
  }

  private drawSignal(z: number){
    this.ctx.beginPath();
    this.ctx.fillStyle = 'black'
    this.ctx.arc(this.velicinaBeacona, this.velicinaBeacona, z, 0, 2 * Math.PI);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.fillStyle = 'black'
    this.ctx.arc(this.pozicijaBeacona2, this.velicinaBeacona, z, 0, 2 * Math.PI);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.fillStyle = 'black'
    this.ctx.arc(this.velicinaBeacona, this.pozicijaBeacona3, z, 0, 2 * Math.PI);
    this.ctx.stroke();

    if(z >= 50){
      this.ctx.beginPath();
      this.ctx.fillStyle = 'black'
      this.ctx.arc(this.velicinaBeacona, this.velicinaBeacona, z-30, 0, 2 * Math.PI);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.fillStyle = 'black'
      this.ctx.arc(this.pozicijaBeacona2, this.velicinaBeacona, z-30, 0, 2 * Math.PI);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.fillStyle = 'black'
      this.ctx.arc(this.velicinaBeacona, this.pozicijaBeacona3, z-30, 0, 2 * Math.PI);
      this.ctx.stroke();
    }

    if(z >= 80){
      this.ctx.beginPath();
      this.ctx.fillStyle = 'black'
      this.ctx.arc(this.velicinaBeacona, this.velicinaBeacona, z-60, 0, 2 * Math.PI);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.fillStyle = 'black'
      this.ctx.arc(this.pozicijaBeacona2, this.velicinaBeacona, z-60, 0, 2 * Math.PI);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.fillStyle = 'black'
      this.ctx.arc(this.velicinaBeacona, this.pozicijaBeacona3, z-60, 0, 2 * Math.PI);
      this.ctx.stroke();
    }

  }
}

export class Square {
  private color = 'red';
  private x = 0;
  private y = 0;
  private z = 20;

  constructor(private ctx: CanvasRenderingContext2D) {}

  move(x: any, y: any) {
    this.x = x;
    this.y = y;
    this.draw();
  }

  private draw() {
    this.ctx.fillStyle = this.color;

    const _image = new Image();

    _image.src = "https://static.thenounproject.com/png/8203-200.png";
    this.ctx.drawImage(_image, this.x, this.y, 20, 20);
  }

}
