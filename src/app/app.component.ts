import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    template: '<router-outlet />',
})
export class AppComponent {
    @HostListener('document:mousemove', ['$event'])
    onMouseMove(e: MouseEvent) {
        document.body.style.setProperty('--mx', `${e.clientX}px`);
        document.body.style.setProperty('--my', `${e.clientY}px`);
        console.log(e.clientX, e.clientY);
    }
}
