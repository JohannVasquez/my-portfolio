import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  // imports: [RouterOutlet],
  // template: '<router-outlet />',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  private rafId: number | null = null;
  private currentX = window.innerWidth / 2;
  private currentY = window.innerHeight / 2;
  private targetX = this.currentX;
  private targetY = this.currentY;

  private touching = false;
  private activeTouchId: number | null = null;

  // === Escritorio: movimiento inmediato ===
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (this.touching) return; // si hay toque activo, ignoramos el mouse
    this.setVars(e.clientX, e.clientY);
  }

  // === Móvil: solo actualiza target mientras el dedo esté abajo ===
  @HostListener('document:touchstart', ['$event'])
  onTouchStart(e: TouchEvent) {
    if (!e.touches.length) return;
    const t = e.touches[0];
    this.touching = true;
    this.activeTouchId = t.identifier;
    this.setTarget(t.clientX, t.clientY);
    this.kickLoop();
  }

  @HostListener('document:touchmove', ['$event'])
  onTouchMove(e: TouchEvent) {
    if (!this.touching || this.activeTouchId === null) return;
    // Buscar el mismo dedo que inició el gesto
    const t = Array.from(e.touches).find(tt => tt.identifier === this.activeTouchId);
    if (!t) return;
    this.setTarget(t.clientX, t.clientY);
    // no es necesario reiniciar el loop si ya corre, pero por si acaso:
    this.kickLoop();
  }

  @HostListener('document:touchend', ['$event'])
  @HostListener('document:touchcancel', ['$event'])
  onTouchEnd(e: TouchEvent) {
    // ¿se levantó el dedo activo?
    const stillActive = Array.from(e.touches).some(tt => tt.identifier === this.activeTouchId);
    if (!stillActive) {
      this.touching = false;
      this.activeTouchId = null;
      this.kickLoop(); // seguirá hasta acercarse y luego se detiene
    }
  }

  // === Helpers ===
  private setVars(x: number, y: number) {
    document.documentElement.style.setProperty('--mx', `${x}px`);
    document.documentElement.style.setProperty('--my', `${y}px`);
  }

  private setTarget(x: number, y: number) {
    this.targetX = x;
    this.targetY = y;
  }

  private kickLoop() {
    if (this.rafId != null) return; // ya corriendo
    const step = () => {
      const alpha = 0.18; // 0.1 = más lento, 0.3 = más rápido
      this.currentX += (this.targetX - this.currentX) * alpha;
      this.currentY += (this.targetY - this.currentY) * alpha;
      this.setVars(this.currentX, this.currentY);

      const dx = this.targetX - this.currentX;
      const dy = this.targetY - this.currentY;
      const dist = Math.hypot(dx, dy);

      if (this.touching || dist > 0.5) {
        this.rafId = requestAnimationFrame(step);
      } else {
        cancelAnimationFrame(this.rafId!);
        this.rafId = null;
      }
    };
    this.rafId = requestAnimationFrame(step);
  }
}
