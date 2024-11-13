import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InMemoryDataService } from './Service/in-memory-data.service';
import { ReactiveFormsModule } from '@angular/forms';
// UI Components
import { HeroDetailComponent } from './UI/detail/hero-detail/hero-detail.component';
import { MessagesComponent } from './UI/messages/messages.component';
import { DashboardComponent } from './UI/dashboard/dashboard.component';
import { HeroSearchComponent } from './UI/hero-search/hero-search.component';
import { InputSwitchComponent } from './UI/input-switch/input-switch.component';
import { SidebarComponent } from './UI/sidebar/sidebar.component';
import { FormularioComponentHeroe } from './UI/formularios/formularioHeroes/formulario.component';
import { FormularioComponentVillain } from './UI/formularios/formularioVillains/formulario.component';
import { EsquemaListaComponent } from './UI/listas/esquema-lista/esquema-lista.component';
import { VillainDetailComponent } from './UI/detail/villain-detail/villain-detail.component';
// PrimeNG Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DataViewModule } from 'primeng/dataview';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ContextMenuModule } from 'primeng/contextmenu';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { SelectFormComponent } from './UI/select-form/select-form.component';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { CardModule } from 'primeng/card';
import { FechoriaDialogComponent } from './UI/fechoria-dialog/fechoria-dialog.component';
import { DialogModule } from 'primeng/dialog';
import { SpeedDialModule } from 'primeng/speeddial';
import { MenuModule } from 'primeng/menu';
import { SkeletonModule } from 'primeng/skeleton';
import { PasarInformacionTablaComponent } from './UI/pasar-informacion-tabla/pasar-informacion-tabla.component';
import { PowerDialogComponent } from './UI/power-dialog /power-dialog.component';

@NgModule({
  declarations: [
    VillainDetailComponent,
    FormularioComponentHeroe,
    FormularioComponentVillain,
    AppComponent,

    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    InputSwitchComponent,
    SidebarComponent,

    EsquemaListaComponent,
    SelectFormComponent,
    FechoriaDialogComponent,
    PowerDialogComponent,
    PasarInformacionTablaComponent,
  ],
  imports: [
    DialogModule,
    CardModule,
    ToastModule,
    CascadeSelectModule,
    ReactiveFormsModule,
    ContextMenuModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    // PrimeNG Modules
    SkeletonModule,
    MenuModule,
    DropdownModule,
    ButtonModule,
    PanelModule,
    InputSwitchModule,
    DataViewModule,
    InputTextModule,
    ListboxModule,
    TagModule,
    TableModule,
    ToolbarModule,
    ToastModule,
    SplitButtonModule,
    DynamicDialogModule,
    SpeedDialModule,

    // HttpClientInMemoryWebApiModule for simulated server responses
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
  ],
  providers: [provideAnimationsAsync(), MessageService, DialogService],
  bootstrap: [AppComponent],
})
export class AppModule {}
