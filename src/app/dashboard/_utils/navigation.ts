/**
 * Check if a menu item is active based on current pathname
 * @param pathname - Current pathname from usePathname()
 * @param itemUrl - URL of the menu item
 * @param exactMatch - If true, only match exact pathname
 * @returns boolean
 */
export function isMenuActive(
  pathname: string,
  itemUrl: string,
  exactMatch: boolean = false
): boolean {
  if (exactMatch) {
    return pathname === itemUrl
  }

  return pathname === itemUrl || pathname.startsWith(itemUrl + "/")
}

/**
 * Check if menu item is Dashboard (needs exact match)
 * @param itemUrl - URL of the menu item
 * @returns boolean
 */
export function isDashboardMenu(itemUrl: string): boolean {
  return itemUrl === "/dashboard"
}

/**
 * Check if any submenu item is active
 * @param pathname - Current pathname
 * @param subItems - Array of submenu items
 * @returns boolean
 */
export function hasActiveSubItem(
  pathname: string,
  subItems?: Array<{ url: string }>
): boolean {
  if (!subItems || subItems.length === 0) return false

  return subItems.some((subItem) => isMenuActive(pathname, subItem.url))
}

