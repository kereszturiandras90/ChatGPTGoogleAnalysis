import { Routes } from '@angular/router';
import { TranslationsListComponent } from './components/translations/translations-list/translations-list.component';
import { AddTranslationComponent } from './components/translations/add-translation/add-translation.component';

export const routes: Routes = [
    {
    path: '',
    component: TranslationsListComponent
    },
    {
        path: 'translations',
        component: TranslationsListComponent
        },
        {
            path: 'translations/add',
            component: AddTranslationComponent
            },

];
