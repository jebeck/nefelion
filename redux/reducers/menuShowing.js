import initialState from 'store/initialState';
import { TOGGLE_MENU_VISIBILITY } from 'atomic/toggleMenu';

export default function menuShowing(
  state = initialState.app.menuShowing,
  action
) {
  switch (action.type) {
    case TOGGLE_MENU_VISIBILITY: {
      const { menuShowing } = action.payload;
      return menuShowing;
    }
    default: {
      return state;
    }
  }
}
