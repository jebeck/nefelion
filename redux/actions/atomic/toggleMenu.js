export const TOGGLE_MENU_VISIBILITY = 'TOGGLE_MENU_VISIBILITY';

export default function toggleMenu(currentMenuState) {
  return {
    type: TOGGLE_MENU_VISIBILITY,
    payload: { menuShowing: !currentMenuState },
  };
}
