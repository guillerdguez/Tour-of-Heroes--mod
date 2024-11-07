import { MenuItem, MessageService } from 'primeng/api';
import { PersonaConPoderes } from './personaConPoderes';
import { Router } from '@angular/router';
import { HeroService } from '../../Service/hero.service';
import { HeroModel } from '../Views/Dynamic/HeroModel';
import { HeroDetailComponent } from '../../UI/detail/hero-detail/hero-detail.component';

interface HeroDetails {
  id: number;
  name: string;
  alterEgo?: string;
  lastName?: string;
  age: number;
  power: string;
  favourite: boolean;
}
export class Hero extends PersonaConPoderes {
  title: string = 'Heroes';
  favourite!: boolean;

  constructor(
    private heroService: HeroService,
    public heroModel: HeroModel,
    public override router: Router,
    private messageService: MessageService
  ) {
    super(router);
  }

  override setDetails(heroData: HeroDetails): this {
    super.setDetails(heroData);
    this.favourite = heroData.favourite;
    return this;
  }

  override getHeaders() {
    return [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Name' },
      { field: 'lastName', header: 'LastName' },
      { field: 'age', header: 'Age' },
      { field: 'power', header: 'Power' },
      { field: 'alterEgo', header: 'AlterEgo' },
      { field: 'favourite', header: 'Favourite' },
    ];
  }

  override menuItem() {
    let items: any[] = super.menuItem('/newHeroes');
    items.push({
      label: 'Favourite',
      icon: 'pi pi-star',
      command: () => this.favouriteMethod(),
    });
    return items;
  }

  favouriteMethod() {
 
    this.favourite = !this.favourite;
 
    const heroData = this.getHeroData();
    this.heroService.updateHero(heroData);
  }


  delete(): void {
    this.heroModel.heroes = this.heroModel.heroes.filter(
      (h) => h.id !== this.id
    );
    this.heroService.deleteHero(this.id);
  }

  goToDetail() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'It can only be edited if there is a single hero selected',
    });
    this.router.navigate(['/detail/hero/', this.id]);
  }

  // Método para obtener solo los datos necesarios del héroe
  getHeroData(): HeroDetails {
    return {
      id: this.id,
      name: this.name,
      alterEgo: this.alterEgo,
      lastName: this.lastName,
      age: this.age,
      power: this.power,
      favourite: this.favourite,
    };
  }
}
