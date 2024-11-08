import { MenuItem, MessageService } from 'primeng/api';
import { PersonaConPoderes } from './personaConPoderes';
import { Router } from '@angular/router';
import { HeroService } from '../../Service/hero.service';
import { HeroModel } from '../Views/Dynamic/HeroModel';
import { HeroDetailComponent } from '../../UI/detail/hero-detail/hero-detail.component';
import { PersonaModel } from '../Views/Dynamic/PersonaModel';
import { HeroDetails } from './hero-details';


export class Hero extends PersonaConPoderes {
  title: string = 'Heroes';
  favourite!: boolean;
  url: string = '/newHeroes';

  constructor(
    private heroService: HeroService,
    public heroModel: HeroModel,
    public override router: Router,
    private messageService: MessageService,
    public override personaModel: PersonaModel
  ) {
    super(router, personaModel);
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
    let items: any[] = super.menuItem(this.url);
    items.push({
      label: 'Favourite',
      icon: 'pi pi-star',
      command: () => this.favouriteMethod(),
    });
    return items;
  }

  override menuItemOptions() {
    let items: any[] = super.menuItemOptions();
    let favorito = {
      label: 'Favourite',
      icon: 'pi pi-star',
      command: () => {
        this.personaModel.menuItemSeleccionado = 'Favourite';
        this.personaModel.ejecutarMenuItem();
      },
    };
    items.push(favorito);

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
    this.router.navigate(['/detail/hero/', this.id]);
  }

  getUrl() {
    return this.url;
  }
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
