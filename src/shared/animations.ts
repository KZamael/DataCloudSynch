import { trigger, transition, style, animate } from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
	
	transition(':enter', [
		style({ opacity: 0 }),
		animate('0.4s', style({opacity: 1}))
	
	]),
]);