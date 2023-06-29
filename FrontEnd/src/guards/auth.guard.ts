import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { User } from 'src/models/user';
import { AccountService } from 'src/services/account.service';

export const authGuard: CanActivateFn = (route, state) => {
  const toastr = inject(ToastrService);
  const router = inject(Router);
  return inject(AccountService).currentUser$.pipe(
    map((user: User | null) => {
      if (user)
        return true;
      else {
        console.log("sdggsgsg")
        toastr.error("Please Login to continue.");
        router.navigateByUrl('/');
        return false;
      }
    })
  );
};
