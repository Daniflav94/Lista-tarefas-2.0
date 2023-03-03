import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { ComponentsModule } from "../../components/components.module";
import { MaterialModule } from 'src/app/material/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        ComponentsModule,
        MaterialModule,
        FormsModule,
        PipesModule

    ],
    providers: [
      { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
    ]
})
export class HomeModule { }
