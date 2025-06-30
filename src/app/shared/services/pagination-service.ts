import {inject, Injectable} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor() { }

  activatedRoute = inject(ActivatedRoute)

  currentPage = toSignal(
    this.activatedRoute.queryParamMap.pipe(
      map(p => p.get('page')? +p.get('page')! : 1),
      map(p => isNaN(p)? 1 : p),
    ),
    {
      initialValue: 1,
    }
  )


}
