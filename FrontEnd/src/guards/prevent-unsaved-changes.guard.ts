import { CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from 'src/app/members/member-edit/member-edit.component';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberEditComponent> = (component, currentRoute, currentState, nextState) => {
  console.log('called')
  if (component.memberForm.dirty)
    return confirm('Are you sure you want to continue? Any unsaved changes will be lost');
  return true;
};
