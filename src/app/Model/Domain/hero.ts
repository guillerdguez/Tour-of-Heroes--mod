import { PersonaConPoderes } from './personaConPoderes';
import { Router } from '@angular/router';
import { HeroService } from '../../Service/hero.service';
import { HeroModel } from '../Views/Dynamic/HeroModel';
import { PersonaModel } from '../Views/Dynamic/PersonaModel';
import { HeroDetails } from './hero-details';
import { PowerModel } from '../Views/Dynamic/powerModel';
import { DialogService } from 'primeng/dynamicdialog';

export class Hero extends PersonaConPoderes {
  title: string = 'Heroes';
  favourite!: boolean;
  url: string = '/newHeroes';

  constructor(
    private heroService: HeroService,
    public heroModel: HeroModel,
    public override router: Router,
    public override personaModel: PersonaModel,
    public override powerModel: PowerModel,
    public override dialogService: DialogService
  ) {
    super(router, personaModel, dialogService, powerModel);
  }

  // Sobrescribimos el método setDetails para incluir la propiedad 'favourite'
  override setDetails(heroData: HeroDetails): this {
    super.setDetails(heroData);
    this.favourite = heroData.favourite;
    return this;
  }

  override getHeaders() {
    let headers = super.getHeaders();
    headers.push({ field: 'favourite', header: 'Favourite' });
    return headers;
  }

  override getMenuItems() {
    let items: any[] = super.getMenuItems(this.url);
    items.push({
      label: 'Favourite',
      icon: 'pi pi-star',
      command: () => this.favouriteMethod(),
    });
    return items;
  }

  override getMenuItemOptions() {
    let items: any[] = super.getMenuItemOptions();
    items.push({
      label: 'Favourite',
      icon: 'pi pi-star',
      command: () => {
        this.personaModel.menuItemSeleccionado = 'Favourite';
        this.personaModel.ejecutarMenuItem();
      },
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
    this.router.navigate(['/detail/hero/', this.id]);
  }

  getUrl() {
    return this.url;
  }
  override showDialogPower() {
    super.showDialogPower();
  }
  override changePower(power: string | undefined): void {
    super.changePower(power);
    const heroData = this.getHeroData();
    this.heroService.updateHero(heroData);
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
