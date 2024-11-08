import { Component, OnInit } from '@angular/core';
import { heroDAO } from '../../../DAO/hero.DAO';
import { HeroModel } from '../../../Model/Views/Dynamic/HeroModel';
import { HeroService } from '../../../Service/hero.service';
import { PowerModel } from '../../../Model/Views/Dynamic/powerModel';
import { Router } from '@angular/router';
import { HeroDetails } from '../../../Model/Domain/hero-details';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponentHeroe implements OnInit {
  heroName: string = '';
  heroAge: number = 0;
  heroPower: string = '';
  heroFavourite: boolean = false;
  heroAlterEgo?: string = '';
  heroLastName?: string = '';

  constructor(
    private heroService: HeroService,
    public heroModel: HeroModel,
    private heroDao: heroDAO, // Si deseas usar el HeroDao
    public powerModel: PowerModel,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Cargar los poderes si es necesario
    this.powerModel.powers;
  }

  add(
    name: string,
    age: number,
    power: string,
    favourite: boolean,
    alterEgo?: string,
    lastName?: string
  ): void {
    name = name.trim();
    alterEgo = alterEgo?.trim() === '' ? undefined : alterEgo?.trim();
    lastName = lastName?.trim() === '' ? undefined : lastName?.trim();
    power = power.trim();

    // Validación de los campos obligatorios
    if (!name || !age || !power) {
      return; // No permitir la adición si faltan campos esenciales
    }

    // Crear el nuevo héroe
    this.heroDao.getHeroes().subscribe((heroes) => {
      const lastHero = heroes[heroes.length - 1];
      const newId = lastHero ? lastHero.id + 1 : 1;

      // Crear un objeto HeroDetails con los datos proporcionados
      const newHero: HeroDetails = {
        id: newId,
        name,
        age,
        power,
        favourite,
        lastName,
        alterEgo,
      };

      // Llamada al servicio para agregar el nuevo héroe
      this.heroService.addHero(newHero);

      // Redirigir a la lista de héroes
      this.goBack();
    });
  }

  goBack(): void {
    this.router.navigate(['/heroes']); // Volver a la lista de héroes
  }
}
