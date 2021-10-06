import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-choose-img',
  templateUrl: './choose-img.component.html',
  styleUrls: ['./choose-img.component.css']
})
export class ChooseImgComponent implements OnInit {

  imgCrab = "./assets/imgUser/crabe.png"
  imgSquirrel = "./assets/imgUser/ecureuil.png"
  imgHedgehog = "./assets/imgUser/herisson.png"
  imgOwl = "./assets/imgUser/hibou.png"
  imgRabbit = "./assets/imgUser/lapin.png"
  imgAstonished = "./assets/imgUser/meduse.png"
  imgOctopus = "./assets/imgUser/poulpe.png"
  imgFox = "./assets/imgUser/renard.png"
  imgTurtle = "./assets/imgUser/tortue.png"

  constructor(private dialog: MatDialog,
              private usersService: UsersService) {
  }

  ngOnInit(): void {
  }

  /**
   * @param img
   *
   * Send the image choose by the user
   */
  chooseImg(img){
    this.usersService.imgChoose = img;
  }
}
